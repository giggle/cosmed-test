// Hand-authored (no brochure HTML yet) from supplier material:
// - Chhabra "Slit n Spring" hydrocephalus shunt system brochure (PDF)
// - medikarma.in/surgical-drape.html and medikarma.in/surgical-gown.html
// - aditus-medical.de orthopaedic bone cement pages (plain and with gentamicin)
// Images: public/products/consumables/*.webp (re-encoded from the supplier photos; the shunt
// photo was extracted from the PDF and colour-inverted to undo its CMYK encoding).
// Left out on purpose: the "Surgical Instrument Wrap" (no specifications and a mismatched photo),
// and all gowns except the reinforced surgical gowns (not offered).
import type { CatalogItem, Product, ProductPage, SpecCell } from "../types";

const h = (t: string): SpecCell => ({ t, h: true });
const d = (t: string): SpecCell => ({ t });

const img = (file: string, width = 347, height = 260) => ({ src: `/products/consumables/${file}.webp`, width, height });

type Spec = [label: string, value: string];
const item = (id: string, name: string, badge: string | null, specs: Spec[], file = id): CatalogItem => ({
  id,
  name,
  image: img(file),
  badge,
  specs: specs.map(([label, value]) => ({ label, value })),
});

// ── Bone cement ──────────────────────────────────────────────────────────────
// Aditus sells the same cement under four names (CEMAD, PAR, A-CEM, K-CEM). Rows are grouped by
// pack size; codes are taken from the supplier's order table, whose product-name column swaps
// S20/S60 for ADCEMS20/ADCEMS60 (the codes and contents agree, so the codes are used here).
const cementPhoto = (file: string, alt: string, badge: string) => ({
  image: img(file, 1400, 1171),
  alt,
  badge,
  bg: "rgb(224, 224, 224)",
  bordered: false,
  aspect: "4/3" as const,
  fit: "cover" as const,
  padded: false,
  multiply: false,
});

const PACKS = [
  { g: 20, ml: 10 },
  { g: 40, ml: 20 },
  { g: 60, ml: 30 },
];

const cementSpec = (letter: "G" | "S", caption: string) => ({
  title: "Order information",
  caption,
  head: [[h("Pack"), h("Contents"), h("Order codes")]],
  rows: PACKS.map(({ g, ml }) => [
    h(`${g} g`),
    d(`${g} g powder + ${ml} ml liquid`),
    d([`ADCEM${letter}${g}`, `PAR${letter === "G" ? "SG" : "S"}${g}`, `ACEM${letter === "G" ? "SG" : "S"}${g}`, `KCEM${letter === "G" ? "SG" : "S"}${g}`].join(" · ")),
  ]),
});

const cementGenta: Product = {
  id: "bone-cement-gentamicin",
  photo: cementPhoto("cement-gentamicin", "Cemad G40 radiopaque bone cement with gentamicin, with powder and liquid ampoule", "With gentamicin"),
  num: "01 / 03",
  name: "Standard Viscosity Bone Cement with Gentamicin",
  desc: "A radiopaque, standard-viscosity PMMA bone cement for implant fixation in arthroplasty, with gentamicin added to help reduce the risk of postoperative infection. It mixes evenly, penetrates well and gives a working time suited to joint replacement.",
  feats: [
    "Gentamicin-loaded to help reduce postoperative infection risk",
    "Viscosity suited to arthroplasty, and can be applied through a cannula",
    "High mechanical strength and limited polymerisation heat, to ISO 5833",
    "20, 40 and 60 g packs",
  ],
  material: "Radiopaque PMMA powder with gentamicin, and monomer liquid in an ampoule",
  enquireLabel: "Enquire about this cement",
  spec: cementSpec("G", "Supplied as CEMAD G, PAR-G, A-CEM-G or K-CEM-G"),
};

