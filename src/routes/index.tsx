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
  { href: "https://www.linkedin.com/posts/essecgmba-innovation-pedagogicalinnovation-ugcPost-7417134795131953152-qScn", img: "/Start_UN_Frame.jpg", lightText: true,
    title: "United Nation\nMBA Project",
    body: "UNCTAD Consultancy Mission\nPresent Fundraising\nStrategy And Financial Roadmap" },
  { href: "https://www.forbes.com/sites/alywalansky/2023/12/06/angelo-sosas-kembara-is-a-love-letter-to-his-asian-travels/", img: "/press-forbes.jpg", lightText: true,
    title: "Forbes Magazine\n2023",
    body: "Angelo Sosa's Kembara\nIs A Love Letter To His Asian Travels" },
  { href: "https://www.justluxe.com/travel/hotels/tradition-plays-key-role-in-service-and-style-at-the-st-regis-washington-dc-38134/", img: "/press-justluxe.jpg", lightText: true,
    title: "JustLuxe Magazine\nLuxury Travel North America",
    body: "The St Regis Washington DC\nService & Style Anchored In Tradition" },
  { href: "https://www.winespectator.com/restaurant-awards/detail/240260/name/kembara", img: "/press-winespectator.jpg", lightText: false,
    title: "Wine Spectator Award\n2025",
    body: "Kembara, Phoenix\nAward Of Excellence" },
  { href: "https://www.youtube.com/watch?v=4_dFKeIZPs4", img: "/press-youtube.jpg", lightText: false,
    title: "Arizona Daily Mix\nCW7 Arizona 2024",
    body: "New Restaurant Kembara\nAt JW Marriott Desert Ridge, Phoenix" },
  { href: "https://www.instagram.com/p/C4_Qh4eOF-y/", img: "/press-instagram.jpg", lightText: true,
    title: "Instagram\nKembaraPHX",
    body: "Kembara\nBehind The Concept Operations" },
  { href: "https://worlditineraries.co/2019/09/18/the-st-regis-washington-lavish-historic-and-neighbouring-the-white-house/", img: "/press-worlditineraries.jpg", lightText: true,
    title: "World Itineraries Blog\n2019",
    body: "The St Regis Washington DC\nLavish, Historic Political Landmark" },
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
  { name: "Sales Software", issuer: "HubSpot", img: "/Hubspot_SalesSoftware_Certification .png" },
];

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 flex items-center gap-5">
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

