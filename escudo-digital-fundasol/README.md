# Escudo Digital — taller Fundasol 126

Taller de 2 horas sobre ciberacoso y amenazas digitales para niñas de 10 a 15
años. Fundasol 126, con el apoyo de Sapientiam · ETITC.

**Abre con doble clic en `index.html`**, no necesita servidor ni instalación.
Funciona sin internet (solo se pierden las fuentes Baloo/Nunito y cae a las del sistema).

## Con dos pantallas (como PowerPoint)

1. Conecta el proyector en modo **extender**, no duplicar.
2. Abre `index.html` en Chrome y presiona **`P`**. Se abre la **vista presentador**.
3. Arrastra la ventana de las slides al proyector y presiona **`F`** (pantalla completa).
4. Deja la vista presentador en tu portátil. Ahí ves:
   - la slide actual, con lo que ya reveló, y la siguiente
   - el guion con **preguntas para la sala** y la **respuesta esperada**
   - el reloj, el cronómetro y el ritmo (✅ a tiempo · 🐢 atrasada · ⏩ adelantada)
5. Puedes avanzar desde cualquiera de las dos ventanas o con un clicker; se mantienen sincronizadas.
   Si el proyector se recarga, el presentador lo reencuentra solo en unos 2 segundos.

Con una sola pantalla: **`N`** abre el guion al lado de la slide.

## Teclas

| Tecla | Qué hace |
|---|---|
| `→` `espacio` `PageDown` · clic | Revela lo siguiente o pasa de slide |
| `←` `PageUp` · clic derecho | Atrás |
| `P` | Abre la vista presentador |
| `N` | Guion al lado (una pantalla) |
| `F` | Pantalla completa |
| `Home` / `End` | Primera / última |

Muchas slides **revelan con cada clic**: la respuesta del quiz, las banderas
rojas del chat, las tarjetas de verdad o mito, el semáforo, los perfiles falsos,
los interruptores del celular... Primero se pregunta, después se revela.

En la slide de la contraseña se escribe en vivo, desde el proyector o desde el
presentador, y el medidor reacciona.

## Editar el contenido

**Todo el contenido vive en `content.js`.** De ahí salen las slides, la vista
presentador, el guion, la guía y los PDF. Después de cambiarlo:

```bash
node ../_base/herramientas/guion.mjs      # regenera guion.md (para imprimir)
```

`guion.md` **no se edita a mano**.

## Estructura

```
index.html          carga content.js y el motor de ../_base
content.js          ← el contenido (fuente única)
guia.html, guia.js  guía para llevar a casa → guia.pdf
img/, audio/        logos y música de este taller
guion.md            guion completo: escaleta, protocolo, materiales, respuestas
presentacion.pdf    el deck con todo revelado
```

## Antes del taller

- Revisar los menús de privacidad de Instagram, TikTok y WhatsApp (slides 14, 27, 34 y 35): cambian con las actualizaciones.
- Verificar las líneas de ayuda (slide 37). Si es en Bogotá, agregar la Línea 106.
- Leer el **protocolo** del guion para cuando una niña cuente algo.
- Papelitos y una caja para el buzón de preguntas anónimas.

## Guía para llevar a casa (PDF)

`guia.pdf` es el resumen del taller para mandar por WhatsApp a las familias:
páginas angostas para leer en el celular. Tiene tres partes: *Soy guardiana*
(para ella), *Con mi adulto* (lista de configuración) y *Para la familia*.

Sale de `guia.html` + `guia.js`, que toman de `content.js` las reglas, las banderas y las
líneas de ayuda. Si cambias el taller, regenérala con:

```bash
node ../_base/herramientas/guia-pdf.mjs
```

## Deck en PDF

`presentacion.pdf` trae las 39 slides, una por página y con todo revelado
(respuestas de los quiz, banderas, interruptores). Para regenerarlo:

```bash
node ../_base/herramientas/deck-pdf.mjs   # ~1 minuto
```

Toma una captura de cada slide (`index.html?imprimir#id`) y las junta. Imprimir
todo de una vez hace que Chrome sin ventana se caiga.

## Música de la pausa

En la slide de pausa suenan en bucle y con fundido las tres pistas de `audio/`,
de la más tranquila a la más movida: Paper Planes Over Water (acústica), Notes
in Sunlight y Tomorrow in Motion. Duran unos 9 minutos entre las tres. Cuando
falta un minuto la música baja y suenan unos 10 segundos de `campana.mp3`.
Solo se oyen en la ventana del proyector. Si falta un archivo, se salta.

Todo se ajusta en `content.js`, en la slide `pausa`: el orden, el `vol` de cada
pista y el trozo de la campana (`desde` y `dura`, en segundos).

## Motor común

El motor (deck, vista presentador, Lumi, estilos, guion y PDF) vive en
`../_base`, que comparte todas las capacitaciones. Aquí solo va lo propio de este
taller: `content.js`, `guia.js`, `img/` y `audio/`. Ver `../_base/README.md`.
