const { META, SLIDES } = globalThis;

const $ = (s) => document.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
const li = (xs, f) => xs.map(f).join("");
const DEDOS = ["☝️", "✌️", "🤟"];

/* El escudo de la marca no es emoji: es el símbolo SVG de index.html, para
 * que se vea igual en el Mac que proyecta y en cualquier otro equipo.
 * En content.js se escribe el token {escudo} y se cambia aquí. */
const ESCUDO = '<svg class="escudo" aria-hidden="true"><use href="#ico-escudo"/></svg>';
const conEscudo = (h) => h.split("{escudo}").join(ESCUDO);

/* Dos modos del mismo archivo:
 *   index.html               → lo que ven las niñas (va al proyector)
 *   index.html?presentador   → slide actual + siguiente + guion + cronómetro
 * Se abren uno desde el otro con la tecla P y se sincronizan por postMessage,
 * que funciona también abriendo el archivo con doble clic (file://).
 */
const PRESENTADOR = new URLSearchParams(location.search).has("presentador");

/* Lumi vive en js/lumi.js: la comparten el deck y la guía. */
const { lumi } = globalThis;

/* ── Render ────────────────────────────────────────────────────────────────
 * Una función por tipo de slide, igual que en la sustentación: vocabulario
 * cerrado. Lo que se revela con clic lleva `data-paso="n"`; lo que además
 * debe estar invisible hasta ese clic lleva la clase `oculto`. La cantidad de
 * clics de cada slide sale del DOM, no hay que declararla en content.js.
 */
const paso = (n, extra = "") => `data-paso="${n}" class="${extra}"`;
const revela = (on, n, extra = "") => (on ? paso(n, `oculto ${extra}`) : `class="${extra}"`);