// Per-card component so useTransform obeys hooks rules
function CarouselCard({
  p, virtualIndex, N, progress, cardWidth, cardHeight, dragging,
}: {
  p: typeof press[0]; virtualIndex: number; N: number;
  progress: MotionValue<number>; cardWidth: number; cardHeight: number; dragging: boolean;
}) {
  const loopLen = N * 3;
  const LOOP_OFFSET = N;

  // Card opacity — dim peeking cards, full on active
  const opacity = useTransform(progress, (prog) => {
    const activeVI = prog + LOOP_OFFSET;
    const dist = Math.abs(virtualIndex - activeVI);
    const minDist = Math.min(dist, loopLen - dist);
    return minDist <= 1 ? 0.7 + 0.3 * Math.max(0, 1 - minDist) : 0.7;
  });

  // Text slide-in — title slides down from above, body slides up from below
  const dist = useTransform(progress, (prog) => {
    const activeVI = prog + LOOP_OFFSET;
    const d = Math.abs(virtualIndex - activeVI);
    return Math.min(d, loopLen - d);
  });
  const titleY  = useTransform(dist, [0, 0.7], [0, -14]);
  const bodyY   = useTransform(dist, [0, 0.7], [0,  14]);
  const textOp  = useTransform(dist, [0, 0.55], [1,  0]);

  const tc = p.lightText ? "rgba(255,255,255,0.95)" : "rgba(10,10,10,0.92)";
  const tc2 = p.lightText ? "rgba(255,255,255,0.70)" : "rgba(10,10,10,0.60)";
  const pad = "clamp(20px,2.8vw,36px)";

  // Dual-vignette gradient for text legibility — adapts to light/dark image
  const vignette = p.lightText
    ? "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 38%, transparent 58%, rgba(0,0,0,0.62) 100%)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.35) 100%)";

  return (
    <motion.a
      href={dragging ? undefined : p.href}
      onClick={(e) => { if (dragging) e.preventDefault(); }}
      target="_blank"
      rel="noreferrer"
      draggable={false}
      style={{
        flexShrink: 0, width: cardWidth, height: cardHeight,
        position: "relative", overflow: "hidden", borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.10)",
        display: "block", userSelect: "none", background: "#0a0a0a", opacity,
      }}
    >
      {/* Full-bleed image */}
      <img src={p.img} alt="" draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", userSelect: "none" }} />

      {/* Gradient vignette — top and bottom for text contrast */}
      <div style={{ position: "absolute", inset: 0, background: vignette }} />

      {/* Title — top left, slides in from above */}
      <motion.div style={{ position: "absolute", top: pad, left: pad, right: pad, y: titleY, opacity: textOp }}>
        <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: "clamp(19px,1.9vw,25px)", fontWeight: 700, lineHeight: 1.25, color: tc, whiteSpace: "pre-line" }}>
          {p.title}
        </div>
      </motion.div>

      {/* Link arrow — top right */}
      <div style={{ position: "absolute", top: pad, right: pad, fontSize: 14, color: p.lightText ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.40)" }}>↗</div>

      {/* Body — bottom left, slides in from below */}
      <motion.div style={{ position: "absolute", bottom: pad, left: pad, right: pad, y: bodyY, opacity: textOp }}>
        <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: "clamp(18px,1.6vw,23px)", fontWeight: 700, lineHeight: 1.4, color: tc2, whiteSpace: "pre-line" }}>
          {p.body}
        </div>
      </motion.div>
    </motion.a>
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
      stiffness: 280,
      damping: 30,
      mass: 0.8,
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

  // Direct trackpad follow — x tracks finger instantly, snaps immediately on lift
  useEffect(() => {
    const el = containerRef.current;
    if (!el || STRIDE === 0) return;

    let snapTimer: ReturnType<typeof setTimeout>;
    let lastNonZeroDeltaX = 0;
    let lastEventMs = 0;
    let axisLocked = false;
    let lastVelocity = 0;  // px/s — used to choose snap threshold
    let prevAbsDX = 0;     // detect deceleration (momentum ending)

    const doSnap = () => {
      const vi = -x.get() / STRIDE;
      const frac = vi - Math.floor(vi);
      const dir = lastNonZeroDeltaX > 0 ? 1 : lastNonZeroDeltaX < 0 ? -1 : 0;
      const speed = Math.abs(lastVelocity);
      let target: number;

      if (speed > 400) {
        // Fast flick — advance regardless of how little was moved
        target = dir >= 0 ? Math.floor(vi) + 1 : Math.floor(vi);
      } else if (speed > 60) {
        // Gentle slide — 35% threshold (Apple measured ~35-40%)
        target = dir > 0
          ? (frac > 0.35 ? Math.floor(vi) + 1 : Math.floor(vi))
          : (frac < 0.65 ? Math.floor(vi) : Math.floor(vi) + 1);
      } else {
        // Slow deliberate drag — standard 50% midpoint
        target = dir > 0
          ? (frac > 0.50 ? Math.floor(vi) + 1 : Math.floor(vi))
          : (frac < 0.50 ? Math.floor(vi) : Math.floor(vi) + 1);
      }

      lastNonZeroDeltaX = 0;
      lastVelocity = 0;
      prevAbsDX = 0;
      axisLocked = false;
      snapToRef.current(target);
    };

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastEventMs);
      const isNewGesture = dt > 400;

      if (isNewGesture) {
        axisLocked = false;
        lastNonZeroDeltaX = 0;
        lastVelocity = 0;
        prevAbsDX = 0;
      }
      lastEventMs = now;

      // ── AXIS LOCK — commit once, hold for entire gesture ──────────────────
      if (!axisLocked) {
        const absDX = Math.abs(e.deltaX);
        const absDY = Math.abs(e.deltaY);
        if (absDX > 5) {
          axisLocked = true;
        } else if (absDY > absDX * 1.5) {
          return; // clearly vertical
        } else {
          return; // ambiguous — wait
        }
      }
      // ─────────────────────────────────────────────────────────────────────

      e.preventDefault();
      clearTimeout(snapTimer);

      const absDX = Math.abs(e.deltaX);

      // Track instantaneous velocity (px/s) for threshold decisions
      if (absDX > 2) {
        lastVelocity = (e.deltaX / dt) * 1000;
        lastNonZeroDeltaX = e.deltaX;
      }

      // Detect momentum end: deltaX rapidly decreasing → fire snap immediately
      const isDecelerating = absDX < prevAbsDX * 0.6 && absDX < 15;
      prevAbsDX = absDX;

      if (absDX < 3) {
        snapTimer = setTimeout(doSnap, isDecelerating ? 30 : 180);
        return;
      }

      const MIN_X = -((LOOP_OFFSET + N) * STRIDE);
      const MAX_X = -((LOOP_OFFSET - 1) * STRIDE);
      x.set(Math.max(MIN_X, Math.min(MAX_X, x.get() - e.deltaX)));

      // Fire fast — momentum end detection will catch the exact lift point
      const delay = isDecelerating ? 30 : absDX > 40 ? 60 : 90;
      snapTimer = setTimeout(doSnap, delay);
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
                <CarouselCard
                  key={`${i}-${p.href}`}
                  p={p}
                  virtualIndex={i}
                  N={N}
                  progress={progress}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  dragging={dragging}
                />
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
              <SectionLabel>About</SectionLabel>
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
              <SectionLabel>Education</SectionLabel>
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
            <SectionLabel light>Press &amp; Features</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "white" }}>
              Featured in.
            </h2>
          </Reveal>
        </div>

        {/* Apple-style physics carousel */}
        <PressCarousel items={press} />

      </section>

      {/* Certifications */}
      <section id="certifications" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal>
            <div className="mb-12 flex items-center justify-center gap-5">
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
                  className={`group relative border border-border p-6 text-left transition-all duration-300 ${c.img ? "cursor-pointer hover:border-accent hover:shadow-md" : ""}`}
                >
                  {/* + badge — invites click to enlarge */}
                  {c.img && (
                    <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-sm font-light leading-none select-none">
                      +
                    </div>
                  )}

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
