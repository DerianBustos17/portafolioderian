import React, { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { CHAPTERS, SPREADS, firstSpreadOf } from "./spreads";

const TOTAL_PAGES = SPREADS.length * 2;
const HINT_KEY = "portfolio-hint-seen";
const HINT_MS = 6000;

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === "left" ? "M14.5 5 8 12l6.5 7" : "M9.5 5 16 12l-6.5 7"} />
    </svg>
  );
}

// Ayuda de teclado: solo en la primera visita y desaparece sola.
function Hint() {
  const { t } = useLang();
  const [show, setShow] = useState(() => {
    try {
      return !localStorage.getItem(HINT_KEY);
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch (e) {}
    const id = setTimeout(() => setShow(false), HINT_MS);
    return () => clearTimeout(id);
  }, [show]);

  if (!show) return null;
  return (
    <p className="pager-hint" role="status">
      <kbd>←</kbd>
      <kbd>→</kbd>
      <span>{t("hint")}</span>
    </p>
  );
}

// Placa de navegación bajo el libro: capítulo actual, botones y progreso.
export default function Pager({ spread, pageNumber, busy, atStart, atEnd, onPrev, onNext, onJump }) {
  const { t } = useLang();
  const chapterId = SPREADS[spread].chapter;
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  const progress = pageNumber / TOTAL_PAGES;

  return (
    <div className="pager-wrap">
      <Hint />
      <nav className="pager" aria-label={t("contents")}>
        <button type="button" className="pager-btn" onClick={onPrev} disabled={busy} aria-label={atStart ? t("closeBook") : t("prev")}>
          <Chevron dir="left" />
        </button>

        <div className="pager-center">
          <p className="pager-kicker">{chapter ? `${t("chapter")} ${chapter.numeral}` : t("exLibris")}</p>
          <p className="pager-title">{chapter ? t(chapter.id) : t("contents")}</p>
          <div className="pager-track">
            <div className="pager-fill" style={{ width: `${progress * 100}%` }} />
            {CHAPTERS.map((c) => {
              const target = firstSpreadOf(c.id);
              const at = (target * 2 + 1) / TOTAL_PAGES;
              const reached = spread >= target;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`pager-mark ${reached ? "is-reached" : ""} ${c.id === chapterId ? "is-current" : ""}`}
                  style={{ left: `${at * 100}%` }}
                  onClick={() => onJump(target)}
                  disabled={busy}
                  aria-label={`${t("chapter")} ${c.numeral}: ${t(c.id)}`}
                  title={t(c.id)}
                />
              );
            })}
          </div>
          <p className="pager-page">
            {t("page")} {pageNumber} <span>/ {TOTAL_PAGES}</span>
          </p>
        </div>

        <button type="button" className="pager-btn" onClick={onNext} disabled={busy || atEnd} aria-label={t("next")}>
          <Chevron dir="right" />
        </button>
      </nav>
    </div>
  );
}
