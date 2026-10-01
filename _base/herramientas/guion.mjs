/* Genera guion.md a partir del content.js de un taller.
 *
 *   node ../_base/herramientas/guion.mjs            (desde la carpeta del taller)
 *   node _base/herramientas/guion.mjs <carpeta>
 *
 * El guion NO se edita a mano: se edita `content.js` y se vuelve a generar.
 * Si se editan los dos por separado, en el taller se dice una cosa y se
 * proyecta otra.
 */
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const taller = resolve(process.argv[2] ?? ".");
await import(join(taller, "content.js"));   // define globalThis.META / .SLIDES
const { META, SLIDES } = globalThis;

const pad = (n) => String(n).padStart(2, "0");
// En el guion (texto plano) el escudo de marca vuelve a ser emoji
const sinTokens = (t) => String(t).split("{escudo}").join("🛡️");
const hhmm = (m) => `${Math.floor(m / 60)}:${pad(m % 60)}`;
const DEDOS = ["☝️", "✌️", "🤟"];

// Qué se proyecta, para que quien facilita sepa qué está viendo la sala
function enPantalla(s) {
  const x = [];
  if (s.situacion) x.push(`_«${s.situacion}»_`);
  if (s.bajada) x.push(s.bajada);
  if (s.chips) x.push(s.chips.map((c) => `${c.e} ${c.t}`).join(" · "));
  if (s.opciones) x.push(s.opciones.map((o, k) =>
    typeof o === "string" ? `${DEDOS[k]} ${o}` : o.e ? `${o.e} ${o.t}` : `${DEDOS[k]} ${o.t} → ${o.pasa}${o.ok ? " ⭐" : ""}`).join("  \n"));
  if (s.items) x.push(s.items.map((i) => i.k ? `${i.e} **${i.k}** ${i.v}` : `${{ verde: "🟢", amarillo: "🟡", rojo: "🔴" }[i.color]} ${i.t}`).join("  \n"));
  if (s.cartas) x.push(s.cartas.map((c) => `«${c.t}» → **${c.es.toUpperCase()}**: ${c.porque}`).join("  \n"));
  if (s.mensajes) x.push(s.mensajes.map((m) => `💬 ${m.t} → 🚩 ${m.pista}`).join("  \n"));
  if (s.pasos) x.push(s.pasos.map((p) => `${p.e} **${p.k}** ${p.v}`).join("  \n"));
  if (s.perfiles) x.push(s.perfiles.map((p, k) => `${DEDOS[k]} @${p.usuario} → **${p.falso ? "FALSO" : "REAL"}** (${p.pistas.join(", ")})`).join("  \n"));
  if (s.lineas) x.push(s.lineas.map((l) => `**${l.n}** ${l.k} · ${l.v}`).join("  \n"));
  if (s.consejos) x.push(s.consejos.map((c) => c.t).join(" · "));
  if (s.cifra) x.push(`**${s.cifra}** ${s.titulo} · ${s.detalle}  \n_Fuente: ${s.fuente}_`);
  if (s.pistas) x.push(`📸 @${s.usuario} · ${s.lugar} · «${s.texto}»  \n` + s.pistas.map((p, k) => `📍${k + 1} ${p.t}`).join("  \n"));
  if (s.partes) x.push(s.partes.map((p) => `**${p.t}** (${p.k})`).join(" "));
  if (s.correos) x.push(s.correos.map((c) => `✉️ De **${c.de}** · «${c.asunto}» · para \`${c.para}\` → ${c.veredicto}`).join("  \n"));
  if (s.campos) x.push(s.campos.map((c) => `${c.e} **${c.k}**${c.v ? ` ${c.v}` : ""}: ______`).join("  \n"));
  if (s.explica) x.push(`💡 ${s.explica}`);
  return x;
}

const L = [];

