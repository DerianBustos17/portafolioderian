import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { LanguageProvider, useLang } from "./i18n/LanguageContext";
import { SPREADS, firstSpreadOf } from "./book/spreads";
import { Page } from "./book/Pages";
import FireText from "./book/FireText";
import Pager from "./book/Pager";
import MagicCursor from "./book/MagicCursor";
import { profile } from "./data/profile";
import "./book/book.css";

const BookScene = lazy(() => import("./book/BookScene"));


function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) {
    return false;
  }
}

function useNarrow() {
  const query = "(max-width: 820px), (max-aspect-ratio: 1/1)";
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}

function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t("language")}>
      {["es", "en"].map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Portfolio() {
  const { t, tr } = useLang();
  const narrow = useNarrow();
  const [webgl] = useState(hasWebGL);

  // Un enlace como /#experience abre el libro directamente en ese capítulo.
  const [initialSpread] = useState(() => {
    const id = window.location.hash.slice(1);
    return id ? firstSpreadOf(id) : -1;
  });
  const [open, setOpen] = useState(initialSpread >= 0);
  const [spread, setSpread] = useState(Math.max(initialSpread, 0));
  const [side, setSide] = useState("left"); // página visible en pantallas estrechas
  const [flip, setFlip] = useState(null); // { dir, to, manual }
  const [settled, setSettled] = useState(!webgl); // la portada ya terminó de abrirse (lo avisa el libro 3D)

  const last = SPREADS.length - 1;
  const busy = flip !== null;

  const flipTo = useCallback(
    (to) => {
      if (busy || to === spread || to < 0 || to > last) return;
      if (!webgl) {
        // Sin 3D no hay animación: se cambia de página directamente.
        setSpread(to);
        setSide(to > spread ? "left" : "right");
        return;
      }
      setFlip({ dir: to > spread ? 1 : -1, to });
    },
    [busy, spread, last, webgl]
  );

  // Arrastre de la esquina de una página (como un libro de verdad).
  // drag.current.p (0..1) lo lee la hoja 3D en cada fotograma.
  const drag = useRef({ p: 0, active: false, release: null, moved: false });

  const onFlipCancel = useCallback(() => setFlip(null), []);

  const startGrab = useCallback(
    (pageSide, e) => {
      if (busy || !open || e.button > 0) return;
      const dir = pageSide === "right" ? 1 : -1;
      const to = spread + dir;
      if (to < 0 || to > last) return;
      e.preventDefault(); // evita seleccionar texto mientras se arrastra

      const pageEl = e.currentTarget.closest(".book-page");
      const width = (pageEl && pageEl.getBoundingClientRect().width) || 400;
      const startX = e.clientX;
      drag.current = { p: 0, active: true, release: null, moved: false };
      if (webgl) setFlip({ dir, to, manual: true });

      const onMove = (ev) => {
        // Página derecha: se arrastra hacia la izquierda; izquierda: hacia la derecha.
        const dx = (startX - ev.clientX) * dir;
        if (Math.abs(dx) > 4) drag.current.moved = true;
        // Hace falta recorrer algo más de un ancho de página para el giro completo.
        drag.current.p = Math.min(Math.max(dx / (width * 1.4), 0), 1);
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        const d = drag.current;
        // Un clic sin arrastrar también pasa la página.
        const complete = !d.moved || d.p > 0.3;
        d.active = false;
        d.release = complete ? "complete" : "cancel";
        if (!webgl && complete) {
          setSpread(to);
          setSide(dir === 1 ? "left" : "right");
        }
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [busy, open, spread, last, webgl]
  );

  const onFlipDone = useCallback(() => {
    if (!flip) return;
    setSpread(flip.to);
    setSide(flip.dir === 1 ? "left" : "right");
    setFlip(null);
  }, [flip]);

  const next = useCallback(() => {
    if (busy) return;
    if (!open) return setOpen(true);
    if (narrow && side === "left") return setSide("right");
    flipTo(spread + 1);
  }, [busy, open, narrow, side, spread, flipTo]);

  const prev = useCallback(() => {
    if (busy || !open) return;
    if (narrow && side === "right") return setSide("left");
    if (spread === 0) return setOpen(false);
    flipTo(spread - 1);
  }, [busy, open, narrow, side, spread, flipTo]);

  const jump = useCallback((to) => flipTo(to), [flipTo]);

  // Enlaces a un capítulo (#experience...) mientras la página ya está abierta.
  useEffect(() => {
    const onHash = () => {
      const to = firstSpreadOf(window.location.hash.slice(1));
      if (to < 0) return;
      if (open) flipTo(to);
      else {
        setSpread(to);
        setSide("left");
        setOpen(true);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open, flipTo]);

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape" && open && !busy) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, open, busy]);

  // Indicador de desplazamiento vertical (lo mueve la cámara en modo lectura).
  const scrollRef = useRef(null);

  // Deslizar en pantallas táctiles
  const touch = useRef(null);
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) < 50) return;
    dx < 0 ? next() : prev();
  };

  // Mantiene el capítulo actual en la URL para poder compartirlo.
  useEffect(() => {
    const hash = open ? `#${SPREADS[spread].chapter}` : " ";
    window.history.replaceState(null, "", hash === " " ? window.location.pathname : hash);
  }, [open, spread]);

  const current = SPREADS[spread];
  const pageNumber = spread * 2 + (narrow && side === "right" ? 2 : 1);
  const atEnd = spread === last && (!narrow || side === "right");

  return (
    <div className="app" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <header className="topbar">
        <p className="brand">
          {profile.shortName} <span>· {tr(profile.role)}</span>
        </p>
        <LanguageToggle />
      </header>

      {webgl ? (
        <Suspense fallback={<p className="loading">{t("loading")}</p>}>
          <BookScene
            open={open}
            spreadIndex={spread}
            flip={flip}
            drag={drag}
            contentVisible={open && settled && !busy}
            narrow={narrow}
            side={side}
            scrollRef={scrollRef}
            onToggle={() => setOpen(true)}
            onSettled={setSettled}
            onFlipDone={onFlipDone}
            onFlipCancel={onFlipCancel}
            onJump={jump}
            onGrab={startGrab}
          />
        </Suspense>
      ) : (
        open && (
          <main className="flat-book" style={{ "--parchment": "url(/textures/parchment.jpg)" }}>
            {(!narrow || side === "left") && <Page page={current.left} chapter={current.chapter} number={spread * 2 + 1} side="left" onJump={jump} onGrab={narrow ? null : startGrab} />}
            {(!narrow || side === "right") && <Page page={current.right} chapter={current.chapter} number={spread * 2 + 2} side="right" onJump={jump} onGrab={narrow ? null : startGrab} />}
          </main>
        )
      )}

      {webgl && open && (
        <div className="read-scroll" ref={scrollRef} aria-hidden="true">
          <div className="read-scroll-thumb" />
        </div>
      )}

      {!open ? (
        <div className="cover-cta">
          <h1>
            <FireText text={profile.name} />
          </h1>
          <p>{tr(profile.role)}</p>
          <button type="button" className="seal-button" onClick={() => setOpen(true)}>
            {t("openBook")}
          </button>
        </div>
      ) : (
        <Pager
          spread={spread}
          pageNumber={pageNumber}
          busy={busy}
          atStart={spread === 0 && side === "left"}
          atEnd={atEnd}
          onPrev={prev}
          onNext={next}
          onJump={jump}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MagicCursor />
      <Portfolio />
    </LanguageProvider>
  );
}
