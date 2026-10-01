// Encuentra los talleres del repo: toda carpeta con content.js, salvo las que
// empiezan por «_» (motor y plantilla) o por punto. Lo usan catalogo.mjs y
// verificar.mjs.
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export function carpetas(dir = RAIZ) {
  const hijas = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !/^[._]|^node_modules$/.test(d.name))
    .map((d) => join(dir, d.name))
    .sort();
  return hijas.flatMap((h) => (existsSync(join(h, "content.js")) ? [h] : carpetas(h)));
}

// Ruta del taller desde la raíz, con «/» también en Windows (va a la web)
export const ruta = (carpeta) => relative(RAIZ, carpeta).split(sep).join("/");

// content.js deja META y SLIDES en globalThis: se leen y se limpian para
// que un taller no herede los datos del anterior. Node importa cada archivo
// una sola vez, así que lo leído se guarda.
const leidos = new Map();
export async function leer(carpeta) {
  if (!leidos.has(carpeta)) {
    delete globalThis.META;
    delete globalThis.SLIDES;
    await import(pathToFileURL(join(carpeta, "content.js")).href);
    const { META, SLIDES } = globalThis;
    leidos.set(carpeta, { META, SLIDES });
  }
  return leidos.get(carpeta);
}
