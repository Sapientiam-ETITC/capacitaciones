/* Crea un taller nuevo a partir de _plantilla.
 *
 *   pnpm nuevo mi-taller
 *   pnpm nuevo mi-serie/sesion-1     (una sesión dentro de una serie)
 *
 * Copia la plantilla y ajusta las rutas al motor según la profundidad de la
 * carpeta (../_base, ../../_base…). Después solo se escribe content.js.
 */
import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { RAIZ } from "./talleres.mjs";

const nombre = (process.argv[2] ?? "").replace(/\/+$/, "");
const partes = nombre.split("/");
if (!nombre || !partes.every((p) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p))) {
  console.error("Uso: pnpm nuevo <carpeta>   (minúsculas, números y guiones: mi-taller o mi-serie/sesion-1)");
  process.exit(1);
}
const destino = join(RAIZ, ...partes);
if (existsSync(destino)) {
  console.error(`Ya existe ${nombre}. Elige otro nombre.`);
  process.exit(1);
}

cpSync(join(RAIZ, "_plantilla"), destino, { recursive: true });

const base = `${"../".repeat(partes.length)}_base`;
for (const f of readdirSync(destino).filter((f) => /\.(html|js|md)$/.test(f))) {
  const archivo = join(destino, f);
  writeFileSync(archivo, readFileSync(archivo, "utf8").split("../_base").join(base), "utf8");
}

console.log(`Listo: ${nombre}/

  1. Abre ${nombre}/index.html con doble clic: ya es un taller que funciona.
  2. Escribe tu contenido en ${nombre}/content.js (tipos de slide: _base/TIPOS.md).
  3. pnpm pdf ${nombre}   → guion.md, presentacion.pdf y guia.pdf, y lo suma al catálogo.`);