const CUERPO = {
  portada: (s) => `
    <div class="portada-lumi">${lumi("hola")}</div>
    <div class="portada-txt">
      <p class="eyebrow">${META.organiza} · ${META.apoya}</p>
      <h1>${s.titulo}</h1>
      <p class="bajada">${s.bajada}</p>
      <p class="portada-emo">{escudo}<i class="emo">💜 ✨</i></p>
    </div>`,

  mensaje: (s) => `
    <div class="centro">
      ${s.lumiGrande ? `<div class="m-lumi">${lumi(s.lumiGrande)}</div>` : `<div class="m-emo emo">${s.emoji}</div>`}
      <h1>${s.titulo}</h1>
      ${s.bajada ? `<p class="bajada">${s.bajada}</p>` : ""}
      ${s.chips ? `<div class="chips">${li(s.chips, (c, k) =>
        `<span ${revela(s.revelar, k + 1)}><i class="emo">${c.e}</i>${c.t}</span>`)}</div>` : ""}
    </div>`,

  encuesta: (s) => `
    <h1>${s.titulo}</h1>
    <div class="encuesta">${li(s.opciones, (o) => `<div><i class="emo">${o.e}</i><b>${o.t}</b></div>`)}</div>
    <p class="pista-mano">✋ ¡Levanta la mano!</p>`,

  tarjetas: (s) => `
    <h1>${s.titulo}</h1>
    <div class="tarjetas" style="--n:${s.items.length <= 5 ? s.items.length : 3}">
      ${li(s.items, (t, k) => `<div ${revela(s.revelar, k + 1)}><i class="emo">${t.e}</i><b>${t.k}</b><span>${t.v}</span></div>`)}
    </div>`,

  pregunta: (s) => `
    <p class="eyebrow chip-eyebrow">${s.eyebrow}</p>
    ${s.situacion ? `<div class="situacion">${s.situacion}</div>` : ""}
    <h1>${s.titulo}</h1>
    <ol class="opciones">${li(s.opciones, (o, k) =>
      `<li ${paso(1, k === s.correcta ? "ok" : "no")}><i class="emo">${DEDOS[k]}</i><span>${o}</span></li>`)}</ol>
    <p ${paso(1, "oculto explica")}>💡 ${s.explica}</p>`,

  mito: (s) => `
    <h1>${s.titulo}</h1>
    <p class="leyenda"><i class="emo">☝️</i> verdad · <i class="emo">✌️</i> mito</p>
    <div class="cartas">${li(s.cartas, (c, k) => `
      <div ${paso(k + 1, `carta es-${c.es}`)}>
        <div class="carta-in">
          <div class="cara frente"><i class="emo">🤔</i><p>${c.t}</p></div>
          <div class="cara dorso"><b>${c.es === "verdad" ? "✅ VERDAD" : "❌ MITO"}</b><p>${c.porque}</p></div>
        </div>
      </div>`)}</div>`,

  chat: (s) => `
    <div class="chat-info">
      <h1>${s.titulo}</h1>
      <p class="bajada">${s.bajada ?? "Encuentra las 🚩"}</p>
      <div class="chat-lumi">${lumi("alerta")}</div>
    </div>
    <div class="telefono chat">
      <div class="tel-cab"><i class="avatar emo">${s.contacto.e}</i><b>${s.contacto.nombre}</b><small>en línea</small></div>
      <div class="tel-cuerpo">${li(s.mensajes, (m, k) => `
        <div class="burbuja-fila">
          <p class="burbuja">${m.t}</p>
          <span ${paso(k + 1, "oculto bandera")}>🚩 ${m.pista}</span>
        </div>`)}</div>
    </div>`,

  semaforo: (s) => `
    <h1>${s.titulo}</h1>
    <p class="leyenda"><i class="emo">🟢</i> tranquila · <i class="emo">🟡</i> cuidado · <i class="emo">🔴</i> peligro</p>
    <div class="semaforo">${li(s.items, (it, k) => `
      <div ${paso(k + 1, `sit c-${it.color}`)}>
        <div class="luces"><i class="l-rojo"></i><i class="l-amarillo"></i><i class="l-verde"></i></div>
        <p>${it.t}</p>
      </div>`)}</div>`,

  regla: (s) => `
    <h1>${s.titulo}</h1>
    <div class="regla">${li(s.pasos, (p, k) => `
      <div ${paso(k + 1, "oculto")}><i class="emo">${p.e}</i><b>${p.k}</b><span>${p.v}</span></div>`)}</div>`,

  pausa: (s) => `
    <div class="centro">
      <div class="m-lumi">${lumi("feliz")}</div>
      <h1>${s.titulo} <span class="emo">☕</span></h1>
      <div class="cuenta" data-min="${s.minutos}">${pad(s.minutos)}:00</div>
      <p class="bajada">${s.bajada}</p>
    </div>`,

  perfiles: (s) => `
    <h1>${s.titulo}</h1>
    <div class="perfiles">${li(s.perfiles, (p, k) => `
      <div ${paso(k + 1, `perfil ${p.falso ? "falso" : "real"}`)}>
        <span class="perfil-n emo">${DEDOS[k]}</span>
        <i class="avatar emo">${p.e}</i>
        <b class="usuario">@${p.usuario}</b>
        <div class="stats">
          <span><b>${p.posts}</b>publicaciones</span>
          <span><b>${p.seguidores}</b>seguidores</span>
          <span><b>${p.seguidos.toLocaleString("es-CO")}</b>seguidos</span>
        </div>
        <p class="bio">${p.bio}</p>
        <p class="comun">👥 ${p.comun} amigas en común</p>
        <div class="veredicto">
          <b>${p.falso ? "🚨 FALSO" : "✅ REAL"}</b>
          <span>${p.pistas.join(" · ")}</span>
        </div>
      </div>`)}</div>`,

  escenario: (s) => `
    <p class="eyebrow chip-eyebrow">${s.eyebrow}</p>
    <h1>${s.titulo}</h1>
    <div class="situacion">${s.situacion}</div>
    <div class="caminos">${li(s.opciones, (o, k) => `
      <div ${paso(k + 1, `camino ${o.ok ? "ok" : ""}`)}>
        <p class="camino-t"><i class="emo">${DEDOS[k]}</i>${o.t}</p>
        <p class="pasa">${o.ok ? "⭐ " : ""}${o.pasa}</p>
      </div>`)}</div>`,

  app: (s) => `
    <div class="telefono app">
      <div class="tel-cab"><b>⚙️ Configuración</b><small>${s.app}</small></div>
      <div class="tel-cuerpo">${li(s.pasos, (p, k) => `
        <div ${paso(k + 1, "ajuste")}><i class="emo">${p.e}</i><b>${p.k}</b><span class="switch"></span></div>`)}</div>
    </div>
    <div class="app-info">
      <h1>${s.titulo}</h1>
      <ol class="app-pasos">${li(s.pasos, (p, k) => `<li ${paso(k + 1, "oculto")}><b>${p.k}</b>${p.v ? ` · ${p.v}` : ""}</li>`)}</ol>
    </div>`,

  contrasena: (s) => `
    <h1>${s.titulo}</h1>
    <div class="clave">
      <input class="pwd" type="text" placeholder="Escribe una contraseña inventada…" autocomplete="off" spellcheck="false" aria-label="Contraseña de prueba">
      <div class="medidor"><span></span></div>
      <p class="veredicto-clave">Escribe algo para empezar ✍️</p>
      <p class="tiempo-clave"></p>
      <ul class="consejos">${li(s.consejos, (c) => `<li data-regla="${c.regla}">${c.t}</li>`)}</ul>
    </div>`,

  lineas: (s) => `
    <h1>${s.titulo} <span class="emo">📞</span></h1>
    <div class="lineas">${li(s.lineas, (l) => `
      <div><i class="${/\d/.test(l.n) ? "num" : "emo"}">${l.n}</i><b>${l.k}</b><span>${l.v}</span></div>`)}</div>
    <p class="pista-mano">💜 Pero primero: tu adulto de confianza</p>`,

  cierre: (s) => `
    <div class="centro">
      <div class="m-lumi">${lumi("feliz")}</div>
      <h1>${s.titulo}</h1>
      <div class="chips">${li(s.chips, (c) => `<span><i class="emo">${c.e}</i>${c.t}</span>`)}</div>
      <p class="gracias">¡Gracias! · ${META.organiza} · ${META.apoya}</p>
    </div>`,

  // Publicación falsa con pines que revelan lo que la foto delata
  publicacion: (s) => `
    <div class="pub-info">
      <h1>${s.titulo}</h1>
      <ol class="pub-lista">${li(s.pistas, (p, k) => `<li ${paso(k + 1, "oculto")}>${p.t}</li>`)}</ol>
    </div>
    <div class="post">
      <div class="post-cab"><i class="avatar emo">👧🏽</i><div><b>${s.usuario}</b><small>${s.lugar}</small></div></div>
      <div class="post-foto">
        <div class="escena emo">${li(s.escena, (e) => `<span>${e}</span>`)}</div>
        ${li(s.pistas, (p, k) => `<span ${paso(k + 1, "oculto pin")} style="left:${p.x}%;top:${p.y}%">${k + 1}</span>`)}
      </div>
      <p class="post-texto"><b>${s.usuario}</b> ${s.texto}</p>
    </div>`,

  dato: (s) => `
    <div class="centro dato">
      <p class="cifra">${s.cifra}</p>
      <h1>${s.titulo}</h1>
      <p class="bajada">${s.bajada}</p>
      <p ${paso(1, "oculto detalle")}>${s.detalle}</p>
      <p class="fuente">Fuente: ${s.fuente}</p>
    </div>`,

  alias: (s) => `
    <div class="centro">
      <h1>${s.titulo} <span class="emo">📧</span></h1>
      <div class="alias">${li(s.partes, (p, k) => `
        <div ${paso(k + 1, "oculto")}><b>${p.t}</b><span>${p.k}</span></div>`)}</div>
      <p ${paso(s.partes.length, "oculto bajada")}>${s.bajada}</p>
    </div>`,

  bandeja: (s) => `
    <h1>${s.titulo}</h1>
    <div class="bandeja">
      <div class="bandeja-cab"><span>De</span><span>Asunto</span><span>Para</span><span></span></div>
      ${li(s.correos, (c, k) => `
      <div ${paso(k + 1, `correo t-${c.tono}`)}>
        <b>${c.de}</b><span>${c.asunto}</span><code>${c.para}</code>
        <em>${c.veredicto}</em>
      </div>`)}
    </div>`,

  // Lista de sesiones abiertas: clic 1 delata al intruso, clic 2 lo saca, luego las rutas
  sesiones: (s) => `
    <div class="telefono app sesiones">
      <div class="tel-cab"><b>🔗 ${s.app}</b><small>WhatsApp</small></div>
      <div class="tel-cuerpo">
        <p class="ses-titulo">Sesiones abiertas</p>
        ${li(s.dispositivos, (d) => `
        <div ${d.intruso ? paso(1, "sesion intruso") : 'class="sesion"'}>
          <i class="emo">${d.e}</i><div><b>${d.k}</b><small>${d.v}</small></div>
          ${d.intruso ? `<em ${paso(1, "oculto")}>🚨 ¡No es mío!</em><span ${paso(2, "oculto cerrada")}>✅ Sesión cerrada</span>` : ""}
        </div>`)}
      </div>
    </div>
    <div class="app-info">
      <h1>${s.titulo}</h1>
      <ol class="app-pasos">${li(s.rutas, (r, k) => `<li ${paso(k + 3, "oculto")}><b>${r.k}</b> · ${r.v}</li>`)}</ol>
    </div>`,

  plan: (s) => `
    <h1>${s.titulo} <span class="emo">📝</span></h1>
    <div class="plan">${li(s.campos, (c) => `
      <div><i class="emo">${c.e}</i><b>${c.k}</b><span>${c.v ?? ""}</span><hr></div>`)}</div>`,
};

