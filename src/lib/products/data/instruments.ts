// Hand-authored (no brochure HTML yet) from the supplier's product pages:
// xishanmed.com/product/powered-surgical-instruments-dk-n-ms/
// xishanmed.com/product/surgical-power-tool-consumables/
// Images: public/products/instruments/*.webp (re-encoded from the supplier's product photos).
import type { Product, ProductPage, ProductPhoto, SpecCell } from "../types";

const photo = (file: string, alt: string, badge: string): ProductPhoto => ({
  image: { src: `/products/instruments/${file}.webp`, width: 1200, height: 1200 },
  alt,
  badge,
  bg: "rgb(253, 240, 224)",
  bordered: false,
  aspect: "4/3",
  fit: "contain",
  padded: true,
  multiply: true,
});

const h = (t: string): SpecCell => ({ t, h: true });
const d = (t: string): SpecCell => ({ t });

const console_: Product = {
  id: "dk-n-ms",
  photo: photo("instruments-dk-n-ms", "DK-N-MS powered surgical system console", "Neurosurgery"),
  num: "01 / 02",
  name: "DK-N-MS Powered Surgical System",
  desc: "A high-speed power system for cranial neurosurgery, trans-nasal endoscopic skull base surgery and neuro-spine procedures. A brushless micromotor drives high-speed drilling, craniotomy and cranial perforation at up to 80,000 RPM, with low vibration and a temperature rise kept under 15°C under continuous load.",
  featsTitle: "Standard system package",
  feats: [
    "DK-N-MS power console",
    "Multi-function waterproof foot switch",
    "80,000 RPM brushless DC micromotor",
    "Straight (MSB1) and angled (MSB2) high-speed bur handpieces",
    "Craniotome handpiece with dura guard (XJ6)",
    "Perforator driver attachment (ZSB2A)",
    "Peristaltic irrigation pump tube set and bracket",
    "Power cord, grounding cable, user manual and sterilization guidelines",
  ],
  material: "",
  enquireLabel: "Enquire about this system",
  spec: {
    title: "Technical specifications",
    caption: "DK-N-MS console, micromotor and attachments",
    head: [],
    rows: [
      [h("Console model"), d("DK-N-MS")],
      [h("Display"), d("Colour touch screen with real-time feedback")],
      [h("Max. micromotor speed"), d("Up to 80,000 RPM, stepless speed control")],
      [h("Craniotome speed"), d("Max. 40,000 RPM")],
      [h("Perforator driver speed"), d("Max. 1,500 RPM")],
      [h("Motor"), d("Brushless DC micromotor, auto air-cooling, thermal rise under 15°C")],
      [h("Irrigation"), d("Integrated peristaltic pump, flow synchronised with motor speed")],
      [h("Safety"), d("Automatic tool recognition, automatic perforator clutch release, stall alarm")],
      [h("Sterilization"), d("Handpieces, motors and attachments: steam autoclave at 134°C")],
    ],
  },
};

