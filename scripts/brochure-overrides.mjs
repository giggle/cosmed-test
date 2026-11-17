/**
 * Site-specific changes applied on top of the brochure pages: products that are
 * in the brochure but not offered on the site, and the copy that mentions them.
 *
 * Used by scripts/import-brochure-pages.mjs on every import. Can also be run on
 * its own to re-apply the overrides to the existing generated data files:
 *
 *   node scripts/brochure-overrides.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Drops blocks/chips by id, renumbers the "NN / total" counters and updates the count fact. */
function dropSections(data, ids, countLabel) {
  data.blocks = data.blocks.filter((b) => !ids.includes(b.id) && !(b.kind === "product" && ids.includes(b.product.id)));
  data.chips = data.chips.filter((c) => !ids.includes(c.id));
  const prods = data.blocks.flatMap((b) => (b.kind === "group" ? b.products : b.kind === "product" ? [b.product] : []));
  const total = String(prods.length).padStart(2, "0");
  prods.forEach((pr, i) => { if (pr.num) pr.num = `${String(i + 1).padStart(2, "0")} / ${total}`; });
  for (const f of data.facts) if (f.label === countLabel) f.value = String(prods.length);
}

/** Applies [pattern, replacement] pairs to every string in the page data. */
function replaceText(node, pairs) {
  if (typeof node === "string") return pairs.reduce((s, [re, rep]) => s.replace(re, rep), node);
  if (Array.isArray(node)) return node.map((n) => replaceText(n, pairs));
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) if (k !== "src" && k !== "id" && k !== "href") node[k] = replaceText(node[k], pairs);
  }
  return node;
}

const findProduct = (data, id) =>
  data.blocks.flatMap((b) => (b.kind === "group" ? b.products : b.kind === "product" ? [b.product] : [])).find((p) => p.id === id);

export const OVERRIDES = {
  // Bipolar hemiarthroplasty is not offered.
  hip(data) {
    dropSections(data, ["bipolar"], "Implants");
    replaceText(data, [
      [/, bipolar implants(?=, screws)/gi, ""],
      [/bipolar implants and accessories/gi, "screws and accessories"],
      [/total and partial hip/gi, "total hip"],
    ]);
  },

  // The constrained PS+ bearing is not offered: SKII is sold with the PS bearing only.
  skii(data) {
    dropSections(data, ["tibial-bearing-ps-plus", "ps-vs-ps-plus"], "Components");
    replaceText(data, [[/SKII PS\/PS\+/g, "SKII PS"]]);
    data.meta.description = "SKII PS High Flexion Total Knee System from COSMED Surgicals: CoCrMo femoral condyle (9 sizes, L/R), PS UHMWPE bearing (10–16 mm) and CoCrMo tibial tray (7 sizes).";
    data.lead = "A posterior-stabilised high flexion total knee replacement. The PS tibial bearing allows natural rotation and locks to the tray with an anterior dovetail. CoCrMo femoral condyle and tray, German UHMWPE bearing.";

    const chain = data.blocks.find((b) => b.kind === "chain");
    if (chain) {
      chain.intro = "Each knee uses one femoral condyle, one PS bearing and one tibial tray. Choose the size that fits the tray, then the bearing thickness.";
      chain.items[1] = { ...chain.items[1], title: "PS bearing", body: "No varus/valgus constraint, up to 15° rotation. 10 to 16 mm thick." };
      chain.items[2] = { ...chain.items[2], body: "The baseplate fixed to the shin bone. 7 sizes." };
    }

    const condyle = findProduct(data, "femoral-condyle");
    if (condyle) {
      condyle.desc = "The posterior-stabilised femoral component of the SKII system, used with the SKII PS tibial bearing and tibial tray.";
      condyle.feats = condyle.feats.map((f) => (/PS\+/.test(f) ? "Pairs with the SKII PS tibial bearing" : f));
    }
    const bearing = findProduct(data, "tibial-bearing-ps");
    if (bearing) bearing.desc = bearing.desc.replace("The standard posterior-stabilised insert.", "The posterior-stabilised insert.");
    const tray = findProduct(data, "tibial-tray");
    if (tray) {
      tray.desc = tray.desc.replace("holding either bearing", "holding the PS bearing");
      tray.feats = tray.feats.map((f) => (/PS\+/.test(f) ? "Holds the PS bearing with an anterior dovetail lock" : f));
    }

    const benefits = data.blocks.find((b) => b.kind === "benefits");
    if (benefits) {
      benefits.items = benefits.items.map((it) =>
        /PS\+/.test(it.body)
          ? { title: "Natural Rotation", body: "The PS tibial bearing places no varus/valgus constraint on the knee and allows up to 15° internal/external rotation." }
          : it,
      );
    }
  },
};

export function applyOverrides(slug, data) {
  OVERRIDES[slug]?.(data);
  return data;
}

// CLI: re-apply overrides to the existing generated data files.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const head = "const page: ProductPage = ";
  const tail = ";\n\nexport default page;\n";
  for (const slug of Object.keys(OVERRIDES)) {
    const file = path.join("src/lib/products/data", `${slug}.ts`);
    const src = await readFile(file, "utf8");
    const start = src.indexOf(head) + head.length;
    const end = src.lastIndexOf(tail);
    const data = applyOverrides(slug, JSON.parse(src.slice(start, end)));
    await writeFile(file, src.slice(0, start) + JSON.stringify(data, null, 2) + src.slice(end));
    console.log(`✓ ${slug}`);
  }
}
