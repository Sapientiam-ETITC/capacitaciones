/* Guía para llevar a casa — Phishing · She Is · sesión 2.
 *
 * Lo que ya existe en content.js se toma de ahí (disfraces, caso, regla del
 * código, anatomía, enlaces, protocolo, anzuelos, líneas): si cambia el
 * taller, cambia la guía. Las rutas de menús van aquí, para hacerlas en casa.
 */

const { META, lumi } = globalThis;
const { ESCUDO, li, slide, caja, pagina, check, lineasAyuda, contacto, logos, montar } = globalThis.GUIA;

const lista = (pasos) => `<ul class="lista-regla">${li(pasos, (p) => `<li><i class="emo">${p.e}</i><b>${p.k}</b> ${p.v}</li>`)}</ul>`;

/* ── 1 · Portada ─────────────────────────────────────────────────────── */
const portada = () => `
  <article class="pag portada" data-tema="turquesa">
    <p class="kicker">She Is Foundation · Semillero Sapientiam · ETITC</p>
    <div class="portada-lumi">${lumi("hola")}</div>
    <h1>🎣 ${META.titulo}</h1>
    <p class="subt">El anzuelo en tu celular</p>
    <p class="intro">¡Hola! Soy Lumi. Aquí está lo que aprendimos para <b>no morder el anzuelo</b>:
      repásalo y configura tu celular <b>con tu adulto de confianza</b>.</p>
    <ol class="indice">
      <li><i class="emo">🦉</i><span><b>Detecta el anzuelo</b>: los disfraces, las banderas y los enlaces</span></li>
      <li><i class="emo">🆘</i><span><b>Qué hago</b>: si algo huele a trampa y si ya caí</span></li>
      <li><i class="emo">🤝</i><span><b>Con mi adulto</b>: activar los 2 pasos</span></li>
      <li><i class="emo">💜</i><span><b>Para la familia</b>: cómo acompañar y a dónde llamar</span></li>
    </ol>
  </article>`;

/* ── 2 · Detecta el anzuelo ──────────────────────────────────────────── */
const detecta = () => {
  const regla = slide("regla-codigo");
  return pagina("amarillo", "No muerdas el anzuelo", "Lo más importante de hoy", `
    ${caja("alerta", `🔢 ${regla.titulo}`, lista(regla.pasos))}
    ${caja("", "🎭 Los disfraces del phishing", lista(slide("disfraces").items))}
    ${caja("", "🚩 Caso: tu amiga con número nuevo", `
      <div class="banderas">${li(slide("caso-amiga").mensajes, (m) => `<span>🚩 ${m.pista}</span>`)}</div>
      <p class="nota">Si una amiga «con número nuevo» te pide un código: <b>llámala a su número de siempre</b> o pregúntale en persona.</p>`)}
  `, "alerta");
};

const enlaces = () => {
  const e1 = slide("enlace-detective");
  const e2 = slide("enlace-instagram");
  const fila = (s) => li(s.opciones, (o, k) =>
    `<li class="${k === s.correcta ? "ok" : "no"}"><code>${o}</code><span>${k === s.correcta ? "✅ Real" : "❌ Trampa"}</span></li>`);
  return pagina("coral", "Detecta el anzuelo", "Ojos de búha: para, piensa, verifica", `
    ${caja("", "🔬 Anatomía de un mensaje trampa", lista(slide("anatomia").items))}
    ${caja("", "🔎 ¿De quién es el enlace?", `
      <p>El dueño es lo que va <b>justo antes de la primera «/»</b>. Ojo con las letras gemelas: 1 y l, 0 y o, rn y m.</p>
      <ul class="enlaces">${fila(e1)}${fila(e2)}</ul>
      <p class="nota">Mantén presionado el enlace para ver a dónde va sin abrirlo. Mejor aún: abre la app directamente.</p>`)}
  `);
};