const consumables: Product = {
  id: "power-tool-consumables",
  photo: photo("instruments-consumables", "High-speed handpieces with burs and shaver blades", "Burs · blades · cutters"),
  num: "02 / 02",
  name: "Surgical Power Tool Consumables",
  desc: "Cutting accessories for powered surgery: diamond and tungsten carbide burs, bendable spine burs, ENT and arthroscopy shaver blades, sagittal and micro saw blades, and craniotome cutters with cranial perforators. Supplied sterile for single use, or as reusable autoclavable items.",
  feats: [
    "Balanced for vibration-free rotation at up to 80,000 RPM",
    "Sterile single-use items are individually double-blister packed, in boxes of 5 or 10",
    "Reusable items withstand repeated 134°C steam autoclaving",
    "EO or gamma sterilized",
    "Compatible with the DK-N-MS handpieces and standard industry couplings",
  ],
  material: "Medical-grade stainless steel, tungsten carbide (over 90 HRA) and electroplated diamond grit",
  enquireLabel: "Enquire about consumables",
  spec: {
    title: "Consumable range",
    caption: "Sizes and supply formats by category",
    head: [[h("Category"), h("Types"), h("Diameter / size"), h("Length / angle"), h("Supply")]],
    rows: [
      [h("High-speed burs"), d("Round, diamond, oval, matchstick, barrel"), d("Ø0.5 to 7.0 mm"), d("70 to 175 mm"), d("Sterile single-use or reusable")],
      [h("Bendable spine burs"), d("Diamond, tungsten carbide"), d("Ø3.0, 3.5, 4.0 mm"), d("0 to 36° bend, 360° rotation"), d("Sterile single-use")],
      [h("ENT shaver blades"), d("Serrated, inferior turbinate, adenoid, laryngeal"), d("Ø3.0, 3.6, 4.0 mm"), d("0°, 12°, 40°, 60°, 120° (110 to 275 mm)"), d("Sterile single-use")],
      [h("Arthroscopy blades"), d("Full radius, aggressive meniscus, double-edged"), d("Ø3.6, 4.0, 5.0, 5.5 mm"), d("130 mm"), d("Sterile single-use")],
      [h("Sagittal saw blades"), d("Standard (BJP), sheathed (BJPH)"), d("Width 9.5 to 25 mm, thickness 0.6 to 1.27 mm"), d("70 to 115 mm"), d("Sterile single-use or reusable")],
      [h("Craniotome & perforator"), d("Spiral-fluted cutter, auto-disengaging perforator bit"), d("Cutters Ø1.8 to 2.3 mm, perforators Ø9, 11, 14 mm"), d("Standard cranial footplate fit"), d("Sterile single-use or reusable")],
    ],
  },
};

