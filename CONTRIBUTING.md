# Cómo contribuir

Esta guía es para integrantes del semillero que van a crear un taller. No hace
falta saber programar: un taller es un archivo de texto con una estructura fija.

## Antes de empezar

- [Node](https://nodejs.org) 24 o más, [pnpm](https://pnpm.io) y Google Chrome.
- Clona el repo. No hay que correr `pnpm install`: no hay dependencias.

## Crear un taller, paso a paso

### 1. Crea la carpeta

```bash
git switch -c taller/mi-taller
pnpm nuevo mi-taller
```

El nombre va en minúsculas y con guiones. Si es una serie de varias sesiones:
`pnpm nuevo mi-serie/sesion-1`.

Abre `mi-taller/index.html` con doble clic. Ya funciona: es la plantilla, con 7
slides de ejemplo.

### 2. Escribe `content.js`

Es lo único que se escribe de verdad. Tiene dos partes:

- **`META`**: título, organización, duración (`presupuesto`), bloques, contacto
  y logos.
- **`SLIDES`**: la lista de slides. Cada una tiene un `tipo`, lo que se ve en
  pantalla y la `nota` con lo que dice quien dicta.

Los tipos y sus campos están en [`_base/TIPOS.md`](_base/TIPOS.md). Para ver
uno en uso, búscalo en `escudo-digital-fundasol/content.js`.

Guarda y recarga el navegador para ver el cambio. Si la página queda en
blanco, hay un error de escritura en `content.js` (una coma o una comilla): la
consola del navegador (F12) dice la línea.

El logo de la organización va en `mi-taller/img/` como PNG, y se declara
primero en `META.logos`.

### 3. La guía para llevar a casa (opcional)

`guia.js` arma un PDF angosto, para leer en el celular. Toma del taller lo que
ya existe con `slide("id")`. Si tu taller no lleva guía, borra `guia.html` y
`guia.js`.

### 4. Genera las salidas

```bash
pnpm pdf mi-taller
```

Deja en la carpeta `guion.md`, `presentacion.pdf` y `guia.pdf`, y suma el
taller al catálogo (`talleres.js`). Ninguno de esos cuatro se edita a mano:
se cambia `content.js` y se vuelve a correr.

### 5. Revisa

```bash
pnpm verificar
```

Eso revisa que no falte nada. Lo que **no** puede revisar es cómo se ve, y ahí
es donde aparecen los problemas. Antes de mandar tu taller:

- Pasa `presentacion.pdf` página por página: ¿algún texto se sale, se corta o
  queda tapado por Lumi?
- Pasa `guia.pdf` igual. Lo que no cabe en una página se corta sin avisar.
- Dicta el taller una vez con la vista presentador (`P`) y un cronómetro.
- Verifica cada cifra, cada línea de ayuda y cada ruta de menú. Las apps
  cambian sus menús.

### 6. Mándalo

```bash
git add mi-taller talleres.js
git commit -m "Taller: Mi taller"
git push -u origin taller/mi-taller
```

Abre un pull request. Cuando se apruebe y entre a `main`, la web se actualiza
sola.

## Con ayuda de una IA

El repo está preparado para que un asistente (Claude Code u otro) arme el
primer borrador. Ábrelo en la carpeta del repo y dile para quién es el taller,
cuánto dura y qué deben saber al salir; si tienes material previo (un PDF, un
Canva), pásaselo. Las reglas que el asistente debe seguir están en
[`AGENTS.md`](AGENTS.md).

El borrador es eso, un borrador: los pasos 5 y 6 son tuyos.

## Reglas

1. **Los talleres que ya existen no se tocan** salvo que quien los dictó lo
   pida. Si quieres adaptar uno para otro grupo, cópialo a una carpeta nueva.
2. **Una sola fuente.** El contenido vive en `content.js`. `guion.md`, los PDF
   y `talleres.js` se generan.
3. **Si no cabe en un tipo, reescribe el contenido.** El vocabulario de tipos
   es cerrado a propósito.
4. **Primero se pregunta, después se revela.** Los talleres son para
   participar, no para leer slides.
5. **Ningún dato sin fuente.** Las cifras van en un `dato` con su `fuente`, o
   en la `nota` con el enlace.
6. **Nada de datos personales** de participantes: ni nombres, ni fotos, ni
   capturas reales. Los casos se cuentan con personajes inventados.
7. **Solo material que podamos publicar.** El repo es público: imágenes,
   música y logos deben ser propios o tener permiso. El material de origen
   (decks viejos, logos sin procesar) va en una carpeta `fuente/` u
   `originales/`, que git ignora.

## Cambios en el motor (`_base`)

Un cambio en `_base` le llega a todos los talleres, así que va en su propio
pull request, separado del contenido:

1. Abre un issue contando qué no pudiste hacer con lo que hay.
2. Si se aprueba: haz el cambio, corre `pnpm pdf` en un taller de cada serie y
   compara las slides afectadas con las de antes.
3. Documenta el tipo o campo nuevo en `_base/TIPOS.md` y anota el cambio en
   `CHANGELOG.md`.

Algunas cosas que no son obvias del motor (está hecho para abrir con doble
clic, sin servidor):

- No se pueden usar módulos (`import`/`export`) ni `fetch` en lo que carga el
  navegador: en `file://` fallan en silencio. Por eso `content.js` usa
  `globalThis.META = …`.
- Las rutas de `META.logos` son relativas a la página del taller, no a
  `content.js`.
- Los PDF se generan en un Mac o PC con Chrome, no en el servidor: así los
  emojis y las fuentes salen iguales a lo que se proyecta.

## Changelog y versiones

Todo cambio que llegue a `main` se anota en [`CHANGELOG.md`](CHANGELOG.md), en
la sección «Sin publicar», en una línea y en palabras de quien usa el repo:

- **Talleres**: un taller nuevo o un cambio de contenido en uno existente.
- **Motor**: tipos, vista presentador, guía, herramientas.
- **Web**: el catálogo.

La versión está en `package.json`. Sube el segundo número cuando entra un
taller o una función nueva (0.2.0 → 0.3.0) y el tercero cuando solo hay
correcciones (0.2.0 → 0.2.1).
