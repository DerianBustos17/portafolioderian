// Capítulo "Experiencia" del libro.
// Cada objeto de esta lista se convierte en una doble página (izquierda: puesto y
// descripción; derecha: logros y tecnologías). El orden de la lista es el orden
// de las páginas: pon primero la experiencia más reciente.
//
// Los textos que cambian según el idioma llevan { es, en }.
// "end: null" significa que sigues trabajando ahí (se muestra "Actualidad").

export const experiences = [
  {
    id: "trifecta",
    company: "TRIFECTA SOFTWARE",
    role: { es: "Ingeniero de Software IA", en: "AI Software Enginer Developer" },
    location: "San José, Costa Rica",
    start: "2024-06",
    end: "2025-08",
    summary: {
      es: "Desarrollo de aplicaciones web de punta a punta, desde la interfaz hasta los servicios y la base de datos, liderando equipos ágiles.",
      en: "End-to-end web application development, from the interface to services and databases, while leading agile teams.",
    },
    highlights: {
      es: [
        "Desarrollé aplicaciones web dinámicas con Angular, React.js y jQuery en el frontend, y Laravel y C# en el backend.",
        "Diseñé e implementé APIs RESTful e integré servicios web en C# para la comunicación entre sistemas.",
        "Automaticé pipelines de CI/CD con Jenkins y despliegues a producción con Octopus Deploy.",
        "Optimicé bases de datos relacionales (SQL Server, MySQL), mejorando el rendimiento de las consultas.",
        "Lideré equipos Scrum con Jira para el seguimiento de proyectos y la colaboración entre áreas.",
      ],
      en: [
        "Built dynamic web applications with Angular, React.js and jQuery on the frontend, and Laravel and C# on the backend.",
        "Designed and implemented RESTful APIs and integrated C# web services for communication between systems.",
        "Automated CI/CD pipelines with Jenkins and production deployments with Octopus Deploy.",
        "Optimized relational databases (SQL Server, MySQL), improving query performance.",
        "Led Scrum teams with Jira for project tracking and cross-functional collaboration.",
      ],
    },
    tech: ["Angular", "React.js", "jQuery", "Laravel", "C#", "SQL Server", "MySQL", "Jenkins", "Octopus Deploy", "Jira"],
  },
  {
    id: "tavuel",
    company: "TAVUEL 506",
    role: { es: "Desarrollador Front End (práctica)", en: "Front End Developer Intern" },
    location: "San José, Costa Rica",
    start: "2023-06",
    end: "2023-12",
    summary: {
      es: "Práctica profesional construyendo interfaces web modernas dentro de un equipo Scrum.",
      en: "Internship building modern web interfaces as part of a Scrum team.",
    },
    highlights: {
      es: [
        "Desarrollé aplicaciones web responsivas con React.js, TypeScript y Material UI, con código mantenible.",
        "Integré APIs GraphQL para la obtención de datos y la gestión de estado.",
        "Colaboré en equipos ágiles (Scrum) en la planificación de sprints y el desarrollo iterativo.",
        "Implementé pruebas automatizadas que mejoraron la calidad del código y los despliegues.",
        "Participé en mejoras de UI/UX centradas en la usabilidad y el diseño moderno.",
      ],
      en: [
        "Built responsive web applications with React.js, TypeScript and Material UI, keeping the code maintainable.",
        "Integrated GraphQL APIs for data fetching and state management.",
        "Collaborated in agile (Scrum) teams on sprint planning and iterative development.",
        "Implemented automated tests that improved code quality and deployments.",
        "Contributed to UI/UX improvements focused on usability and modern design.",
      ],
    },
    tech: ["React.js", "TypeScript", "Material UI", "GraphQL", "Scrum"],
  },
];

export const education = [
  {
    id: "ucr",
    title: { es: "Bachillerato en Informática Empresarial", en: "Bachelor's in Business Computing" },
    institution: "Universidad de Costa Rica",
    start: "2020-03",
    end: "2023-12",
  },
];