function htmlSlide(s, i) {
  return conEscudo(`<section class="slide" data-tema="${s.tema}" data-tipo="${s.tipo}" hidden
                   aria-label="Slide ${i + 1} de ${SLIDES.length}">
      <div class="deco" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      ${CUERPO[s.tipo](s)}
      ${s.lumi ? `<div class="lumi-dice">${lumi(s.lumi.pose)}<p>${s.lumi.t}</p></div>` : ""}
      ${s.tipo !== "portada" ? `<p class="marca-pie">{escudo} ${META.titulo}</p>` : ""}
    </section>`);
}

function montar(cont) {
  cont.innerHTML = SLIDES.map(htmlSlide).join("");
  return [...cont.querySelectorAll(".slide")];
}

/* ── Escalado del lienzo ─────────────────────────────────────────────────
 * Las slides se maquetan en 1280x720 fijos y se escalan al hueco disponible:
 * lo que se ve al ensayar es lo que se proyecta.
 */
function escalar(cont, el, margen = 32) {
  if (!cont || !el) return;
  const caja = cont.getBoundingClientRect();
  const k = Math.min((caja.width - margen) / 1280, (caja.height - margen) / 720);
  el.style.transform = `translate(-50%, -50%) scale(${Math.max(k, 0.05)})`;
}

