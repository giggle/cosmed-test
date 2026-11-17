"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroStagger, fadeBadge, fadeUpHero, fadeUp, fadeUpSm,
  fadeLeft, fadeLeftSm, fadeScale, fadeUpScale, scaleIn,
  stagger08, stagger10, stagger12, stagger15,
  viewport,
} from "@/lib/animations";

const values = [
  { icon: "◎", title: "Clinical Reliability", body: "The implants and equipment we supply go inside patients. We partner exclusively with global manufacturers whose quality systems and clinical track records meet the highest international standards." },
  { icon: "✦", title: "Theatre Excellence", body: "Advanced surgery demands absolute precision. Through COSMED Assist, we coordinate pre-operative verification, instrument readiness, and in-theatre technical representation to ensure zero-error execution." },
  { icon: "⊕", title: "Clinical Education", body: "Surgical progress relies on continuous learning. Through COSMED Academy, we partner with key opinion leaders to host simulation workshops, clinical demos, and instrumentation modules." },
  { icon: "⊞", title: "Nigerian Healthcare", body: "We are building a business that raises the standard of medical and surgical care available in Nigeria — one device, one procedure, one patient at a time." },
];

const milestones = [
  { year: "Founded", event: "Established in Lagos as a specialist medical device distributor — with a focus on surgical procedures and dynamic supply models from day one." },
  { year: "Products", event: "Built a catalog across five categories: knee, hip, spine, trauma implants, and surgical consumables." },
  { year: "COSMED Assist", event: "Launched our premium in-theatre support service, placing certified technical representatives directly in operating rooms to verify and prepare instruments." },
  { year: "COSMED Academy", event: "Formalized our clinical education division, partnering with key opinion leaders to host hands-on surgical workshops and nurse instrumentation modules." },
  { year: "Coverage", event: "Deployed territory representatives across Abuja, Jos, Lagos, Kano, and Enugu — covering the FCT, North-Central, South-West, North-West, and South-East." },
  { year: "Today", event: "Expanding into Capital Equipment (CAPEX) sourcing and precision instruments while growing our presence in India, Ghana, and Dubai." },
];

const globalPresence = [
  {
    flag: "🇳🇬", name: "Nigeria", role: "Primary Market",
    city: "Abuja · Jos · Lagos · Kano · Enugu",
    body: "Our home base and core market — dedicated direct field sales, clinical representative support, and structured supply arrangements across 5+ active states.",
  },
  {
    flag: "🇮🇳", name: "India", role: "Manufacturer Sourcing Hub",
    city: "New Delhi",
    body: "Home to our key manufacturing partners. We manage product sourcing, quality oversight, and new product pipeline development from here.",
  },
  {
    flag: "🇬🇭", name: "Ghana", role: "West Africa Expansion",
    city: "Accra",
    body: "Our gateway to the broader West African market — building distribution partnerships and supply channel infrastructure across the region.",
  },
  {
    flag: "🇦🇪", name: "Dubai", role: "Regional Trade Hub",
    city: "Dubai, UAE",
    body: "Regional hub for trade coordination, logistics, and MENA business development — enabling faster product movement across the corridor.",
  },
];

