/* Genera todas las salidas de un taller y actualiza el catálogo.
 *
 *   pnpm pdf mi-taller
 *
 * guion.md → presentacion.pdf (~1 min) → guia.pdf (si hay guia.html) → talleres.js
 * Necesita Google Chrome instalado.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { RAIZ } from "./talleres.mjs";

const aqui = dirname(fileURLToPath(import.meta.url));
const taller = resolve(RAIZ, process.argv[2] ?? "");
if (!process.argv[2] || !existsSync(join(taller, "content.js"))) {
  console.error("Uso: pnpm pdf <carpeta-del-taller>   (la que tiene content.js)");
  process.exit(1);
}

const correr = (herramienta, ...args) => {
  const r = spawnSync(process.execPath, [join(aqui, herramienta), ...args], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

correr("guion.mjs", taller);
correr("deck-pdf.mjs", taller);
if (existsSync(join(taller, "guia.html"))) correr("guia-pdf.mjs", taller);
correr("catalogo.mjs");
