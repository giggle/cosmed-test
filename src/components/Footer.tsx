"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger06, viewport, easeStrong } from "@/lib/animations";

const navCols = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ padding: "56px 32px 0", background: "#111111", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          variants={stagger06}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start"
        >
          {/* Left — social */}
          <motion.div variants={fadeUp}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
              Stay connected with us
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {[
                {
                  label: "X",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>,
                },
                {
                  label: "Instagram",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
                },
                {
                  label: "Facebook",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", transition: "color 150ms" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — nav columns */}
          <div className="flex gap-10 sm:gap-16">
            {navCols.map((col) => (
              <motion.div key={col.title} variants={fadeUp}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 18 }}>
                  {col.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 150ms" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Watermark wordmark */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1.2, ease: easeStrong }}
        style={{ position: "relative", zIndex: 1, marginTop: 24, overflow: "hidden", lineHeight: 0.82, marginLeft: -32, marginRight: -32 }}
      >
        <div style={{
          fontFamily: "'Sora',sans-serif", fontWeight: 800,
          fontSize: "clamp(56px, 18vw, 220px)",
          color: "rgba(255,255,255,0.06)",
          letterSpacing: -4,
          userSelect: "none",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          COSMED
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            © 2026 COSMED Nigeria. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Terms of Service", "Privacy Policy"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
