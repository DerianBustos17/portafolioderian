---
description: Refactoriza código sin cambiar su comportamiento, con plan previo y verificación
argument-hint: "<archivo o carpeta> [objetivo, p. ej. 'extraer componentes']"
---

Refactoriza: $ARGUMENTS

1. **Analiza** el código y lista los problemas concretos: duplicación, funciones o componentes demasiado grandes, nombres confusos, código muerto, imports sin usar.
2. **Propón un plan** breve con los cambios y espera mi confirmación antes de editar.
3. **Aplica** los cambios en pasos pequeños, sin cambiar el comportamiento visible ni la API pública.
4. **Verifica**: ejecuta el build, el linter y los tests que existan, y confirma que todo sigue pasando.
5. Termina con el agente **code-reviewer** revisando el resultado.