L.push(`# Guion — ${META.titulo}`);
L.push("");
L.push(`> ${META.subtitulo}  `);
L.push(`> **${META.organiza}** · con el apoyo de ${META.apoya}  `);
const pausa = SLIDES.find((s) => s.tipo === "pausa");
L.push(`> Duración: **${META.presupuesto} minutos**${pausa ? ` (con pausa de ${pausa.minutos})` : " (sin pausa)"} · ${SLIDES.length} slides`);
L.push("");
L.push("---");
L.push("");
L.push("## Cómo usar este guion");
L.push("");
L.push("- Se genera desde `content.js`. **No editarlo a mano**: cambiar el contenido ahí y correr `node ../_base/herramientas/guion.mjs` desde la carpeta del taller.");
L.push("- La columna **min** es la marca de tiempo objetivo. Si una slide se corre más de dos minutos, se acorta la conversación, no el taller.");
L.push("- En la presentación: **P** abre la vista presentador (este guion + cronómetro) en otra ventana. **N** abre el guion al lado de la slide. **F** pantalla completa.");
L.push("- Muchas slides revelan cosas con cada clic (respuestas, banderas rojas, tarjetas). Primero se pregunta, después se revela.");
L.push("- Votación sin materiales: ☝️ 1 dedo · ✌️ 2 dedos · 🤟 3 dedos.");
(META.contexto ?? []).forEach((c) => L.push(`- ${c}`));
L.push("");
L.push("## ⚠️ Protocolo si una niña cuenta algo");
L.push("");
L.push("1. **No profundizar frente al grupo.** Agradecer y decir «hablemos al final».");
L.push("2. Hablar en privado, escuchar sin juzgar, no prometer guardar el secreto si hay riesgo.");
L.push(`3. Informar a quien organiza por parte de ${META.quienOrganiza ?? META.organiza} para activar la ruta: orientación escolar, **Línea 141 ICBF** o **123** si hay peligro inmediato.`);
L.push("4. Nunca pedir que muestre fotos o mensajes delante de otras personas.");
L.push("");
if (META.materiales?.length) {
  L.push("## Materiales");
  L.push("");
  META.materiales.forEach((m) => L.push(`- ${m}`));
  L.push("");
}

L.push("## Escaleta");
L.push("");
L.push("| # | min | Hora | Slide | Tipo |");
L.push("|---|---|---|---|---|");
let bloque = 0;
SLIDES.forEach((s, i) => {
  if (s.bloque !== bloque) {
    bloque = s.bloque;
    L.push(`| | | | **${META.bloques[bloque]}** | |`);
  }
  L.push(`| ${pad(i + 1)} | ${s.min} | ${hhmm(s.min)} | ${s.titulo} | ${s.tipo} |`);
});
L.push("");
L.push("---");
L.push("");

bloque = 0;
SLIDES.forEach((s, i) => {
  if (s.bloque !== bloque) {
    bloque = s.bloque;
    L.push(`# ${META.bloques[bloque]}`);
    L.push("");
  }
  L.push(`## ${pad(i + 1)} · ${s.titulo}`);
  L.push("");
  L.push(`\`min ${s.min}\` · _${s.tipo}_${s.eyebrow ? ` · ${s.eyebrow}` : ""}`);
  L.push("");
  const p = enPantalla(s);
  if (p.length) { L.push("**En pantalla:**  \n" + p.join("  \n")); L.push(""); }
  if (s.preguntar) { s.preguntar.forEach((q) => L.push(`> ❓ **${q}**  `)); L.push(""); }
  if (s.respuesta) { L.push(`✅ **Respuesta:** ${s.respuesta}`); L.push(""); }
  s.nota.forEach((n) => { L.push(`- ${n}`); });
  L.push("");
  L.push("---");
  L.push("");
});

writeFileSync(join(taller, "guion.md"), sinTokens(L.join("\n")), "utf8");
console.log(`guion.md — ${SLIDES.length} slides · ${META.presupuesto} min`);
