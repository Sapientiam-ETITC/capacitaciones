/* Esqueleto del deck: todo el HTML que no es contenido.
 *
 * Cada taller tiene un index.html mínimo que carga, en este orden:
 *   su content.js → _base/js/shell.js → _base/js/lumi.js → _base/js/deck.js
 * shell.js pone en la página el ícono, las fuentes, el escudo de marca, la
 * barra, la vista presentador y el HUD, así el motor vive en un solo sitio.
 */
{
  const { META } = globalThis;

  // Fuentes sin bloquear: con wifi lento o sin internet, el taller arranca
  // igual con fuentes del sistema (un <link> insertado por JS no bloquea).
  document.head.insertAdjacentHTML("beforeend", `
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 56'><path d='M24 2.5c4.4 2.6 10.3 4.8 16.3 5.6 1.9.3 3.2 1.9 3.2 3.8v15.6c0 12.2-8.2 21.9-18.8 27-.4.2-1 .2-1.4 0C12.7 49.4 4.5 39.7 4.5 27.5V11.9c0-1.9 1.3-3.5 3.2-3.8C13.7 7.3 19.6 5.1 24 2.5z' fill='%236A3FD9'/><path d='M24 7.6c4 2.2 9 4 14.3 4.8v14.9c0 9.7-6.4 17.8-14.3 22.2C16.1 45.1 9.7 37 9.7 27.3V12.4C15 11.6 20 9.8 24 7.6z' fill='%237C4DFF'/><g transform='translate(12.6 15.9) scale(.95)'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23fff'/></g></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">`);

  // Escudo de marca: SVG propio en el estilo plano de Lumi. El emoji 🛡️ de
  // Apple se ve gris y apagado en proyector, y este hereda el tamaño del texto.
  document.body.insertAdjacentHTML("afterbegin", `
<svg class="sprite" aria-hidden="true" width="0" height="0" focusable="false"><symbol id="ico-escudo" viewBox="0 0 48 56">
  <path d="M24 2.5c4.4 2.6 10.3 4.8 16.3 5.6 1.9.3 3.2 1.9 3.2 3.8v15.6c0 12.2-8.2 21.9-18.8 27-.4.2-1 .2-1.4 0C12.7 49.4 4.5 39.7 4.5 27.5V11.9c0-1.9 1.3-3.5 3.2-3.8C13.7 7.3 19.6 5.1 24 2.5z" fill="#6A3FD9"/>
  <path d="M24 7.6c4 2.2 9 4 14.3 4.8v14.9c0 9.7-6.4 17.8-14.3 22.2C16.1 45.1 9.7 37 9.7 27.3V12.4C15 11.6 20 9.8 24 7.6z" fill="#7C4DFF"/>
  <path d="M13.9 16.4c0-1 .7-1.8 1.7-2 2.5-.4 4.9-1.2 7-2.1" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".38"/>
  <g transform="translate(12.6 15.9) scale(.95)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#fff"/></g>
</symbol></svg>

<!-- ── Vista de las niñas (proyector) ─────────────────────────────── -->
<header class="topbar">
  <div class="topbar-brand"><svg class="escudo" aria-hidden="true"><use href="#ico-escudo"/></svg> <span>${META.titulo} · ${META.organiza}</span></div>
  <div class="topbar-sep"></div>
  <button class="btn" id="btn-notas" aria-pressed="false" title="Guion al lado de la slide (N)">📝 Guion</button>
  <button class="btn btn-destacado" id="btn-pres" title="Abrir vista presentador en otra ventana (P)">🖥️ Presentador</button>
  <button class="btn" id="btn-full" aria-pressed="false" title="Pantalla completa (F)">⛶ Pantalla completa</button>
</header>

<main class="escenario" id="escenario"><!-- slides inyectadas por app.js --></main>

<aside class="notas" id="notas" aria-label="Guion"></aside>

<div class="hud">
  <button id="ant" aria-label="Anterior">‹</button>
  <span class="contador" id="contador"></span>
  <button id="sig" aria-label="Siguiente">›</button>
</div>

<div class="barra"><span id="progreso"></span></div>

<!-- ── Vista presentador (index.html?presentador) ─────────────────── -->
<div class="pv" id="pv" hidden>
  <header class="pv-cab">
    <b class="pv-marca"><svg class="escudo" aria-hidden="true"><use href="#ico-escudo"/></svg> Presentador</b>
    <span class="pv-bloque" id="pv-bloque"></span>
    <span class="pv-link" id="pv-link"></span>
    <span class="pv-sep"></span>
    <span class="pv-reloj" id="pv-reloj">--:--</span>
    <div class="pv-crono">
      <span id="pv-crono">00:00</span>
      <span class="pv-ritmo" id="pv-ritmo"></span>
      <button id="pv-play" title="Pausar / reanudar cronómetro">▶</button>
      <button id="pv-reset" title="Reiniciar cronómetro">↺</button>
    </div>
  </header>

  <section class="pv-actual">
    <div class="pv-marco" id="pv-actual"></div>
    <p class="pv-paso" id="pv-paso"></p>
  </section>

  <aside class="pv-lado">
    <p class="pv-lbl">Siguiente</p>
    <div class="pv-marco pv-mini" id="pv-prox"></div>
    <div class="pv-guion" id="pv-guion"></div>
  </aside>

  <footer class="pv-pie">
    <button id="pv-ant">‹ Anterior</button>
    <span class="pv-cont" id="pv-cont"></span>
    <button id="pv-sig" class="pv-sig">Siguiente / Revelar ›</button>
  </footer>
</div>`);
}
