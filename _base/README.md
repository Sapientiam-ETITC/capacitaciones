# _base — motor común de las capacitaciones

Aquí vive todo lo que NO es contenido: el deck, la vista presentador, Lumi,
los estilos, el guion y los PDF. Cada taller solo trae su contenido. Si
arreglas algo aquí, se arregla en todos los talleres.

```
_base/
├── js/
│   ├── shell.js       barra, vista presentador, HUD y escudo (el HTML del deck)
│   ├── deck.js        motor: tipos de slide, revelado por pasos, presentador, pausa con música
│   ├── lumi.js        la búha (SVG, 4 poses, parpadea)
│   ├── escudo.js      solo el escudo de marca, para la guía
│   └── guia-base.js   piezas de la guía PDF (páginas, cajas, checklist, líneas, logos)
├── css/deck.css, css/guia.css
├── img/               logos que van en todo: sapientiam.png, etitc.png
└── herramientas/      guion.mjs · deck-pdf.mjs · guia-pdf.mjs
```

## Un taller nuevo

Una carpeta con:

| Archivo | Qué es |
|---|---|
| `index.html` | 10 líneas: carga `content.js` y luego `shell.js`, `lumi.js` y `deck.js` de `_base` |
| `content.js` | **Lo único que se escribe de verdad.** `META` (título, organiza, presupuesto, bloques, contacto, logos, contexto, materiales) + `SLIDES` |
| `guia.html` + `guia.js` | Guía para llevar a casa (opcional). `guia.js` arma las páginas con `GUIA` |
| `img/`, `audio/` | Lo propio del taller |

La forma más rápida de empezar es `pnpm nuevo <carpeta>`: copia `../_plantilla`
y ajusta la ruta a `_base` (`../_base` o `../../_base`, según la profundidad).

## Comandos (desde la raíz del repo)

```bash
pnpm nuevo <carpeta>     # taller nuevo a partir de _plantilla
pnpm pdf <carpeta>       # guion.md + presentacion.pdf + guia.pdf + catálogo
pnpm catalogo            # talleres.js, la lista que muestra la web
pnpm verificar           # revisa que cada taller esté completo
```

`pnpm pdf` corre estas tres, que también sirven sueltas desde la carpeta del
taller:

```bash
node <ruta>/_base/herramientas/guion.mjs      # content.js → guion.md
node <ruta>/_base/herramientas/deck-pdf.mjs   # → presentacion.pdf (~1 min)
node <ruta>/_base/herramientas/guia-pdf.mjs   # guia.html → guia.pdf
```

## Tipos de slide

Los campos de cada tipo están en [`TIPOS.md`](TIPOS.md).

`portada` · `mensaje` · `encuesta` · `tarjetas` · `pregunta` · `mito` · `chat` ·
`semaforo` · `regla` · `pausa` · `perfiles` · `escenario` · `app` ·
`contrasena` · `lineas` · `cierre` · `publicacion` · `dato` · `alias` ·
`bandeja` · `plan` · `sesiones`

Los ejemplos de cada tipo están en `../escudo-digital-fundasol/content.js`. La
regla: si un contenido no entra en un tipo, primero se reescribe el contenido;
solo si de verdad no cabe, se agrega un tipo aquí.

## Es el MVP

Esto es el piloto. Si sale bien con She Is y Fundasol, se estructura mejor, y
es la base de Lila (ver engram, hilo #864).
