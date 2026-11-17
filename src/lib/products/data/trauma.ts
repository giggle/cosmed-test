// Hand-authored (no brochure HTML yet) from the supplier's product listings:
// mjsurgical.com/product-category/trauma/interlocking-nails-and-screws/
// Scope per COSMED: PFNA long & short, femur nail, tibia nail, bolts and helical blades only.
// Images: public/products/trauma/*.webp (re-encoded from the supplier's product photos).
import type { Product, ProductPage, ProductPhoto, SpecCell, SpecTable } from "../types";

const MATERIAL = "Titanium or stainless steel";
const TOTAL = 9;

const photo = (file: string, alt: string, badge: string): ProductPhoto => ({
  image: { src: `/products/trauma/${file}.webp`, width: 600, height: 600 },
  alt,
  badge,
  bg: "rgb(253, 240, 224)",
  bordered: false,
  aspect: "4/3",
  fit: "contain",
  padded: true,
  multiply: false,
});

const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

const h = (t: string): SpecCell => ({ t, h: true });
const d = (t: string): SpecCell => ({ t });

/** Nails: one row per diameter, listing every available length. */
function nailSpec(diameters: number[], lengths: number[], caption: string): SpecTable {
  return {
    caption,
    head: [[h("Diameter"), h("Lengths (mm)"), h("Sizes")]],
    rows: diameters.map((dia) => [h(`Ø${dia} mm`), d(lengths.join(", ")), d(String(lengths.length))]),
  };
}

/** Bolts / blades: one row per length band. */
function lengthSpec(bands: { from: number; to: number; step: number }[], caption: string): SpecTable {
  return {
    caption,
    head: [[h("Length range"), h("Step"), h("Lengths")]],
    rows: bands.map((b) => [
      h(b.from === b.to ? `${b.from} mm` : `${b.from} to ${b.to} mm`),
      d(b.from === b.to ? "–" : `${b.step} mm`),
      d(String(range(b.from, b.to, b.step).length)),
    ]),
  };
}

