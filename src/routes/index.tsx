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

// Circular shortest-path distance between fractional position p and integer index i in a ring of n
function circDist(p: number, i: number, n: number) {
  const d = ((p - i) % n + n) % n;
  return Math.min(d, n - d);
}

// One pill per card — animates from circle (8px) to wide rectangle (36px) as it becomes active
function DotPill({
  i,
  n,
  progress,
  onClick,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const width = useTransform(progress, (p) => {
    const t = Math.max(0, 1 - circDist(p, i, n));
    return 8 + 28 * t;
  });
  const opacity = useTransform(progress, (p) => {
    const t = Math.max(0, 1 - circDist(p, i, n));
    return 0.3 + 0.7 * t;
  });
  return (
    <motion.button
      onClick={onClick}
      aria-label={`Go to press card ${i + 1}`}
      style={{
        width,
        height: 8,
        borderRadius: 4,
        background: "rgba(255,255,255,0.92)",
        opacity,
        border: "none",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
    />
  );
}

function LiquidPill({
  n,
  progress,
  onDotClick,
}: {
  n: number;
  progress: MotionValue<number>;
  onDotClick: (i: number) => void;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 24,
        padding: "10px 16px",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      {Array.from({ length: n }).map((_, i) => (
        <DotPill key={i} i={i} n={n} progress={progress} onClick={() => onDotClick(i)} />
      ))}
    </div>
  );
}

function PressCarousel({ items }: { items: typeof press }) {
  const N = items.length;
  const LOOP_OFFSET = N; // virtual index of first real card (start in middle of 3x loop)
  const loopItems = [...items, ...items, ...items];

  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const vIndexRef = useRef(LOOP_OFFSET);
  const prevStrideRef = useRef(0);

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
  const cardWidth = containerWidth > 0
    ? Math.min(MAX_CARD, containerWidth - 2 * Math.max(24, containerWidth * 0.07))
    : 0;
  const PEEK = containerWidth > 0 ? (containerWidth - cardWidth) / 2 : 0;
  const GAP = 12;
  const STRIDE = cardWidth + GAP;
  const cardHeight = Math.round(cardWidth * (10 / 16));

  // x starts at 0, repositioned on first STRIDE measurement
  const x = useMotionValue(0);

  // Reposition silently when STRIDE changes (resize or first measure)
  useEffect(() => {
    if (STRIDE > 0 && STRIDE !== prevStrideRef.current) {
      x.set(-(vIndexRef.current * STRIDE));
      prevStrideRef.current = STRIDE;
    }
  }, [STRIDE, x]);

  const snapTo = (targetVI: number) => {
    vIndexRef.current = targetVI;
    animate(x, -(targetVI * STRIDE), {
      type: "spring",
      stiffness: 160,
      damping: 24,
      mass: 0.9,
      onComplete: () => {
        // After landing, silently reset to middle copy so loop never runs out of track
        let adj = targetVI;
        if (targetVI < LOOP_OFFSET) adj = targetVI + N;
        else if (targetVI >= LOOP_OFFSET + N) adj = targetVI - N;
        if (adj !== targetVI) {
          x.set(-(adj * STRIDE));
          vIndexRef.current = adj;
        }
      },
    });
  };
  const snapToRef = useRef(snapTo);
  useEffect(() => { snapToRef.current = snapTo; });

  // Direct trackpad follow: x tracks deltaX instantly, snap fires after gesture ends
  useEffect(() => {
    const el = containerRef.current;
    if (!el || STRIDE === 0) return;
    let snapTimer: ReturnType<typeof setTimeout>;
    let lastDeltaX = 0;
    const onWheel = (e: WheelEvent) => {
      // Ignore tiny inputs and clearly-vertical scrolls (but allow diagonal-dominant-horizontal)
      if (Math.abs(e.deltaX) < 3 || Math.abs(e.deltaY) > Math.abs(e.deltaX) * 2.5) return;
      e.preventDefault();
      lastDeltaX = e.deltaX;
      // Soft rubber-band: ±1 card beyond middle copy
      const MIN_X = -((LOOP_OFFSET + N) * STRIDE);
      const MAX_X = -((LOOP_OFFSET - 1) * STRIDE);
      x.set(Math.max(MIN_X, Math.min(MAX_X, x.get() - e.deltaX)));
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const vi = -x.get() / STRIDE;
        // Velocity bias: if gesture was still moving strongly, commit to that direction
        let target = Math.round(vi);
        if (Math.abs(lastDeltaX) > 10) {
          target = lastDeltaX > 0 ? Math.floor(vi) + 1 : Math.ceil(vi) - 1;
        }
        snapToRef.current(target);
      }, 150);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => { el.removeEventListener("wheel", onWheel); clearTimeout(snapTimer); };
  }, [STRIDE, N, LOOP_OFFSET, x]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const vi = -x.get() / STRIDE;
    const base = Math.round(vi);
    const { velocity, offset } = info;
    let target = base;
    if (Math.abs(velocity.x) > 250 || Math.abs(offset.x) > STRIDE * 0.25) {
      target = velocity.x < 0 || offset.x < 0 ? Math.floor(vi) + 1 : Math.ceil(vi) - 1;
    }
    snapTo(target);
  };

  // Progress: circular 0..N-1, wraps seamlessly for infinite loop
  const progress = useTransform(x, (val) => {
    if (STRIDE === 0) return 0;
    const riF = (-val / STRIDE) - LOOP_OFFSET;
    return ((riF % N) + N) % N;
  });

  const cardContent = (p: typeof items[0]) => (
    <>
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
      <div style={{ position: "absolute", top: "clamp(14px,2vw,22px)", right: "clamp(16px,2.5vw,28px)", fontSize: 15, color: "rgba(255,255,255,0.6)" }}>↗</div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "clamp(14px,2vw,22px) clamp(18px,2.5vw,32px) clamp(18px,2.5vw,28px)",
        }}
      >
        <span style={{ display: "block", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,0,0,0.45)", marginBottom: 8 }}>
          {p.tag}
        </span>
        <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: "clamp(15px,1.6vw,22px)", fontWeight: 700, lineHeight: 1.3, color: "#000" }}>
          {p.title}
        </div>
      </div>
    </>
  );

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      {containerWidth > 0 && (
        <>
          {/* Track */}
          <div style={{ overflow: "hidden", position: "relative", height: cardHeight }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -((loopItems.length - 1) * STRIDE), right: 0 }}
              dragElastic={0.06}
              style={{ x, position: "absolute", left: PEEK, top: 0, display: "flex", gap: GAP, cursor: dragging ? "grabbing" : "grab" }}
              onDragStart={() => setDragging(true)}
              onDragEnd={(e, info) => { setDragging(false); handleDragEnd(e, info); }}
            >
              {loopItems.map((p, i) => (
                <a
                  key={`${i}-${p.href}`}
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
                  {cardContent(p)}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Pill — sticky at bottom of viewport while press section is visible */}
          <div style={{ position: "sticky", bottom: 32, display: "flex", justifyContent: "center", marginTop: 28, zIndex: 10, pointerEvents: "none" }}>
            <div style={{ pointerEvents: "all" }}>
              <LiquidPill n={N} progress={progress} onDotClick={(i) => snapTo(LOOP_OFFSET + i)} />
            </div>
          </div>
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
      const offset = (progress - 0.5) * 200;
      img.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        height: "90vh",
        minHeight: 520,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-20%",
          left: 0,
          right: 0,
          willChange: "transform",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
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
      <section id="featured" style={{ background: "#000", paddingTop: "5rem", paddingBottom: "5rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
