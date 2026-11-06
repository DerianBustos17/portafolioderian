---
description: Crea un commit con mensaje en formato Conventional Commits a partir de los cambios
argument-hint: "[pista opcional sobre el cambio]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
---

## Contexto

- Estado: !`git status --short`
- Cambios en stage: !`git diff --staged --stat`
- Cambios sin stage: !`git diff --stat`
- Últimos commits: !`git log --oneline -5`

## Tarea

Crea un commit con los cambios actuales. Pista del usuario: $ARGUMENTS

1. Si no hay nada en stage, añade los archivos modificados relevantes. No añadas archivos con secretos (`.env`, claves) ni artefactos generados (`node_modules`, `build`, `dist`).
2. Si los cambios mezclan temas no relacionados, propón dividirlos en varios commits antes de seguir.
3. Escribe el mensaje en formato Conventional Commits, en el idioma de los commits anteriores:
   - `tipo(ámbito opcional): resumen en imperativo` (máx. 72 caracteres)
   - Tipos: feat, fix, refactor, style, docs, test, chore, perf, build, ci
   - Cuerpo opcional explicando el *por qué*, si no es obvio.
4. Haz el commit y muestra el resultado de `git log --oneline -1`.

No hagas push.
