# Tipos de slide

Referencia de lo que se puede escribir en `SLIDES` (en el `content.js` de un
taller). Sale de `_base/js/deck.js`: si esta página y el motor no coinciden,
manda el motor.

Los ejemplos reales de cada tipo están en
`escudo-digital-fundasol/content.js` y en las sesiones de
`escudo-digital-she-is/`.

## Campos de toda slide

| Campo | Obligatorio | Qué es |
|---|---|---|
| `id` | sí | Único en el taller, sin espacios (`quiz-premio`). Va en la URL y lo usa la guía con `slide("id")` |
| `bloque` | sí | Número de bloque; debe existir en `META.bloques` |
| `tema` | sí | Color de la slide: `violeta` · `amarillo` · `coral` · `rosa` · `turquesa` · `noche` |
| `min` | sí | Minuto del taller en que debe empezar. Con eso la vista presentador dice si vas a tiempo |
| `tipo` | sí | Uno de los de abajo |
| `titulo` | sí | Lo que se lee en grande |
| `nota` | sí | Lista de frases para quien dicta: qué decir y qué hacer. Puede ser `[]` |
| `preguntar` | no | Lista de preguntas para la sala. Salen resaltadas en el guion |
| `respuesta` | no | Lo que se espera que respondan. Solo lo ve quien dicta |
| `lumi` | no | Lumi en la esquina con un globo: `{ pose: "feliz", t: "¡Muy bien!" }` |

Poses de Lumi: `normal` · `hola` · `feliz` · `alerta`.

En cualquier texto, `{escudo}` pinta el escudo de la marca (no uses el emoji 🛡️:
en el proyector se ve gris). Los textos aceptan HTML simple (`<b>`, `<br>`).

**Revelado por pasos.** Muchos tipos muestran una cosa por clic (la respuesta,
cada bandera, cada tarjeta). No se declara nada: el motor cuenta los pasos. La
regla al dictar es *primero se pregunta, después se revela*.

## Para abrir, cerrar y dar un mensaje

### `portada`
Lumi saludando, título grande y los nombres de `META.organiza` y `META.apoya`.

| Campo | |
|---|---|
| `bajada` | Frase bajo el título |

### `mensaje`
Una idea sola, centrada, con un emoji gigante o con Lumi.

| Campo | |
|---|---|
| `emoji` | Emoji grande (si no hay `lumiGrande`) |
| `lumiGrande` | Pose de Lumi en lugar del emoji |
| `bajada` | Opcional |
| `chips` | Opcional. Lista de `{ e, t }` (emoji y texto). Con 3 o más, no uses `lumi`: el globo los tapa |
| `revelar` | `true` para que los chips salgan uno por clic |

### `dato`
Una cifra grande con su fuente. Un clic revela el detalle.

| Campo | |
|---|---|
| `cifra` | `"610.000"` |
| `bajada` | Qué mide la cifra |
| `detalle` | Se revela con el clic |
| `fuente` | Quién lo dijo y cuándo. **Verifica el dato antes de ponerlo** |

### `pausa`
Cuenta regresiva con Lumi. Opcionalmente, música.

| Campo | |
|---|---|
| `minutos` | Duración |
| `bajada` | Qué hacer en la pausa |
| `musica` | Opcional. Lista de `{ src, vol }` (mp3 en `audio/`), suenan en bucle |
| `campana` | Opcional. `{ src, desde, dura }`: suena cuando falta 1 minuto |

### `cierre`
Lumi feliz, el título, las ideas para llevarse y los agradecimientos.

| Campo | |
|---|---|
| `chips` | Lista de `{ e, t }` |

## Para preguntar a la sala

### `encuesta`
«Levanta la mano». Sin respuesta correcta.

| Campo | |
|---|---|
| `opciones` | Lista de `{ e, t }` |

### `pregunta`
Quiz. Se vota con los dedos (☝️ ✌️ 🤟) y un clic revela la correcta.

| Campo | |
|---|---|
| `eyebrow` | Etiqueta pequeña arriba (`"¿Qué harías?"`) |
| `situacion` | Opcional. El caso, en un recuadro |
| `opciones` | Lista de textos. **Máximo 3** y cortos; una URL larga se sale |
| `correcta` | Posición de la correcta, contando desde 0 |
| `explica` | La razón, se revela con la respuesta |