const page: ProductPage = {
  slug: "instruments",
  category: "instruments",
  meta: {
    title: "Surgical Instruments | COSMED Surgicals",
    description: "Powered surgical instruments from COSMED Surgicals: the DK-N-MS high-speed neurosurgical power system with bur, craniotome and perforator handpieces, plus burs, shaver blades, saw blades and craniotome cutters. Supplied across Nigeria.",
  },
  crumb: "Surgical Instruments",
  tag: "Surgical Instruments",
  title: "Powered *Surgical* Systems",
  lead: "A high-speed power system for neurosurgery and skull base surgery, with the burs, blades and cutters that run on it.",
  secondaryCta: { label: "View the system", href: "#system" },
  facts: [
    { label: "Max. speed", value: "80,000 RPM", big: true },
    { label: "Handpiece modules", value: "4", big: false },
    { label: "Consumable lines", value: "6", big: false },
    { label: "Sterilization", value: "134°C autoclave", big: false },
  ],
  chips: [
    { id: "system", label: "Power system" },
    { id: "handpieces", label: "Handpiece modules" },
    { id: "consumables", label: "Consumables" },
  ],
  blocks: [
    {
      kind: "chain",
      id: null,
      title: "How the system fits together",
      intro: "One console drives every handpiece. Each handpiece takes its own range of burs, cutters or perforator bits.",
      items: [
        { k: "01 · Console", title: "DK-N-MS console", body: "Touch-screen console with foot switch, automatic tool recognition and a built-in irrigation pump." },
        { k: "02 · Handpiece", title: "Handpiece modules", body: "High-speed bur, trans-nasal telescoping, craniotome and perforator handpieces on an 80,000 RPM micromotor." },
        { k: "03 · Consumable", title: "Burs, blades & cutters", body: "Diamond and carbide burs, shaver and saw blades, craniotome cutters and cranial perforators." },
      ],
    },
    {
      kind: "group",
      id: "system",
      title: "DK-N-MS power system",
      intro: "A high-speed neurosurgical power platform for drilling, craniotomy and cranial perforation.",
      products: [console_],
    },
    {
      kind: "benefits",
      id: null,
      title: "Core system features",
      intro: "Built for work close to delicate neural structures in deep, narrow corridors.",
      items: [
        { title: "80,000 RPM brushless motor", body: "High-torque brushless DC micromotor with auto air-cooling. Withstands 134°C steam autoclaving." },
        { title: "Intelligent console", body: "Digital touch interface with automatic tool recognition, load compensation, stall detection and self-diagnostics." },
        { title: "Cranial safety release", body: "An auto-clutch on the perforator and craniotome stops rotation as soon as the skull is penetrated, protecting the dura." },
        { title: "Synchronised irrigation", body: "A built-in saline pump runs in step with motor speed to keep the cutting site cool." },
      ],
    },
    {
      kind: "compare",
      id: "handpieces",
      title: "Handpiece modules",
      intro: "Compatible handpieces for the DK-N-MS console. All are autoclavable at 134°C.",
      cols: ["Speed", "Size options", "Use"],
      rows: [
        { label: "High-speed bur handpieces (MSB1 straight / MSB2 angled)", values: ["40,000 to 80,000 RPM", "70, 95, 125 and 150 mm working lengths", "Skull base access and acoustic neuroma resection, with an insulated sleeve"] },
        { label: "Trans-nasal telescoping handpieces (MSBF)", values: ["Up to 80,000 RPM", "4.5 mm sheath extending to 175 mm; straight, angled or curved", "Trans-sphenoidal and sellar / parasellar approaches"] },
        { label: "Craniotome handpiece (XJ6)", values: ["Up to 40,000 RPM", "Fixed or rotatable dura guard (XJH)", "Cranial bone flap osteotomy"] },
        { label: "Perforator driver (ZSB2A)", values: ["1,500 RPM, high torque", "Takes cranial perforator bits", "Burr holes, with automatic release on bone breakthrough"] },
      ],
    },
    {
      kind: "group",
      id: "consumables",
      title: "Power tool consumables",
      intro: "Burs, blades and cutters for neurosurgery, ENT, endoscopic spine, joint arthroplasty, trauma and sports medicine.",
      products: [consumables],
    },
    {
      kind: "benefits",
      id: null,
      title: "Consumable lines",
      intro: "Each line comes in the shapes and sizes listed in the consumable range table above.",
      items: [
        { title: "High-speed burs", body: "Diamond burs (DR) for fine bone work in otology and skull base surgery, and tungsten carbide burs (SR, SOA, SM, CR). Extended 100, 155 and 175 mm lengths for deep access." },
        { title: "Bendable spine burs", body: "Bend from 0 to 36° and rotate 360° for endoscopic spine decompression (PELD / UBE)." },
        { title: "Shaver blades", body: "ENT blades (BPD, YPD, HPD) for polyps, turbinates, tonsils and larynx; arthroscopy blades (GPD); and spine debrider blades for endoscopic discectomy." },
        { title: "Saw blades", body: "Sagittal blades (BJP) and sheathed blades (BJPH) for knee and hip arthroplasty; reciprocating and sternum blades (WJP); micro blades (XCBJ, XPBJ) for hand, foot and maxillofacial surgery." },
        { title: "Craniotome cutters & perforators", body: "Single-use spiral cutters for the XJ6 / XJH dura guards, and auto-disengaging cranial perforator bits with a Hudson shank." },
        { title: "Irrigation tubing", body: "Single-use sterile irrigation tubing sets and clips for the DK-N-MS pump." },
      ],
    },
  ],
  ctaBand: {
    title: "Equipping a theatre?",
    body: "Speak with COSMED about system configuration, consumable supply and in-theatre support from COSMED Assist.",
  },
  note: "Product images and specifications are for reference. Powered systems should be used only by staff trained in their operation, following the manufacturer's instructions for use and sterilization guidelines. Contact COSMED Surgicals for full catalogue numbers and configurations.",
};

export default page;
