/**
 * Imports the hand-made brochure HTML pages into typed product data.
 *
 * Reads each brochure page in a headless browser, extracts its content
 * (hero, facts, section chips, product sections, spec tables, benefits…)
 * into src/lib/products/data/<slug>.ts, and re-encodes every referenced
 * image as WebP into public/products/<category>/.
 *
 * The generated data files are not meant to be hand-edited — change the
 * brochure HTML and re-run this script instead.
 *
 * Run:  node scripts/import-brochure-pages.mjs "H:/My Drive/brochure/website"
 * Browser: uses BROWSER_PATH, else Microsoft Edge, else puppeteer's bundled Chrome.
 */

import puppeteer from "puppeteer";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SRC = process.argv[2];
if (!SRC) {
  console.error('Usage: node scripts/import-brochure-pages.mjs "<brochure website folder>"');
  process.exit(1);
}

/** Brochure page → route slug + category. Add new pages here. */
const PAGES = [
  { file: "knee/knee page/ski.html", slug: "ski", category: "knee" },
  { file: "knee/knee page/skii.html", slug: "skii", category: "knee" },
  { file: "knee/knee page/hrsk.html", slug: "hrsk", category: "knee" },
  { file: "knee/knee page/rsk.html", slug: "rsk", category: "knee" },
  { file: "Hip/HIP pages/hip.html", slug: "hip", category: "hip" },
  { file: "spine/SPINE/spine.html", slug: "spine", category: "spine" },
];

const DATA_DIR = "src/lib/products/data";
const IMG_DIR = "public/products";
const MAX_IMG_EDGE = 1400;
const WEBP_QUALITY = 0.86;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function browserPath() {
  if (process.env.BROWSER_PATH) return process.env.BROWSER_PATH;
  for (const p of [
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ]) if (await exists(p)) return p;
  return undefined;
}