/* ── Estado compartido entre las dos ventanas ─────────────────────────── */

const estado = { i: 0, paso: 0, pwd: "" };
const escenario = PRESENTADOR ? $("#pv-actual") : $("#escenario");
const slides = montar(escenario);

const totalPasos = (k) =>
  Math.max(0, ...[...(slides[k]?.querySelectorAll("[data-paso]") ?? [])].map((x) => +x.dataset.paso));

function ir(n, p = 0, avisar = true) {
  estado.i = Math.max(0, Math.min(SLIDES.length - 1, n));
  estado.paso = Math.max(0, Math.min(totalPasos(estado.i), p));
  mostrar();
  if (avisar) enviar();
  history.replaceState(null, "", `${location.search}#${SLIDES[estado.i].id}`);
}

function avanzar() {
  if (estado.paso < totalPasos(estado.i)) ir(estado.i, estado.paso + 1);
  else if (estado.i < SLIDES.length - 1) ir(estado.i + 1, 0);
}
function retroceder() {
  if (estado.paso > 0) ir(estado.i, estado.paso - 1);
  else if (estado.i > 0) ir(estado.i - 1, totalPasos(estado.i - 1));
}

function aplicarPasos(el, p) {
  el.querySelectorAll("[data-paso]").forEach((x) => x.classList.toggle("visto", +x.dataset.paso <= p));
}

