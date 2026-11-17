"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpSm, stagger08, viewport } from "@/lib/animations";

export type Card = {
  key: string;
  eyebrow?: string;
  title: string;
  blurb: string;
  href: string | null; // null = coming soon
  image: string | null;
  items: { label: string; href: string }[];
};

const body = "var(--font-body)";
const display = "var(--font-display)";

function Plus() {
  return (
    <svg width="44" height="44" viewBox="0 0 50 50" fill="none" aria-hidden>
      <rect x="7" y="20" width="36" height="10" rx="5" fill="#F5922E" />
      <rect x="20" y="7" width="10" height="36" rx="5" fill="#F5922E" />
    </svg>
  );
}

export default function CardGrid({ cards }: Readonly<{ cards: Card[] }>) {
  return (
    <motion.div
      variants={stagger08}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}
    >
      {cards.map((c) => {
        const soon = c.href === null;
        const top = (
          <>
            <div style={{ height: 200, background: "#FDF0E0", position: "relative", display: "grid", placeItems: "center" }}>
              {c.image ? (
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="p-6! transition-transform duration-300 group-hover:scale-105" style={{ objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <Plus />
              )}
              {soon && (
                <span style={{ position: "absolute", top: 12, left: 12, fontFamily: body, fontWeight: 600, fontSize: 11, background: "#fff", color: "#C46F15", padding: "4px 10px", borderRadius: 6 }}>Coming soon</span>
              )}
            </div>
            <div style={{ padding: "20px 22px 0" }}>
              {c.eyebrow && <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#C46F15", marginBottom: 6 }}>{c.eyebrow}</div>}
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: "#1A1A1A", marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.6, color: "#454745" }}>{c.blurb}</p>
            </div>
          </>
        );
        return (
          <motion.div
            key={c.key}
            variants={fadeUpSm}
            className="group flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-[rgba(26,26,26,0.16)_0_8px_32px]"
            style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "rgba(26,26,26,0.12) 0 0 0 1px" }}
          >
            {soon ? <div>{top}</div> : <Link href={c.href!} style={{ textDecoration: "none" }}>{top}</Link>}

            {c.items.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "16px 22px 0" }}>
                {c.items.map((it) => (
                  <Link key={it.href} href={it.href} className="hover:bg-[rgba(245,146,46,0.14)]" style={{ fontFamily: body, fontWeight: 600, fontSize: 12, color: "#1A1A1A", background: "rgba(26,26,26,0.06)", borderRadius: 6, padding: "6px 10px", textDecoration: "none", transition: "background 150ms" }}>
                    {it.label}
                  </Link>
                ))}
              </div>
            )}

            <div style={{ padding: "18px 22px 22px", marginTop: "auto" }}>
              <Link href={c.href ?? "/contact"} style={{ fontFamily: body, fontWeight: 600, fontSize: 14, color: "#F5922E", textDecoration: "none" }}>
                {soon ? "Enquire about this range →" : "View range →"}
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
