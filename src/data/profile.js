// Datos personales que aparecen en la portadilla, "Sobre mí" y "Contacto".

const email = "derianbustos2002@gmail.com";

export const profile = {
  name: "Derian Bustos Rodríguez",
  shortName: "Derian Bustos",
  initials: "D · B",
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  location: "Liberia, Guanacaste, Costa Rica",
  photo: "/derian_foto.jpg",
  cv: "/DERIAN_BUSTOS_RODRÍGUEZ_-_Full_Stack_Developer.pdf",
  languages: { es: "Español e inglés", en: "Spanish and English" },
  about: {
    es: [
      "Soy desarrollador Full Stack con más de dos años de experiencia creando aplicaciones web que resuelven necesidades reales de negocio.",
      "Trabajo con frameworks modernos de JavaScript como Angular y React, y con backends en Laravel y C#. Me muevo con soltura en equipos ágiles y en pipelines de CI/CD automatizados.",
      "Veo cada proyecto como una oportunidad para aprender y crear: me gusta convertir ideas en experiencias digitales con diseño limpio, código eficiente e interacciones con sentido.",
    ],
    en: [
      "I'm a Full Stack Developer with over two years of experience building web applications that solve real business needs.",
      "I work with modern JavaScript frameworks such as Angular and React, and with Laravel and C# backends. I'm comfortable in agile teams and automated CI/CD pipelines.",
      "I see every project as a chance to learn and create: I enjoy turning ideas into digital experiences through clean design, efficient code and meaningful interactions.",
    ],
  },
  contacts: [
    { id: "email", label: "Email", href: `mailto:${email}`, text: email },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/derian-bustos-rodr%C3%ADguez-2a7a83222", text: "in/derian-bustos-rodríguez" },
    { id: "github", label: "GitHub", href: "https://github.com/DerianBustos17", text: "DerianBustos17" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.link/rrktmy", text: "WhatsApp" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/derian.bustos.98", text: "derian.bustos.98" },
  ],
};
