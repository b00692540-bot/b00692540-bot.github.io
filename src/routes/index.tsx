import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/editorial/Nav";
import { Reveal } from "@/components/editorial/Reveal";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { PanInfo, MotionValue } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

const stats = [
  { n: "8+", label: "Years", desc: "with Marriott International delivering luxury experiences." },
  { n: "$5M", label: "Concept Launch", desc: "Brand positioning, pricing strategy and full market entry from inception." },
  { n: "50+", label: "Team Members", desc: "Recruited, led and grown for new openings across multi-property luxury operations." },
  { n: "6+", label: "Countries", desc: "United States · UAE · France · Belgium · United Kingdom · Singapore." },
];

const education = [
  {
    degree: "Global MBA – Master’s in Business Management",
    school: "ESSEC Business School",
    detail: "MOM-recognized Top-Tier Institution (+20 Compass points) Specialization in Finance, Consulting and Digital Transformation",
  },
  {
    degree: "Bachelor’s Degree in Hospitality Management",
    school: "École de Savignac · Stratford-upon-Avon University",
    detail: "Dual degree — France & United Kingdom.",
  },
];

const press = [
  { tag: "United Nations · MBA Consultancy", title: "UNCTAD Pro Bono Consultancy — Fundraising Strategy & Financial Roadmap", href: "https://www.linkedin.com/posts/essecgmba-innovation-pedagogicalinnovation-ugcPost-7417134795131953152-qScn", img: "/Start_UN_Frame.jpg" },
  { tag: "Forbes · 2023", title: "Angelo Sosa's Kembara Is a Love Letter to His Asian Travels", href: "https://www.forbes.com/sites/alywalansky/2023/12/06/angelo-sosas-kembara-is-a-love-letter-to-his-asian-travels/", img: "/press-forbes.jpg" },
  { tag: "JustLuxe · Luxury Travel", title: "Tradition Plays Key Role in Service & Style at The St. Regis Washington DC", href: "https://www.justluxe.com/travel/hotels/tradition-plays-key-role-in-service-and-style-at-the-st-regis-washington-dc-38134/", img: "/press-justluxe.jpg" },
  { tag: "Wine Spectator · Award", title: "Kembara, Phoenix — Award of Excellence", href: "https://www.winespectator.com/restaurant-awards/detail/240260/name/kembara", img: "/press-winespectator.jpg" },
  { tag: "Video · JW Marriott", title: "Kembara at JW Marriott Desert Ridge", href: "https://www.youtube.com/watch?v=4_dFKeIZPs4", img: "/press-youtube.jpg" },
  { tag: "Instagram · Feature", title: "Kembara by Angelo Sosa — Behind the Concept", href: "https://www.instagram.com/p/C4_Qh4eOF-y/", img: "/press-instagram.jpg" },
  { tag: "World Itineraries · 2019", title: "The St. Regis Washington: Lavish, Historic & Neighbouring the White House", href: "https://worlditineraries.co/2019/09/18/the-st-regis-washington-lavish-historic-and-neighbouring-the-white-house/", img: "/press-worlditineraries.jpg" },
];

const certs = [
  { name: "Spreadsheet Modelling", issuer: "Harvard University", img: "/Spreadsheet_Certification.jpg" },
  { name: "Financial Accounting", issuer: "AHLEI", img: "/Accounting_Certification.jpg" },
  { name: "Python for Data Science", issuer: "University of Michigan", img: "/Python_Certification.jpg" },
  { name: "Power BI", issuer: "Microsoft", img: "/Power_BI_Certification.jpg" },
  { name: "Tableau Data Visualisation", issuer: "Duke University", img: "/Tableau_Certification.jpg" },
  { name: "Sales & Marketing", issuer: "AHLEI", img: "/Sales_Certification.jpg" },
  { name: "STR Hotel Industry Analytics", issuer: "AHLEI / STR", img: "/STR_Certification.jpg" },
  { name: "CRM & CXM Platforms", issuer: "Salesforce · Medallia" },
];

function SectionLabel({ n, children, light }: { n: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 flex items-center gap-5">
      <span className={`font-serif text-sm italic ${light ? "text-white/50" : "text-accent"}`}>{n}</span>
      <span className={`h-px flex-1 max-w-16 ${light ? "bg-white/20" : "bg-border"}`} />
      <span className={`eyebrow ${light ? "text-white/60" : ""}`}>{children}</span>
    </div>
  );
}

const DOT = 8;
const DOT_GAP = 6;
const DOT_STRIDE = DOT + DOT_GAP;

