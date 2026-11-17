"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  heroStagger, fadeBadge, fadeUpHero, fadeUp,
  fadeLeft, fadeRight, scaleInBack,
  stagger08, stagger12,
  viewport,
} from "@/lib/animations";

const customerTypes = [
  { value: "hospital", label: "Hospital / Clinic" },
  { value: "surgeon", label: "Independent Surgeon" },
  { value: "distributor", label: "Distributor / Sub-Dealer" },
  { value: "institution", label: "Medical Institution / Network" },
];

const subjects = [
  { value: "direct", label: "Direct Purchase Enquiry" },
  { value: "distributor", label: "Become a Distributor Partner" },
  { value: "institution", label: "Institutional Supply Contracts" },
  { value: "other", label: "Other General Enquiry" },
];

const offices = [
  { city: "Lagos", role: "Head Office", territory: "South-West Nigeria" },
  { city: "Abuja", role: "FCT Office", territory: "FCT & North-Central" },
  { city: "Jos", role: "North-Central", territory: "Plateau, Benue & Kaduna" },
  { city: "Kano", role: "North-West", territory: "Kano, Kaduna & Jigawa" },
  { city: "Enugu", role: "South-East", territory: "South-East Nigeria" },
];

const territories = [
  { state: "Abuja", rep: "FCT Representative" },
  { state: "Jos", rep: "North-Central Representative" },
  { state: "Lagos", rep: "South-West Representative" },
  { state: "Kano", rep: "North-West Representative" },
  { state: "Enugu", rep: "South-East Representative" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "hospital", subject: "direct", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.message.trim()) e.message = "Please include a message";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15,
    padding: "11px 16px", borderRadius: 4, outline: "none",
    border: hasError ? "1px solid #d03238" : "1px solid rgba(26,26,26,0.18)",
    background: "#fff", color: "#1A1A1A", transition: "box-shadow 150ms",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
    fontSize: 13, color: "#1A1A1A", marginBottom: 6,
  };

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: "96px 32px 80px", background: "#1A1A1A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div variants={heroStagger} initial="hidden" animate="visible">
            <motion.div variants={fadeBadge} style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, background: "rgba(245,146,46,0.15)", color: "#F5922E", padding: "5px 14px", borderRadius: 6, letterSpacing: 1 }}>Contact</span>
            </motion.div>
            <motion.h1 variants={fadeUpHero} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(48px,6vw,88px)", lineHeight: 1.05, color: "#fff", margin: "0 0 28px", maxWidth: 720 }}>
              Talk to a<br /><span style={{ color: "#F5922E" }}>COSMED</span><br />Specialist
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 0 24px" }}>
              Whether you&apos;re a hospital, clinical network, surgeon, or distributor — reach out and your nearest territory representative will respond within one business day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Form + sidebar ── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Send a Message</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.1, color: "#1A1A1A", margin: "0 0 36px" }}>Get in Touch</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 280, damping: 22 }}
                    style={{ background: "#FDF0E0", borderRadius: 8, padding: "48px 40px", textAlign: "center" }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F5922E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>✓</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 26, color: "#1A1A1A", marginBottom: 12 }}>Message Received</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 15, color: "#454745", lineHeight: 1.6 }}>
                      Thank you, <strong>{form.name}</strong>. A COSMED territory representative will contact you at <strong>{form.email || form.phone}</strong> within one business day.
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Customer type */}
                    <fieldset style={{ border: "none", padding: 0, margin: "0 0 20px" }}>
                      <legend style={{ ...labelStyle, float: "left", width: "100%", marginBottom: 8 }}>I am a <span style={{ color: "#F5922E" }}>*</span></legend>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", clear: "both" }}>
                        {customerTypes.map((ct) => (
                          <button key={ct.value} type="button" onClick={() => setForm((f) => ({ ...f, type: ct.value }))}
                            style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", background: form.type === ct.value ? "#F5922E" : "rgba(26,26,26,0.06)", color: form.type === ct.value ? "#fff" : "#1A1A1A", transition: "background 150ms, transform 150ms" }}
                            onMouseEnter={(e) => { if (form.type !== ct.value) (e.currentTarget as HTMLElement).style.background = "rgba(245,146,46,0.12)"; }}
                            onMouseLeave={(e) => { if (form.type !== ct.value) (e.currentTarget as HTMLElement).style.background = "rgba(26,26,26,0.06)"; }}
                          >
                            {ct.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <div style={{ marginBottom: 20 }}>
                        <label htmlFor="field-name" style={labelStyle}>Full Name <span style={{ color: "#F5922E" }}>*</span></label>
                        <input id="field-name" value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: "" })); }}
                          style={inputStyle(!!errors.name)}
                          onFocus={(e) => { e.target.style.boxShadow = "rgb(138,138,136) 0 0 0 1px inset"; }}
                          onBlur={(e) => { e.target.style.boxShadow = "none"; }} />
                        {errors.name && <div style={{ fontSize: 12, color: "#d03238", marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{errors.name}</div>}
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <label htmlFor="field-company" style={labelStyle}>Hospital / Company</label>
                        <input id="field-company" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                          style={inputStyle(false)}
                          onFocus={(e) => { e.target.style.boxShadow = "rgb(138,138,136) 0 0 0 1px inset"; }}
                          onBlur={(e) => { e.target.style.boxShadow = "none"; }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <div style={{ marginBottom: 20 }}>
                        <label htmlFor="field-email" style={labelStyle}>Email Address <span style={{ color: "#F5922E" }}>*</span></label>
                        <input id="field-email" type="email" value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: "" })); }}
                          style={inputStyle(!!errors.email)}
                          onFocus={(e) => { e.target.style.boxShadow = "rgb(138,138,136) 0 0 0 1px inset"; }}
                          onBlur={(e) => { e.target.style.boxShadow = "none"; }} />
                        {errors.email && <div style={{ fontSize: 12, color: "#d03238", marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{errors.email}</div>}
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <label htmlFor="field-phone" style={labelStyle}>Phone Number <span style={{ color: "#F5922E" }}>*</span></label>
                        <input id="field-phone" type="tel" placeholder="+234" value={form.phone} onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((er) => ({ ...er, phone: "" })); }}
                          style={inputStyle(!!errors.phone)}
                          onFocus={(e) => { e.target.style.boxShadow = "rgb(138,138,136) 0 0 0 1px inset"; }}
                          onBlur={(e) => { e.target.style.boxShadow = "none"; }} />
                        {errors.phone && <div style={{ fontSize: 12, color: "#d03238", marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{errors.phone}</div>}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label htmlFor="field-subject" style={labelStyle}>What can we help with?</label>
                      <select id="field-subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        style={{ ...inputStyle(false), cursor: "pointer" }}>
                        {subjects.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label htmlFor="field-message" style={labelStyle}>Message <span style={{ color: "#F5922E" }}>*</span></label>
                      <textarea id="field-message" rows={5} placeholder="Tell us about your facility, surgical volumes, and what you need..."
                        value={form.message} onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: "" })); }}
                        style={{ ...inputStyle(!!errors.message), resize: "vertical" }}
                        onFocus={(e) => { e.target.style.boxShadow = "rgb(138,138,136) 0 0 0 1px inset"; }}
                        onBlur={(e) => { e.target.style.boxShadow = "none"; }} />
                      {errors.message && <div style={{ fontSize: 12, color: "#d03238", marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{errors.message}</div>}
                    </div>

                    <button type="submit" style={{ width: "100%", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, background: "#F5922E", color: "#fff", border: "none", borderRadius: 6, padding: "15px 28px", cursor: "pointer", transition: "transform 150ms, box-shadow 150ms" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.02)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.4)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
                      Send Message →
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              variants={stagger08}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.div variants={fadeRight}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#C46F15", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Our Offices</div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.1, color: "#1A1A1A", margin: "0 0 28px" }}>Find Us</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                  {offices.map(({ city, role, territory }) => (
                    <motion.div key={city} variants={fadeRight} style={{ background: "#FDF0E0", borderRadius: 6, padding: "20px 22px", transition: "transform 200ms, box-shadow 200ms" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 24px rgba(245,146,46,0.12)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#1A1A1A" }}>{city}</div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, background: "#fff", color: "#C46F15", padding: "3px 10px", borderRadius: 6 }}>{role}</span>
                      </div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "#8A8A88" }}>Covers: {territory}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Territory reps */}
              <motion.div variants={fadeRight} style={{ background: "#1A1A1A", borderRadius: 6, padding: 24 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 11, color: "#F5922E", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Territory Representatives</div>
                {territories.map(({ state, rep }) => (
                  <div key={state} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>{state}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{rep}</div>
                  </div>
                ))}
                <div style={{ marginTop: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  All enquiries are routed to your nearest rep and receive a response within <strong style={{ color: "#fff" }}>one business day.</strong>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Customer types strip ── */}
      <section style={{ padding: "48px 32px", background: "#FDF0E0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            variants={stagger12}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}
          >
            {["Government Hospitals", "Private Hospitals & Clinics", "Independent Surgeons", "Distributors & Sub-Dealers"].map((c) => (
              <motion.div key={c} variants={scaleInBack} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5922E" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "#454745" }}>{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
