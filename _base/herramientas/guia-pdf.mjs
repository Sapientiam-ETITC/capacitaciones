// Genera guia.pdf a partir de guia.html con Chrome sin ventana.
// Uso: node ../_base/herramientas/guia-pdf.mjs  (desde la carpeta del taller)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find(existsSync);
if (!CHROME) throw new Error("No encontré Chrome");

// Carpeta del taller: argumento o la carpeta actual
const raiz = resolve(process.argv[2] ?? ".");
execFileSync(CHROME, [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
  "--virtual-time-budget=5000", // da tiempo a que carguen las fuentes de Google
  `--print-to-pdf=${resolve(raiz, "guia.pdf")}`,
  `file://${resolve(raiz, "guia.html")}`,
], { stdio: "ignore" });
console.log("guia.pdf listo");
