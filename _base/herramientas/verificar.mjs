/* Revisa que cada taller esté completo antes de publicarlo.
 *
 *   pnpm verificar
 *
 * Errores (✗) impiden publicar; avisos (!) no. Corre también en cada PR.
 * No reemplaza mirar el taller: un texto que se sale de la slide no da error.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { catalogo } from "./catalogo.mjs";
import { RAIZ, carpetas, leer, ruta } from "./talleres.mjs";

// Los tipos y los temas se leen del motor para no declararlos dos veces
const TIPOS = [...readFileSync(join(RAIZ, "_base/js/deck.js"), "utf8").matchAll(/^  (\w+): \(s\) =>/gm)].map((m) => m[1]);
const TEMAS = [...new Set([...readFileSync(join(RAIZ, "_base/css/deck.css"), "utf8").matchAll(/data-tema="(\w+)"/g)].map((m) => m[1]))];
const META_OBLIGATORIO = ["titulo", "subtitulo", "organiza", "apoya", "presupuesto", "bloques"];

let errores = 0;

for (const carpeta of carpetas()) {
  const mal = [], avisos = [];
  const hay = (f) => existsSync(join(carpeta, f));
  let META, SLIDES;
  try {
    ({ META, SLIDES } = await leer(carpeta));
  } catch (e) {
    mal.push(`content.js no carga: ${e.message}`);
  }

  if (!META || !Array.isArray(SLIDES)) mal.push("content.js debe definir globalThis.META y globalThis.SLIDES");
  else {
    META_OBLIGATORIO.filter((k) => META[k] == null).forEach((k) => mal.push(`META.${k} falta`));
    const ids = new Set();
    SLIDES.forEach((s, i) => {
      const n = `slide ${i + 1} (${s.id ?? "sin id"})`;
      if (!s.id) mal.push(`${n}: falta id`);
      else if (ids.has(s.id)) mal.push(`${n}: id repetido`);
      ids.add(s.id);
      if (!TIPOS.includes(s.tipo)) mal.push(`${n}: tipo «${s.tipo}» no existe (ver _base/TIPOS.md)`);
      if (!TEMAS.includes(s.tema)) mal.push(`${n}: tema «${s.tema}» no existe (${TEMAS.join(", ")})`);
      if (!s.titulo) mal.push(`${n}: falta titulo`);
      if (!Array.isArray(s.nota)) mal.push(`${n}: nota debe ser una lista (puede estar vacía)`);
      if (typeof s.min !== "number") mal.push(`${n}: falta min`);
      else if (i > 0 && s.min < SLIDES[i - 1].min) avisos.push(`${n}: min ${s.min} es menor que el de la slide anterior`);
      if (!META.bloques?.[s.bloque]) mal.push(`${n}: bloque ${s.bloque} no está en META.bloques`);
    });
    const ultimo = SLIDES.at(-1)?.min;
    if (ultimo > META.presupuesto) avisos.push(`la última slide empieza en el min ${ultimo} y el presupuesto es ${META.presupuesto}`);
  }

  if (!hay("index.html")) mal.push("falta index.html");
  for (const f of ["guion.md", "presentacion.pdf"]) if (!hay(f)) mal.push(`falta ${f} (pnpm pdf ${ruta(carpeta)})`);
  if (hay("guia.html") && !hay("guia.pdf")) mal.push(`falta guia.pdf (pnpm pdf ${ruta(carpeta)})`);
  if (!hay("guia.html")) avisos.push("sin guía para llevar a casa (opcional)");

  console.log(`${mal.length ? "✗" : "✓"} ${ruta(carpeta)}${SLIDES ? ` · ${SLIDES.length} slides` : ""}`);
  mal.forEach((m) => console.log(`    ✗ ${m}`));
  avisos.forEach((a) => console.log(`    ! ${a}`));
  errores += mal.length;
}

const archivo = join(RAIZ, "talleres.js");
if (!existsSync(archivo) || readFileSync(archivo, "utf8") !== (await catalogo())) {
  console.log("✗ talleres.js está desactualizado: corre pnpm catalogo");
  errores++;
}

if (errores) {
  console.log(`\n${errores} error(es).`);
  process.exit(1);
}
console.log("\nTodo en orden.");