const cementPlain: Product = {
  id: "bone-cement-standard",
  photo: cementPhoto("cement-standard", "Cemad S40 radiopaque bone cement, with powder and liquid ampoule", "Plain"),
  num: "02 / 03",
  name: "Standard Viscosity Bone Cement",
  desc: "A radiopaque, acrylic standard-viscosity bone cement for fixing joint implants. Each pack has a radiopaque powder sterilized by ethylene oxide and an ampoule of liquid sterilized by filtration.",
  feats: [
    "Standard viscosity, to ISO 5833",
    "Good handling, with a short mixing time",
    "Working time suited to the type of application",
    "20, 40 and 60 g packs",
  ],
  material: "Radiopaque acrylic (PMMA) powder (EO sterilized) and monomer liquid in an ampoule (filter sterilized)",
  enquireLabel: "Enquire about this cement",
  spec: cementSpec("S", "Supplied as CEMAD S, PAR-S, A-CEM-S or K-CEM-S"),
};

// ── Hydrocephalus shunt ──────────────────────────────────────────────────────
const shuntRow = (code: string, type: string, pressure: string, reservoir: string) => [h(code), d(type), d(pressure), d(reservoir)];

const shunt: Product = {
  id: "chhabra-shunt",
  photo: {
    image: img("shunt-system", 510, 441),
    alt: "Chhabra hydrocephalus shunt system with ventricular catheter, reservoir, distal catheter and connectors",
    badge: "Neurosurgery",
    bg: "rgb(253, 240, 224)",
    bordered: false,
    aspect: "4/3",
    fit: "contain",
    padded: true,
    multiply: true,
  },
  num: "03 / 03",
  name: "Chhabra “Slit n Spring” Hydrocephalus Shunt System",
  desc: "A low-cost shunt for ventriculo-peritoneal (VP) and ventriculo-atrial (VA) drainage of CSF. Its slit valve is held by a stainless steel spring that supports the valve, keeps the opening pressure steady and guards against leakage and backflow. Available in high, medium and low pressure.",
  featsTitle: "Each pack contains",
  feats: [
    "Ventricular catheter",
    "Unitised shunt assembly: reservoir, valve and distal catheter in one piece",
    "Two straight connectors",
    "Peel-open pack, EO sterilized",
  ],
  material: "Silicone rubber catheters with a tantalum-impregnated ventricular tip; PEEK connectors",
  enquireLabel: "Enquire about this shunt",
  spec: {
    title: "Models",
    caption: "VP models have a 75 cm distal catheter, VA models a 30 cm distal catheter. The large flushing reservoir is for adults only.",
    head: [[h("Code"), h("Shunt"), h("Pressure"), h("Reservoir")]],
    rows: [
      shuntRow("SH201", "Ventriculo-peritoneal (VPHP)", "High", "Regular"),
      shuntRow("SH202", "Ventriculo-peritoneal (VPMP)", "Medium", "Regular"),
      shuntRow("SH203", "Ventriculo-peritoneal (VPLP)", "Low", "Regular"),
      shuntRow("SH231", "Ventriculo-peritoneal (VPHP)", "High", "Large flushing"),
      shuntRow("SH232", "Ventriculo-peritoneal (VPMP)", "Medium", "Large flushing"),
      shuntRow("SH233", "Ventriculo-peritoneal (VPLP)", "Low", "Large flushing"),
      shuntRow("SH204", "Ventriculo-atrial (VAHP)", "High", "Regular flushing"),
      shuntRow("SH205", "Ventriculo-atrial (VAMP)", "Medium", "Regular flushing"),
      shuntRow("SH206", "Ventriculo-atrial (VALP)", "Low", "Regular flushing"),
    ],
  },
};

// ── Drapes ───────────────────────────────────────────────────────────────────
const SMMMS: Spec = ["Fabric", "SMMMS, sterile"];

const orthoDrapes = [
  item("drape-knee-o", "Knee O Drape", "Knee", [["Size", "150 × 250 cm"], ["Type", "Plain or fixable"], SMMMS]),
  item("drape-hip-u", "Hip U Drape", "Hip", [["Size", "240 × 230 cm"], ["Use", "Hip and total joint surgery"], SMMMS]),
  item("drape-hip-replacement", "Hip Replacement Drape with Elastic Aperture", "Hip", [["Type", "Fixable, individually packed"], SMMMS]),
  item("drape-arthroscopy", "Arthroscopy Drape", "Arthroscopy", [["Size", "160 × 300 cm"], ["Use", "Orthopaedic and arthroscopy"], SMMMS]),
  item("drape-universal-extremity", "Universal Extremity Drape", "Extremity", [["Size", "240 × 312 cm"], ["Use", "Orthopaedic extremity surgery"]]),
];

