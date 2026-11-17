"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroStagger, fadeBadge, fadeUpHero, fadeUp, fadeUpSm, stagger08, viewport } from "@/lib/animations";
import type { Block, Product, ProductPage, SpecCell } from "@/lib/products/types";

const ENQUIRY_EMAIL = "sales@cosmedsurgicals.com";

const C = {
  ink: "#1A1A1A",
  ink2: "#454745",
  muted: "#8A8A88",
  line: "#E8E8E5",
  accent: "#F5922E",
  accentDk: "#C46F15",
  peach: "#FDF0E0",
};
const display = "var(--font-display)";
const body = "var(--font-body)";
const mono = "var(--font-mono)";

/** Renders *asterisk* runs in the accent colour. */
export function Marked({ text }: Readonly<{ text: string }>) {
  return (
    <>
      {text.split(/\*(.+?)\*/g).map((part, i) =>
        i % 2 ? <span key={i} style={{ color: C.accent }}>{part}</span> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

// ── Buttons (site style: 6px radius, scale-up hover) ─────────────────────────
const btnBase = "inline-flex items-center justify-center whitespace-nowrap transition-[transform,box-shadow,border-color] duration-150 hover:scale-105";
const btnStyle = { fontFamily: body, fontWeight: 600, fontSize: 15, borderRadius: 6, padding: "14px 24px", textDecoration: "none", lineHeight: 1 } as const;

function Btn({ href, children, outline = false }: Readonly<{ href: string; children: ReactNode; outline?: boolean }>) {
  const style = outline
    ? { ...btnStyle, background: "#fff", color: C.ink, border: "1px solid rgba(26,26,26,0.16)" }
    : { ...btnStyle, background: C.accent, color: "#fff", border: `1px solid ${C.accent}` };
  const cls = `${btnBase} ${outline ? "hover:border-[#1A1A1A]" : "hover:shadow-[0_8px_24px_rgba(245,146,46,0.4)]"}`;
  if (href.startsWith("/")) return <Link href={href} className={cls} style={style}>{children}</Link>;
  return <a href={href} className={cls} style={style}>{children}</a>;
}

function Badge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span style={{ display: "inline-block", fontFamily: body, fontWeight: 600, fontSize: 11, background: C.peach, color: C.accentDk, padding: "5px 14px", borderRadius: 6, letterSpacing: 1 }}>
      {children}
    </span>
  );
}

function SecHead({ title, intro }: Readonly<{ title: string; intro: string }>) {
  return (
    <div className="mb-10! grid items-end gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(32px,4.2vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: C.ink }}>
        <Marked text={title} />
      </h2>
      {intro && <p style={{ color: C.ink2, fontSize: 16, lineHeight: 1.65, maxWidth: "50ch" }}>{intro}</p>}
    </div>
  );
}

function PlusList({ items }: Readonly<{ items: string[] }>) {
  if (items.length === 0) return null;
  return (
    <ul style={{ listStyle: "none", marginBottom: 28 }}>
      {items.map((f, i) => (
        <li key={f} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 0", borderTop: `1px solid ${C.line}`, borderBottom: i === items.length - 1 ? `1px solid ${C.line}` : undefined, fontSize: 15, lineHeight: 1.55, color: C.ink }}>
          <span aria-hidden style={{ flex: "none", display: "grid", placeItems: "center", width: 22, height: 22, borderRadius: "50%", background: C.accent, color: "#fff", fontFamily: display, fontWeight: 700, fontSize: 15, lineHeight: 1, marginTop: 1 }}>+</span>
          {f}
        </li>
      ))}
    </ul>
  );
}

// ── Spec table ───────────────────────────────────────────────────────────────
function SpecCellView({ cell, head }: Readonly<{ cell: SpecCell; head: boolean }>) {
  const content = cell.na
    ? <span aria-label="not available" style={{ color: C.line }}>–</span>
    : <>{cell.t}{cell.small && <small style={{ display: "block", fontFamily: body, fontSize: 12.5, color: C.muted, marginTop: 2 }}>{cell.small}</small>}</>;
  const pad = "10px 12px";
  if (head) {
    return <th scope="col" colSpan={cell.colSpan} rowSpan={cell.rowSpan} style={{ fontFamily: display, fontWeight: 700, fontSize: 15, color: C.ink, textAlign: "left", padding: pad, borderBottom: `1px solid ${C.line}` }}>{content}</th>;
  }
  if (cell.h) {
    return <th scope="row" rowSpan={cell.rowSpan} style={{ fontFamily: display, fontWeight: 700, fontSize: 14, color: C.ink, textAlign: "left", padding: pad }}>{content}</th>;
  }
  return (
    <td rowSpan={cell.rowSpan} colSpan={cell.colSpan} style={cell.mat
      ? { fontFamily: body, fontWeight: 600, fontSize: 14, color: C.ink, padding: pad, verticalAlign: "middle", borderRight: `1px solid ${C.line}` }
      : { fontFamily: mono, fontSize: 14, padding: pad, fontVariantNumeric: "tabular-nums", color: C.ink }}>
      {content}
    </td>
  );
}

function SpecListView({ spec }: Readonly<{ spec: NonNullable<Product["spec"]> }>) {
  return (
    <div className="lg:col-span-2" style={{ border: `1px solid ${C.line}`, borderRadius: 18, padding: "26px 28px 22px", minWidth: 0 }}>
      <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: C.ink, marginBottom: 4 }}>Available options</h3>
      <p style={{ color: C.muted, fontSize: 14, fontFamily: body, marginBottom: 18 }}>{spec.caption}</p>
      {spec.list!.map((g, i) => (
        <div key={g.title ?? i} style={{ marginTop: i ? 22 : 0 }}>
          {g.title && <h4 style={{ fontFamily: display, fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 10 }}>{g.title}</h4>}
          <ul className="grid gap-x-6" style={{ listStyle: "none", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
            {g.items.map((it) => (
              <li key={it} style={{ fontFamily: mono, fontSize: 13.5, lineHeight: 1.45, color: C.ink, padding: "9px 0", borderBottom: `1px solid ${C.line}` }}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SpecTableView({ spec }: Readonly<{ spec: NonNullable<Product["spec"]> }>) {
  if (spec.list) return <SpecListView spec={spec} />;
  return (
    <div className="lg:col-span-2" style={{ border: `1px solid ${C.line}`, borderRadius: 18, padding: "26px 28px 22px", minWidth: 0 }}>
      <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: C.ink, marginBottom: 4 }}>Specification</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: spec.head[0]?.length > 2 ? 480 : 0 }}>
          <caption style={{ textAlign: "left", color: C.muted, fontSize: 14, padding: "0 0 18px", fontFamily: body }}>{spec.caption}</caption>
          <thead>
            {spec.head.map((row, i) => <tr key={i}>{row.map((c, j) => <SpecCellView key={j} cell={c} head />)}</tr>)}
          </thead>
          <tbody>
            {spec.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i === spec.rows.length - 1 ? "none" : `1px solid ${C.line}` }}>
                {row.map((c, j) => <SpecCellView key={j} cell={c} head={false} />)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Product section ──────────────────────────────────────────────────────────
function ProductSection({ product: p, first }: Readonly<{ product: Product; first: boolean }>) {
  const ph = p.photo;
  const subject = encodeURIComponent(`Enquiry: ${p.name.replace(/[™®]/g, "")}`);
  return (
    <motion.section
      id={p.id}
      variants={fadeUpSm}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="grid gap-7 py-16! lg:grid-cols-2 lg:gap-14 lg:py-[88px]!"
      style={{ borderTop: first ? "none" : `1px solid ${C.line}`, scrollMarginTop: 140 }}
    >
      <figure style={{ margin: 0, position: "relative", alignSelf: "start", overflow: "hidden", borderRadius: 24, background: ph.bg, aspectRatio: ph.aspect, border: ph.bordered ? `1px solid ${C.line}` : undefined, minWidth: 0 }}>
        {ph.badge && (
          <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, background: "#fff", color: C.accentDk, fontFamily: body, fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 6 }}>{ph.badge}</span>
        )}
        {ph.image ? (
          <Image
            src={ph.image.src}
            alt={ph.alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className={ph.padded ? "p-4! sm:p-7!" : undefined}
            style={{ objectFit: ph.fit, mixBlendMode: ph.multiply ? "multiply" : "normal" }}
          />
        ) : (
          <div aria-hidden style={{ position: "absolute", inset: 0, display: "grid", placeContent: "center", textAlign: "center", fontFamily: display, fontWeight: 800, fontSize: 26, color: C.accent, opacity: 0.6 }}>{p.name}</div>
        )}
      </figure>

      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: mono, fontSize: 13, color: C.accentDk, marginBottom: 14 }}>{p.num}</p>
        <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(28px,3.2vw,40px)", lineHeight: 1.08, letterSpacing: "-0.03em", color: C.ink, marginBottom: 16 }}>{p.name}</h2>
        <p style={{ color: C.ink2, fontSize: 16, lineHeight: 1.65, marginBottom: 24 }}>{p.desc}</p>
        <PlusList items={p.feats} />
        {p.material && (
          <p style={{ fontSize: 15, marginBottom: 28, color: C.ink, lineHeight: 1.6 }}>
            <span style={{ display: "inline-block", background: C.peach, color: C.accentDk, fontWeight: 600, fontSize: 12, padding: "4px 11px", borderRadius: 6, marginRight: 10 }}>Material</span>
            {p.material}
          </p>
        )}
        <Btn href={`mailto:${ENQUIRY_EMAIL}?subject=${subject}`}>{p.enquireLabel}</Btn>
      </div>

      {p.spec && <SpecTableView spec={p.spec} />}
    </motion.section>
  );
}

// ── Other blocks ─────────────────────────────────────────────────────────────
const cardStyle = { border: `1px solid ${C.line}`, borderRadius: 18 } as const;

function BlockView({ block }: Readonly<{ block: Block }>) {
  switch (block.kind) {
    case "product":
      return <ProductSection product={block.product} first={false} />;

    case "group":
      return (
        <section id={block.id} className="pt-16! lg:pt-24!" style={{ scrollMarginTop: 120 }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <SecHead title={block.title} intro={block.intro} />
          </motion.div>
          {block.products.map((p, i) => <ProductSection key={p.id} product={p} first={i === 0} />)}
        </section>
      );

    case "chain":
      return (
        <section id={block.id ?? undefined} className="pt-16! lg:pt-24!" style={{ scrollMarginTop: 140 }}>
          <SecHead title={block.title} intro={block.intro} />
          <motion.ol variants={stagger08} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-5 md:grid-cols-3" style={{ listStyle: "none" }}>
            {block.items.map((it) => (
              <motion.li key={it.title} variants={fadeUpSm} style={{ ...cardStyle, padding: "26px 28px" }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: C.accentDk }}>{it.k}</span>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: C.ink, margin: "10px 0 6px" }}>{it.title}</h3>
                <p style={{ color: C.ink2, fontSize: 15, lineHeight: 1.6 }}>{it.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </section>
      );

    case "construct":
      return (
        <section id={block.id ?? undefined} className="pt-16! lg:pt-24!" style={{ scrollMarginTop: 140 }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="grid items-center gap-7 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <figure className="grid place-items-center p-8! lg:min-h-[460px]" style={{ margin: 0, borderRadius: 24, background: block.white ? "#fff" : C.peach, border: block.white ? `1px solid ${C.line}` : undefined }}>
              <Image src={block.image.src} alt={block.alt} width={block.image.width} height={block.image.height} sizes="(min-width: 1024px) 560px, 100vw" style={{ maxHeight: 520, width: "auto", height: "auto", maxWidth: "100%" }} />
            </figure>
            <div>
              <div style={{ marginBottom: 20 }}><Badge>{block.tag}</Badge></div>
              <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.08, letterSpacing: "-0.03em", color: C.ink, marginBottom: 16 }}><Marked text={block.title} /></h2>
              {block.body.map((t) => <p key={t} style={{ color: C.ink2, fontSize: 16, lineHeight: 1.65, marginBottom: 22 }}>{t}</p>)}
              <PlusList items={block.feats} />
            </div>
          </motion.div>
        </section>
      );

    case "compare":
      return (
        <section id={block.id ?? undefined} className="pt-16! lg:pt-24!" style={{ scrollMarginTop: 140 }}>
          <SecHead title={block.title} intro={block.intro} />
          <motion.div variants={fadeUpSm} initial="hidden" whileInView="visible" viewport={viewport} style={{ ...cardStyle, padding: "12px 18px 6px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Feature</span></th>
                  {block.cols.map((c, i) => (
                    <th key={c} scope="col" style={{ fontFamily: display, fontWeight: 700, fontSize: 18, textAlign: "left", padding: "16px 18px", borderBottom: `2px solid ${C.ink}`, color: i === block.cols.length - 1 ? C.accentDk : C.ink }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => {
                  const bb = i === block.rows.length - 1 ? "none" : `1px solid ${C.line}`;
                  return (
                    <tr key={r.label}>
                      <th scope="row" style={{ fontFamily: body, fontWeight: 600, fontSize: 14, color: C.ink2, textAlign: "left", padding: "16px 18px", width: "30%", borderBottom: bb }}>{r.label}</th>
                      {r.values.map((v, j) => <td key={j} style={{ fontSize: 15, padding: "16px 18px", borderBottom: bb, color: C.ink }}>{v}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </section>
      );

    case "benefits":
      return (
        <section id={block.id ?? undefined} className="pt-16! lg:pt-24!" style={{ scrollMarginTop: 140, ...(block.id === "benefits" ? { borderTop: `1px solid ${C.line}` } : {}) }}>
          <SecHead title={block.title} intro={block.intro} />
          <motion.ul variants={stagger08} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-5" style={{ listStyle: "none", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
            {block.items.map((it) => (
              <motion.li key={it.title} variants={fadeUpSm} style={{ ...cardStyle, padding: 28 }}>
                <span aria-hidden style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "50%", background: C.accent, color: "#fff", fontFamily: display, fontWeight: 700, fontSize: 24, lineHeight: 1, marginBottom: 20 }}>+</span>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: C.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>{it.title}</h3>
                <p style={{ color: C.ink2, fontSize: 15, lineHeight: 1.6 }}>{it.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      );
  }
}

// ── Sticky section chips with scroll-spy ─────────────────────────────────────
function Chips({ chips }: Readonly<{ chips: ProductPage["chips"] }>) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chips.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [chips]);

  useEffect(() => {
    const list = listRef.current;
    const el = active ? list?.querySelector<HTMLElement>(`[data-chip="${active}"]`) : null;
    if (list && el) list.scrollTo({ left: el.offsetLeft - 32, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Sections on this page" style={{ position: "sticky", top: 64, zIndex: 10, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}`, borderTop: `1px solid ${C.line}` }}>
      <ul ref={listRef} className="[scrollbar-width:none]" style={{ listStyle: "none", maxWidth: 1280, margin: "0 auto", display: "flex", gap: 8, padding: "12px 32px", overflowX: "auto" }}>
        {chips.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                data-chip={c.id}
                aria-current={on ? "true" : undefined}
                className={on ? undefined : "hover:bg-[rgba(245,146,46,0.12)]"}
                style={{ display: "block", whiteSpace: "nowrap", fontFamily: body, fontWeight: 600, fontSize: 13, lineHeight: 1, padding: "9px 16px", borderRadius: 6, textDecoration: "none", background: on ? C.accent : "rgba(26,26,26,0.06)", color: on ? "#fff" : C.ink, transition: "background 150ms, color 150ms" }}
              >
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export type Crumb = { label: string; href?: string };
export type SystemLink = { label: string; href: string; current: boolean };

export default function ProductPageView({ page, crumbs, systems, systemsLabel = "Knee systems" }: Readonly<{ page: ProductPage; crumbs: Crumb[]; systems?: SystemLink[]; systemsLabel?: string }>) {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: "56px 32px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ fontFamily: body, fontSize: 14, color: C.muted, marginBottom: 24 }}>
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <span aria-hidden style={{ margin: "0 8px", color: "#CFCFCB" }}>/</span>}
                {c.href ? <Link href={c.href} className="hover:text-[#C46F15]" style={{ color: C.ink2, textDecoration: "none" }}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </Fragment>
            ))}
          </nav>

          {systems && (
            <nav aria-label={systemsLabel} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <span style={{ fontFamily: body, fontSize: 14, color: C.muted, marginRight: 6 }}>{systemsLabel}</span>
              {systems.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  aria-current={s.current ? "page" : undefined}
                  className={s.current ? undefined : "hover:bg-[rgba(245,146,46,0.12)]"}
                  style={{ fontFamily: body, fontWeight: 600, fontSize: 13, lineHeight: 1, padding: "9px 18px", borderRadius: 6, textDecoration: "none", background: s.current ? C.accent : "rgba(26,26,26,0.06)", color: s.current ? "#fff" : C.ink, transition: "background 150ms" }}
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          )}

          <motion.div variants={heroStagger} initial="hidden" animate="visible" className="grid items-end gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <motion.div variants={fadeBadge} style={{ marginBottom: 20 }}><Badge>{page.tag}</Badge></motion.div>
              <motion.h1 variants={fadeUpHero} style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(44px,6.6vw,80px)", lineHeight: 1, letterSpacing: "-0.035em", color: C.ink }}>
                <Marked text={page.title} />
              </motion.h1>
            </div>
            <motion.div variants={fadeUp}>
              <p style={{ color: C.ink2, fontSize: 18, lineHeight: 1.6, maxWidth: "46ch" }}>{page.lead}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                <Btn href="/contact">Talk to a Specialist</Btn>
                {page.secondaryCta && <Btn href={page.secondaryCta.href} outline>{page.secondaryCta.label}</Btn>}
              </div>
            </motion.div>
          </motion.div>

          <dl className="mt-12! grid grid-cols-2 lg:mt-14! lg:grid-cols-4">
            {page.facts.map((f, i) => (
              <div
                key={f.label}
                className={[
                  "flex flex-col-reverse py-6!",
                  i % 2 === 1 ? "border-l pl-6! lg:pl-7!" : "",
                  i >= 2 ? "border-t lg:border-t-0" : "",
                  i === 2 ? "lg:border-l lg:pl-7!" : "",
                ].join(" ")}
                style={{ borderColor: C.line }}
              >
                <dt style={{ color: C.ink2, fontSize: 14.5, marginTop: 8 }}>{f.label}</dt>
                <dd style={{ fontFamily: display, fontWeight: 800, fontSize: f.big ? 48 : "clamp(22px,2.4vw,30px)", lineHeight: f.big ? 1 : 1.1, letterSpacing: "-0.02em", color: C.ink }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {page.chips.length > 0 && <Chips chips={page.chips} />}

      {/* ── Content ── */}
      <main style={{ maxWidth: 1344, margin: "0 auto", padding: "0 32px 96px" }}>
        {page.blocks.map((b, i) => <BlockView key={b.kind === "product" ? b.product.id : (b.id ?? `${b.kind}-${i}`)} block={b} />)}

        {page.ctaBand && (
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
            className="mt-16! grid items-center gap-7 px-7! py-10! lg:mt-24! lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-16!"
            style={{ background: C.peach, borderRadius: 28 }}
          >
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: C.ink }}>{page.ctaBand.title}</h2>
            <div>
              <p style={{ color: C.ink2, fontSize: 16, lineHeight: 1.65 }}>{page.ctaBand.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                <Btn href="/contact">Contact a Rep</Btn>
                <Btn href="/products" outline>All Products</Btn>
              </div>
            </div>
          </motion.div>
        )}

        {page.note && <p style={{ marginTop: 48, fontSize: 13, lineHeight: 1.6, color: C.muted, maxWidth: "90ch" }}>{page.note}</p>}
      </main>
    </>
  );
}
