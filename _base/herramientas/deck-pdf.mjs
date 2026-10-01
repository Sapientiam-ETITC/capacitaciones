// Genera presentacion.pdf: una slide por página, con todo revelado.
// Uso: node ../_base/herramientas/deck-pdf.mjs  (desde la carpeta del taller)   (un par de minutos: una captura por slide)
//
// Imprimir las 39 slides de una vez hace que Chrome sin ventana se caiga sin
// escribir nada. Por eso: captura de cada slide (index.html?imprimir#id) a 2x y
// después se imprime una página que solo tiene esas imágenes.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { setTimeout as esperar } from "node:timers/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find(existsSync);
if (!CHROME) throw new Error("No encontré Chrome");

// Carpeta del taller: argumento o la carpeta actual
const raiz = resolve(process.argv[2] ?? ".");
await import(resolve(raiz, "content.js"));
const { SLIDES } = globalThis;

const tmp = mkdtempSync(join(tmpdir(), "deck-pdf-"));
// Chrome sin ventana escribe el archivo pero a veces no se cierra solo:
// se espera a que el archivo exista y deje de crecer, y se cierra a mano.
async function chrome(args, archivo) {
  const p = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${join(tmp, "perfil")}`, ...args,
  ], { stdio: "ignore" });
  const cerrado = new Promise((ok) => p.on("exit", ok));
  let tam = -1;
  for (const limite = Date.now() + 90_000; Date.now() < limite; await esperar(500)) {
    const ahora = existsSync(archivo) ? statSync(archivo).size : 0;
    if (ahora > 0 && ahora === tam) break;
    tam = ahora;
  }
  p.kill();
  await cerrado;
  if (!existsSync(archivo)) throw new Error(`Chrome no escribió ${archivo}`);
}

for (const [i, s] of SLIDES.entries()) {
  await chrome([
    "--window-size=1280,720", "--force-device-scale-factor=2", "--virtual-time-budget=4000",
    `--screenshot=${join(tmp, `${i}.png`)}`,
    `file://${resolve(raiz, "index.html")}?imprimir#${s.id}`,
  ], join(tmp, `${i}.png`));
  process.stdout.write(`\r${i + 1}/${SLIDES.length} ${s.id}`.padEnd(40));
}

writeFileSync(join(tmp, "deck.html"), `<!doctype html><style>
  @page { size: 1280px 720px; margin: 0; } body { margin: 0; }
  img { display: block; width: 1280px; height: 720px; break-after: page; }
</style>${SLIDES.map((_, i) => `<img src="${i}.png">`).join("")}`);
const pdf = resolve(raiz, "presentacion.pdf");
rmSync(pdf, { force: true });
await chrome(["--no-pdf-header-footer", `--print-to-pdf=${pdf}`, `file://${join(tmp, "deck.html")}`], pdf);

rmSync(tmp, { recursive: true, force: true });
console.log("\npresentacion.pdf listo");
