/* Contenido — Tu identidad es única · She Is Foundation · SESIÓN 1 (1 hora).
 *
 * Motor en ../../_base. De este archivo salen las slides, la vista presentador,
 * el guion (node ../../_base/herramientas/guion.mjs) y la guía.
 *
 * Base: el Canva de la cohorte 1 (fuente/identidad-cohorte-1-canva.pdf). Se
 * conservan su estructura y sus mensajes (el espejo, qué es la identidad
 * digital, ¿seguro o peligroso?, la huella, suplantación, las tres preguntas
 * antes de compartir y las tres frases de la reflexión) para que las dos
 * cohortes aprendan lo mismo, con ejemplos de ELLAS y con práctica en pantalla.
 *
 * Es la PRIMERA sesión de la serie: aquí se presentan Lumi, el voto con los
 * dedos y los acuerdos. Se queda en RECONOCER. Lo que sigue no se adelanta:
 *   - sesión 2 (phishing): códigos, enlaces y mensajes trampa;
 *   - sesión 3 (Escudo): la foto detective, los ajustes de privacidad, cómo
 *     reportar una suplantación y Google Lens.
 *
 * El grupo participa poco: votos con los dedos o levantando la mano, más
 * slides y menos conversación. Si nadie responde en 5 segundos, revelar.
 */

globalThis.META = {
  titulo: "Tu identidad es única",
  subtitulo: "Sesión 1 · Protégela — She Is Foundation",
  organiza: "She Is",
  apoya: "Sapientiam · ETITC",
  presupuesto: 60,
  bloques: {
    1: "Bloque 1 · Tu identidad digital",
    2: "Bloque 2 · Identidades falsas",
    3: "Bloque 3 · Piensa antes de compartir",
  },
  contacto: { nombre: "She Is Foundation", whatsapp: "+57 310 785 9540", correo: "info@she-is.org" },
  logos: [
    { src: "../img/she-is.png", nombre: "She Is Foundation", alto: 13 },
    { src: "../../_base/img/sapientiam.png", nombre: "Semillero<br>Sapientiam", oscuro: true },
    { src: "../../_base/img/etitc.png", nombre: "Escuela Tecnológica Instituto Técnico Central", alto: 9 },
  ],
  contexto: [
    "**Es la sesión 1 de She Is.** Mismo tema que la cohorte 1 (Canva en `fuente/`), con ejemplos de su edad. Abre la serie: presenta a Lumi, el voto con los dedos y los acuerdos.",
    "**Se queda en reconocer.** Los ajustes, cómo reportar y la foto detective son de la sesión 3; los códigos y los enlaces trampa, de la sesión 2. Si preguntan, «eso lo vemos en la próxima».",
    "**1 hora, sin pausa.** El grupo participa poco: preguntar, esperar 5 segundos y, si nadie responde, revelar y seguir.",
    "Sin dispositivos: toda la práctica es con maquetas en pantalla. Lo que se hace en casa va en la guía PDF.",
  ],
  quienOrganiza: "She Is Foundation",
  materiales: [
    "Computador + proyector (o TV) + extensión de pantalla, no espejo.",
    "Mandar la guía PDF a las familias después del taller.",
  ],
};

