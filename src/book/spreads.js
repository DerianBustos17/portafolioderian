import { experiences } from "../data/experiences";
import { projects } from "../data/projects";

// Capítulos del libro, en orden. "id" coincide con la clave del texto en i18n/ui.js.
export const CHAPTERS = [
  { id: "about", numeral: "I" },
  { id: "experience", numeral: "II" },
  { id: "projects", numeral: "III" },
  { id: "skills", numeral: "IV" },
];

// Cada "spread" es una doble página: lo que se ve con el libro abierto.
// left/right.kind elige el componente de Pages.jsx que se dibuja en esa página.
export function buildSpreads() {
  const spreads = [{ chapter: "contents", left: { kind: "title" }, right: { kind: "toc" } }];

  spreads.push({ chapter: "about", left: { kind: "about", first: true }, right: { kind: "aboutCard" } });

  experiences.forEach((exp, i) =>
    spreads.push({
      chapter: "experience",
      left: { kind: "experienceMain", data: exp, first: i === 0 },
      right: { kind: "experienceDetail", data: exp },
    })
  );

  projects.forEach((project, i) =>
    spreads.push({
      chapter: "projects",
      left: { kind: "projectImage", data: project, first: i === 0 },
      right: { kind: "projectInfo", data: project },
    })
  );

  spreads.push({ chapter: "skills", left: { kind: "skills", first: true }, right: { kind: "contact" } });

  return spreads;
}

export const SPREADS = buildSpreads();

// Primera doble página de cada capítulo (para el índice y los saltos).
export function firstSpreadOf(chapterId) {
  return SPREADS.findIndex((s) => s.chapter === chapterId);
}