function LiquidPill({
  count,
  progress,
  onDotClick,
}: {
  count: number;
  progress: MotionValue<number>;
  onDotClick: (i: number) => void;
}) {
  const totalWidth = count * DOT + (count - 1) * DOT_GAP;

  // Trailing edge uses ease-in (t²) so the pill stretches forward then snaps — the liquid feel
  const pillLeft = useTransform(progress, (p) => {
    const clamped = Math.max(0, Math.min(count - 1, p));
    const f = Math.floor(clamped);
    const t = clamped - f;
    return (f + t * t) * DOT_STRIDE;
  });

  // Width bell-curves via sin so it peaks at the midpoint between two dots
  const pillWidth = useTransform(progress, (p) => {
    const clamped = Math.max(0, Math.min(count - 1, p));
    const t = clamped - Math.floor(clamped);
    return DOT + Math.sin(t * Math.PI) * DOT_STRIDE;
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 28, paddingBottom: 4 }}>
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 24,
          padding: "10px 16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ position: "relative", width: totalWidth, height: DOT }}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              aria-label={`Go to press card ${i + 1}`}
              style={{
                position: "absolute",
                left: i * DOT_STRIDE,
                top: 0,
                width: DOT,
                height: DOT,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: pillLeft,
              width: pillWidth,
              height: DOT,
              borderRadius: DOT / 2,
              background: "rgba(255,255,255,0.92)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PressCarousel({ items }: { items: typeof press }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => setContainerWidth(entries[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const MAX_CARD = 900;
  const cardWidth =
    containerWidth > 0
      ? Math.min(MAX_CARD, containerWidth - 2 * Math.max(24, containerWidth * 0.07))
      : 0;
  const PEEK = containerWidth > 0 ? (containerWidth - cardWidth) / 2 : 0;
  const GAP = 12;
  const STRIDE = cardWidth + GAP;
  const cardHeight = Math.round(cardWidth * (10 / 16));

  const x = useMotionValue(0);

  const snapTo = (i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    animate(x, -(clamped * STRIDE), { type: "spring", stiffness: 300, damping: 30 });
    setIndex(clamped);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { velocity, offset } = info;
    let newIndex = index;
    if (Math.abs(velocity.x) > 250 || Math.abs(offset.x) > STRIDE * 0.25) {
      newIndex = velocity.x < 0 || offset.x < 0 ? index + 1 : index - 1;
    }
    snapTo(newIndex);
  };

  const progress = useTransform(x, (val) =>
    STRIDE === 0 ? 0 : Math.max(0, Math.min(items.length - 1, -val / STRIDE))
  );

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      {containerWidth > 0 && (
        <>
          {/* Track */}
          <div style={{ overflow: "hidden", position: "relative", height: cardHeight }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -(items.length - 1) * STRIDE, right: 0 }}
              dragElastic={0.08}
              style={{
                x,
                position: "absolute",
                left: PEEK,
                top: 0,
                display: "flex",
                gap: GAP,
                cursor: dragging ? "grabbing" : "grab",
              }}
              onDragStart={() => setDragging(true)}
              onDragEnd={(e, info) => { setDragging(false); handleDragEnd(e, info); }}
            >
              {items.map((p) => (
                <a
                  key={p.href}
                  href={dragging ? undefined : p.href}
                  onClick={(e) => { if (dragging) e.preventDefault(); }}
                  target="_blank"
                  rel="noreferrer"
                  draggable={false}
                  style={{
                    flexShrink: 0,
                    width: cardWidth,
                    height: cardHeight,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "block",
                    userSelect: "none",
                    background: "#0a0a0a",
                  }}
                >
                  <img
                    src={p.img}
                    alt=""
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.06) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "clamp(18px, 3vw, 36px) clamp(20px, 3.5vw, 40px)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.22em",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {p.tag}
                      </span>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>↗</span>
                    </div>
                    <div
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: "clamp(16px, 1.8vw, 26px)",
                        lineHeight: 1.35,
                        color: "white",
                      }}
                    >
                      &ldquo;{p.title}&rdquo;
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Liquid pill pagination */}
          <LiquidPill count={items.length} progress={progress} onDotClick={snapTo} />
        </>
      )}
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 120;
      img.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{ top: "-20%", bottom: "-20%", willChange: "transform" }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
      </div>
    </div>
  );
}

