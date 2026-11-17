// Shapes produced by scripts/import-brochure-pages.mjs.
// Text fields may contain *asterisk* runs, rendered in the accent colour (see <Marked>).

export type PublicImage = { src: string; width: number; height: number };

export type SpecCell = {
  t: string;
  small?: string;
  h?: boolean; // row/column header
  na?: boolean; // not available
  mat?: boolean; // material label cell
  rowSpan?: number;
  colSpan?: number;
};

export type SpecTable = {
  /** Panel heading; defaults to "Specification" (table) or "Available options" (list). */
  title?: string;
  caption: string;
  head: SpecCell[][];
  rows: SpecCell[][];
  /** Alternative to head/rows: ordering options shown as a compact grid, optionally in titled groups. */
  list?: { title?: string; items: string[] }[];
};

export type ProductPhoto = {
  image: PublicImage | null;
  alt: string;
  badge: string | null;
  bg: string;
  bordered: boolean;
  aspect: "4/3" | "1/1";
  fit: "cover" | "contain";
  padded: boolean;
  multiply: boolean;
};

export type Product = {
  id: string;
  photo: ProductPhoto;
  num: string;
  name: string;
  desc: string;
  feats: string[];
  /** Optional heading shown above `feats`. */
  featsTitle?: string;
  material: string;
  enquireLabel: string;
  spec: SpecTable | null;
};

/** Compact catalogue tile (used for large ranges such as drapes and gowns). */
export type CatalogItem = {
  id: string;
  name: string;
  image: PublicImage | null;
  badge: string | null;
  specs: { label: string; value: string }[];
};

export type Block =
  | { kind: "catalog"; id: string | null; title: string; intro: string; items: CatalogItem[] }
  | { kind: "group"; id: string; title: string; intro: string; products: Product[] }
  | { kind: "product"; product: Product }
  | { kind: "chain"; id: string | null; title: string; intro: string; items: { k: string; title: string; body: string }[] }
  | { kind: "construct"; id: string | null; image: PublicImage; alt: string; white: boolean; tag: string; title: string; body: string[]; feats: string[] }
  | { kind: "compare"; id: string | null; title: string; intro: string; cols: string[]; rows: { label: string; values: string[] }[] }
  | { kind: "benefits"; id: string | null; title: string; intro: string; items: { title: string; body: string }[] };

export type ProductPage = {
  slug: string;
  category: string;
  meta: { title: string; description: string };
  crumb: string;
  tag: string;
  title: string;
  lead: string;
  secondaryCta: { label: string; href: string } | null;
  facts: { label: string; value: string; big: boolean }[];
  chips: { id: string; label: string }[];
  blocks: Block[];
  ctaBand: { title: string; body: string } | null;
  note: string;
};
