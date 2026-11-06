import { useEffect } from "react";

const MAX_SPARKS = 24;
const MIN_GAP_MS = 28; // como mucho una chispa cada 28 ms
const MIN_DIST_PX = 6; // y solo si el ratón se ha movido algo

// Cursor de pluma dorada (la punta se enciende sobre enlaces y botones) y un
// rastro de chispas al mover el ratón. Las rutas de las imágenes se ponen por
// JS para que el empaquetador no intente resolverlas desde el CSS.
export default function MagicCursor() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--cursor-default", "url(/cursors/quill.svg) 2 2, auto");
    root.style.setProperty("--cursor-pointer", "url(/cursors/quill-ember.svg) 2 2, pointer");

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const layer = document.createElement("div");
    layer.className = "spark-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    let last = { t: 0, x: -100, y: -100 };
    const onMove = (e) => {
      const now = performance.now();
      if (now - last.t < MIN_GAP_MS) return;
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) < MIN_DIST_PX) return;
      last = { t: now, x: e.clientX, y: e.clientY };
      if (layer.childElementCount >= MAX_SPARKS) layer.firstElementChild.remove();

      const s = document.createElement("span");
      s.className = "spark";
      // La chispa sale de la punta de la pluma y deriva hacia arriba con algo de azar.
      s.style.left = `${e.clientX + 2}px`;
      s.style.top = `${e.clientY + 2}px`;
      s.style.setProperty("--dx", `${(Math.random() - 0.5) * 24}px`);
      s.style.setProperty("--dy", `${-12 - Math.random() * 22}px`);
      s.style.setProperty("--size", `${2 + Math.random() * 3}px`);
      s.addEventListener("animationend", () => s.remove());
      layer.appendChild(s);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      layer.remove();
    };
  }, []);

  return null;
}
