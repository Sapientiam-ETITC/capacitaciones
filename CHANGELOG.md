# Changelog

Los cambios de cada versión, en palabras de quien usa el repo. El formato sigue
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Cómo anotar un
cambio: ver [`CONTRIBUTING.md`](CONTRIBUTING.md#changelog-y-versiones).

## Sin publicar

## 0.2.0 — 2026-10-01

El repo se abre al semillero: web con catálogo y herramientas para crear
talleres nuevos. Los talleres existentes no cambiaron.

### Web
- Catálogo en la raíz (`index.html`) con todos los talleres: abrir la
  presentación, descargar la presentación en PDF y descargar la guía en PDF.
- Publicación automática en GitHub Pages al llegar un cambio a `main`.

### Motor
- `pnpm nuevo <carpeta>`: crea un taller a partir de `_plantilla` y ajusta las
  rutas al motor.
- `pnpm pdf <carpeta>`: genera guion, presentación y guía de una vez.
- `pnpm catalogo`: genera `talleres.js`, la lista que muestra la web.
- `pnpm verificar`: revisa que cada taller esté completo. Corre en cada pull
  request.
- `_plantilla/`: taller de partida con 7 slides y una guía de 3 páginas.
- `_base/TIPOS.md`: referencia de los 22 tipos de slide.

### Documentación
- `README.md`, `CONTRIBUTING.md`, `AGENTS.md` y este changelog.

## 0.1.0 — 2026-09-19

Lo que existía antes de abrir el repo.

### Talleres
- Escudo Digital · Fundasol 126: 39 slides, 135 minutos, guía de 8 páginas.
- Escudo Digital · She Is Foundation, serie de 3 sesiones de 60 minutos:
  «Tu identidad es única» (20 slides), «Phishing» (23) y «Escudo Digital» (25),
  cada una con su guía.

### Motor
- Motor común en `_base`, separado del contenido de cada taller.
- 22 tipos de slide con revelado por pasos.
- Vista presentador en segunda ventana: slide actual y siguiente, guion, reloj,
  cronómetro y ritmo.
- Guion generado desde `content.js`, con escaleta, materiales y protocolo.
- Presentación en PDF con todo revelado y guía en PDF para leer en el celular.
- Lumi, la búha, y seis temas de color.
- Pausa con cuenta regresiva, música y campana.
