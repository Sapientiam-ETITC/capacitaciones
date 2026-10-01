# Instrucciones para asistentes de IA

Este repo guarda talleres del Semillero Sapientiam. Cada taller sale de un solo
archivo, `content.js`. Tu trabajo casi siempre es escribir ese archivo.

## Crear un taller

1. Pregunta lo que no sepas antes de escribir: para quién es (edad, cuántas
   personas, qué tanto participan), cuánto dura, qué deben saber al salir, si
   es parte de una serie y qué se vio antes, y cómo se entrega la guía.
2. `pnpm nuevo <carpeta>` (minúsculas y guiones; `serie/sesion-1` para series).
3. Lee `_base/TIPOS.md` completo. Para un ejemplo real de un tipo, búscalo en
   `escudo-digital-fundasol/content.js`.
4. Escribe `<carpeta>/content.js` y, si lleva guía, `<carpeta>/guia.js`.
5. `pnpm pdf <carpeta>` y `pnpm verificar`.
6. Abre `presentacion.pdf` y `guia.pdf` y mira **cada página**. Los textos que
   se salen, se cortan o quedan tapados no dan error. Corrige y regenera.

## Límites

- No modifiques los talleres existentes (`escudo-digital-*`) salvo que te lo
  pidan de forma explícita.
- No modifiques `_base/` para hacer caber un contenido: reescribe el contenido.
  Si de verdad falta un tipo, dilo y detente.
- No edites a mano `guion.md`, `presentacion.pdf`, `guia.pdf` ni `talleres.js`:
  se generan.
- No inventes cifras, números de líneas de ayuda ni rutas de menús. Verifícalos
  y pon la fuente; si no puedes, márcalo como pendiente en la `nota`.
- No uses módulos ES ni `fetch` en archivos que carga el navegador: el taller
  abre con doble clic (`file://`).

## Cómo escribir una slide

- `titulo` corto. Lo que se explica va en la `nota`, no en pantalla.
- `nota` es lo que dice y hace quien dicta, en frases completas. Si la slide
  enseña un procedimiento, la nota trae la ruta exacta (menú → submenú).
- Si hay algo que preguntar a la sala, va en `preguntar`, y lo esperado en
  `respuesta`.
- `min` es el minuto en que la slide debe empezar; la última no puede pasar
  de `META.presupuesto`. Una sala que participa poco necesita más slides y
  menos minutos por slide.
- Opciones de `pregunta` y `escenario`: máximo 3 y cortas.
- El escudo de la marca se escribe `{escudo}`, nunca el emoji 🛡️.
- Alterna el `tema` entre slides seguidas.

## Al terminar

Anota el taller en `CHANGELOG.md` (sección «Sin publicar») y di qué quedó por
verificar a mano.
