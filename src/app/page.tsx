"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  heroStagger, fadeBadge, fadeUpHero, fadeUp, fadeUpSm,
  fadeLeft, scaleInBack, ease,
  stagger06, stagger10, stagger12, stagger15,
  viewport,
} from "@/lib/animations";
import bgImage from "@/assets/bg.png";
import WorldMap from "@/components/WorldMap";

const features = [
  { icon: "⊕", title: "Medical Devices & Implants", body: "Knee, hip, spine, trauma, and specialist medical devices from internationally certified manufacturers — delivered directly to your OR." },
  { icon: "⊞", title: "Territory Coverage", body: "Dedicated professional sales representatives operating across Nigeria's key states — with support from our international hubs." },
  { icon: "⊡", title: "Distributor Network", body: "A managed, vetted network of regional partners and sub-dealers extending our reach to serve remote clinics and hospitals." },
];

const stats = [
  { n: "5", l: "Product Categories" },
  { n: "4", l: "Countries" },
  { n: "3", l: "Sales Channels" },
  { n: "100%", l: "Medical Device Focus" },
];

type CountryData = {
  id: number;
  flag: string;
  name: string;
  role: string;
  headline: string;
  body: string;
  territories?: { n: string; t: string }[];
  keyCity?: string;
  highlights?: string[];
};

const countries: CountryData[] = [
  {
    id: 0, flag: "🇳🇬", name: "Nigeria", role: "Primary Market",
    headline: "Our Home Market",
    body: "COSMED's primary home operations — dedicated field representatives, clinical support, and structured direct supply networks across 5+ active states.",
    territories: [
      { n: "Abuja", t: "FCT — government & private sector accounts" },
      { n: "Jos", t: "North-Central — established surgical hub" },
      { n: "Lagos", t: "South-West — largest hospital network" },
      { n: "Kano", t: "North-West — key commercial & clinical healthcare hub" },
      { n: "Enugu", t: "South-East — regional hospital & clinic coverage" },
    ],
  },
  {
    id: 1, flag: "🇮🇳", name: "India", role: "Manufacturer Sourcing Hub",
    headline: "Sourcing World-Class Implants",
    body: "India is home to several of the internationally certified medical device and implant manufacturers we partner with. Our India presence supports product sourcing, quality oversight, and manufacturer relationship management.",
    keyCity: "New Delhi",
    highlights: ["Manufacturer partnerships", "Quality assurance oversight", "Product pipeline development"],
  },
  {
    id: 2, flag: "🇬🇭", name: "Ghana", role: "West Africa Expansion",
    headline: "Growing Across West Africa",
    body: "Ghana is COSMED's gateway to the broader West African healthcare market. We are establishing distribution relationships and supply channel infrastructure to serve hospitals and surgeons across the region.",
    keyCity: "Accra",
    highlights: ["Distribution partnerships", "Regional market development", "Healthcare supply access"],
  },
  {
    id: 3, flag: "🇦🇪", name: "Dubai", role: "Regional Trade Hub",
    headline: "Middle East & Africa Hub",
    body: "Dubai serves as COSMED's regional hub for trade, logistics co-ordination, and partnerships across the Middle East and North Africa corridor — facilitating faster product movement and regional business development.",
    keyCity: "Dubai, UAE",
    highlights: ["Trade & logistics coordination", "Regional partnerships", "MENA market access"],
  },
];

