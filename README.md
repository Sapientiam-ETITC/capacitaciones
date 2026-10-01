# Capacitaciones · Semillero Sapientiam

Talleres del Semillero Sapientiam (ETITC) para capacitar a otros grupos. Cada
taller es una presentación que corre en el navegador, con vista presentador,
guion y una guía en PDF para llevar a casa.

En la web del repo (GitHub Pages) está el catálogo: desde ahí se abre cada
presentación y se descargan la presentación y la guía en PDF.

## Dictar un taller

1. Entra al catálogo y abre la presentación (o clona el repo y abre el
   `index.html` del taller con doble clic: funciona sin internet).
2. `P` abre la vista presentador en otra ventana, `F` pone pantalla completa.
3. Lee antes el guion (`guion.md` en la carpeta del taller).

Las instrucciones completas para dos pantallas están en
[`escudo-digital-fundasol/README.md`](escudo-digital-fundasol/README.md).

## Crear un taller

Necesitas [Node](https://nodejs.org) 24 o más, [pnpm](https://pnpm.io) y
Google Chrome. No hay nada que instalar con `pnpm install`.

```bash
pnpm nuevo mi-taller      # copia la plantilla: ya es un taller que funciona
# … escribe mi-taller/content.js …
pnpm pdf mi-taller        # guion.md, presentacion.pdf, guia.pdf y catálogo
pnpm verificar            # revisa que esté completo
```

Lo único que se escribe es `content.js`. El paso a paso, las reglas y cómo
mandar tu taller están en [`CONTRIBUTING.md`](CONTRIBUTING.md); los tipos de
slide, en [`_base/TIPOS.md`](_base/TIPOS.md).

## Qué hay en el repo

```
index.html            el catálogo (la web)
talleres.js           la lista del catálogo, generada: no se edita
_base/                el motor: deck, vista presentador, Lumi, estilos, herramientas
_plantilla/           el taller de partida que copia `pnpm nuevo`
escudo-digital-*/     los talleres
```

| Taller | Para | Duración |
|---|---|---|
| [`escudo-digital-fundasol`](escudo-digital-fundasol/) | Fundasol 126 | 135 min |
| [`escudo-digital-she-is/sesion-1`](escudo-digital-she-is/sesion-1/) | She Is Foundation | 60 min |
| [`escudo-digital-she-is/sesion-2-phishing`](escudo-digital-she-is/sesion-2-phishing/) | She Is Foundation | 60 min |
| [`escudo-digital-she-is/sesion-3-escudo`](escudo-digital-she-is/sesion-3-escudo/) | She Is Foundation | 60 min |

Los cambios de cada versión están en [`CHANGELOG.md`](CHANGELOG.md).
