---
description: Escribe y ejecuta tests para un archivo o para los cambios actuales
argument-hint: "[ruta del archivo o carpeta]"
---

Usa el agente **test-writer** para escribir tests.

- Objetivo: `$ARGUMENTS`.
- Si no se indicó objetivo, usa los archivos de código modificados en `git diff` y `git diff --staged`.

Cuando termine, dime qué tests se añadieron, el resultado de ejecutarlos y si encontró bugs en el código.
