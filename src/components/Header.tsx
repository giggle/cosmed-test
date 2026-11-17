"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ease, navItem, navCta } from "@/lib/animations";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  // Section links stay active on their sub-pages (e.g. /products/knee/ski).
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "0 32px",
          background: scrolled ? "rgba(255,255,255,0.96)" : "#fff",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          boxShadow: scrolled ? "rgba(26,26,26,0.07) 0 2px 16px" : "none",
          transition: "background 200ms ease, box-shadow 200ms ease",
        }}
      >
        <div
          style={{ maxWidth: 1280, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image src="/logo.jpeg" alt="COSMED Surgicals" width={180} height={40} style={{ objectFit: "contain", borderRadius: 4, height: "auto" }} priority />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <motion.nav
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            initial="hidden"
            animate="visible"
            style={{ alignItems: "center", gap: 2 }}
            className="hidden md:flex"
          >
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <motion.div key={l.href} variants={navItem}>
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13.5,
                      color: active ? "#F5922E" : "#1A1A1A",
                      textDecoration: "none",
                      padding: "7px 15px", borderRadius: 6,
                      letterSpacing: -0.084,
                      borderBottom: active ? "2px solid #F5922E" : "2px solid transparent",
                      transition: "background 150ms, color 150ms",
                      display: "block",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(253,240,224,0.7)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Desktop CTA */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
            initial="hidden"
            animate="visible"
            style={{ alignItems: "center", gap: 8 }}
            className="hidden md:flex"
          >
            <motion.div variants={navCta}>
              <Link
                href="/contact"
                style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13.5,
                  color: "#1A1A1A", padding: "8px 16px", borderRadius: 6,
                  boxShadow: "rgba(26,26,26,0.12) 0 0 0 1px",
                  background: "transparent", textDecoration: "none",
                  transition: "transform 150ms ease, box-shadow 150ms ease", display: "inline-block",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div variants={navCta}>
              <Link
                href="/contact"
                style={{
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13.5,
                  color: "#fff", background: "#F5922E", padding: "8px 20px", borderRadius: 6,
                  textDecoration: "none", transition: "transform 150ms ease", display: "inline-block",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                Request Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile bottom drawer — rendered outside header to avoid stacking context issues */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden"
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 120 }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden"
              style={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                background: "#fff",
                borderRadius: "16px 16px 0 0",
                padding: "12px 24px 48px",
                zIndex: 130,
                boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
              }}
            >
              {/* Handle bar */}
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(26,26,26,0.15)", margin: "0 auto 28px" }} />

              {/* Nav links */}
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                    fontSize: 17, color: isActive(l.href) ? "#F5922E" : "#1A1A1A",
                    textDecoration: "none", padding: "14px 0",
                    borderBottom: "1px solid rgba(26,26,26,0.06)",
                  }}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5922E", flexShrink: 0 }} />
                  )}
                </Link>
              ))}

              {/* CTA buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", textAlign: "center",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16,
                    color: "#fff", background: "#F5922E", borderRadius: 6, padding: "14px 24px",
                    textDecoration: "none",
                  }}
                >
                  Request Demo
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", textAlign: "center",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16,
                    color: "#1A1A1A", background: "transparent", borderRadius: 6, padding: "14px 24px",
                    textDecoration: "none", boxShadow: "rgba(26,26,26,0.12) 0 0 0 1px",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