export default function HomePage() {
  const [activeCountry, setActiveCountry] = useState(0);
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: "relative", padding: "96px 32px 80px", overflow: "hidden" }}>
        <Image src={bgImage} alt="Operating theatre with surgical lighting and medical equipment" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeBadge} style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, background: "rgba(255,255,255,0.92)", color: "#C46F15", padding: "5px 14px", borderRadius: 6, letterSpacing: 0.5, boxShadow: "rgba(26,26,26,0.10) 0 0 0 1px" }}>
                Nigeria&apos;s Trusted Healthcare Partner
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpHero}
              style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(52px,7vw,96px)", lineHeight: 1.05, color: "#1A1A1A", margin: "0 0 32px", maxWidth: 900, letterSpacing: -1 }}
            >
              The Right Implant.<br />
              <span style={{ color: "#F5922E" }}>Right Here.</span><br />
              Right Now.
            </motion.h1>

            <motion.p
              variants={fadeUpSm}
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.55, color: "#1A1A1A", maxWidth: 560, margin: "0 0 40px", letterSpacing: 0.18 }}
            >
              COSMED Nigeria bridges world-class medical device manufacturers and the Nigerian healthcare market — supplying hospitals, surgeons, and clinics with premium implants, surgical devices, and consumables they can trust.
            </motion.p>

            <motion.div variants={stagger10} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
              <motion.div variants={fadeUpSm}>
                <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, background: "#F5922E", color: "#fff", borderRadius: 6, padding: "13px 28px", textDecoration: "none", lineHeight: 1, transition: "transform 150ms ease, box-shadow 150ms ease", display: "inline-block" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.4)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
                  Talk to a Specialist
                </Link>
              </motion.div>
              <motion.div variants={fadeUpSm}>
                <Link href="/products" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, background: "rgba(255,255,255,0.88)", color: "#1A1A1A", borderRadius: 6, padding: "13px 28px", textDecoration: "none", lineHeight: 1, transition: "transform 150ms ease, background 150ms", display: "inline-block", boxShadow: "rgba(26,26,26,0.12) 0 0 0 1px" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.background = "rgba(255,255,255,1)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.background = "rgba(255,255,255,0.88)"; }}>
                  View Implant Catalog →
                </Link>
              </motion.div>
            </motion.div>

            {/* <motion.div variants={stagger06} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 64 }}>
              {["COSMED Assist", "COSMED Academy", "Clinical Support"].map((b) => (
                <motion.span key={b} variants={scaleInBack} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "#454745", padding: "5px 14px", borderRadius: 6, border: "1px solid rgba(26,26,26,0.18)", background: "rgba(255,255,255,0.80)", transition: "border-color 200ms, color 200ms, background 200ms", cursor: "default" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#F5922E"; el.style.color = "#C46F15"; el.style.background = "rgba(255,255,255,0.96)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,26,26,0.18)"; el.style.color = "#454745"; el.style.background = "rgba(255,255,255,0.80)"; }}>
                  {b}
                </motion.span>
              ))}
            </motion.div> */}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: 1, background: "rgba(26,26,26,0.08)", borderRadius: 6, overflow: "hidden", maxWidth: 860 }}
          >
            {stats.map(({ n, l }) => (
              <motion.div key={l} variants={fadeUpSm} style={{ background: "#fff", padding: "24px 28px", transition: "background 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FDF0E0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 32, lineHeight: 0.9, color: "#F5922E", marginBottom: 8 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "#8A8A88", letterSpacing: -0.084 }}>{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: "#FDF0E0", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 24 }}
          >
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>How We Work</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(36px,4.5vw,64px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>
                More Than<br />Distribution
              </h2>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.55, color: "#454745", maxWidth: 380, margin: 0 }}>
              Through structured direct sales channels, responsive territory coverage, and a trusted distributor network, we ensure reliable, timely supply for every healthcare facility we serve.
            </p>
          </motion.div>

          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.10)", borderRadius: 8, padding: "28px 26px", transition: "border-color 200ms, transform 200ms, box-shadow 200ms", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#F5922E"; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(245,146,46,0.12)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,26,26,0.10)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FDF0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#F5922E", marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.25, letterSpacing: -0.396, color: "#1A1A1A", marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "#454745" }}>{f.body}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COSMED Assist & Academy ── */}
      <section style={{ background: "#fff", padding: "80px 32px", borderTop: "1px solid rgba(26,26,26,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ marginBottom: 48, textAlign: "center" }}
          >
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Value-Added Pillars</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, color: "#1A1A1A", margin: "0 auto 16px", maxWidth: 720 }}>
              More Than a Supplier:<br />Your Partner in <span style={{ color: "#F5922E" }}>Clinical Excellence</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.55, color: "#454745", maxWidth: 600, margin: "0 auto" }}>
              We wrap our world-class medical implants and hardware in premium clinical support and surgical training to ensure clinical accuracy and exceptional patient outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* COSMED Assist */}
            <motion.div
              variants={fadeUp}
              style={{
                background: "#1A1A1A",
                color: "#fff",
                borderRadius: 12,
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: 120, height: 120, borderRadius: "50%", background: "rgba(245,146,46,0.08)" }} />
              <div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 10, background: "rgba(245,146,46,0.15)", color: "#F5922E", padding: "4px 10px", borderRadius: 4, letterSpacing: 1, textTransform: "uppercase", display: "inline-block", marginBottom: 20 }}>
                  Service & Technical Support
                </span>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 28, color: "#fff", margin: "0 0 16px" }}>COSMED Assist</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
                  Our dedicated operating room technical service division. We ensure that your surgical teams are supported at every critical step with timely logistics and in-theatre assistance.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                    <span style={{ color: "#F5922E", fontWeight: 700 }}>✦</span>
                    <div><strong>In-Theatre Technical Presence:</strong> Certified support specialists available on-demand to assist with device preparation during complex surgeries.</div>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                    <span style={{ color: "#F5922E", fontWeight: 700 }}>✦</span>
                    <div><strong>Instrument Readiness & Prep:</strong> Assembly, verification, and pre-OR coordination of complete surgical instrumentation sets.</div>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                    <span style={{ color: "#F5922E", fontWeight: 700 }}>✦</span>
                    <div><strong>Logistics Coordination:</strong> Real-time delivery oversight linking our Abuja, Lagos, Kano, Jos, and Enugu nodes directly to your schedule.</div>
                  </li>
                </ul>
              </div>
              <Link href="/services#assist" style={{ alignSelf: "flex-start", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "#F5922E", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "transform 150ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
                Learn About Support Services →
              </Link>
            </motion.div>

            {/* COSMED Academy */}
            <motion.div
              variants={fadeUp}
              style={{
                background: "#FDF0E0",
                color: "#1A1A1A",
                borderRadius: 12,
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(26,26,26,0.06)",
                boxShadow: "0 20px 48px rgba(245,146,46,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: 120, height: 120, borderRadius: "50%", background: "rgba(245,146,46,0.12)" }} />
              <div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 10, background: "#fff", color: "#C46F15", padding: "4px 10px", borderRadius: 4, letterSpacing: 1, textTransform: "uppercase", display: "inline-block", marginBottom: 20 }}>
                  Clinical Education & Training
                </span>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 28, color: "#1A1A1A", margin: "0 0 16px" }}>COSMED Academy</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "#454745", marginBottom: 28 }}>
                  Our professional knowledge sharing and clinical skills platform. We partner with leading key opinion leaders to host interactive surgical workshops and technology demos.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#1A1A1A" }}>
                    <span style={{ color: "#C46F15", fontWeight: 700 }}>✦</span>
                    <div><strong>Surgical Technique Workshops:</strong> Hands-on simulation, bioskills coordination, and technology briefings on new implant methods.</div>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#1A1A1A" }}>
                    <span style={{ color: "#C46F15", fontWeight: 700 }}>✦</span>
                    <div><strong>Theatre Staff Training:</strong> Practical instrumentation handling and setup modules tailored specifically for theatre and recovery room nurses.</div>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#1A1A1A" }}>
                    <span style={{ color: "#C46F15", fontWeight: 700 }}>✦</span>
                    <div><strong>Clinical Symposiums & Seminars:</strong> Regular scientific forums facilitating surgical technique updates and regional case reviews.</div>
                  </li>
                </ul>
              </div>
              <Link href="/services#academy" style={{ alignSelf: "flex-start", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "#C46F15", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "transform 150ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
                Explore Training Programs →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Global Presence ── */}
      <section style={{ background: "#1A1A1A", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#F5922E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Global Presence</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.05, color: "#fff", margin: 0 }}>
              Where We <span style={{ color: "#F5922E" }}>Operate</span>
            </h2>
          </motion.div>

          {/* Two-column: map left, tabs + content right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]" style={{ gap: 56, alignItems: "start" }}>

            {/* Left: world map */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ position: "sticky", top: 100 }}
            >
              <WorldMap activeCountry={activeCountry} />
            </motion.div>

            {/* Right: tab bar + animated content */}
            <div>
              {/* Tab bar */}
              <motion.div
                variants={stagger10}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}
              >
                {countries.map((c, i) => (
                  <motion.button
                    key={c.id}
                    variants={fadeUpSm}
                    onClick={() => setActiveCountry(i)}
                    style={{
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13,
                      padding: "7px 16px", borderRadius: 6, cursor: "pointer",
                      border: activeCountry === i ? "1px solid #F5922E" : "1px solid rgba(255,255,255,0.15)",
                      background: activeCountry === i ? "#F5922E" : "transparent",
                      color: activeCountry === i ? "#fff" : "rgba(255,255,255,0.6)",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={(e) => { if (activeCountry !== i) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={(e) => { if (activeCountry !== i) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {c.flag} {c.name}
                  </motion.button>
                ))}
              </motion.div>

              {/* Animated content panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCountry}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease }}
                >
                  {activeCountry === 0 ? (
                    /* Nigeria: territory grid */
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                      {countries[0].territories!.map(({ n, t }) => (
                        <div
                          key={n}
                          style={{ padding: "24px 20px", background: "#1E1E1E", transition: "background 200ms" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#252525"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E1E1E"; }}
                        >
                          <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, color: "#F5922E", marginBottom: 6 }}>{n}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{t}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* India / Ghana / Dubai: country presence card */
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#F5922E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
                          {countries[activeCountry].role}
                        </div>
                        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.5vw,34px)", lineHeight: 1.1, color: "#fff", margin: "0 0 16px" }}>
                          {countries[activeCountry].headline}
                        </h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: "0 0 20px" }}>
                          {countries[activeCountry].body}
                        </p>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                          📍 {countries[activeCountry].keyCity}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {countries[activeCountry].highlights!.map((item) => (
                          <div key={item} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, background: "rgba(255,255,255,0.03)" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(245,146,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#F5922E" }} />
                            </div>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ── Testimonial ── */}
      <section style={{ background: "#fff", padding: "96px 32px" }}>
        <motion.div
          variants={stagger15}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
        >
          <motion.div variants={fadeUp} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(48px,6vw,64px)", color: "#FDF0E0", lineHeight: 0.7, marginBottom: 8 }}>&ldquo;</motion.div>
          <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: "clamp(18px,2.2vw,26px)", lineHeight: 1.5, color: "#1A1A1A", margin: 0, fontStyle: "italic" }}>
            COSMED&apos;s highly reliable delivery coordination and consistent clinical support have transformed how we manage our surgical list planning. We receive premium quality implants exactly when needed, with remarkable support.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: "#F5922E", padding: "80px 32px" }}>
        <motion.div
          variants={stagger12}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}
        >
          <div>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,60px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
              Ready to Stock<br />Your Theatre?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 1.55, maxWidth: 440, margin: 0 }}>
              Speak with a COSMED territory representative and set up a direct supply channel or distributor partnership for your facility.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, background: "#fff", color: "#F5922E", borderRadius: 6, padding: "13px 28px", textDecoration: "none", lineHeight: 1, transition: "transform 150ms ease, box-shadow 150ms", display: "inline-block" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
              Contact a Rep
            </Link>
            <Link href="/products" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, background: "transparent", color: "#fff", borderRadius: 6, padding: "13px 28px", textDecoration: "none", lineHeight: 1, boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.5)", transition: "transform 150ms ease, background 150ms", display: "inline-block" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.background = "transparent"; }}>
              Browse Implants →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
