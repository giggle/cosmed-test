import type { Metadata } from "next";
import type { ProductPage } from "./types";
import ski from "./data/ski";
import skii from "./data/skii";
import hrsk from "./data/hrsk";
import rsk from "./data/rsk";
import hip from "./data/hip";
import spine from "./data/spine";
import trauma from "./data/trauma";
import arthroKnee from "./data/arthroscopy-knee";
import arthroShoulder from "./data/arthroscopy-shoulder";
import arthroFibers from "./data/arthroscopy-fibers-tapes";

export type { ProductPage } from "./types";

/** Knee systems, in the order shown in the "Knee systems" switcher. */
export const kneeSystems = [
  { slug: "ski", label: "SKI", summary: "Primary PS high flexion total knee", page: ski },
  { slug: "skii", label: "SKII", summary: "Primary high flexion knee with PS or constrained PS+ bearing", page: skii },
  { slug: "hrsk", label: "HRSK", summary: "Rotating hinge revision knee", page: hrsk },
  { slug: "rsk", label: "RSK", summary: "Hybrid revision knee with stems, augments and cones", page: rsk },
] as const;

export const hipPage = hip;
export const spinePage = spine;
export const traumaPage = trauma;

/** Arthroscopy areas, in the order shown in the "Arthroscopy" switcher. */
export const arthroscopyAreas = [
  { slug: "knee", label: "Knee", summary: "Cruciate reconstruction, meniscus repair and HTO implants", page: arthroKnee },
  { slug: "shoulder", label: "Shoulder", summary: "Suture anchors for rotator cuff and instability repair, plus fracture and AC joint fixation", page: arthroShoulder },
  { slug: "fibers-tapes", label: "Fibers & Tapes", summary: "UHMWPE braided sutures, tapes and loops", page: arthroFibers },
] as const;

/** First product photo on a page (for cards). */
export function firstImage(page: ProductPage) {
  for (const b of page.blocks) {
    const p = b.kind === "product" ? b.product : b.kind === "group" ? b.products[0] : null;
    if (p?.photo.image) return p.photo.image.src;
  }
  return null;
}

export type CategoryCard = {
  id: string;
  label: string;
  blurb: string;
  href: string | null; // null = page not built yet ("coming soon")
  image: string | null;
  items: { label: string; href: string }[];
};

/** Tiles on the /products landing page. */
export const categories: CategoryCard[] = [
  {
    id: "knee", label: "Knee Implants", href: "/products/knee",
    blurb: "Primary and revision total knee systems with CoCrMo components and German UHMWPE bearings.",
    image: "/products/knee/skii-femoral-condyle-ps.webp",
    items: kneeSystems.map((s) => ({ label: s.label, href: `/products/knee/${s.slug}` })),
  },
  {
    id: "hip", label: "Hip Implants", href: "/products/hip",
    blurb: "Acetabular cups and liners, cemented and uncemented stems, bipolar implants and accessories.",
    image: "/products/hip/hip-dual-mobility-cup.webp",
    items: hip.chips.map((c) => ({ label: c.label, href: `/products/hip#${c.id}` })),
  },
  {
    id: "spine", label: "Spine Implants", href: "/products/spine",
    blurb: "Titanium pedicle screws for posterior thoracolumbar fixation, in fixed-head, multi-angle and reduction designs.",
    image: "/products/spine/spine-regular-polyaxial-screw.webp",
    items: spine.chips.map((c) => ({ label: c.label, href: `/products/spine#${c.id}` })),
  },
  {
    id: "trauma", label: "Trauma Implants", href: "/products/trauma",
    blurb: "PFNA, femur and tibia intramedullary nails with helical blades and interlocking bolts.",
    image: "/products/trauma/trauma-pfna-long.webp",
    items: trauma.chips.map((c) => ({ label: c.label, href: `/products/trauma#${c.id}` })),
  },
  {
    id: "arthroscopy", label: "Arthroscopy", href: "/products/arthroscopy",
    blurb: "Knee and shoulder arthroscopy implants — cortical buttons, interference screws, suture anchors — plus fibers and tapes.",
    image: "/products/arthroscopy/shoulder-oc-osteofix-titanium-suture-anchor.webp",
    items: [
      { label: "Knee", href: "/products/arthroscopy/knee" },
      { label: "Shoulder", href: "/products/arthroscopy/shoulder" },
      { label: "Fibers & Tapes", href: "/products/arthroscopy/fibers-tapes" },
    ],
  },
  { id: "instruments", label: "Surgical Instruments", href: null, image: null, items: [], blurb: "Instrument sets and power tools for arthroplasty and trauma surgery." },
  { id: "consumables", label: "Consumables", href: null, image: null, items: [], blurb: "Bone cement, drapes and procedure packs for the operating theatre." },
];

/** Page metadata from the brochure page's own <title> and description. */
export function productMetadata(page: ProductPage, path: string): Metadata {
  const title = page.meta.title.replace(/\s*\|\s*COSMED Surgicals\s*$/i, "");
  return {
    title,
    description: page.meta.description,
    alternates: { canonical: path },
    openGraph: { title, description: page.meta.description, url: path },
  };
}
