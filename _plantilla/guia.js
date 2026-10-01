/* Guía para llevar a casa — el resumen del taller, para leer en el celular.
 *
 * Lo que ya existe en content.js se toma de ahí con slide("id"): si cambia el
 * taller, cambia la guía. Aquí solo se escribe lo que es propio de la guía.
 * Cada página mide 100 × 178 mm: lo que no cabe se corta sin avisar, así que
 * hay que mirar el PDF página por página.
 *
 * Una guía más completa (listas para marcar, configuración por app):
 * escudo-digital-she-is/sesion-3-escudo/guia.js
 */

const { META, lumi } = globalThis;
const { ESCUDO, li, slide, caja, pagina, check, lineasAyuda, contacto, logos, montar } = globalThis.GUIA;

const portada = () => `
  <article class="pag portada" data-tema="violeta">
    <p class="kicker">${META.organiza} · Semillero Sapientiam · ETITC</p>
    <div class="portada-lumi">${lumi("hola")}</div>
    <h1>${ESCUDO} ${META.titulo}</h1>
    <p class="subt">Guía para llevar a casa</p>
    <p class="intro">¡Hola! Soy Lumi. Aquí está lo que aprendimos en el taller, para que lo repases
      <b>con tu adulto de confianza</b>.</p>
  </article>`;

const resumen = () => {
  const regla = slide("regla");
  return pagina("amarillo", "Lo que aprendimos", "Para repasar en casa", `
    ${caja("", "🚩 Señales de alerta", `
      <ul class="lista-regla">${li(slide("senales").items, (t) => `<li><i class="emo">${t.e}</i><b>${t.k}</b> ${t.v}</li>`)}</ul>`)}
    ${caja("alerta", regla.titulo, `
      <ul class="lista-regla">${li(regla.pasos, (p) => `<li><i class="emo">${p.e}</i><b>${p.k}</b> ${p.v}</li>`)}</ul>`)}
    ${caja("plan", `${ESCUDO} Mi compromiso`, `
      <ul class="checks">
        ${check("Mi adulto de confianza es: ____________________")}
        ${check("Le conté lo que aprendí hoy")}
      </ul>`)}
  `, "feliz");
};

const familia = () => pagina("noche", "Para la familia", "Lo que vimos y a dónde llamar", `
    ${caja("", "Cómo acompañar", `
      <ul class="consejos">
        <li><b>Escuchen sin castigar.</b> Si contar algo le cuesta el celular, la próxima vez no va a contar.</li>
        <li><b>Nunca es su culpa.</b> Guarden pruebas y pidan ayuda.</li>
      </ul>`)}
    ${caja("ayuda", "📞 Siempre hay ayuda", lineasAyuda(slide("lineas").lineas))}
    ${contacto()}
    ${logos()}
  `);

montar([portada(), resumen(), familia()]);
