"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import directFieldImg from "@/assets/services/direct-field.png";
import distributionNetworkImg from "@/assets/services/distribution-network.png";
import assistImg from "@/assets/services/loaner.png";
import academyImg from "@/assets/services/surgeon.png";
import {
  heroStagger, fadeBadge, fadeUpHero, fadeUp, fadeUpSm,
  fadeLeft, ease,
  stagger08, stagger10, stagger12,
  viewport,
} from "@/lib/animations";

const services = [
  {
    id: 0,
    icon: "✦",
    image: assistImg,
    title: "COSMED Assist",
    short: "In-theatre presence and clinical support services.",
    body: "COSMED Assist is our elite clinical and technical support division. We understand that advanced medical devices and implants require precise execution. Our certified technical representatives coordinate directly with your surgical team, ensuring full theatre readiness, in-theatre technical oversight, and absolute peace of mind during complex procedures across Abuja, Lagos, Kano, Jos, and Enugu.",
    items: [
      "Theatre Readiness & Preparation: Pre-operative coordination of surgical instrumentation and device verification.",
      "In-Theatre Technical Presence: On-demand certified specialists assisting in the theatre with layout and instrumentation.",
      "Logistics & Scheduling: Direct synchronization of clinical requirements with our supply networks in key hubs.",
      "Instrument Verification & Safety: Complete tracking, inspection, and validation of all surgical equipment before entry."
    ],
  },
  {
    id: 1,
    icon: "◎",
    image: academyImg,
    title: "COSMED Academy",
    short: "Clinical education, workshops, and nurse training.",
    body: "COSMED Academy is our professional knowledge-sharing and education platform. We bridge the gap between global innovations and local clinical practice by organizing hands-on bioskills workshops, clinical technology briefings, and specialized instrumentation training modules for theatre nurses, recovery teams, and resident surgeons.",
    items: [
      "Hands-On Surgical Workshops: Simulation-based training and technique workshops with industry-leading mentors.",
      "Theatre & Nurse Instrumentation: Dedicated modules on sterilization, assembly, and handling of complex precision instruments.",
      "Clinical Demos & Briefings: On-site presentation of new implant systems, technology upgrades, and clinical studies.",
      "Continuing Professional Development: Seminars and case-review forums to share updates across Nigerian healthcare institutions."
    ],
  },
  {
    id: 2,
    icon: "⊕",
    image: directFieldImg,
    title: "Direct Field Sales",
    short: "Dedicated representatives managing relationships directly.",
    body: "Our professional field sales team operates across key healthcare hubs, including Abuja, Jos, Lagos, Kano, and Enugu. We build direct relationships with hospitals, clinics, and medical networks, providing consistent clinical and administrative support. Each representative is committed to supporting your facility's product needs and delivery logistics.",
    items: [
      "Dedicated clinical sales representatives",
      "Regular hospital and clinic visits",
      "Product demonstrations and support",
      "Tailored account management for medical networks"
    ],
  },
  {
    id: 3,
    icon: "⊞",
    image: distributionNetworkImg,
    title: "Distributor & Sub-Dealer Network",
    short: "Extending access through trusted regional partners.",
    body: "To ensure that premium medical devices and implants are accessible across every region, COSMED partners with a select network of verified regional distributors and sub-dealers. We coordinate training, maintain strict quality assurance, and provide consistent supply support to deliver uniform excellence nationwide.",
    items: [
      "Distributor onboarding & compliance",
      "Product training & operational support",
      "Managed supply chain and stock access",
      "Performance monitoring & joint field support"
    ],
  },
];

