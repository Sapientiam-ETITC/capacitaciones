/* Genera talleres.js en la raíz: la lista que muestra el catálogo (index.html).
 *
 *   pnpm catalogo
 *
 * Sale del META de cada content.js y de los archivos que hay en la carpeta.
 * NO se edita a mano. Es un .js y no un .json para que el catálogo también
 * abra con doble clic (en file:// no se puede hacer fetch).
 */
import { existsSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { RAIZ, carpetas, leer, ruta } from "./talleres.mjs";

export async function catalogo() {
  const talleres = [];
  for (const carpeta of carpetas()) {
    const { META, SLIDES } = await leer(carpeta);
    const r = ruta(carpeta);
    const hay = (f) => existsSync(join(carpeta, f));
    // Logo de la organización: el primero propio del taller. Los claros
    // (`oscuro`) no se ven sobre la tarjeta blanca; sin logo, va el nombre.
    const logo = META.logos?.find((l) => !l.oscuro && !l.src.includes("_base/"));
    talleres.push({
      ruta: r,
      grupo: r.split("/")[0],
      titulo: META.titulo,
      subtitulo: META.subtitulo ?? "",
      organiza: META.organiza,
      minutos: META.presupuesto,
      slides: SLIDES.length,
      // Las rutas de META.logos son relativas a la página del taller
      logo: logo ? posix.normalize(`${r}/${logo.src}`) : null,
      presentacion: hay("presentacion.pdf"),
      guia: hay("guia.pdf"),
      guion: hay("guion.md"),
    });
  }
  return `// Generado por _base/herramientas/catalogo.mjs (pnpm catalogo). No editar a mano.\nglobalThis.TALLERES = ${JSON.stringify(talleres, null, 2)};\n`;
}

if (import.meta.main) {
  const js = await catalogo();
  writeFileSync(join(RAIZ, "talleres.js"), js, "utf8");
  console.log(`talleres.js — ${js.match(/"ruta"/g)?.length ?? 0} talleres`);
}
