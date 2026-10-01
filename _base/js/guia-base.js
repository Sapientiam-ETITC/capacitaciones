/* Piezas comunes de las guías para llevar a casa (PDF para el celular).
 *
 * Cada taller tiene su guia.js con el texto, y arma sus páginas con estas
 * piezas. Se cargan en este orden: escudo.js → content.js → lumi.js →
 * guia-base.js → guia.js del taller. PDF: node ../_base/herramientas/guia-pdf.mjs
 */
{
  const { META, SLIDES, lumi } = globalThis;
  const ESCUDO = '<svg class="escudo" aria-hidden="true"><use href="#ico-escudo"/></svg>';
  const li = (xs, f) => xs.map(f).join("");

  // Toma datos de una slide del taller: si cambia el deck, cambia la guía
  const slide = (id) => {
    const s = SLIDES.find((x) => x.id === id);
    if (!s) throw new Error(`La guía usa la slide «${id}», que no existe en content.js`);
    return s;
  };

  const caja = (clase, titulo, cuerpo) =>
    `<section class="caja ${clase}"><h3>${titulo}</h3>${cuerpo}</section>`;

  const pagina = (tema, titulo, bajada, cuerpo, pose) => `
    <article class="pag" data-tema="${tema}">
      <header class="cab">
        <div class="cab-txt"><p class="kicker">${ESCUDO} ${META.titulo}</p><h2>${titulo}</h2>${bajada ? `<p class="bajada">${bajada}</p>` : ""}</div>
        ${pose ? `<div class="cab-lumi">${lumi(pose)}</div>` : ""}
      </header>
      ${cuerpo}
    </article>`;

  const check = (t, v) => `<li><span class="box"></span><div><b>${t}</b>${v ? `<small>${v}</small>` : ""}</div></li>`;

  // Líneas de ayuda de la slide `lineas`: los números se pueden tocar para llamar
  const WEB = { "teprotejo.org": "https://www.teprotejo.org", "CAI Virtual": "https://caivirtual.policia.gov.co" };
  const lineasAyuda = (lineas) => `<div class="lineas">${li(lineas, (l) => {
    const href = /^\d+$/.test(l.n) ? `tel:${l.n}` : WEB[l.k];
    const n = /\d/.test(l.n) ? `<b class="num">${l.n}</b>` : `<i class="emo">${l.n}</i>`;
    return `<a ${href ? `href="${href}"` : ""}>${n}<span><b>${l.k}</b>${l.v}</span></a>`;
  })}</div>`;

  // Contacto de la organización (META.contacto) y fila de logos (META.logos)
  const contacto = () => {
    const c = META.contacto;
    if (!c) return "";
    const wa = c.whatsapp ? `<a href="https://wa.me/${c.whatsapp.replace(/\D/g, "")}"><i class="emo">💬</i> ${c.whatsapp}</a>` : "";
    const mail = c.correo ? `<a href="mailto:${c.correo}"><i class="emo">✉️</i> ${c.correo}</a>` : "";
    return `<p class="contacto"><b>${c.nombre}</b>${wa}${mail}</p>`;
  };
  const logos = () => `<footer class="logos">${li(META.logos ?? [], (l) =>
    l.oscuro
      ? `<span class="logo-oscuro"><img src="${l.src}" alt=""><b>${l.nombre}</b></span>`
      : `<img src="${l.src}" alt="${l.nombre}" style="height:${l.alto ?? 11}mm">`)}</footer>`;

  const montar = (paginas) => {
    document.getElementById("guia").innerHTML = paginas.join("").split("{escudo}").join(ESCUDO);
  };

  globalThis.GUIA = { ESCUDO, li, slide, caja, pagina, check, lineasAyuda, contacto, logos, montar };
}
