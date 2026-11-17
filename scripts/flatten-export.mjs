/**
 * Post-build step for the static export (GitHub Pages).
 *
 * Next 16's export writes route-segment prefetch payloads as nested folders
 * (e.g. out/products/__next.products/arthroscopy/$d$area/__PAGE__.txt), but the
 * client requests them by flat dotted names
 * (out/products/__next.products.arthroscopy.$d$area.__PAGE__.txt), which 404 on a
 * plain static host. This copies each nested file to its flat name (originals kept).
 *
 * Run: node scripts/flatten-export.mjs [outDir]   (default: out)
 */
import { readdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT = process.argv[2] ?? "out";
let copied = 0;

async function filesUnder(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await filesUnder(p)));
    else out.push(p);
  }
  return out;
}

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      // Flatten everything under this segment folder into its parent directory.
      for (const f of await filesUnder(p)) {
        const rel = path.relative(p, f).split(path.sep).join(".");
        const flat = path.join(dir, `${e.name}.${rel}`);
        try { await stat(flat); } catch { await copyFile(f, flat); copied++; }
      }
    } else {
      await walk(p);
    }
  }
}

await walk(OUT);
console.log(`flatten-export: ${copied} prefetch files copied to flat names`);
