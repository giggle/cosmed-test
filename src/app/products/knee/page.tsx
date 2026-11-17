import type { Metadata } from "next";
import Link from "next/link";
import CardGrid from "@/components/products/CardGrid";
import { firstImage, kneeSystems } from "@/lib/products";

export const metadata: Metadata = {
  title: "Knee Implants",
  description: "Primary and revision total knee systems from COSMED Surgicals: SKI, SKII, HRSK rotating hinge and RSK hybrid revision knees. Supplied across Nigeria.",
  alternates: { canonical: "/products/knee" },
};

export default function KneeIndexPage() {
  return (
    <>
      <section style={{ padding: "56px 32px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#8A8A88", marginBottom: 24 }}>
            <Link href="/" style={{ color: "#454745", textDecoration: "none" }}>Home</Link>
            <span aria-hidden style={{ margin: "0 8px", color: "#CFCFCB" }}>/</span>
            <Link href="/products" style={{ color: "#454745", textDecoration: "none" }}>Products</Link>
            <span aria-hidden style={{ margin: "0 8px", color: "#CFCFCB" }}>/</span>
            <span aria-current="page">Knee</span>
          </nav>
          <span style={{ display: "inline-block", fontWeight: 600, fontSize: 11, background: "#FDF0E0", color: "#C46F15", padding: "5px 14px", borderRadius: 6, letterSpacing: 1, marginBottom: 20 }}>Knee Implants</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,6.6vw,80px)", lineHeight: 1, letterSpacing: "-0.035em", color: "#1A1A1A", marginBottom: 20 }}>
            Knee <span style={{ color: "#F5922E" }}>Systems</span>
          </h1>
          <p style={{ color: "#454745", fontSize: 18, lineHeight: 1.6, maxWidth: "56ch" }}>
            Two primary and two revision knee systems, all with CoCrMo femoral and tibial components and German UHMWPE bearings.
          </p>
        </div>
      </section>
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <CardGrid
            cards={kneeSystems.map((s) => ({
              key: s.slug,
              eyebrow: s.page.tag,
              title: s.page.crumb,
              blurb: s.summary,
              href: `/products/knee/${s.slug}`,
              image: firstImage(s.page),
              items: s.page.chips.filter((c) => c.id !== "benefits").map((c) => ({ label: c.label, href: `/products/knee/${s.slug}#${c.id}` })),
            }))}
          />
        </div>
      </section>
    </>
  );
}