const team = [
  { initials: "MD", name: "Managing Director", role: "Overall business leadership & key accounts", bg: "#FDF0E0", color: "#C46F15" },
  { initials: "SD", name: "Sales Director", role: "Field sales strategy & territory management", bg: "#1A1A1A", color: "#F5922E" },
  { initials: "SC", name: "Sales Coordinator", role: "Inside operations, orders & logistics support", bg: "#FDF0E0", color: "#C46F15" },
  { initials: "DM", name: "Distributor Manager", role: "Sub-dealer relationships & partner sales", bg: "#1A1A1A", color: "#F5922E" },
  { initials: "WL", name: "Warehouse & Logistics", role: "Inventory oversight, quality control & shipping coordination", bg: "#FDF0E0", color: "#C46F15" },
  { initials: "FA", name: "Finance & Accounts", role: "Invoicing, credit terms & collections", bg: "#1A1A1A", color: "#F5922E" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#1A1A1A", padding: "96px 32px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeBadge} style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, background: "rgba(245,146,46,0.15)", color: "#F5922E", padding: "5px 14px", borderRadius: 6, letterSpacing: 1 }}>
                About COSMED Nigeria
              </span>
            </motion.div>
            <motion.h1 variants={fadeUpHero} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(48px,6vw,88px)", lineHeight: 1.05, color: "#fff", margin: "0 0 32px", maxWidth: 820 }}>
              Nigeria&apos;s Bridge to<br /><span style={{ color: "#F5922E" }}>World-Class</span><br />Healthcare
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 580, margin: 0 }}>
              COSMED Nigeria is a specialist medical device distribution company. We don&apos;t manufacture — we connect. Our role is to ensure that surgeons and hospitals across Nigeria and our international markets have access to the premium medical devices, implants, and instruments they need to deliver the best possible patient outcomes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Quote strip ── */}
      <section style={{ background: "#F5922E", padding: "48px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.p
            variants={fadeScale}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.8vw,34px)", lineHeight: 1.15, color: "#fff", textAlign: "center", maxWidth: 900, margin: "0 auto" }}
          >
            &ldquo;We are the bridge between international manufacturers and the Nigerian healthcare market — focused exclusively on premium medical devices and surgical supply.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── Supply model ── */}
      <section style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Structured Channels</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.05, color: "#1A1A1A", margin: "0 0 24px" }}>Structured Channels<br />Built for Reliability</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.65, color: "#454745", margin: "0 0 24px" }}>
                COSMED manages highly efficient logistics and account systems across two primary supply channels to ensure medical networks and clinics enjoy seamless access to premium healthcare products.
              </p>
            </motion.div>

            <motion.div
              variants={stagger15}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {[
                { title: "Direct Purchase Supply", body: "Hospitals and clinical networks can establish direct procurement contracts with COSMED for bulk or regular deliveries, backed by professional in-theatre and customer support." },
                { title: "Managed Distributor Access", body: "Regional healthcare facilities and independent clinics can source premium medical devices through our vetted, trained distributor partners for localized service." },
              ].map(({ title, body }) => (
                <motion.div key={title} variants={fadeUp} style={{ background: "#FDF0E0", borderRadius: 6, padding: "28px 26px", transition: "transform 200ms, box-shadow 200ms" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(245,146,46,0.15)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 17, color: "#1A1A1A", marginBottom: 10 }}>{title}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "#454745" }}>{body}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: "#FDF0E0", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>What Drives Us</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>Our Values</h2>
          </div>
          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUpScale} style={{ background: "#fff", borderRadius: 8, padding: "32px 28px", border: "1px solid rgba(26,26,26,0.10)", transition: "border-color 200ms, transform 200ms, box-shadow 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#F5922E"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(245,146,46,0.1)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,26,26,0.10)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FDF0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#F5922E", marginBottom: 18 }}>{v.icon}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.25, color: "#1A1A1A", marginBottom: 10 }}>{v.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "#454745" }}>{v.body}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Our Journey</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>How We Got Here</h2>
          </div>
          <motion.div
            variants={stagger08}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 1, background: "rgba(26,26,26,0.08)", borderRadius: 6, overflow: "hidden" }}
          >
            {milestones.map(({ year, event }) => (
              <motion.div key={year} variants={fadeUpSm} style={{ background: "#fff", padding: "32px 28px", transition: "background 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FDF0E0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                <div style={{ fontFamily: "'PT Mono',monospace", fontSize: 12, color: "#F5922E", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>{year}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>{event}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Global Footprint ── */}
      <section style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ marginBottom: 48 }}
          >
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Global Footprint</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.05, color: "#1A1A1A", margin: "0 0 20px" }}>
              Operating Across<br /><span style={{ color: "#F5922E" }}>4 Countries</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "#454745", maxWidth: 560, margin: 0 }}>
              From our home market in Nigeria to manufacturer hubs and regional trade centres — COSMED has a presence across the full supply chain.
            </p>
          </motion.div>

          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 16 }}
          >
            {globalPresence.map(({ flag, name, role, city, body }) => (
              <motion.div
                key={name}
                variants={fadeUpSm}
                style={{ border: "1px solid rgba(26,26,26,0.10)", borderRadius: 8, padding: "32px 24px", background: "#fff", transition: "border-color 200ms, background 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#F5922E"; el.style.background = "#FDF0E0"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,26,26,0.10)"; el.style.background = "#fff"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16, lineHeight: 1 }}>{flag}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{role}</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, color: "#1A1A1A", marginBottom: 6 }}>{name}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 12, color: "#8A8A88", marginBottom: 14 }}>📍 {city}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "#454745" }}>{body}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: "#FDF0E0", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>The Team</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>Small Team.<br />Big Reach.</h2>
          </div>
          <motion.div
            variants={stagger08}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}
          >
            {team.map(({ initials, name, role, bg, color }) => (
              <motion.div key={name} variants={scaleIn} style={{ background: "#fff", borderRadius: 8, padding: 28, boxShadow: "rgba(26,26,26,0.08) 0 0 0 1px", transition: "transform 200ms, box-shadow 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "rgba(26,26,26,0.15) 0 8px 32px"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "rgba(26,26,26,0.08) 0 0 0 1px"; }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, color, marginBottom: 14 }}>{initials}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "#1A1A1A", marginBottom: 4 }}>{name}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 13, color: "#8A8A88", lineHeight: 1.5 }}>{role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#1A1A1A", padding: "72px 32px" }}>
        <motion.div
          variants={stagger12}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}
        >
          <div>
            <motion.h3 variants={fadeLeftSm} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.05, color: "#fff", margin: "0 0 12px" }}>Work With Us</motion.h3>
            <motion.p variants={fadeLeftSm} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.65)", margin: 0 }}>Hospitals, surgeons, and distributors — let&apos;s build something together.</motion.p>
          </div>
          <motion.div variants={fadeLeftSm}>
            <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, background: "#F5922E", color: "#fff", borderRadius: 6, padding: "14px 28px", textDecoration: "none", transition: "transform 150ms, box-shadow 150ms", display: "inline-block" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.4)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
              Get in Touch →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
