// Capítulo "Proyectos": cada proyecto ocupa una doble página.
// image: ruta dentro de /public (o null para mostrar una ilustración de "en preparación").
// links: enlaces opcionales (demo, repositorio...).

export const projects = [
  {
    id: "portfolio",
    title: { es: "Este portafolio", en: "This portfolio" },
    image: "/portfolio.jpg",
    description: {
      es: "Mi portafolio personal, convertido en un libro 3D que se hojea en el navegador. El libro está modelado en Blender y se anima con Three.js.",
      en: "My personal portfolio, turned into a 3D book you can leaf through in the browser. The book is modeled in Blender and animated with Three.js.",
    },
    tech: ["React.js", "Three.js", "Blender", "Tailwind CSS"],
    links: [{ label: "GitHub", href: "https://github.com/DerianBustos17/portafolioderian" }],
  },
  {
    id: "restaurante",
    title: { es: "Gestor de Restaurante", en: "Restaurant Manager" },
    image: "/GestordeRestaurante.jpg",
    description: {
      es: "Aplicación para gestionar las operaciones de un restaurante, desarrollada con .NET y Blazor.",
      en: "An application to manage a restaurant's operations, built with .NET and Blazor.",
    },
    tech: [".NET", "Blazor", "C#"],
    links: [],
  },
  {
    id: "4g-properties",
    title: { es: "4G Properties", en: "4G Properties" },
    image: null,
    description: {
      es: "Plataforma inmobiliaria desarrollada con Node.js y React.js. Pronto habrá más detalles.",
      en: "A real estate platform built with Node.js and React.js. More details coming soon.",
    },
    tech: ["Node.js", "React.js"],
    links: [],
  },
];
