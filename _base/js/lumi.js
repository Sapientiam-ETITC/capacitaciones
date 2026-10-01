/* ── Lumi, la búha guardiana ─────────────────────────────────────────────
 * Un solo dibujo con cuatro poses. SVG en línea: no depende de internet.
 */
globalThis.lumi = function lumi(pose = "normal") {
  const feliz = pose === "feliz";
  const alerta = pose === "alerta";
  const ojo = (cx) => feliz
    ? `<path d="M${cx - 16} 100 Q${cx} 82 ${cx + 16} 100" fill="none" stroke="#2B1B5A" stroke-width="7" stroke-linecap="round"/>`
    : `<circle cx="${cx}" cy="96" r="24" fill="#fff"/>
       <circle cx="${cx + (cx < 100 ? 4 : -4)}" cy="${alerta ? 94 : 99}" r="${alerta ? 10 : 13}" fill="#2B1B5A"/>
       <circle cx="${cx + (cx < 100 ? 8 : 0)}" cy="${alerta ? 90 : 94}" r="4" fill="#fff"/>`;
  return `<svg class="lumi lumi-${pose}" viewBox="0 0 200 230" aria-hidden="true">
    <ellipse cx="100" cy="222" rx="60" ry="7" fill="#000" opacity=".08"/>
    <path d="M46 70 L36 20 L82 50 Z" fill="#6A3FD9"/>
    <path d="M154 70 L164 20 L118 50 Z" fill="#6A3FD9"/>
    <g class="ala ala-izq"><ellipse cx="34" cy="138" rx="19" ry="44" fill="#6A3FD9"/></g>
    <g class="ala ala-der" ${pose === "hola" ? 'transform="rotate(-55 166 100)"' : ""}><ellipse cx="166" cy="138" rx="19" ry="44" fill="#6A3FD9"/></g>
    <ellipse cx="100" cy="126" rx="72" ry="86" fill="#7C4DFF"/>
    <ellipse cx="100" cy="158" rx="48" ry="50" fill="#E9DDFF"/>
    <path d="M78 150 q6 6 12 0 M110 150 q6 6 12 0 M94 170 q6 6 12 0 M78 188 q6 6 12 0 M110 188 q6 6 12 0" fill="none" stroke="#C7B3FF" stroke-width="3" stroke-linecap="round"/>
    <circle cx="70" cy="96" r="31" fill="#9B7BFF"/>
    <circle cx="130" cy="96" r="31" fill="#9B7BFF"/>
    ${feliz ? `${ojo(70)}${ojo(130)}`
      // Parpadea (CSS .ojos); el desfase al azar evita que dos Lumis parpadeen a la vez
      : `<g class="ojos" style="animation-delay:-${(Math.random() * 5).toFixed(1)}s">${ojo(70)}${ojo(130)}</g>`}
    ${alerta ? `<path d="M46 62 L88 72 M154 62 L112 72" stroke="#2B1B5A" stroke-width="6" stroke-linecap="round"/>` : ""}
    <ellipse cx="50" cy="128" rx="11" ry="7" fill="#FF7EB6" opacity=".55"/>
    <ellipse cx="150" cy="128" rx="11" ry="7" fill="#FF7EB6" opacity=".55"/>
    <path d="M90 116 L110 116 L100 132 Z" fill="#FFA928"/>
    <path d="M100 196 l14 -6 v12 q0 10 -14 16 q-14 -6 -14 -16 v-12 z" fill="#FFC93C" stroke="#F5A300" stroke-width="2"/>
    <ellipse cx="80" cy="212" rx="14" ry="7" fill="#FFA928"/>
    <ellipse cx="120" cy="212" rx="14" ry="7" fill="#FFA928"/>
  </svg>`;
}