function mostrar() {
  const { i, paso: p } = estado;
  slides.forEach((el, k) => (el.hidden = k !== i));
  aplicarPasos(slides[i], p);
  escalar(escenario, slides[i], margen());
  pausa.al(SLIDES[i]);
  pintarClave();
  if (PRESENTADOR) pintarPresentador();
  else {
    $("#contador").textContent = `${pad(i + 1)} / ${pad(SLIDES.length)}`;
    $("#progreso").style.width = `${((i + 1) / SLIDES.length) * 100}%`;
    $("#notas").innerHTML = htmlGuion(SLIDES[i], i);
  }
}

/* postMessage entre ventanas. El presentador saluda cada 2 s: si el
 * proyector se recarga, vuelve a encontrarlo sin tener que cerrar nada. */
let par = PRESENTADOR ? window.opener : null;

function enviar(tipo = "estado") {
  try { if (par && !par.closed) par.postMessage({ escudo: tipo, ...estado }, "*"); } catch {}
}

addEventListener("message", (e) => {
  const d = e.data;
  if (!d || !d.escudo) return;
  par = e.source;
  if (d.escudo === "hola") return enviar();
  if (d.pwd !== estado.pwd) { estado.pwd = d.pwd; pintarClave(); }
  if (d.i !== estado.i || d.paso !== estado.paso) ir(d.i, d.paso, false);
});

function abrirPresentador() {
  const url = `${location.href.split(/[?#]/)[0]}?presentador#${SLIDES[estado.i].id}`;
  par = window.open(url, "escudo-presentador", "width=1400,height=860");
  setTimeout(enviar, 600);
}

/* ── Guion (panel N y vista presentador) ─────────────────────────────── */

function htmlGuion(s, i) {
  return conEscudo(`
    <div class="g-cab">
      <span class="g-bloque">Bloque ${s.bloque}</span>
      <span class="g-min">min ${s.min} · ${pad(i + 1)}/${pad(SLIDES.length)}</span>
    </div>
    <h4>${s.titulo}</h4>
    ${s.preguntar ? `<div class="g-preg"><b>Pregunta a la sala</b>${li(s.preguntar, (q) => `<p>❓ ${q}</p>`)}</div>` : ""}
    ${s.respuesta ? `<div class="g-resp"><b>Respuesta</b><p>${s.respuesta}</p></div>` : ""}
    ${li(s.nota, (n) => `<p>${n}</p>`)}`);
}

/* ── Pausa con cuenta regresiva ──────────────────────────────────────── */

/* Música de la pausa: solo en la ventana del proyector (el presentador no
 * suena, para no duplicar). Las pistas se encadenan en bucle con fundido y
 * cada una trae su `vol` para igualarlas. En el último minuto suena un trozo
 * de la campana y la música baja. Si un archivo no existe, se salta sin
 * romper nada: la pausa funciona igual en silencio. */
const VOL_MUSICA = 0.35;   // fondo: que se pueda conversar encima
const VOL_BAJO = 0.12;     // mientras suena la campana y en el último minuto
const musica = {
  pista: null, k: 0, fallos: 0, nivel: VOL_MUSICA,
  empezar(s) {
    if (PRESENTADOR || this.pista || !s.musica?.length) return;
    this.lista = s.musica;
    this.fallos = 0;
    this.nivel = VOL_MUSICA;
    this.sonar();
  },
  sonar() {
    const p = this.lista[this.k % this.lista.length];
    const a = (this.pista = new Audio(p.src));
    a.gana = p.vol ?? 1;
    a.volume = 0;
    a.onended = () => { this.k++; this.pista === a && this.sonar(); };
    a.onerror = () => {
      if (this.pista !== a || ++this.fallos >= this.lista.length) return;
      this.k++; this.sonar();
    };
    a.play().then(() => (this.fallos = 0, fundir(a, this.nivel * a.gana))).catch(() => {});
  },
  bajar() {
    this.nivel = VOL_BAJO;
    if (this.pista) fundir(this.pista, VOL_BAJO * this.pista.gana);
  },
  parar() {
    const a = this.pista;
    this.pista = null;
    if (a) fundir(a, 0, () => a.pause());
  },
  campana(c) {
    if (PRESENTADOR || !c) return;
    this.bajar();
    const a = new Audio(c.src);
    a.volume = 0;
    a.currentTime = c.desde ?? 0;
    a.play().then(() => {
      fundir(a, 0.7);
      setTimeout(() => fundir(a, 0, () => a.pause()), (c.dura ?? 8) * 1000);
    }).catch(() => {});
  },
};

