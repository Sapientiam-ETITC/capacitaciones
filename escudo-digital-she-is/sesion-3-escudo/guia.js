/* Guía de guardiana — el resumen del taller para llevar a casa.
 *
 * Lo que ya existe en content.js se toma de ahí (reglas del cierre, banderas
 * del caso, regla de los encuentros, líneas de ayuda): si cambia el taller,
 * cambia la guía. Lo que solo vive en las notas del guion (rutas de menús,
 * pasos de rescate) se escribe aquí en versión corta para leer en casa.
 *
 * Tres partes: para ella · con su adulto · para la familia.
 * Versión She Is · sesión 3: sin el detective de enlaces (se vio en la sesión
 * de phishing), con un recuadro de repaso en su lugar.
 */

const { META, lumi } = globalThis;
const { ESCUDO, li, slide, caja, pagina, check, lineasAyuda, contacto, logos, montar } = globalThis.GUIA;

const REGLAS_DE_ORO = {
  "Publico después": "La foto del parque se sube cuando ya estás en casa. Sin uniforme, sin ubicación, sin rutinas.",
  "Nunca sola": "Con alguien de internet no se va sola, nunca. Tu adulto sabe y te acompaña.",
  "Uso alias": "tunombre+juego@gmail.com: así sabes quién te escribe de verdad.",
  "Juego segura": "Chat solo con amigos, nada de regalos y la charla no se pasa a WhatsApp.",
};

const CONFIG = [
  {
    app: "Instagram", e: "📸",
    items: [
      ["Restringir a quien te molesta", "Su perfil → ⋯ → Restringir"],
      ["Palabras ocultas", "Configuración y privacidad → Cómo pueden interactuar otras personas contigo → Palabras ocultas"],
      ["Etiquetas y menciones: solo quien sigues", "Mismo menú → Etiquetas y menciones"],
      ["Revisar dónde está abierta tu cuenta", "Centro de cuentas → Contraseña y seguridad → Dónde iniciaste sesión"],
    ],
  },
  {
    app: "TikTok", e: "🎵",
    items: [
      ["Filtrar palabras en comentarios", "Configuración y privacidad → Privacidad → Comentarios"],
      ["Menciones, Dúo y Stitch: solo amigos o nadie", "Configuración y privacidad → Privacidad"],
    ],
  },
  {
    app: "Roblox y otros juegos", e: "🎮",
    items: [
      ["Chat solo con amigos (o apagado) y voz apagada", "Configuración → Privacidad"],
      ["Quién me invita y me escribe: solo amigos", "Configuración → Privacidad"],
      ["Verificación en 2 pasos", "Configuración → Seguridad"],
      ["Controles parentales", "desde la cuenta de tu adulto, vinculada a la tuya"],
    ],
  },
  {
    app: "WhatsApp", e: "💬",
    items: [
      ["Solo mis contactos me meten a grupos", "Ajustes → Privacidad → Grupos"],
      ["Foto de perfil: solo mis contactos", "Ajustes → Privacidad → Foto de perfil"],
      ["Verificación en 2 pasos (PIN)", "Ajustes → Cuenta → Verificación en dos pasos"],
      ["Silenciar llamadas de desconocidos", "Ajustes → Privacidad → Llamadas"],
      ["Cerrar sesiones que no son mías", "Ajustes → Dispositivos vinculados"],
    ],
  },
];

/* ── 1 · Portada y reglas de oro ─────────────────────────────────────── */
const portada = () => `
  <article class="pag portada" data-tema="violeta">
    <p class="kicker">${META.organiza} · Semillero Sapientiam · ETITC</p>
    <div class="portada-lumi">${lumi("hola")}</div>
    <h1>${ESCUDO} ${META.titulo}</h1>
    <p class="subt">Guía de guardiana</p>
    <p class="intro">¡Hola! Soy Lumi. Aquí está todo lo que aprendimos en el taller, para que lo repases
      y lo pongas en práctica <b>con tu adulto de confianza</b>.</p>
    <ol class="indice">
      <li><i class="emo">🦉</i><span><b>Soy guardiana</b>: mis reglas, las trampas y qué hago si algo sale mal</span></li>
      <li><i class="emo">🤝</i><span><b>Con mi adulto</b>: lista para configurar juntos</span></li>
      <li><i class="emo">💜</i><span><b>Para la familia</b>: cómo acompañar y a dónde llamar</span></li>
    </ol>
  </article>`;

const reglasDeOro = () => {
  const encuentros = slide("regla-encuentros");
  return pagina("amarillo", "Mis 4 reglas de oro", "Las dijimos todas de pie al final del taller", `
    <div class="reglas">${li(slide("cierre").chips, (c) => `
      <div><i class="emo">${c.e}</i><b>${c.t}</b><span>${REGLAS_DE_ORO[c.t] ?? ""}</span></div>`)}</div>
    ${caja("alerta", `<i class="emo">🙅‍♀️</i> ${encuentros.titulo}`, `
      <ul class="lista-regla">${li(encuentros.pasos, (p) => `<li><i class="emo">${p.e}</i><b>${p.k}</b> ${p.v}</li>`)}</ul>
      <p class="nota">La <b>palabra clave</b> es un secreto de familia: si alguien dice «tu mamá me mandó por ti» y no la sabe, no vas.</p>`)}
  `, "feliz");
};

