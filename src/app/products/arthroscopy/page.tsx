import type { Metadata } from "next";
import Link from "next/link";
import CardGrid from "@/components/products/CardGrid";
import { arthroscopyAreas, firstImage } from "@/lib/products";

export const metadata: Metadata = {
  title: "Arthroscopy",
  description: "Arthroscopy implants from COSMED Surgicals: knee cruciate and meniscus repair, shoulder suture anchors, and UHMWPE fibers and tapes. Supplied across Nigeria.",
  alternates: { canonical: "/products/arthroscopy" },
};

const total = arthroscopyAreas.reduce(
  (n, a) => n + a.page.blocks.reduce((m, b) => m + (b.kind === "group" ? b.products.length : b.kind === "product" ? 1 : 0), 0),
  0,
);

export default function ArthroscopyIndexPage() {
  return (
    <>
      <section style={{ padding: "56px 32px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#8A8A88", marginBottom: 24 }}>
            <Link href="/" style={{ color: "#454745", textDecoration: "none" }}>Home</Link>
            <span aria-hidden style={{ margin: "0 8px", color: "#CFCFCB" }}>/</span>
            <Link href="/products" style={{ color: "#454745", textDecoration: "none" }}>Products</Link>
            <span aria-hidden style={{ margin: "0 8px", color: "#CFCFCB" }}>/</span>
            <span aria-current="page">Arthroscopy</span>
          </nav>
          <span style={{ display: "inline-block", fontWeight: 600, fontSize: 11, background: "#FDF0E0", color: "#C46F15", padding: "5px 14px", borderRadius: 6, letterSpacing: 1, marginBottom: 20 }}>Arthroscopy</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,6.6vw,80px)", lineHeight: 1, letterSpacing: "-0.035em", color: "#1A1A1A", marginBottom: 20 }}>
            Arthroscopy <span style={{ color: "#F5922E" }}>Implants</span>
          </h1>
          <p style={{ color: "#454745", fontSize: 18, lineHeight: 1.6, maxWidth: "58ch" }}>
            {total} implants for arthroscopic knee and shoulder surgery — cortical buttons, interference screws, meniscal repair devices and suture anchors — plus UHMWPE fibers and tapes.
          </p>
        </div>
      </section>
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <CardGrid
            cards={arthroscopyAreas.map((a) => ({
              key: a.slug,
              eyebrow: a.page.tag,
              title: a.page.title.replace(/\*/g, ""),
              blurb: a.summary,
              href: `/products/arthroscopy/${a.slug}`,
              image: firstImage(a.page),
              items: a.page.chips.map((c) => ({ label: c.label, href: `/products/arthroscopy/${a.slug}#${c.id}` })),
            }))}
          />
        </div>
      </section>
    </>
  );
}
