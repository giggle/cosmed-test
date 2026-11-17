"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { heroStagger, fadeBadge, fadeUpHero, fadeUp, fadeUpSm, stagger10, viewport } from "@/lib/animations";
import CardGrid from "@/components/products/CardGrid";
import { categories } from "@/lib/products";

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: "96px 32px 64px", background: "#fff", borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeBadge} style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, background: "#FDF0E0", color: "#C46F15", padding: "5px 14px", borderRadius: 6, letterSpacing: 1 }}>Implant Catalog</span>
            </motion.div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <motion.h1 variants={fadeUpHero} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(48px,6vw,80px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>
                Medical Devices &<br /><span style={{ color: "#F5922E" }}>Implants</span>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "#454745", maxWidth: 420, margin: 0 }}>
                Comprehensive operating room solutions — including joint and spine implants, precision surgical instruments, capital equipment (CAPEX) sourcing, and clinical consumables.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ padding: "48px 32px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <CardGrid
            cards={categories.map((c) => ({ key: c.id, title: c.label, blurb: c.blurb, href: c.href, image: c.image, items: c.items }))}
          />
        </div>
      </section>

      {/* ── Supply models ── */}
      <section style={{ padding: "72px 32px", background: "#FDF0E0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Supply Options</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>How We Supply You</h2>
          </div>
          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}
          >
            {[
              { title: "Direct Clinical Purchase", body: "Order implants directly. Invoiced on structured delivery terms. Best for hospitals with predictable lists." },
              { title: "Distributor Channels", body: "Purchase localized stock through our managed, vetted network of regional distributor partners." },
              { title: "Institutional Contracts", body: "Establish customized supply agreements tailored to the procurement workflows of hospital networks." },
            ].map(({ title, body }) => (
              <motion.div key={title} variants={fadeUpSm} style={{ background: "#fff", borderRadius: 6, padding: "28px 24px", boxShadow: "rgba(26,26,26,0.08) 0 0 0 1px", transition: "transform 200ms, box-shadow 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "rgba(26,26,26,0.14) 0 8px 28px"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "rgba(26,26,26,0.08) 0 0 0 1px"; }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, color: "#1A1A1A", marginBottom: 10 }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "#454745" }}>{body}</div>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, background: "#F5922E", color: "#fff", borderRadius: 6, padding: "14px 28px", textDecoration: "none", transition: "transform 150ms, box-shadow 150ms", display: "inline-block" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.4)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
              Discuss Your Requirements →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