const specialityDrapes = [
  item("drape-craniotomy", "Craniotomy Drape with Funnel", "Neurosurgery", [["Size", "160 × 260 cm"], ["Use", "Craniotomy"], SMMMS]),
  item("drape-cabg", "CABG Drape", "Cardiac", [["Model", "CS-300"], ["Size", "160 × 280 cm"], ["Fenestration", "20 × 40 cm"], ["Fabric", "SMMMS, EO sterile"]]),
  item("drape-pacemaker", "Pacemaker Drape", "Cardiac", [["Size", "Main drape 160 × 250 cm"]]),
  item("drape-angiography", "Angiography Drape", "Cardiovascular", [["Size", "160 × 300 cm"], SMMMS]),
  item("drape-angiogram-kit", "Angiogram Drape Kit", "Cardiovascular", [["Size", "182 × 228 cm"], SMMMS]),
  item("drape-eye-incision", "Eye Drape with Incision", "Ophthalmic", [["Model", "MK-302 / 303 / 304"], ["Size", "100 × 70 cm"], ["Fabric", "SMMMS, EO sterile"]]),
  item("drape-eye", "Eye Drape", "Ophthalmic", [["Size", "100 × 70 cm"], ["Fenestration", "5 × 7 cm"], ["Fabric", "SMMMS"]]),
  item("drape-turp", "TURP Drape", "Urology", [["Size", "160 × 150 cm"], SMMMS]),
  item("drape-pcnl", "PCNL Drape", "Urology", [["Size", "160 × 240 cm"], SMMMS]),
  item("drape-gynecology", "Gynaecology Drape", "Obs & gynae", [["Size", "160 × 200 cm"], SMMMS]),
  item("drape-cesarean", "Caesarean Drape with Fluid Collection Pouch", "Obs & gynae", [["Size", "180 × 300 cm"], SMMMS]),
  item("drape-abdominal-sheet", "Abdominal Sheet", "General", [["Sterility", "Sterile"]]),
  item("drape-camera-cover", "Camera Drape Cover", "Endoscopy", [["Sterility", "Sterile"]]),
];

// ── Gowns ────────────────────────────────────────────────────────────────────
const surgicalGowns = [
  item("gown-reinforced-wraparound", "Reinforced Wraparound Surgical Gown", "AAMI 2–3", [["Model", "SGRW-100"], ["Protection", "AAMI Level 2 or 3, fully impervious"], ["Fabric", "SMMMS, reinforced front and arms"], ["Sizes", "S, M, L"]]),
  item("gown-reinforced-wraparound-breathable", "Reinforced Wraparound Surgeon Gown", "AAMI 2–4", [["Model", "SGRB-100"], ["Protection", "AAMI Level 2 to 4, fully impervious"], ["Fabric", "SMMMS with breathable reinforcement"], ["Sizes", "S, M, L, XL"]]),
  item("gown-reinforced", "Reinforced Surgical Gown", "AAMI 2–3", [["Protection", "AAMI Level 2 or 3, fully impervious"], ["Fabric", "SMMMS"], ["Sizes", "S, M, L"]]),
];

const DRAPES = orthoDrapes.length + specialityDrapes.length;
const GOWNS = surgicalGowns.length;