let n = 0;
const num = () => `${String(++n).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

function product(p: Omit<Product, "num" | "material" | "enquireLabel"> & { material?: string }): Product {
  return { ...p, num: num(), material: p.material ?? MATERIAL, enquireLabel: "Enquire about this implant" };
}

const pfnaLong = product({
  id: "pfna-long",
  photo: photo("trauma-pfna-long", "PFNA Proximal Femoral Nail Antirotation (Long)", "Long · L & R"),
  name: "PFNA Proximal Femoral Nail Antirotation (Long)",
  desc: "A long intramedullary nail for proximal femoral fractures, used with the PFNA helical blade for fixation in the femoral head. Supplied in left and right versions.",
  feats: ["Left and right versions", "Four diameters, Ø9 to Ø12 mm", "Five lengths, 340 to 420 mm in 20 mm steps", "Used with the PFNA helical blade and distal interlocking bolts"],
  spec: nailSpec([9, 10, 11, 12], range(340, 420, 20), "4 diameters × 5 lengths, left and right. Material: titanium or stainless steel"),
});

const pfnaShort = product({
  id: "pfna-short",
  photo: photo("trauma-pfna-short", "PFNA Proximal Femoral Nail Antirotation (Short)", "Short"),
  name: "PFNA Proximal Femoral Nail Antirotation (Short)",
  desc: "The short version of the PFNA nail, used with the same helical blade, in three lengths from 170 to 240 mm.",
  feats: ["Four diameters, Ø9 to Ø12 mm", "Three lengths: 170, 200 and 240 mm", "Used with the PFNA helical blade and distal interlocking bolts"],
  spec: nailSpec([9, 10, 11, 12], [170, 200, 240], "4 diameters × 3 lengths. Material: titanium or stainless steel"),
});

const pfnaBlade = product({
  id: "pfna-blade",
  photo: photo("trauma-pfna-blade", "PFNA Helical Blade", "Helical blade"),
  name: "PFNA Helical Blade",
  desc: "The helical blade that passes through the proximal PFNA nail into the femoral head. It fits both the long and short PFNA nails.",
  feats: ["Fits PFNA long and short nails", "Ten lengths, 75 to 120 mm in 5 mm steps"],
  spec: lengthSpec([{ from: 75, to: 120, step: 5 }], "10 lengths. Material: titanium or stainless steel"),
});

const femurNail = product({
  id: "femur-nail",
  photo: photo("trauma-femur-nail", "Femur Nail (Cannulated)", "Cannulated"),
  name: "Femur Nail (Cannulated)",
  desc: "A cannulated intramedullary nail for femoral shaft fractures, locked proximally and distally with interlocking bolts.",
  feats: ["Cannulated design", "Five diameters, Ø8 to Ø12 mm", "Seven lengths, 340 to 460 mm in 20 mm steps", "Locked with interlocking bolts"],
  spec: nailSpec([8, 9, 10, 11, 12], range(340, 460, 20), "5 diameters × 7 lengths. Material: titanium or stainless steel"),
});

const tibiaNail = product({
  id: "tibia-nail",
  photo: photo("trauma-tibia-nail", "Tibia Nail (Solid & Cannulated)", "Solid & cannulated"),
  name: "Tibia Nail (Solid & Cannulated)",
  desc: "An intramedullary nail for tibial shaft fractures, available in solid and cannulated versions and locked with interlocking bolts.",
  feats: ["Solid and cannulated versions", "Four diameters, Ø8 to Ø11 mm", "Eight lengths, 280 to 420 mm in 20 mm steps", "Locked with interlocking bolts"],
  spec: nailSpec([8, 9, 10, 11], range(280, 420, 20), "4 diameters × 8 lengths. Material: titanium or stainless steel"),
});

const bolt = (dia: string, file: string, bands: { from: number; to: number; step: number }[], lengthText: string) => {
  const count = bands.reduce((s, b) => s + range(b.from, b.to, b.step).length, 0);
  return product({
    id: `bolt-${dia.replace(".", "-")}`,
    photo: photo(file, `Interlocking Bolt ${dia} mm`, `Ø${dia} mm`),
    name: `Interlocking Bolt ${dia} mm`,
    desc: `A Ø${dia} mm interlocking screw (bolt) for locking intramedullary nails, in ${count} lengths.`,
    feats: [`Ø${dia} mm diameter`, lengthText],
    spec: lengthSpec(bands, `Ø${dia} mm, ${count} lengths. Material: titanium or stainless steel`),
  });
};

const bolts = [
  bolt("3.4", "trauma-bolt-3-4", [{ from: 20, to: 50, step: 2 }], "16 lengths, 20 to 50 mm in 2 mm steps"),
  bolt("3.9", "trauma-bolt-3-9", [{ from: 20, to: 50, step: 2 }, { from: 55, to: 60, step: 5 }], "18 lengths, 20 to 50 mm in 2 mm steps, plus 55 and 60 mm"),
  bolt("4.9", "trauma-bolt-4-9", [{ from: 20, to: 60, step: 2 }, { from: 65, to: 90, step: 5 }], "27 lengths, 20 to 60 mm in 2 mm steps, then 65 to 90 mm in 5 mm steps"),
  bolt("6.0", "trauma-bolt-6-0", [{ from: 30, to: 100, step: 5 }], "15 lengths, 30 to 100 mm in 5 mm steps"),
];

const page: ProductPage = {
  slug: "trauma",
  category: "trauma",
  meta: {
    title: "Trauma Implants | COSMED Surgicals",
    description: "Intramedullary nails for fracture fixation from COSMED Surgicals: PFNA long and short nails with helical blades, femur and tibia nails, and interlocking bolts in titanium or stainless steel. Supplied across Nigeria.",
  },
  crumb: "Trauma",
  tag: "Trauma Implants",
  title: "Intramedullary *Nailing* Systems",
  lead: "Proximal femoral, femoral and tibial nails with their helical blades and interlocking bolts, each in titanium or stainless steel with its full size range.",
  secondaryCta: { label: "View implants", href: "#pfna" },
  facts: [
    { label: "Implants", value: String(TOTAL), big: true },
    { label: "Nail diameters", value: "Ø8 to 12 mm", big: false },
    { label: "Nail lengths", value: "170 to 460 mm", big: false },
    { label: "Materials", value: "Titanium · SS", big: false },
  ],
  chips: [
    { id: "pfna", label: "PFNA nails & blade" },
    { id: "nails", label: "Femur & tibia nails" },
    { id: "bolts", label: "Interlocking bolts" },
  ],
  blocks: [
    {
      kind: "chain",
      id: null,
      title: "How the system fits together",
      intro: "Each construct uses one nail, locked in place with a helical blade or bolts. Every implant is offered in titanium or stainless steel.",
      items: [
        { k: "01 · Nail", title: "Intramedullary nail", body: "PFNA long or short for the proximal femur, or a femur or tibia nail for shaft fractures." },
        { k: "02 · Proximal", title: "Helical blade", body: "On PFNA nails, the helical blade fixes the nail into the femoral head. 75 to 120 mm." },
        { k: "03 · Locking", title: "Interlocking bolts", body: "Bolts lock the nail to the bone. Ø3.4, 3.9, 4.9 and 6.0 mm, from 20 to 100 mm long." },
      ],
    },
    { kind: "group", id: "pfna", title: "PFNA nails & helical blade", intro: "Proximal femoral nail antirotation in long and short versions, with the helical blade that fits both.", products: [pfnaLong, pfnaShort, pfnaBlade] },
    { kind: "group", id: "nails", title: "Femur & tibia nails", intro: "Intramedullary nails for femoral and tibial shaft fractures, from Ø8 mm and 280 to 460 mm long.", products: [femurNail, tibiaNail] },
    { kind: "group", id: "bolts", title: "Interlocking bolts", intro: "Interlocking screws for locking the nails, in four diameters from Ø3.4 to Ø6.0 mm.", products: bolts },
  ],
  ctaBand: {
    title: "Planning a trauma list?",
    body: "Speak with a COSMED territory representative about sizing, instrument sets and in-theatre support from COSMED Assist.",
  },
  note: "Product images and specifications are for reference. Implants should be used only by surgeons trained in the relevant technique, following the instructions for use supplied with each implant. Contact COSMED Surgicals for full catalogue numbers and instrument sets.",
};

export default page;
