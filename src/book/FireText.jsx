import React, { useRef } from "react";

const SPREAD = 2; // cuántas letras a cada lado se contagian
const SPREAD_DELAY_MS = 90; // retraso entre una letra y la siguiente

// Texto cuyas letras se prenden fuego al pasar el ratón por encima.
// Cada palabra va en un bloque que no se parte, para que el texto siga
// saltando de línea igual que antes. Los lectores de pantalla leen el texto
// completo (sr-only) y no las letras sueltas.
// dropcap: la primera letra se dibuja como capitular grande.
export default function FireText({ text, dropcap = false }) {
  const letters = useRef([]);
  const value = String(text);

  const ignite = (index) => {
    for (let d = 0; d <= SPREAD; d++) {
      for (const j of d === 0 ? [index] : [index - d, index + d]) {
        const el = letters.current[j];
        if (!el || el.classList.contains("is-burning")) continue;
        setTimeout(() => el.classList.add("is-burning"), d * SPREAD_DELAY_MS);
      }
    }
  };

  let i = 0;
  const letter = (ch, extraClass = "") => {
    const index = i++;
    return (
      <span
        key={index}
        ref={(el) => (letters.current[index] = el)}
        className={`fire-letter ${extraClass}`}
        onMouseEnter={() => ignite(index)}
        onAnimationEnd={(e) => e.currentTarget.classList.remove("is-burning")}
      >
        {ch}
      </span>
    );
  };

  const rest = dropcap ? value.slice(1) : value;
  const words = rest.split(" ");
  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="fire-text" aria-hidden="true">
        {dropcap && letter(value[0], "dropcap-letter")}
        {words.map((word, w) => (
          <React.Fragment key={w}>
            <span className="fire-word">{[...word].map((ch) => letter(ch))}</span>
            {w < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </span>
    </>
  );
}