// Lleva el volumen de un audio a `meta` en pasos suaves (~1.5 s de 0 a 0.35)
function fundir(a, meta, luego) {
  clearInterval(a.fundido);
  a.fundido = setInterval(() => {
    const paso = meta > a.volume ? 0.015 : -0.015;
    if (Math.abs(a.volume - meta) <= 0.015) { a.volume = meta; clearInterval(a.fundido); luego?.(); return; }
    a.volume = Math.max(0, Math.min(1, a.volume + paso));
  }, 60);
}

const pausa = {
  desde: null,
  al(s) {
    if (s.tipo !== "pausa") { musica.parar(); return (this.desde = null); }
    if (this.desde === null) { this.desde = Date.now(); this.campanaDada = false; }
    this.s = s;
    musica.empezar(s);
    this.pintar();
  },
  pintar() {
    if (this.desde === null) return;
    const el = slides[estado.i].querySelector(".cuenta");
    const resta = +el.dataset.min * 60 - Math.floor((Date.now() - this.desde) / 1000);
    el.textContent = resta > 0 ? `${pad(Math.floor(resta / 60))}:${pad(resta % 60)}` : "¡A volver! 🎉";
    el.classList.toggle("fin", resta <= 0);
    if (resta <= 60 && !this.campanaDada) { this.campanaDada = true; musica.campana(this.s.campana); }
    if (resta <= 0) musica.parar();
  },
};
setInterval(() => pausa.pintar(), 500);

/* ── Medidor de contraseñas ─────────────────────────────────────────────
 * Estimación didáctica, no criptográfica: tamaño del alfabeto usado elevado
 * al largo, con castigo a las contraseñas famosas y a los años. Basta para
 * que se vea la diferencia entre «sofia2013» y una frase loca.
 */
const FAMOSAS = ["123456", "12345678", "123456789", "password", "contraseña", "qwerty", "111111", "abc123", "teamo", "iloveyou", "000000", "colombia"];
const REGLAS = {
  frase: (p) => p.length >= 14 && /[a-z]/.test(p) && /[A-Z]/.test(p),
  simbolos: (p) => /\d/.test(p) && /[^A-Za-z0-9]/.test(p),
  largo: (p) => p.length >= 12,
  personal: (p) => p.length > 0 && !/(19|20)\d\d/.test(p) && !FAMOSAS.includes(p.toLowerCase()),
};

function fuerza(p) {
  if (!p) return null;
  let alfabeto = 0;
  if (/[a-z]/.test(p)) alfabeto += 26;
  if (/[A-Z]/.test(p)) alfabeto += 26;
  if (/\d/.test(p)) alfabeto += 10;
  if (/[^A-Za-z0-9]/.test(p)) alfabeto += 33;
  let bits = p.length * Math.log2(alfabeto || 1);
  if (FAMOSAS.includes(p.toLowerCase())) bits = 3;
  if (/(19|20)\d\d/.test(p)) bits -= 12;
  if (/^(.)\1+$/.test(p)) bits = 4;
  const seg = 2 ** Math.max(bits, 0) / 1e10;          // 10 mil millones de intentos por segundo
  const T = [
    [1, "¡al instante! ⚡"], [3600, "unos minutos 🐭"], [86400, "unas horas ⏰"],
    [31536000, "unos días o meses 📅"], [31536000 * 1000, "cientos de años 🐢"],
  ];
  const tiempo = (T.find(([lim]) => seg < lim) ?? [0, "millones de años 🦕"])[1];
  const nivel = bits < 28 ? 0 : bits < 40 ? 1 : bits < 55 ? 2 : bits < 70 ? 3 : 4;
  return { nivel, tiempo };
}

const NIVELES = ["Muy débil 😱", "Débil 😬", "Más o menos 🤔", "Fuerte 💪", "¡Superpoderosa! 🦸‍♀️"];