const process = [
  { step: "01", title: "Initial Coordination", body: "We understand your clinical specialties, caseloads, and which product portfolios are most relevant to your operating theater." },
  { step: "02", title: "COSMED Academy Onboarding", body: "We train your theater and recovery nursing staff on specific instrument assembly, sterilization protocols, and handling." },
  { step: "03", title: "COSMED Assist Scheduling", body: "Your scheduling desk syncs with COSMED Assist to book technical representative support and verify device readiness ahead of surgery." },
  { step: "04", title: "Procedure & Continuous Support", body: "Our certified specialists provide in-theater presence during the surgery, ensuring perfect execution and immediate logistics oversight." },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: "96px 32px 80px", background: "#FDF0E0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeBadge} style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, background: "#fff", color: "#C46F15", padding: "5px 14px", borderRadius: 6, letterSpacing: 1, boxShadow: "rgba(26,26,26,0.12) 0 0 0 1px" }}>
                Services
              </span>
            </motion.div>
            <motion.h1 variants={fadeUpHero} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(48px,6vw,88px)", lineHeight: 1.05, color: "#1A1A1A", margin: "0 0 32px", maxWidth: 820 }}>
              Every Way<br /><span style={{ color: "#F5922E" }}>You Need</span><br />to Supply
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: "#454745", maxWidth: 540, margin: 0 }}>
              Through a combination of direct clinical sales and a managed distributor network, COSMED delivers a highly reliable, responsive supply channel across the Nigerian healthcare and medical device market.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Service selector ── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            {/* List */}
            <motion.div
              variants={stagger08}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {services.map((s, i) => (
                <motion.button
                  key={s.id}
                  variants={fadeLeft}
                  onClick={() => setActiveService(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
                    borderRadius: 6, border: activeService === i ? "1px solid #F5922E" : "1px solid rgba(26,26,26,0.10)",
                    background: activeService === i ? "#FDF0E0" : "#fff",
                    cursor: "pointer", textAlign: "left", transition: "all 150ms ease",
                    transform: activeService === i ? "translateX(4px)" : "none",
                  }}
                  onMouseEnter={(e) => { if (activeService !== i) (e.currentTarget as HTMLElement).style.background = "rgba(253,240,224,0.5)"; }}
                  onMouseLeave={(e) => { if (activeService !== i) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: activeService === i ? "#F5922E" : "#FDF0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: activeService === i ? "#fff" : "#F5922E", flexShrink: 0, transition: "all 150ms" }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "#1A1A1A", marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 13, color: "#8A8A88" }}>{s.short}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Detail panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ background: "#1A1A1A", borderRadius: 12, overflow: "hidden" }}
                  className="lg:sticky lg:top-22"
                >
                  {/* Service image */}
                  <div style={{ position: "relative", height: 240 }}>
                    <Image src={active.image} alt={active.title} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,26,26,0.1) 30%, #1A1A1A 100%)" }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "32px 40px 48px" }}>
                    <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(24px,3vw,36px)", lineHeight: 1.055, color: "#fff", margin: "0 0 20px" }}>{active.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: "0 0 32px" }}>{active.body}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {active.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(245,146,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5922E" }} />
                          </div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{item}</div>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" style={{ display: "inline-block", marginTop: 36, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, background: "#F5922E", color: "#fff", borderRadius: 6, padding: "12px 24px", textDecoration: "none", transition: "transform 150ms, box-shadow 150ms" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.4)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
                      Enquire About This Service →
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: "80px 32px", background: "#FDF0E0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Getting Started</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.05, color: "#1A1A1A", margin: 0 }}>From First Call<br />to First Procedure</h2>
          </div>
          <motion.div
            variants={stagger10}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 1, background: "rgba(26,26,26,0.08)", borderRadius: 6, overflow: "hidden" }}
          >
            {process.map(({ step, title, body }) => (
              <motion.div key={step} variants={fadeUpSm} style={{ background: "#fff", padding: "32px 28px", transition: "background 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFF8F0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                <div style={{ fontFamily: "'PT Mono',monospace", fontSize: 13, color: "#F5922E", marginBottom: 12, letterSpacing: 1 }}>{step}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 17, color: "#1A1A1A", marginBottom: 10 }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.55, color: "#454745" }}>{body}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "72px 32px", background: "#F5922E" }}>
        <motion.div
          variants={stagger12}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}
        >
          <div>
            <motion.h3 variants={fadeUpSm} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.05, color: "#fff", margin: "0 0 12px" }}>Ready to Get Started?</motion.h3>
            <motion.p variants={fadeUpSm} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.82)", margin: 0 }}>Tell us about your facility and we&apos;ll recommend the right supply model.</motion.p>
          </div>
          <motion.div variants={fadeUpSm}>
            <Link href="/contact" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, background: "#fff", color: "#F5922E", borderRadius: 6, padding: "14px 28px", textDecoration: "none", transition: "transform 150ms, box-shadow 150ms", display: "inline-block" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
              Contact Our Team →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