### `mito`
Cartas que se voltean: ¿verdad o mito? Una por clic.

| Campo | |
|---|---|
| `cartas` | Lista de `{ t, es, porque }` con `es: "verdad"` o `"mito"` |

### `semaforo`
Situaciones que se pintan de verde, amarillo o rojo. Una por clic.

| Campo | |
|---|---|
| `items` | Lista de `{ t, color }` con `color`: `verde` · `amarillo` · `rojo` |

### `escenario`
Un caso y tres caminos; cada clic revela qué pasa si lo tomas.

| Campo | |
|---|---|
| `eyebrow`, `situacion` | Como en `pregunta` (aquí `situacion` es obligatoria) |
| `opciones` | Lista de `{ t, pasa, ok }`. `ok: true` marca el mejor camino. Máximo 3 |

## Para explicar

### `tarjetas`
Varias ideas lado a lado.

| Campo | |
|---|---|
| `items` | Lista de `{ e, k, v }`: emoji, título y explicación. Hasta 5 en una fila; 6 van en dos filas de 3 |
| `revelar` | `true` para que salgan una por clic |

### `regla`
Pasos en orden, uno por clic. Para lo que deben recordar.

| Campo | |
|---|---|
| `pasos` | Lista de `{ e, k, v }` |

### `lineas`
Líneas de ayuda. La guía las toma de aquí.

| Campo | |
|---|---|
| `lineas` | Lista de `{ n, k, v }`: número (o un emoji), nombre y detalle |

### `plan`
Hoja para llenar entre todas.

| Campo | |
|---|---|
| `campos` | Lista de `{ e, k, v }` (`v` es opcional) |

## Maquetas: práctica sin dispositivos

### `chat`
Una conversación en un celular. Cada clic marca una bandera roja.

| Campo | |
|---|---|
| `contacto` | `{ e, nombre }` |
| `mensajes` | Lista de `{ t, pista }`: el mensaje y la bandera que delata |
| `bajada` | Opcional (por defecto «Encuentra las 🚩») |

### `perfiles`
Tres perfiles: ¿cuál es falso?

| Campo | |
|---|---|
| `perfiles` | Lista de `{ e, usuario, posts, seguidores, seguidos, bio, comun, falso, pistas }`. `seguidos` es un número; `pistas`, una lista. Máximo 3 |

### `publicacion`
Una foto publicada con pines sobre lo que delata.

| Campo | |
|---|---|
| `usuario`, `lugar`, `texto` | Los datos de la publicación |
| `escena` | Lista de emojis que arman la «foto» |
| `pistas` | Lista de `{ t, x, y }`: la pista y dónde va el pin, en % |

### `app`
Pantalla de configuración con interruptores; cada clic enciende uno.

| Campo | |
|---|---|
| `app` | Nombre de la app |
| `pasos` | Lista de `{ e, k, v }`. Pon en la `nota` la **ruta exacta** del menú. Hasta 6 |

### `sesiones`
Dispositivos conectados: un clic delata al intruso, otro lo saca, y luego las rutas.

| Campo | |
|---|---|
| `app` | Título de la pantalla |
| `dispositivos` | Lista de `{ e, k, v, intruso }` |
| `rutas` | Lista de `{ k, v }`: dónde se hace en cada app |

### `bandeja`
Bandeja de correo; cada clic da el veredicto de un correo.

| Campo | |
|---|---|
| `correos` | Lista de `{ de, asunto, para, veredicto, tono }` con `tono`: `ok` · `mal` · `ojo` · `info` |

### `alias`
Un correo que se arma por partes.

| Campo | |
|---|---|
| `partes` | Lista de `{ t, k }`: el trozo y qué es |
| `bajada` | Aparece con la última parte |

### `contrasena`
Se escribe una contraseña en vivo y el medidor reacciona.

| Campo | |
|---|---|
| `consejos` | Lista de `{ t, regla }` con `regla`: `frase` · `simbolos` · `largo` · `personal`. Se marca sola cuando la contraseña la cumple |

## Si tu contenido no cabe en ningún tipo

Primero reescribe el contenido: casi siempre cabe. Tres talleres seguidos
(68 slides) no pidieron ningún tipo nuevo. Si de verdad no cabe, abre un issue
antes de tocar `deck.js` (ver `CONTRIBUTING.md`).