function pintarClave() {
  document.querySelectorAll(".clave").forEach((c) => {
    const input = c.querySelector(".pwd");
    if (document.activeElement !== input) input.value = estado.pwd;
    const f = fuerza(estado.pwd);
    c.dataset.nivel = f ? f.nivel : "";
    c.querySelector(".medidor span").style.width = f ? `${(f.nivel + 1) * 20}%` : "0";
    c.querySelector(".veredicto-clave").textContent = f ? NIVELES[f.nivel] : "Escribe algo para empezar ✍️";
    c.querySelector(".tiempo-clave").textContent = f ? `Un computador la adivina en: ${f.tiempo}` : "";
    c.querySelectorAll("[data-regla]").forEach((r) => r.classList.toggle("cumple", !!REGLAS[r.dataset.regla]?.(estado.pwd)));
  });
}

document.addEventListener("input", (e) => {
  if (!e.target.matches(".pwd")) return;
  estado.pwd = e.target.value;
  pintarClave();
  enviar();
});

/* ── Controles ──────────────────────────────────────────────────────── */

const interactivo = (t) => t.closest("input, button, a, textarea");

escenario.addEventListener("click", (e) => { if (!interactivo(e.target)) avanzar(); });
escenario.addEventListener("contextmenu", (e) => { e.preventDefault(); retroceder(); });

addEventListener("keydown", (e) => {
  const k = e.key;
  if (e.target.matches?.("input, textarea")) {
    if (k === "Escape" || k === "Enter") e.target.blur();
    return;
  }
  if (k === "ArrowRight" || k === "PageDown" || k === " " || k === "ArrowDown") { e.preventDefault(); avanzar(); }
  else if (k === "ArrowLeft" || k === "PageUp" || k === "ArrowUp") { e.preventDefault(); retroceder(); }
  else if (k === "Home") ir(0);
  else if (k === "End") ir(SLIDES.length - 1);
  else if (k === "f" || k === "F") pantallaCompleta();
  else if (!PRESENTADOR && (k === "n" || k === "N")) alternarNotas();
  else if (!PRESENTADOR && (k === "p" || k === "P")) abrirPresentador();
  else if (k === "Escape" && document.body.classList.contains("con-notas")) alternarNotas();
});

let tx = 0;
escenario.addEventListener("touchstart", (e) => (tx = e.changedTouches[0].clientX), { passive: true });
escenario.addEventListener("touchend", (e) => {
  const d = e.changedTouches[0].clientX - tx;
  if (Math.abs(d) > 48) (d < 0 ? avanzar : retroceder)();
}, { passive: true });

function pantallaCompleta() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.();
}
document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-full", !!document.fullscreenElement);
  $("#btn-full")?.setAttribute("aria-pressed", String(!!document.fullscreenElement));
  reescalar();
});

function alternarNotas() {
  const on = document.body.classList.toggle("con-notas");
  $("#btn-notas").setAttribute("aria-pressed", String(on));
  reescalar();
}

// En pantalla completa la slide llena el proyector; con barra, se deja aire
const margen = () => (PRESENTADOR || document.fullscreenElement ? 0 : 32);

function reescalar() {
  escalar(escenario, slides[estado.i], margen());
  if (PRESENTADOR) escalar($("#pv-prox"), $("#pv-prox .slide"), 0);
}
addEventListener("resize", reescalar);

/* ── Vista presentador ──────────────────────────────────────────────── */

const crono = (() => {
  let c = { ini: null, acum: 0 };
  try { c = JSON.parse(localStorage.getItem("escudo-crono")) ?? c; } catch {}
  const guardar = () => { try { localStorage.setItem("escudo-crono", JSON.stringify(c)); } catch {} };
  return {
    ms: () => c.acum + (c.ini ? Date.now() - c.ini : 0),
    corriendo: () => !!c.ini,
    alternar() { if (c.ini) { c.acum += Date.now() - c.ini; c.ini = null; } else c.ini = Date.now(); guardar(); },
    reiniciar() { c = { ini: null, acum: 0 }; guardar(); },
    arrancarSiNuevo() { if (!c.ini && !c.acum) { c.ini = Date.now(); guardar(); } },
  };
})();