/* ── 3 · Qué hago ────────────────────────────────────────────────────── */
const queHago = () => pagina("turquesa", "Qué hago", "Caer le pasa a cualquiera: lo importante es actuar rápido", `
    ${caja("", "✋ Si algo huele a trampa", lista(slide("protocolo").pasos))}
    ${caja("alerta", "😱 Si ya hice clic o puse mi clave", `
      <ol class="pasos-n">
        <li>Cambia la contraseña <b>desde la app oficial</b></li>
        <li>Cierra las sesiones abiertas (Configuración → Seguridad)</li>
        <li>Activa los <b>2 pasos</b></li>
        <li>Si usabas esa clave en otras apps, cámbiala allá también</li>
        <li><b>Cuéntale a tu adulto.</b> Nadie debería regañarte por avisar</li>
      </ol>
      <p class="nota">Si ya no puedes entrar: «¿Olvidaste tu contraseña?» y soporte oficial. Nunca le pagues a quien diga que te la recupera.</p>`)}
    ${caja("", "🎮 Los anzuelos de los juegos", lista(slide("anzuelos-juego").items))}
  `, "feliz");

/* ── 4 · Con mi adulto ───────────────────────────────────────────────── */
const DOS_PASOS = [
  ["WhatsApp: verificación en dos pasos (PIN de 6 números)", "Ajustes → Cuenta → Verificación en dos pasos"],
  ["WhatsApp: revisar dispositivos vinculados", "Ajustes → Dispositivos vinculados: cierra los que no reconozcas"],
  ["Instagram: autenticación en dos pasos", "Configuración y privacidad → Centro de cuentas → Contraseña y seguridad → Autenticación en dos pasos"],
  ["Instagram: ver los correos que sí son suyos", "Centro de cuentas → Contraseña y seguridad → Correos recientes"],
  ["TikTok: verificación en dos pasos", "Configuración y privacidad → Seguridad → Verificación en dos pasos"],
  ["Roblox: verificación en dos pasos", "Configuración → Seguridad"],
  ["Una contraseña distinta para cada app", "si roban una, no roban todas"],
];
const conMiAdulto = () => pagina("rosa", "Con mi adulto", "Háganlo juntos. Si un menú cambió, búsquenlo en Configuración", `
    ${caja("config", "🔐 Activemos los 2 pasos", `<ul class="checks">${li(DOS_PASOS, ([t, v]) => check(t, v))}</ul>`)}
    ${caja("plan", "🤖 Contra voces y videos falsos", `
      <ul class="checks">
        ${check("Acordamos una palabra clave de familia", "no la escribas: solo recuérdala")}
        ${check("Si un audio o video pide algo urgente, llamo al número de siempre")}
      </ul>`)}
  `, "hola");

/* ── 5 · Para la familia ─────────────────────────────────────────────── */
const familia = () => pagina("noche", "Para la familia", "Lo que vieron sus hijas y cómo acompañarlas", `
    ${caja("", "Qué aprendieron en el taller", `
      <p>A reconocer el <b>phishing</b>: mensajes, correos y llamadas que se hacen pasar por un juego, una app o una amiga para robar su clave, el <b>código de verificación</b> o dinero.</p>`)}
    ${caja("", "Cómo acompañar", `
      <ul class="consejos">
        <li><b>Activen juntos los 2 pasos</b> en WhatsApp, Instagram, TikTok y sus juegos (lista de esta guía).</li>
        <li><b>El código de 6 números no se comparte</b> con nadie: ni amigas, ni «soporte». Ninguna app lo pide.</li>
        <li><b>Si cae, que lo cuente.</b> Si avisar le cuesta un regaño, la próxima vez no avisa, y el ladrón gana tiempo.</li>
        <li><b>Voces y videos falsos:</b> acuerden una palabra clave de familia para mensajes urgentes.</li>
      </ul>`)}
    ${caja("ayuda", "📞 Siempre hay ayuda", lineasAyuda(slide("lineas").lineas))}
    ${contacto()}
    ${logos()}
  `);

montar([portada(), detecta(), enlaces(), queHago(), conMiAdulto(), familia()]);