globalThis.SLIDES = [
  /* ═══════════════════════ BLOQUE 1 ═══════════════════════ */
  {
    id: "portada",
    bloque: 1,
    tema: "violeta",
    min: 0,
    tipo: "portada",
    titulo: "Tu identidad es única",
    bajada: "Protégela 🪞",
    nota: [
      "Mientras entran: esta slide en pantalla.",
      "Bienvenida: «esta es la primera de tres sesiones para cuidarnos en internet. Hoy empezamos por lo más importante: ustedes. Quiénes son en internet y cómo se cuida eso».",
    ],
  },
  {
    id: "lumi",
    bloque: 1,
    tema: "amarillo",
    min: 1,
    tipo: "mensaje",
    lumiGrande: "hola",
    titulo: "¡Hola! Soy Lumi",
    bajada: "En estas sesiones votamos con los dedos",
    chips: [
      { e: "☝️", t: "1 dedo" },
      { e: "✌️", t: "2 dedos" },
      { e: "🤟", t: "3 dedos" },
    ],
    nota: [
      "Presentar a Lumi: una búha guardiana que nos acompaña en las tres sesiones y aparece cuando hay algo importante.",
      "Cómo votamos: cuando haya opciones 1, 2 o 3, levantan esa cantidad de dedos. Nadie tiene que hablar si no quiere: con los dedos basta. Probar una vez: «¿cuántas vinieron con sueño? ☝️ sí, ✌️ no».",
    ],
  },
  {
    id: "acuerdos",
    bloque: 1,
    tema: "rosa",
    min: 3,
    tipo: "tarjetas",
    titulo: "Nuestros acuerdos",
    items: [
      { e: "🤫", k: "Lo que se dice aquí", v: "se queda aquí" },
      { e: "🙊", k: "Sin nombres reales", v: "decimos «una amiga»" },
      { e: "💜", k: "No hay preguntas tontas", v: "todas valen" },
      { e: "✋", k: "Puedo pasar", v: "si no quiero hablar" },
    ],
    nota: [
      "Leer cada acuerdo y pedir un pulgar arriba. Son los mismos para las tres sesiones.",
      "PROTOCOLO: si una niña cuenta algo que suena a riesgo real (acoso fuerte, alguien que le pide fotos, le ofrece dinero o encuentros, amenazas), NO profundizar frente al grupo. Agradecer, decir «hablemos al final» y hacerlo en privado. Luego informar a quien organiza para activar la ruta (orientación del colegio, Línea 141 ICBF, 123 si hay peligro inmediato).",
    ],
  },
  {
    id: "espejo",
    bloque: 1,
    tema: "turquesa",
    min: 5,
    tipo: "mensaje",
    emoji: "🪞",
    titulo: "Si internet fuera un espejo…",
    bajada: "¿qué mostraría de ti?",
    chips: [
      { e: "📸", t: "Tus fotos" },
      { e: "💬", t: "Lo que comentas" },
      { e: "🎮", t: "Tus juegos" },
      { e: "❤️", t: "Lo que te gusta" },
    ],
    revelar: true,
    nota: [
      "Es la pregunta de apertura de la cohorte 1. Dejarla en el aire 5 segundos antes de revelar.",
      "Revelar los chips uno por uno: «el espejo no solo muestra tu cara. Muestra lo que subes, lo que comentas, a qué juegas y hasta lo que te gusta».",
    ],
    preguntar: ["Piénsenlo sin decirlo: si alguien que no las conoce viera solo su perfil, ¿qué sabría de ustedes?"],
  },
  {
    id: "encuesta",
    bloque: 1,
    tema: "coral",
    min: 7,
    tipo: "encuesta",
    titulo: "¿Dónde tienes cuenta?",
    opciones: [
      { e: "💬", t: "WhatsApp" },
      { e: "📱", t: "TikTok o Instagram" },
      { e: "🎮", t: "Un juego" },
    ],
    nota: [
      "Leer cada opción y que levanten la mano. Pueden levantarla varias veces.",
      "Cerrar: «cada una de esas cuentas es un pedacito de tu identidad digital. Hoy vamos a ver qué dicen de ti».",
      "Si aparece que alguien tiene cuenta sin tener la edad mínima (13 años en TikTok e Instagram), no regañar: no es el momento. Lo importante es que la cuide.",
    ],
    preguntar: ["Levanten la mano: ¿quién tiene WhatsApp? ¿TikTok o Instagram? ¿Un juego?"],
  },
  {
    id: "que-es",
    bloque: 1,
    tema: "violeta",
    min: 9,
    tipo: "mensaje",
    emoji: "🌐",
    titulo: "¿Qué es tu identidad digital?",
    bajada: "Todo lo que internet dice de ti",
    chips: [
      { e: "📸", t: "Lo que tú publicas" },
      { e: "🏷️", t: "Lo que otros publican de ti" },
      { e: "👤", t: "Tu usuario, tu foto y tu bio" },
      { e: "👣", t: "El rastro que dejas sin darte cuenta" },
    ],
    revelar: true,
    nota: [
      "Definición de la cohorte 1: «tu identidad digital es todo lo que dice internet sobre ti».",
      "Lo que sorprende: no es solo lo que TÚ subes. También la foto del paseo en la que te etiquetó tu tía, el video del grupo del salón o el comentario que dejaste en un video hace un año.",
      "El rastro sin darte cuenta: los likes, lo que buscas, la ubicación que guardan algunas apps.",
      "Por eso es ÚNICA: nadie más tiene esa mezcla. Y por eso vale la pena cuidarla.",
    ],
  },
  {
    id: "seguro-peligroso",
    bloque: 1,
    tema: "coral",
    min: 11,
    tipo: "semaforo",
    titulo: "¿Seguro o peligroso?",
    items: [
      { t: "Mis gustos: dibujar, bailar, el fútbol", color: "verde" },
      { t: "Mi apodo o una foto de espaldas", color: "verde" },
      { t: "Mi cumpleaños completo: día, mes y año", color: "amarillo" },
      { t: "El nombre de mi colegio o de mi barrio", color: "rojo" },
      { t: "Una foto de mi tarjeta de identidad o del carné", color: "rojo" },
      { t: "Mi número de celular en la bio", color: "rojo" },
    ],
    nota: [
      "Es el «¿seguro o peligroso?» de la cohorte 1, en semáforo. Leer cada dato, que voten con los dedos (☝️ verde · ✌️ amarillo · 🤟 rojo) y clic para revelar.",
      "Verde: los gustos y los talentos cuentan quién eres sin decir dónde encontrarte. El apodo o la foto de espaldas son la versión segura de tu nombre y tu cara.",
      "Amarillo, el cumpleaños: celebrarlo está bien, pero día + mes + AÑO, junto con tu nombre y tu foto, es justo lo que se usa para hacerse pasar por ti o adivinar tus claves.",
      "Rojo: el colegio y el barrio dicen dónde encontrarte. La foto del documento o del carné es tu identidad completa en una imagen. El número de celular abre la puerta a mensajes de cualquiera.",
    ],
    respuesta: "🟢 · 🟢 · 🟡 · 🔴 · 🔴 · 🔴",
  },
  {
    id: "huella",
    bloque: 1,
    tema: "amarillo",
    min: 15,
    tipo: "mensaje",
    emoji: "👣",
    titulo: "Tu huella digital",
    bajada: "Internet nunca olvida, pero tú decides qué dejar",
    chips: [
      { e: "📷", t: "Una captura dura para siempre" },
      { e: "🔁", t: "Lo que mandas se puede reenviar" },
      { e: "💜", t: "También dejas huellas buenas" },
    ],
    revelar: true,
    nota: [
      "Frase de la cohorte 1: «internet nunca olvida, pero tú decides qué recordarás». Todo lo que compartes puede guardarse o compartirse.",
      "Borrar no borra las copias: si alguien ya lo guardó o lo reenvió, sigue ahí (lo vemos en el «verdad o mito»). Ejemplo: mandas un audio chistoso a tu mejor amiga. Ella se lo pasa a otra, esa a un grupo, y en un rato lo tienen personas que no conoces. Ya no depende de ti.",
      "Cerrar con la parte buena: la huella también puede ser algo de lo que te sientas orgullosa (tus dibujos, lo que sabes hacer, cómo tratas a los demás).",
    ],
    preguntar: ["¿Qué tipo de huella quieres dejar?"],
  },
  {
    id: "mitos-huella",
    bloque: 1,
    tema: "noche",
    min: 17,
    tipo: "mito",
    titulo: "¿Verdad o mito?",
    cartas: [
      { t: "Si borro una foto, desaparece de internet", es: "mito", porque: "Alguien pudo guardarla o hacerle captura antes" },
      { t: "Las historias de 24 horas se borran para siempre", es: "mito", porque: "Se les puede hacer captura o grabar la pantalla" },
      { t: "Lo que otros publican de mí también es mi identidad digital", es: "verdad", porque: "Por eso puedo pedir que borren una foto mía" },
    ],
    nota: [
      "Leer cada carta, votan con los dedos (☝️ verdad · ✌️ mito) y clic para voltearla.",
      "Historias: algunas apps avisan cuando alguien hace captura, pero no todas y no siempre, y nadie avisa si graban la pantalla con otro celular.",
      "La tercera prepara el quiz del bloque 3: tu imagen es tuya, aunque la haya subido otra persona.",
    ],
    respuesta: "Mito · Mito · Verdad",
  },

  /* ═══════════════════════ BLOQUE 2 ═══════════════════════ */
  {
    id: "fingir",
    bloque: 2,
    tema: "violeta",
    min: 21,
    tipo: "mensaje",
    emoji: "🎭",
    titulo: "Cualquiera puede fingir",
    bajada: "En internet, un perfil dice quién es, pero no lo prueba",
    chips: [
      { e: "👧", t: "«Tengo 12 años, como tú»" },
      { e: "⭐", t: "«Busco talentos y modelos»" },
      { e: "🎮", t: "«Soy moderador del juego»" },
    ],
    revelar: true,
    nota: [
      "Es la «suplantación / identidad falsa» de la cohorte 1: en internet, cualquiera puede fingir ser otra persona.",
      "Cualquiera puede poner la foto que quiera, la edad que quiera y el nombre que quiera. Crear una cuenta toma dos minutos y no piden documento.",
      "Los tres disfraces más comunes con niñas de su edad: alguien que dice tener su edad, alguien que promete fama o dinero, y alguien que dice tener autoridad en el juego.",
      "Hoy aprendemos a RECONOCERLOS. Cómo se reporta una cuenta falsa lo vemos en la sesión 3.",
    ],
  },
  {
    id: "perfiles",
    bloque: 2,
    tema: "turquesa",
    min: 23,
    tipo: "perfiles",
    titulo: "¿Cuál perfil es de verdad?",
    perfiles: [
      {
        usuario: "luna.kpop.12", e: "👧🏻", posts: 3, seguidores: 14, seguidos: 1840,
        bio: "12 añitos 💜 busco amigas nuevas, escríbeme al DM", comun: 0, falso: true,
        pistas: ["Cuenta nueva", "Sigue a miles", "0 amigas en común", "Te pide el DM"],
      },
      {
        usuario: "sara.futbol", e: "👧🏽", posts: 86, seguidores: 312, seguidos: 290,
        bio: "⚽ delantera · fan de Karol G", comun: 14, falso: false,
        pistas: ["Años publicando", "Amigas en común", "No pide nada"],
      },
      {
        usuario: "talentos.kids.oficial", e: "⭐", posts: 5, seguidores: 48, seguidos: 3200,
        bio: "Buscamos modelos de 10 a 15 años 📸 manda tus fotos al DM", comun: 2, falso: true,
        pistas: ["Pide fotos", "Busca niñas por edad", "Sigue a miles"],
      },
    ],
    nota: [
      "Ejercicio de detective: votan con los dedos cuál creen que es real y se revelan los tres, uno por clic.",
      "Las señales de un perfil falso: cuenta nueva con pocas publicaciones, sigue a muchísima gente y lo siguen pocos, no tiene amigas en común contigo y te pide algo (que le escribas, fotos, datos).",
      "Un «oficial» con 48 seguidores no es oficial. Nadie serio busca modelos niñas por mensaje directo: eso SIEMPRE se habla con tu adulto.",
      "Ninguna señal sola lo prueba, pero dos o tres juntas ya son para desconfiar.",
    ],
    preguntar: ["¿Cuál es el real? ☝️ ✌️ 🤟"],
    respuesta: "2 · @sara.futbol. Los otros dos tienen varias señales de perfil falso.",
  },
  {
    id: "te-escribe",
    bloque: 2,
    tema: "rosa",
    min: 27,
    tipo: "escenario",
    eyebrow: "¿Qué harías tú?",
    titulo: "Alguien nuevo te escribe",
    situacion: "@luna.kpop.12: «Me encantan tus dibujos 😍 ¿en qué colegio estudias? Mándame una foto tuya para conocernos»",
    opciones: [
      { t: "Le cuento, parece buena onda", pasa: "Ya sabe dónde encontrarte 😟" },
      { t: "Le mando una foto, pero sin decirle el colegio", pasa: "La foto ya no es tuya: puede guardarla y pasarla 📸" },
      { t: "No le mando nada y se lo cuento a mi adulto", pasa: "Tu adulto te ayuda a bloquearla y reportarla 💪", ok: true },
    ],
    nota: [
      "Revelar las consecuencias una por una.",
      "La opción 2 es la trampa más sutil: parece un punto medio, pero una foto tuya, en manos de alguien que no sabes quién es, ya no la controlas. Y el uniforme o el fondo pueden decir dónde estudias (eso lo vemos a fondo en la sesión 3).",
      "Fíjense cómo empieza: con un halago. Hacerte sentir especial es la forma de ganarse tu confianza rápido.",
    ],
    respuesta: "3 · No mandar nada y contarle a un adulto.",
  },
  {
    id: "antes-de-confiar",
    bloque: 2,
    tema: "amarillo",
    min: 30,
    tipo: "regla",
    titulo: "Antes de confiar",
    pasos: [
      { e: "🙅", k: "NO COMPARTAS", v: "fotos, ubicación ni datos con desconocidos" },
      { e: "🔎", k: "REVISA", v: "quién te escribe o te agrega" },
      { e: "🤝", k: "ACEPTA", v: "solo a quien conoces en persona" },
      { e: "🗣️", k: "CUÉNTALE", v: "a tu adulto si algo te incomoda" },
    ],
    nota: [
      "Son las tres reglas de la cohorte 1 (no compartas, revisa, cuéntale a un adulto) más una para ellas: aceptar solo a quien conocen en persona.",
      "Revelar una por una y que la repitan en voz alta: «¡protégete antes de confiar o compartir!».",
      "Contarle a un adulto NO es chismosear ni meterse en problemas. Si algo te hace sentir incómoda, rara o con miedo, ya es suficiente razón para contarlo.",
    ],
    preguntar: ["¿Cuál es la que más les cuesta?"],
  },

  /* ═══════════════════════ BLOQUE 3 ═══════════════════════ */
  {
    id: "piensa",
    bloque: 3,
    tema: "turquesa",
    min: 33,
    tipo: "regla",
    titulo: "Piensa antes de compartir",
    pasos: [
      { e: "⚠️", k: "¿ME PONE EN PELIGRO?", v: "a mí o a otras" },
      { e: "👀", k: "¿ESTARÍA BIEN?", v: "si mi adulto lo viera" },
      { e: "♾️", k: "¿PARA SIEMPRE?", v: "¿me importaría que se quede?" },
      { e: "🫂", k: "¿TENGO PERMISO?", v: "si sale otra persona" },
    ],
    nota: [
      "Son las tres preguntas de la cohorte 1 («¿podría ponerme en peligro a mí o a otros? ¿me sentiría cómoda si un adulto lo viera? ¿se quedará en internet para siempre?») más una cuarta: el permiso de las demás.",
      "Truco para recordarlo: si dudas en cualquiera de las cuatro, no lo publiques todavía. Espera y pregúntale a tu adulto.",
    ],
  },
  {
    id: "lo-publico",
    bloque: 3,
    tema: "coral",
    min: 35,
    tipo: "semaforo",
    titulo: "¿Lo publico?",
    items: [
      { t: "Un video de mi dibujo terminado", color: "verde" },
      { t: "Mi logro en el juego, con mi usuario y sin mi nombre real", color: "verde" },
      { t: "Una foto con mi familia en mi cuenta privada", color: "amarillo" },
      { t: "Una historia: «sola en casa toda la tarde 🏠»", color: "rojo" },
      { t: "Una foto de mi amiga dormida en la pijamada, para reírnos", color: "rojo" },
      { t: "Un audio contando el secreto de otra niña", color: "rojo" },
    ],
    nota: [
      "Aplicar las cuatro preguntas. Votan con los dedos y clic para revelar.",
      "Amarillo, la foto familiar: la cuenta privada ayuda, pero quien la ve puede hacerle captura. Pregunta: ¿están todos de acuerdo en que se publique?",
      "«Sola en casa»: dice justo lo que alguien con malas intenciones quiere saber.",
      "La pijamada y el secreto: aunque sea en chiste, es la identidad de OTRA niña. Falla la pregunta del permiso.",
    ],
    respuesta: "🟢 · 🟢 · 🟡 · 🔴 · 🔴 · 🔴",
  },
  {
    id: "foto-mia",
    bloque: 3,
    tema: "violeta",
    min: 39,
    tipo: "pregunta",
    eyebrow: "¿Qué harías tú?",
    situacion: "Tu amiga subió una foto tuya en la que no te gustas y ya tiene comentarios.",
    titulo: "¿Qué haces?",
    opciones: ["Subo una foto fea de ella", "Le pido en privado que la borre", "Nada, ya se subió"],
    correcta: 1,
    explica: "Tu imagen es tuya: puedes pedir que la borren. Y tú pides permiso antes de subir a otras.",
    nota: [
      "Conecta con la carta de «verdad o mito»: lo que otros publican de ti también es tu identidad.",
      "La opción 1 es venganza y deja otra huella fea, ahora tuya. La 3 parece fácil, pero sí puedes hacer algo.",
      "Si no la borra, o si la foto es para burlarse de ti, se lo cuentas a tu adulto: eso ya es otra cosa y tiene cómo resolverse.",
    ],
    preguntar: ["¿Qué harían? ☝️ ✌️ 🤟"],
    respuesta: "2 · Pedirle en privado que la borre.",
  },
  {
    id: "huella-buena",
    bloque: 3,
    tema: "amarillo",
    min: 42,
    tipo: "tarjetas",
    titulo: "Una huella de la que te sientas orgullosa",
    revelar: true,
    items: [
      { e: "🎨", k: "Muestra tus talentos", v: "sin decir dónde vives ni estudias" },
      { e: "🙋", k: "Usa un apodo", v: "en juegos y en cuentas públicas" },
      { e: "💬", k: "Comenta con respeto", v: "lo que escribes también es tu huella" },
      { e: "🤝", k: "Defiende a otras", v: "no compartas lo que las lastima" },
    ],
    nota: [
      "No se trata de desaparecer de internet ni de tenerle miedo: se trata de que lo que quede hable bien de ti.",
      "Pedir un ejemplo: «¿qué talento tuyo te gustaría mostrar?». Si nadie responde en 5 segundos, dar uno propio y seguir.",
    ],
    preguntar: ["¿Qué talento tuyo te gustaría mostrar?"],
  },
  {
    id: "reflexion",
    bloque: 3,
    tema: "noche",
    min: 45,
    tipo: "tarjetas",
    titulo: "Reflexión final",
    revelar: true,
    items: [
      { e: "🪞", k: "Tu identidad digital es tu reflejo", v: "¡cuídala!" },
      { e: "💜", k: "Protegerte no es tener miedo", v: "es quererte" },
      { e: "🗣️", k: "Cada publicación habla por ti", v: "incluso cuando no estás" },
    ],
    nota: [
      "Son las tres frases de la reflexión final de la cohorte 1. Revelarlas despacio, una por una.",
      "Preguntar cuál se llevan. Votan con los dedos: ☝️ la primera, ✌️ la segunda, 🤟 la tercera.",
    ],
    preguntar: ["¿Cuál se llevan? ☝️ ✌️ 🤟"],
  },
  {
    id: "lineas",
    bloque: 3,
    tema: "turquesa",
    min: 48,
    tipo: "lineas",
    titulo: "Siempre hay ayuda",
    lineas: [
      { n: "141", k: "ICBF", v: "Gratis · 24 horas" },
      { n: "123", k: "Emergencias", v: "Policía · peligro ya" },
      { n: "155", k: "Línea Mujer", v: "Orientación · 24 horas" },
      { n: "🌐", k: "teprotejo.org", v: "Reporta contenido" },
      { n: "🚓", k: "CAI Virtual", v: "caivirtual.policia​.gov.co" },
    ],
    nota: [
      "Leer rápido. Aclarar para qué sirve cada una con un ejemplo de hoy: un perfil que les pide fotos o las presiona → contarle al adulto y, si hay amenazas, CAI Virtual. Fotos de niñas publicadas en redes → Te Protejo. Alguien que quiere verlas en persona o las sigue → 123.",
      "Si el taller es en Bogotá, mencionar la Línea 106 (orientación para niñas, niños y adolescentes).",
    ],
  },
  {
    id: "cierre",
    bloque: 3,
    tema: "rosa",
    min: 51,
    tipo: "cierre",
    titulo: "¡Mi identidad es única!",
    chips: [
      { e: "🪞", t: "Sé qué dice internet de mí" },
      { e: "🚦", t: "Cuido mis datos" },
      { e: "🎭", t: "Desconfío de perfiles nuevos" },
      { e: "🤔", t: "Pienso antes de compartir" },
    ],
    nota: [
      "Las cuatro ideas de hoy, en voz alta.",
      "Espacio de preguntas (el «¿preguntas?» de la cohorte 1). Si nadie pregunta, está bien: recordar que pueden escribirle a su adulto o a She Is.",
      "Anunciar la próxima sesión: phishing, los mensajes trampa que se hacen pasar por Roblox, TikTok o una amiga para robar cuentas.",
      "Recordar que la guía PDF les llega a sus familias.",
    ],
  },
];