/* ── 2 · Detecta la trampa ───────────────────────────────────────────── */
const trampas = () => {
  const caso = slide("oferta-belleza");
  return pagina("coral", "Detecta la trampa", "Ojos de búha: para, piensa, verifica", `
    ${caja("", "🚩 Banderas rojas de una oferta", `
      <div class="banderas">${li(caso.mensajes, (m) => `<span>🚩 ${m.pista}</span>`)}</div>
      <p class="nota">Si hay <b>dinero, tu cuerpo, tu imagen o un encuentro</b>: es rojo hasta que tu adulto lo revise.</p>`)}
    ${caja("", "🎣 Repaso: phishing", `
      <p>Si un mensaje te <b>apura, te asusta o te emociona</b>: para, piensa, verifica. Nunca entres por el enlace: abre la app directamente.</p>`)}
    ${caja("", "📧 ¿A qué alias llegó?", `
      <p>Si «Instagram» te escribe a <code>tunombre+roblox</code>, es trampa: Instagram nunca tuvo ese correo.</p>`)}
    ${caja("", "🔍 ¿Esa foto es de verdad suya?", `
      <p>Mantén presionada la foto → <b>Buscar con Google Lens</b>. Si sale con otro nombre, el perfil es falso.</p>`)}
  `);
};

/* ── 3 · Si algo sale mal ────────────────────────────────────────────── */
const rescate = () => pagina("turquesa", "Si algo sale mal", "No es tu culpa. Y no lo tienes que resolver sola.", `
    ${caja("", `🧾 ${slide("captura").explica}`, `
      <p>Captura <b>antes</b> de bloquear, con el nombre de usuario, la fecha y el mensaje completo.</p>`)}
    ${caja("", "🙈 Poderes contra el acoso", `
      <ul class="lista-regla">${li(slide("poderes-instagram").pasos, (p) => `<li><i class="emo">${p.e}</i><b>${p.k}</b> ${p.v}</li>`)}</ul>`)}
    ${caja("", "🎭 Una cuenta falsa con tu nombre", `
      <p>Capturas → repórtala con «<b>se hace pasar por mí</b>» → pide a tus amigas que también la reporten → avisa en tu cuenta que no eres tú → cuéntale a tu adulto.</p>`)}
    ${caja("", "🔓 Te robaron la cuenta", `
      <p>«¿Olvidaste tu contraseña?» en la app oficial → avisa a tus amigos → cambia la clave, cierra sesiones y activa los <b>2 pasos</b>. Nunca le pagues a quien «te la recupera».</p>`)}
  `, "alerta");

/* ── 4 · Con mi adulto ───────────────────────────────────────────────── */
const plan = () => pagina("rosa", "Con mi adulto", "Háganla juntos y marquen lo que ya está listo", `
    ${caja("plan", `${ESCUDO} Mi plan de guardiana`, `
      <ul class="checks">
        ${check("Mi adulto de confianza es: ____________________")}
        ${check("Acordamos nuestra palabra clave", "no la escribas: solo recuérdala")}
        ${check("Mi alias para juegos: tunombre+ ________ @gmail.com")}
      </ul>`)}
    ${caja("", "📧 Truco del alias, en 3 pasos", `
      <ol class="pasos-n">
        <li>Al registrarte, usa <code>tunombre+app@gmail.com</code></li>
        <li>Anota qué alias usaste en cada app</li>
        <li>Mira siempre el «para»: si no coincide, es trampa</li>
      </ol>`)}
    ${caja("", "🤫 Preguntas de seguridad", `
      <p>A «¿nombre de tu primera mascota?» respóndele con <b>una mentira que solo tú sabes</b> y guárdala con tu adulto. Lo que publicas en redes, cualquiera lo adivina.</p>`)}
    ${caja("", "🔐 Contraseña superpoderosa", `
      <p>Una frase loca, larga, con números y símbolos (<code>Unicornio!Come3Arepas</code>), distinta en cada app.</p>`)}
  `, "hola");

// Dos páginas: redes (Instagram, TikTok) y luego juegos y WhatsApp
const configuracion = (apps, titulo) => pagina("violeta", titulo, "Los menús cambian con las actualizaciones: si no encuentras algo, búsquenlo en Ajustes", `
    ${li(apps, (c) => caja("config", `<i class="emo">${c.e}</i> ${c.app}`, `<ul class="checks">${li(c.items, ([t, v]) => check(t, v))}</ul>`))}
  `);

/* ── 5 · Para la familia ─────────────────────────────────────────────── */
const familia = () => {
  return pagina("noche", "Para la familia", "Lo que vieron sus hijas y cómo acompañarlas", `
    ${caja("", "Qué aprendieron en el taller", `
      <p>A cuidar lo que revelan en fotos, a reconocer ofertas trampa (dinero, belleza o trabajo a cambio de ir <b>solas</b>), herramientas contra el acoso, a proteger sus cuentas y a jugar con seguridad.</p>`)}
    ${caja("", "Cómo acompañar", `
      <ul class="consejos">
        <li><b>Configuren juntos</b> la lista de esta guía. Mejor una cosa que sí hagan que cinco que no.</li>
        <li><b>Acuerden la palabra clave</b> y compartan la ubicación en tiempo real cuando ella salga.</li>
        <li><b>Escuchen sin castigar.</b> Si contar algo le cuesta el celular, la próxima vez no va a contar.</li>
        <li><b>Nunca es su culpa.</b> Si alguien le pide fotos, dinero o encuentros, guarden pruebas y denuncien.</li>
      </ul>`)}
    ${caja("ayuda", "📞 Siempre hay ayuda", `
      ${lineasAyuda(slide("lineas").lineas)}`)}
    ${contacto()}
    ${logos()}
  `);
};

montar(
  [
    portada(), reglasDeOro(), trampas(), rescate(), plan(),
    configuracion(CONFIG.slice(0, 2), "Configuremos juntos"),
    configuracion(CONFIG.slice(2), "Configuremos juntos · 2"),
    familia(),
  ]);
