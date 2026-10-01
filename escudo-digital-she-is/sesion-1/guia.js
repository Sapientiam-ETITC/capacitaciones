/* Guía para llevar a casa — Tu identidad es única · She Is · sesión 1.
 *
 * Lo que ya existe en content.js se toma de ahí (semáforo de datos, mitos,
 * perfiles, reglas, preguntas, reflexión, líneas): si cambia el taller, cambia
 * la guía. Lo que se hace en casa con el adulto va aquí.
 */

const { META, lumi } = globalThis;
const { li, slide, caja, pagina, check, lineasAyuda, contacto, logos, montar } = globalThis.GUIA;

const lista = (pasos) => `<ul class="lista-regla">${li(pasos, (p) => `<li><i class="emo">${p.e}</i><b>${p.k}</b> ${p.v}</li>`)}</ul>`;
const LUZ = { verde: "🟢", amarillo: "🟡", rojo: "🔴" };

/* ── 1 · Portada ─────────────────────────────────────────────────────── */
const portada = () => `
  <article class="pag portada" data-tema="violeta">
    <p class="kicker">She Is Foundation · Semillero Sapientiam · ETITC</p>
    <div class="portada-lumi">${lumi("hola")}</div>
    <h1>🪞 ${META.titulo}</h1>
    <p class="subt">Protégela</p>
    <p class="intro">¡Hola! Soy Lumi. Aquí está lo que aprendimos sobre <b>tu identidad digital</b>:
      repásalo y haz la lista «Con mi adulto» <b>con tu adulto de confianza</b>.</p>
    <ol class="indice">
      <li><i class="emo">🌐</i><span><b>Tu identidad digital</b>: qué datos cuidar y por qué internet no olvida</span></li>
      <li><i class="emo">🎭</i><span><b>Identidades falsas</b>: cómo reconocer un perfil falso</span></li>
      <li><i class="emo">🤔</i><span><b>Piensa antes de compartir</b>: las cuatro preguntas</span></li>
      <li><i class="emo">🤝</i><span><b>Con mi adulto</b>: revisemos mi identidad digital</span></li>
      <li><i class="emo">💜</i><span><b>Para la familia</b>: cómo acompañar y a dónde llamar</span></li>
    </ol>
  </article>`;

/* ── 2 · Tu identidad digital ────────────────────────────────────────── */
const identidad = () => {
  const datos = slide("seguro-peligroso");
  return pagina("coral", "Tu identidad digital", "Todo lo que internet dice de ti", `
    ${caja("", "🚦 ¿Seguro o peligroso?", `
      <ul class="lista-regla">${li(datos.items, (it) => `<li><i class="emo">${LUZ[it.color]}</i>${it.t}</li>`)}</ul>`)}
    ${caja("alerta", "👣 Internet nunca olvida", `
      <ul class="lista-regla">${li(slide("mitos-huella").cartas, (c) =>
        `<li><i class="emo">${c.es === "verdad" ? "✅" : "❌"}</i><b>${c.t}.</b> ${c.porque}.</li>`)}</ul>`)}
  `, "alerta");
};

/* ── 3 · Identidades falsas ──────────────────────────────────────────── */
const falsas = () => {
  const falsos = slide("perfiles").perfiles.filter((p) => p.falso);
  const senales = [...new Set(falsos.flatMap((p) => p.pistas))];
  return pagina("turquesa", "Identidades falsas", "En internet, cualquiera puede fingir ser otra persona", `
    ${caja("", "🚩 Señales de un perfil falso", `
      <div class="banderas">${li(senales, (s) => `<span>🚩 ${s}</span>`)}</div>
      <p class="nota">Una señal sola no lo prueba, pero dos o tres juntas ya son para desconfiar.</p>`)}
    ${caja("alerta", "{escudo} Antes de confiar", lista(slide("antes-de-confiar").pasos))}
  `);
};

/* ── 4 · Piensa antes de compartir ───────────────────────────────────── */
const piensa = () => pagina("amarillo", "Piensa antes de compartir", "Si dudas en una, no lo publiques todavía", `
    ${caja("", "🤔 Las cuatro preguntas", lista(slide("piensa").pasos))}
    ${caja("", "🌟 Una huella de la que te sientas orgullosa", lista(slide("huella-buena").items))}
    ${caja("plan", "💜 Para recordar", `<ul class="lista-regla">${li(slide("reflexion").items, (t) =>
      `<li><i class="emo">${t.e}</i><b>${t.k}:</b> ${t.v}</li>`)}</ul>`)}
  `, "feliz");

/* ── 5 · Con mi adulto ───────────────────────────────────────────────── */
const REVISAR = [
  ["Busquemos mi nombre en Google", "¿qué aparece? ¿hay algo que queramos pedir que borren?"],
  ["Mi bio no dice mi colegio, mi barrio ni mi celular", "usa gustos y un apodo en su lugar"],
  ["Mi cuenta de TikTok o Instagram es privada", "Configuración y privacidad → Privacidad de la cuenta → Cuenta privada"],
  ["En WhatsApp, mi foto la ven solo mis contactos", "Ajustes → Privacidad → Foto del perfil → Mis contactos"],
  ["Revisemos quién me sigue", "si no la conozco en persona, la quito"],
  ["En mis juegos uso un apodo, no mi nombre real", ""],
];
const conMiAdulto = () => pagina("rosa", "Con mi adulto", "Háganlo juntos. Si un menú cambió, búsquenlo en Configuración", `
    ${caja("config", "🪞 Revisemos mi identidad digital", `<ul class="checks">${li(REVISAR, ([t, v]) => check(t, v))}</ul>`)}
    ${caja("plan", "🤝 Nuestro acuerdo", `
      <ul class="checks">
        ${check("Si alguien que no conozco me pide fotos o datos, te cuento", "sin miedo a que me regañen")}
        ${check("Antes de subir una foto de otra persona, le pido permiso")}
      </ul>`)}
  `, "hola");

/* ── 6 · Para la familia ─────────────────────────────────────────────── */
const familia = () => pagina("noche", "Para la familia", "Lo que vieron sus hijas y cómo acompañarlas", `
    ${caja("", "Qué aprendieron en el taller", `
      <p>Que su <b>identidad digital</b> es todo lo que internet dice de ellas, que lo publicado puede quedarse para siempre y que un perfil puede <b>fingir</b> ser otra persona.</p>`)}
    ${caja("", "Cómo acompañar", `
      <ul class="consejos">
        <li><b>Hagan juntos la lista «Con mi adulto»</b> de esta guía. Es una revisión, no un castigo.</li>
        <li><b>Den ejemplo:</b> pregúntenles antes de publicar fotos de ellas. Su imagen también es suya.</li>
        <li><b>Si les cuenta algo, agradézcanlo.</b> Si contar le cuesta un regaño, la próxima vez no cuenta.</li>
        <li><b>Nadie serio busca «modelos» niñas por mensaje directo.</b> Si pasa, guarden capturas y consulten las líneas de abajo.</li>
      </ul>`)}
    ${caja("ayuda", "📞 Siempre hay ayuda", lineasAyuda(slide("lineas").lineas))}
    ${contacto()}
    ${logos()}
  `);

montar([portada(), identidad(), falsas(), piensa(), conMiAdulto(), familia()]);
