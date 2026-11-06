---
description: Prepara la rama actual para un pull request y redacta su descripción
argument-hint: "[rama base, por defecto main]"
---

Prepara un pull request de la rama actual contra `$ARGUMENTS` (si está vacío, usa `main` o `master`, la que exista).

1. Muestra los commits y archivos cambiados (`git log <base>..HEAD --oneline` y `git diff <base>...HEAD --stat`).
2. Ejecuta el build, el linter y los tests que existan e informa del resultado.
3. Usa el agente **code-reviewer** sobre `git diff <base>...HEAD`.
4. Redacta la descripción del PR:
   - **Qué cambia** (lista breve)
   - **Por qué**
   - **Cómo probarlo**
   - **Riesgos o pendientes**, incluidos los hallazgos de la revisión que no se hayan corregido.

No hagas push ni crees el PR: muéstrame la descripción y pregúntame si quiero publicarlo con `gh pr create`.
