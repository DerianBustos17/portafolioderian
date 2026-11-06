# Portafolio de Derian Bustos

Portafolio personal en forma de libro 3D: se abre, se pasan las páginas y cada capítulo es una sección (Sobre mí, Experiencia, Proyectos, Habilidades y contacto). Está en español e inglés.

El libro está modelado en Blender y se muestra con React, Three.js (`@react-three/fiber` y `@react-three/drei`) y Tailwind.

## Arrancar en local

Requisitos: Node.js 18 o superior.

```bash
npm install
npm start        # http://localhost:3000
npm run build    # versión de producción en /build
```

## Actualizar el contenido

Todo el texto vive en `src/data/`. No hace falta tocar los componentes.

| Archivo | Qué contiene |
|---|---|
| `src/data/experiences.js` | Experiencia laboral (una doble página por puesto) y formación. |
| `src/data/projects.js` | Proyectos (una doble página por proyecto). |
| `src/data/skills.js` | Grupos de habilidades. |
| `src/data/profile.js` | Nombre, foto, "Sobre mí", CV y enlaces de contacto. |
| `src/i18n/ui.js` | Textos fijos de la interfaz (botones, títulos de capítulo...). |

Los textos traducibles se escriben así: `{ es: "Texto en español", en: "Text in English" }`.

Para añadir una experiencia, copia un objeto de la lista `experiences`, cambia sus datos y colócalo en la posición que quieras (la primera de la lista es la primera que se lee). Usa `end: null` si sigues en ese puesto.

Cada página mide 552 × 800 px y no tiene scroll: si un texto es demasiado largo, se cortará. En ese caso, acórtalo o reparte los logros.

## Enlaces directos a capítulos

`/#about`, `/#experience`, `/#projects`, `/#skills` y `/#contents` abren el libro directamente en ese capítulo.

## El modelo 3D

- Archivo fuente: `blender/book.blend` (Blender 5.2).
- Texturas generadas (bake): `blender/textures/`.
- Modelo que usa la web: `public/models/book.glb`.
- Pergamino de las hojas animadas: `public/textures/parchment.jpg`.

La web anima el libro por el nombre de sus objetos, así que hay que conservarlos al editar el modelo:

- `Hinge_Front`: bisagra; la portada y las páginas de la izquierda cuelgan de ella y giran 180° al abrir.
- `Spine`: lomo; gira 90° y queda bajo el libro abierto.

Para volver a exportar: selecciona la colección **Book** y usa *File → Export → glTF 2.0* con formato **GLB**, *Include → Selected Objects* y *Apply Modifiers*, guardando en `public/models/book.glb`. Antes de exportar, deja el libro cerrado (rotaciones de `Hinge_Front` y `Spine` a 0).

## Estructura

```
src/
  App.js              navegación, idioma, teclado y gestos
  book/
    BookScene.jsx     escena 3D: libro, cámara, luces y hoja que pasa
    Pages.jsx         diseño de cada tipo de página
    spreads.js        orden de capítulos y dobles páginas
    book.css          estilos del libro
  data/               contenido editable
  i18n/               idioma (es/en)
```

Si el navegador no tiene WebGL, el portafolio se muestra como un libro plano con las mismas páginas.
