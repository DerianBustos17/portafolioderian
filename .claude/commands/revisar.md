---
description: Revisa los cambios actuales (o una rama) con el agente code-reviewer
argument-hint: "[rama base, p. ej. main]"
---

Usa el agente **code-reviewer** para revisar los cambios.

- Si se indicó una rama base (`$ARGUMENTS`), revisa `git diff $ARGUMENTS...HEAD`.
- Si no, revisa los cambios sin commit (`git diff` y `git diff --staged`).

Cuando termine, muéstrame sus hallazgos ordenados por gravedad y pregúntame cuáles quiero que corrija. No corrijas nada sin que te lo confirme.
