/**
 * Dev-only — captures each route as a single tall PDF.
 *
 * Pre-reqs:
 *   1. `npm run dev` running on http://localhost:3000 (or set PDF_BASE_URL)
 *   2. `npm install --save-dev puppeteer`
 *
 * Run: node scripts/generate-pdfs.mjs
 * Output: ./pdfs/<route>.pdf
 */

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.PDF_BASE_URL ?? "http://localhost:3001";
const VIEWPORT_WIDTH = 1280;
const OUT_DIR = "pdfs";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/services", name: "services" },
  { path: "/products", name: "products" },
  { path: "/products/knee", name: "products-knee" },
  { path: "/products/knee/ski", name: "products-knee-ski" },
  { path: "/products/knee/skii", name: "products-knee-skii" },
  { path: "/products/knee/hrsk", name: "products-knee-hrsk" },
  { path: "/products/knee/rsk", name: "products-knee-rsk" },
  { path: "/products/hip", name: "products-hip" },
  { path: "/products/spine", name: "products-spine" },
  { path: "/products/trauma", name: "products-trauma" },
  { path: "/products/arthroscopy", name: "products-arthroscopy" },
  { path: "/products/arthroscopy/knee", name: "products-arthroscopy-knee" },
  { path: "/products/arthroscopy/shoulder", name: "products-arthroscopy-shoulder" },
  { path: "/products/arthroscopy/fibers-tapes", name: "products-arthroscopy-fibers-tapes" },
  { path: "/contact", name: "contact" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch();
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: VIEWPORT_WIDTH, height: 800, deviceScaleFactor: 1 });
      const url = `${BASE}${route.path}?pdf=1`;
      console.log(`→ ${url}`);
      await page.goto(url, { waitUntil: "networkidle0" });
      await page.evaluateHandle("document.fonts.ready");
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const out = path.join(OUT_DIR, `${route.name}.pdf`);
      await page.pdf({
        path: out,
        width: `${VIEWPORT_WIDTH}px`,
        height: `${height}px`,
        printBackground: true,
        pageRanges: "1",
      });
      await page.close();
      console.log(`  ✓ ${out}`);
    }
  } finally {
    await browser.close();
  }
  console.log(`\nDone. ${ROUTES.length} PDFs written to ./${OUT_DIR}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