/** Runs inside the brochure page. Returns the page content as plain data. */
function extract() {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();
  /** Text with <em> runs wrapped in *asterisks* (rendered as accent colour). */
  const marked = (el) => {
    if (!el) return "";
    const c = el.cloneNode(true);
    c.querySelectorAll(".sr").forEach((n) => n.remove());
    c.querySelectorAll("em").forEach((em) => em.replaceWith(`*${em.textContent}*`));
    return clean(c.textContent);
  };
  const base = (src) => src.split("/").pop();

  const cell = (el) => {
    const c = el.cloneNode(true);
    const small = c.querySelector("small");
    small?.remove();
    const out = { t: clean(c.textContent) };
    if (small) out.small = clean(small.textContent);
    if (el.tagName === "TH") out.h = true;
    if (el.querySelector("span[aria-label='not available']") || el.classList.contains("na")) { out.na = true; out.t = ""; }
    if (el.rowSpan > 1) out.rowSpan = el.rowSpan;
    if (el.colSpan > 1) out.colSpan = el.colSpan;
    if (el.classList.contains("mat-cell")) out.mat = true;
    return out;
  };

  const photo = (fig) => {
    const img = q("img", fig);
    const fs = getComputedStyle(fig);
    const is = img ? getComputedStyle(img) : null;
    return {
      image: img ? base(img.getAttribute("src")) : null,
      alt: img?.getAttribute("alt") ?? "",
      badge: clean(q(".badge", fig)?.textContent) || null,
      bg: fs.backgroundColor,
      bordered: fs.borderTopStyle !== "none" && parseFloat(fs.borderTopWidth) > 0,
      aspect: fs.aspectRatio.replace(/\s/g, "") === "1/1" ? "1/1" : "4/3",
      fit: is?.objectFit === "cover" ? "cover" : "contain",
      padded: is ? parseFloat(is.paddingTop) > 0 : true,
      multiply: is?.mixBlendMode === "multiply",
    };
  };

  const product = (sec) => {
    const table = q("table.spec", sec);
    return {
      id: sec.id,
      photo: photo(q("figure.photo", sec)),
      num: clean(q(".num", sec)?.textContent),
      name: clean(q("h2", sec)?.textContent),
      desc: clean(q(".desc", sec)?.textContent),
      feats: qa(".feats li", sec).map((li) => clean(li.textContent)),
      material: clean([...(q(".mat", sec)?.childNodes ?? [])].filter((n) => !(n.nodeType === 1 && n.tagName === "SPAN")).map((n) => n.textContent).join("")),
      enquireLabel: clean(q(".info .btn", sec)?.textContent) || "Enquire",
      spec: table ? {
        caption: clean(q("caption", table)?.textContent),
        head: qa("thead tr", table).map((tr) => qa("th,td", tr).map(cell)),
        rows: qa("tbody tr", table).map((tr) => qa("th,td", tr).map(cell)),
      } : null,
    };
  };

  const secHead = (sec) => ({ title: marked(q(".sec-head h2", sec)), intro: clean(q(".sec-head p", sec)?.textContent) });

  const blocks = [];
  for (const el of q("main").children) {
    if (el.matches("section.group")) {
      blocks.push({ kind: "group", id: el.id, ...secHead(el), products: qa("section.product", el).map(product) });
    } else if (el.matches("section.product")) {
      blocks.push({ kind: "product", product: product(el) });
    } else if (el.matches("section.sec")) {
      if (q(".chain", el)) {
        blocks.push({ kind: "chain", id: el.id || null, ...secHead(el), items: qa(".chain li", el).map((li) => ({ k: clean(q(".k", li)?.textContent), title: clean(q("h3", li)?.textContent), body: clean(q("p", li)?.textContent) })) });
      } else if (q(".construct", el)) {
        const fig = q(".construct-photo", el);
        const img = q("img", fig);
        const body = q(".construct > div", el);
        blocks.push({
          kind: "construct", id: el.id || null,
          image: base(img.getAttribute("src")), alt: img.getAttribute("alt") ?? "",
          white: fig.classList.contains("white"),
          tag: clean(q(".tag", body)?.textContent), title: marked(q("h2", body)),
          body: qa("p:not(.tag)", body).map((p) => clean(p.textContent)),
          feats: qa(".feats li", body).map((li) => clean(li.textContent)),
        });
      } else if (q("table.compare", el)) {
        const t = q("table.compare", el);
        blocks.push({
          kind: "compare", id: el.id || null, ...secHead(el),
          cols: qa("thead th", t).slice(1).map((th) => clean(th.textContent)),
          rows: qa("tbody tr", t).map((tr) => ({ label: clean(q("th", tr).textContent), values: qa("td", tr).map((td) => clean(td.textContent)) })),
        });
      } else if (q(".benefits", el)) {
        blocks.push({ kind: "benefits", id: el.id || null, ...secHead(el), items: qa(".benefits li", el).map((li) => ({ title: clean(q("h3", li)?.textContent), body: clean(q("p", li)?.textContent) })) });
      }
    }
  }

  const band = q(".cta-band");
  const crumbsEl = q(".crumbs");
  const lastCrumb = clean([...crumbsEl.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(""));

  return {
    meta: { title: clean(document.title), description: q('meta[name="description"]')?.content ?? "" },
    crumb: lastCrumb,
    tag: clean(q(".hero .tag")?.textContent),
    title: marked(q(".hero h1")),
    lead: clean(q(".hero .lead")?.textContent),
    secondaryCta: (() => { const a = q(".hero .ctas .btn-out"); return a ? { label: clean(a.textContent), href: a.getAttribute("href") } : null; })(),
    facts: qa(".facts > div").map((d) => ({ label: clean(q("dt", d).textContent), value: clean(q("dd", d).textContent), big: q("dd", d).classList.contains("big") })),
    chips: qa(".chips a").map((a) => ({ id: a.getAttribute("href").slice(1), label: clean(a.textContent) })),
    blocks,
    ctaBand: band ? { title: clean(q("h2", band).textContent), body: clean(q("p", band).textContent) } : null,
    note: clean(q("footer .note")?.textContent),
  };
}

/** Runs inside the page: re-encodes an image to WebP, returns base64. */
async function toWebp(src, maxEdge, quality) {
  const img = new Image();
  img.src = src;
  await img.decode();
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  c.getContext("2d").drawImage(img, 0, 0, w, h);
  return { data: c.toDataURL("image/webp", quality).split(",")[1], w, h };
}

const webpName = (f) => f.replace(/\.(png|jpe?g)$/i, ".webp");

async function main() {
  await mkdir(DATA_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: await browserPath(),
    headless: true,
    args: ["--allow-file-access-from-files"],
  });
  try {
    for (const p of PAGES) {
      const file = path.join(SRC, p.file);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
      const data = await page.evaluate(extract);

      // Images: collect, re-encode, and rewrite references to public paths.
      const imgDir = path.join(IMG_DIR, p.category);
      await mkdir(imgDir, { recursive: true });
      const sizes = {};
      const images = new Set();
      for (const b of data.blocks) {
        const prods = b.kind === "group" ? b.products : b.kind === "product" ? [b.product] : [];
        for (const pr of prods) if (pr.photo.image) images.add(pr.photo.image);
        if (b.kind === "construct") images.add(b.image);
      }
      for (const name of images) {
        const src = pathToFileURL(path.join(path.dirname(file), "images", name)).href;
        const { data: b64, w, h } = await page.evaluate(toWebp, src, MAX_IMG_EDGE, WEBP_QUALITY);
        await writeFile(path.join(imgDir, webpName(name)), Buffer.from(b64, "base64"));
        sizes[name] = { w, h };
      }
      const pub = (name) => ({ src: `/products/${p.category}/${webpName(name)}`, width: sizes[name].w, height: sizes[name].h });
      for (const b of data.blocks) {
        const prods = b.kind === "group" ? b.products : b.kind === "product" ? [b.product] : [];
        for (const pr of prods) pr.photo.image = pr.photo.image ? pub(pr.photo.image) : null;
        if (b.kind === "construct") b.image = pub(b.image);
      }

      const out = { slug: p.slug, category: p.category, ...data };
      const ts =
        `// Generated by scripts/import-brochure-pages.mjs from "${p.file}" — do not hand-edit.\n` +
        `import type { ProductPage } from "../types";\n\n` +
        `const page: ProductPage = ${JSON.stringify(out, null, 2)};\n\nexport default page;\n`;
      await writeFile(path.join(DATA_DIR, `${p.slug}.ts`), ts);
      console.log(`✓ ${p.slug}: ${data.blocks.length} blocks, ${images.size} images`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
