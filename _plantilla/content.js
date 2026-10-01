/* Contenido — TÍTULO DEL TALLER · ORGANIZACIÓN (N minutos).
 *
 * Este es el único archivo que se escribe de verdad. De aquí salen las
 * slides, la vista presentador, el guion, la guía y los PDF (pnpm pdf <carpeta>).
 *
 * Escribe aquí arriba para quién es el taller, qué deben saber al salir y qué
 * NO se toca (porque ya se vio o porque es de otra sesión). Le sirve a quien
 * lo dicte después y a quien lo revise.
 *
 * Tipos de slide y sus campos: _base/TIPOS.md
 * Ejemplos reales de cada tipo: escudo-digital-fundasol/content.js
 */

globalThis.META = {
  titulo: "Título del taller",
  subtitulo: "De qué trata, en una línea — Organización",
  organiza: "Organización",            // nombre corto: sale en la portada, la barra y el cierre
  apoya: "Sapientiam · ETITC",
  presupuesto: 30,                      // minutos totales
  bloques: {
    1: "Bloque 1 · Reconocer",
    2: "Bloque 2 · Actuar",
  },
  // Sale al final de la guía. Borra lo que no tengas.
  contacto: { nombre: "Organización", whatsapp: "+57 300 000 0000", correo: "contacto@ejemplo.org" },
  // Las rutas son relativas a la carpeta del taller. El logo de la organización va primero, en img/.
  logos: [
    { src: "../_base/img/sapientiam.png", nombre: "Semillero<br>Sapientiam", oscuro: true },
    { src: "../_base/img/etitc.png", nombre: "Escuela Tecnológica Instituto Técnico Central", alto: 9 },
  ],
  // Avisos para quien dicta: salen al comienzo del guion
  contexto: [
    "**Para quién es.** Edad, cuántas personas, qué tanto participan.",
    "Qué se necesita saber del grupo o de la serie antes de empezar.",
  ],
  quienOrganiza: "Organización",        // nombre oficial: sale en el protocolo del guion
  materiales: [
    "Computador + proyector (o TV) + extensión de pantalla, no espejo.",
  ],
};

/* Toda slide lleva: id (único, sin espacios), bloque, tema, min (minuto en
 * que debe empezar), tipo, titulo y nota (lo que dice quien dicta).
 * Opcionales en cualquier tipo: preguntar, respuesta y lumi. */
globalThis.SLIDES = [
  /* ═══════════════════════ BLOQUE 1 ═══════════════════════ */
  {
    id: "portada",
    bloque: 1,
    tema: "violeta",
    min: 0,
    tipo: "portada",
    titulo: "Título del taller",
    bajada: "Una frase que invite ✨",
    nota: [
      "Mientras entran: esta slide en pantalla.",
      "Bienvenida: quién eres, de dónde vienes y qué van a hacer hoy.",
    ],
  },
  {
    id: "quienes-usan",
    bloque: 1,
    tema: "turquesa",
    min: 2,
    tipo: "encuesta",
    titulo: "¿Cuál usas más?",
    opciones: [
      { e: "💬", t: "WhatsApp" },
      { e: "🎵", t: "TikTok" },
      { e: "🎮", t: "Juegos" },
    ],
    preguntar: ["¿Quién usa cada una? Levanten la mano."],
    nota: [
      "Rompehielo: sirve para saber con qué ejemplos hablarles el resto del taller.",
    ],
  },
  {
    id: "senales",
    bloque: 1,
    tema: "amarillo",
    min: 6,
    tipo: "tarjetas",
    titulo: "Tres señales de alerta",
    revelar: true,                      // cada tarjeta aparece con un clic
    items: [
      { e: "⏰", k: "Te apura", v: "«Solo hoy», «en 10 minutos»" },
      { e: "🎁", k: "Te regala", v: "Premios que no pediste" },
      { e: "🤫", k: "Te pide secreto", v: "«No le digas a nadie»" },
    ],
    preguntar: ["¿Les ha llegado algún mensaje así?"],
    nota: [
      "Una tarjeta por clic. Pedir un ejemplo de la sala antes de revelar la siguiente.",
    ],
  },
  {
    id: "quiz-premio",
    bloque: 1,
    tema: "coral",
    min: 12,
    tipo: "pregunta",
    eyebrow: "¿Qué harías?",
    situacion: "Te escriben: «¡Ganaste un celular! Entra a este enlace en los próximos 5 minutos».",
    titulo: "¿Qué haces?",
    opciones: [                         // máximo 3: se vota con los dedos
      "Entro rápido antes de que se acabe",
      "No entro y le cuento a mi adulto de confianza",
      "Se lo reenvío a mis amigas",
    ],
    correcta: 1,                        // se cuenta desde 0
    explica: "Premio + prisa = trampa. Para, piensa, verifica.",
    respuesta: "La segunda. Tiene dos señales: regala y apura.",
    nota: [
      "Votan con los dedos. Primero se pregunta, después se revela con un clic.",
    ],
  },

  /* ═══════════════════════ BLOQUE 2 ═══════════════════════ */
  {
    id: "regla",
    bloque: 2,
    tema: "rosa",
    min: 18,
    tipo: "regla",
    titulo: "La regla de los tres pasos",
    pasos: [
      { e: "✋", k: "Para", v: "No respondas de una" },
      { e: "🧠", k: "Piensa", v: "¿Me apura, me regala, me pide secreto?" },
      { e: "🔎", k: "Verifica", v: "Pregúntale a tu adulto de confianza" },
    ],
    lumi: { pose: "feliz", t: "¡Para, piensa, verifica!" },
    nota: [
      "Decirla en coro una vez completa. Es lo que se llevan del taller.",
    ],
  },
  {
    id: "lineas",
    bloque: 2,
    tema: "noche",
    min: 24,
    tipo: "lineas",
    titulo: "Siempre hay ayuda",
    lineas: [
      { n: "141", k: "ICBF", v: "Gratis · 24 horas" },
      { n: "123", k: "Emergencias", v: "Policía · peligro ya" },
      { n: "🌐", k: "teprotejo.org", v: "Reporta contenido" },
    ],
    nota: [
      "Leer rápido y decir para qué sirve cada una con un ejemplo de hoy.",
      "Verificar los números antes del taller.",
    ],
  },
  {
    id: "cierre",
    bloque: 2,
    tema: "violeta",
    min: 27,
    tipo: "cierre",
    titulo: "¡Lo lograste!",
    chips: [
      { e: "✋", t: "Paro" },
      { e: "🧠", t: "Pienso" },
      { e: "🔎", t: "Verifico" },
    ],
    nota: [
      "Repasar las tres ideas de pie. Avisar que la guía llega por WhatsApp.",
    ],
  },
];