const page: ProductPage = {
  slug: "consumables",
  category: "consumables",
  meta: {
    title: "Consumables | COSMED Surgicals",
    description: "Theatre consumables from COSMED Surgicals: standard-viscosity bone cement with or without gentamicin, the Chhabra hydrocephalus shunt system, sterile SMMMS surgical drapes for orthopaedic and speciality procedures, and reinforced surgical gowns. Supplied across Nigeria.",
  },
  crumb: "Consumables",
  tag: "Consumables",
  title: "Theatre *Consumables*",
  lead: "Bone cement, hydrocephalus shunts, sterile surgical drapes and reinforced surgical gowns for the operating theatre.",
  secondaryCta: { label: "View range", href: "#cement" },
  facts: [
    { label: "Bone cements", value: "2", big: true },
    { label: "Shunt models", value: "9", big: false },
    { label: "Surgical drapes", value: String(DRAPES), big: false },
    { label: "Surgical gowns", value: String(GOWNS), big: false },
  ],
  chips: [
    { id: "cement", label: "Bone cement" },
    { id: "shunt", label: "Hydrocephalus shunt" },
    { id: "drapes", label: "Surgical drapes" },
    { id: "gowns", label: "Gowns" },
  ],
  blocks: [
    {
      kind: "group",
      id: "cement",
      title: "Bone cement",
      intro: "Radiopaque, standard-viscosity PMMA cement for fixing joint implants, plain or with gentamicin.",
      products: [cementGenta, cementPlain],
    },
    {
      kind: "group",
      id: "shunt",
      title: "Hydrocephalus shunt",
      intro: "A complete VP or VA shunt in one sterile pack, in three pressure ranges.",
      products: [shunt],
    },
    {
      kind: "benefits",
      id: null,
      title: "Shunt design features",
      intro: "Designed to keep working with high-protein CSF and to stay visible on X-ray.",
      items: [
        { title: "Spring-supported slit valve", body: "A stainless steel spring around the slit valve stops it deforming or overstretching and keeps the opening pressure steady." },
        { title: "Physiological flow", body: "The medium pressure valve passes 20 ml/hr at a 10 cm H₂O gradient, close to the normal rate of CSF formation and absorption." },
        { title: "Low blockage rate", body: "Ventricular catheter holes and lumen sizes are chosen to keep CSF draining even when protein levels are high." },
        { title: "Kink-resistant, radio-opaque", body: "Catheters resist kinking and show on X-ray, so the shunt can be located and checked after surgery." },
        { title: "Trimmable distal catheter", body: "The distal catheter can be cut to length, and a spare connector restores continuity if needed." },
        { title: "Flush before implanting", body: "Flush the whole system with saline or distilled water before implantation so the slit valves open to their normal size." },
      ],
    },
    {
      kind: "catalog",
      id: "drapes",
      title: "Orthopaedic drapes",
      intro: "Sterile, single-use drapes for knee, hip, arthroscopy and extremity surgery.",
      items: orthoDrapes,
    },
    {
      kind: "catalog",
      id: null,
      title: "Speciality drapes",
      intro: "Procedure drapes for neurosurgery, cardiac and vascular, ophthalmic, urology, obstetrics and general surgery.",
      items: specialityDrapes,
    },
    {
      kind: "catalog",
      id: "gowns",
      title: "Reinforced surgical gowns",
      intro: "Sterile, single-use gowns for the surgical team, fully impervious with SMMMS reinforcement, from AAMI Level 2 to Level 4.",
      items: surgicalGowns,
    },
    {
      kind: "benefits",
      id: null,
      title: "Drape & gown fabric",
      intro: "What the specifications on this page mean.",
      items: [
        { title: "SMMMS non-woven", body: "Five bonded layers, spunbond outside and three meltblown layers inside, giving a fluid barrier that stays breathable." },
        { title: "AAMI protection levels", body: "AAMI PB70 rates barrier performance from Level 1 to 4. Level 3 and 4 gowns suit procedures with heavy fluid exposure." },
        { title: "Sterile, single use", body: "Drapes and surgical gowns are EO sterilized and individually packed." },
      ],
    },
  ],
  ctaBand: {
    title: "Stocking a theatre?",
    body: "Speak with COSMED about bone cement supply, procedure-specific drape and gown packs, shunt sizing and regular consumable deliveries.",
  },
  note: "Product images and specifications are for reference. Implantable devices such as the shunt should be used only by surgeons trained in the technique, following the instructions for use supplied with the product. Contact COSMED Surgicals for full catalogue numbers and pack configurations.",
};

export default page;