function Index() {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActivePdf(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main id="top" className="bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-52">
        {/* Hero photo — right side, desktop only */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
          <img
            src="/Christopher_hero.jpg"
            alt="Christopher Biguet"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px]">
          <Reveal>
            <span className="eyebrow">Senior Commercial Manager</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-6 text-foreground" style={{ fontSize: "clamp(60px, 9vw, 128px)" }}>
              Christopher<br /><em>Biguet</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md text-muted-foreground">
              Commercial strategy, go-to-market execution and luxury concept development across EMEA &amp; APAC.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a
                href="#about"
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Explore
                <span aria-hidden>↓</span>
              </a>
              <a
                href="#contact"
                className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Singapore Marina — parallax */}
      <ParallaxImage src="/Singapore_Marina.jpg" alt="Singapore Marina Bay" />

      {/* About */}
      <section id="about" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="mb-16 lg:col-span-7 lg:mb-0">
            <Reveal>
              <SectionLabel n="02">About</SectionLabel>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display text-foreground" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                Where strategy <em>meets</em> execution.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-lg text-muted-foreground leading-relaxed">
                Built and launched concepts across six countries, defined brands, 
                and built teams from inception. Now focused on commercial strategy, market entry, 
                and growth at a regional level, driven by a desire for greater challenges, scale and complexity.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <a
                href="/SG_Christopher_BIGUET_CV_Manager.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Download CV
                <span aria-hidden>↓</span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8 content-start">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div>
                  <div className="font-serif text-5xl font-light text-foreground">{s.n}</div>
                  <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{s.label}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel n="03">Education</SectionLabel>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display text-foreground" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                Grounded in <em>rigour</em>.
              </h2>
            </Reveal>
            <div className="mt-16">
              {education.map((e, i) => (
                <Reveal key={e.school} delay={i * 80}>
                  <div className="border-t border-border py-10 last:border-b">
                    <div className="font-serif text-2xl text-foreground md:text-3xl">{e.school}</div>
                    <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{e.degree}</div>
                    <p className="mt-4 max-w-xl text-sm text-muted-foreground">{e.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <Reveal delay={160}>
              <div className="overflow-hidden">
                <img
                  src="/Christopher_profile_1.jpeg"
                  alt="Christopher Biguet"
                  className="h-full w-full object-cover object-top"
                  style={{ maxHeight: "520px" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="featured" style={{ background: "#000", paddingTop: "7rem", paddingBottom: "7rem" }}>
        {/* Header */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 mb-12">
          <Reveal>
            <SectionLabel n="04" light>Press &amp; Features</SectionLabel>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={120}>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "white" }}>
                Featured in.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <a
                href="https://linkedin.com/in/christopher-biguet"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white", borderBottomColor: "rgba(255,255,255,0.5)" }}
                className="inline-flex items-center gap-3 border-b pb-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5"
              >
                See more on LinkedIn
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Apple-style physics carousel */}
        <PressCarousel items={press} />

      </section>

      {/* Certifications */}
      <section id="certifications" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal>
            <div className="mb-12 flex items-center justify-center gap-5">
              <span className="font-serif text-sm italic text-accent">05</span>
              <span className="h-px w-16 bg-border" />
              <span className="eyebrow">Credentials</span>
              <span className="h-px w-16 bg-border" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mx-auto max-w-3xl text-foreground" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              Continuously <em>refining</em> the craft.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {certs.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div
                  onClick={() => c.img && setActivePdf(c.img)}
                  className={`group border border-border p-6 text-left transition-all duration-300 ${c.img ? "cursor-pointer hover:border-accent hover:shadow-md" : ""}`}
                >
                  <div className="font-serif text-lg text-foreground transition-colors duration-300 group-hover:text-accent">
                    {c.name}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {c.issuer}
                  </div>

                  {/* Expanding thumbnail on hover */}
                  {c.img && (
                    <div className="overflow-hidden max-h-0 group-hover:max-h-52 transition-[max-height] duration-500 ease-in-out">
                      <div className="pt-4">
                        <img
                          src={c.img}
                          alt={c.name}
                          className="w-full object-contain object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                          Click to view full ↗
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* PDF Modal */}
          {activePdf && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm md:p-10"
              onClick={() => setActivePdf(null)}
            >
              <div
                className="relative flex w-full max-w-3xl flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePdf(null)}
                  className="mb-3 self-end text-[11px] font-medium uppercase tracking-[0.22em] text-background/80 transition-colors duration-200 hover:text-background"
                >
                  Close ✕
                </button>
                <img
                  src={activePdf}
                  alt="Certificate"
                  className="w-full max-h-[80vh] object-contain bg-background"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Group Regis — full-width transition */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden md:h-[75vh]">
        <img
          src="/Group_Regis.jpeg"
          alt="The St. Regis"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Contact */}
      <section id="contact" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal>
            <div className="mb-12 flex items-center justify-center gap-5">
              <span className="font-serif text-sm italic text-accent">06</span>
              <span className="h-px w-16 bg-border" />
              <span className="eyebrow">Contact</span>
              <span className="h-px w-16 bg-border" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mx-auto max-w-3xl text-foreground" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              Let&rsquo;s <em>connect</em>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-muted-foreground">
              Open to senior commercial and business development opportunities in luxury hospitality.
            </p>
          </Reveal>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Reveal delay={320}>
              <a
                href="https://linkedin.com/in/christopher-biguet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Connect on LinkedIn
                <span aria-hidden>→</span>
              </a>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="/SG_Christopher_BIGUET_CV_Manager.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Download CV
                <span aria-hidden>↓</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