function pintarPresentador() {
  const { i, paso: p } = estado;
  const s = SLIDES[i];
  const total = totalPasos(i);
  if (i > 0) crono.arrancarSiNuevo();

  $("#pv-cont").textContent = `${pad(i + 1)} / ${pad(SLIDES.length)}`;
  $("#pv-bloque").textContent = META.bloques[s.bloque];
  $("#pv-guion").innerHTML = htmlGuion(s, i);
  $("#pv-paso").innerHTML = total === 0
    ? "Sin revelados · el clic cambia de slide"
    : p < total
      ? `Revelado <b>${p} de ${total}</b> · el clic revela el siguiente`
      : `✔ Todo revelado (${total}) · el clic cambia de slide`;
  $("#pv-paso").dataset.completo = String(p >= total);

  const prox = $("#pv-prox");
  if (i < SLIDES.length - 1) {
    prox.innerHTML = htmlSlide(SLIDES[i + 1], i + 1);
    prox.querySelector(".slide").hidden = false;
    escalar(prox, prox.querySelector(".slide"), 0);
    pintarClave();
  } else prox.innerHTML = `<p class="pv-fin">🎉 Última slide</p>`;
  tic();
}

const mmss = (ms) => `${pad(Math.floor(ms / 60000))}:${pad(Math.floor(ms / 1000) % 60)}`;

function tic() {
  const ahora = new Date();
  $("#pv-reloj").textContent = ahora.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  const ms = crono.ms();
  $("#pv-crono").textContent = mmss(ms);
  $("#pv-play").textContent = crono.corriendo() ? "⏸" : "▶";

  // Ritmo: ¿el minuto transcurrido cae dentro de la ventana de esta slide?
  const s = SLIDES[estado.i];
  const fin = SLIDES[estado.i + 1]?.min ?? META.presupuesto;
  const m = ms / 60000;
  const r = $("#pv-ritmo");
  if (!crono.ms()) { r.textContent = `meta: min ${s.min}`; r.dataset.ritmo = ""; }
  else if (m > fin + 2) { r.textContent = `🐢 ${Math.round(m - fin)} min atrasada`; r.dataset.ritmo = "tarde"; }
  else if (m < s.min - 2) { r.textContent = `⏩ ${Math.round(s.min - m)} min adelantada`; r.dataset.ritmo = "antes"; }
  else { r.textContent = `✅ a tiempo · meta min ${s.min}`; r.dataset.ritmo = "bien"; }

  $("#pv-link").textContent = par && !par.closed ? "🔗 Proyector conectado" : "⚠️ Sin proyector";
  $("#pv-link").dataset.ok = String(!!(par && !par.closed));
}

if (PRESENTADOR) {
  document.body.classList.add("modo-presentador");
  $("#pv").hidden = false;
  $("#pv-ant").onclick = retroceder;
  $("#pv-sig").onclick = avanzar;
  $("#pv-play").onclick = () => (crono.alternar(), tic());
  $("#pv-reset").onclick = () => (crono.reiniciar(), tic());
  setInterval(tic, 1000);
  setInterval(() => enviar("hola"), 2000);
  document.title = `Presentador · ${META.titulo}`;
} else {
  $("#sig").onclick = (e) => (e.stopPropagation(), avanzar());
  $("#ant").onclick = (e) => (e.stopPropagation(), retroceder());
  $("#btn-full").onclick = pantallaCompleta;
  $("#btn-notas").onclick = alternarNotas;
  $("#btn-pres").onclick = abrirPresentador;
  document.title = `${META.titulo} · ${META.organiza}`;
}

/* ── Arranque ───────────────────────────────────────────────────────── */

/* index.html?imprimir → todas las slides, una por página y con todo revelado,
 * para sacar el PDF del deck (node js/deck-pdf.mjs). */
if (new URLSearchParams(location.search).has("imprimir")) {
  document.body.classList.add("modo-imprimir");
  // Con #id se muestra solo esa slide: deck-pdf.mjs toma una captura por slide
  const sola = location.hash.slice(1);
  slides.forEach((el, k) => {
    el.hidden = !!sola && SLIDES[k].id !== sola;
    el.style.transform = "none";
    aplicarPasos(el, Infinity);
  });
  estado.pwd = "MiGato$ComeArepa3Veces";
  pintarClave();
} else {
  const desdeHash = SLIDES.findIndex((s) => s.id === location.hash.slice(1));
  ir(desdeHash >= 0 ? desdeHash : 0, 0, false);
  if (PRESENTADOR) enviar("hola");
}
