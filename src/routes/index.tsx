import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/editorial/Nav";
import { Reveal } from "@/components/editorial/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, TrendingUp } from "lucide-react";

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

interface AppleCardData {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  href?: string;
}

const pressCards: AppleCardData[] = [
  {
    src: "/Start_UN_Frame.jpg",
    category: "United Nations · ESSEC MBA",
    title: "UNCTAD\nConsultancy Mission",
    href: "https://www.linkedin.com/posts/essecgmba-innovation-pedagogicalinnovation-ugcPost-7417134795131953152-qScn",
    content: (
      <p>
        Selected as part of the ESSEC Global MBA programme to lead a consultancy mission for UNCTAD — the United Nations Conference on Trade and Development. Presented a comprehensive fundraising strategy and financial roadmap, earning recognition for commercial rigour and cross-functional leadership at the highest international level.
      </p>
    ),
  },
  {
    src: "/Angelo_Forbes.png",
    category: "Forbes · December 2023",
    title: "Kembara\nFeature",
    href: "https://www.forbes.com/sites/alywalansky/2023/12/06/angelo-sosas-kembara-is-a-love-letter-to-his-asian-travels/",
    content: (
      <p>
        Forbes covered the launch of Kembara, JW Marriott Desert Ridge's flagship dining concept — a love letter to Asian culinary heritage conceived by Chef Angelo Sosa. Christopher led the full commercial launch: brand positioning, pricing architecture, and market entry strategy from inception to opening night, including a $5M concept build.
      </p>
    ),
  },
  {
    src: "/press-justluxe.jpg",
    category: "JustLuxe · Luxury Travel",
    title: "The St. Regis\nWashington DC",
    href: "https://www.justluxe.com/travel/hotels/tradition-plays-key-role-in-service-and-style-at-the-st-regis-washington-dc-38134/",
    content: (
      <p>
        JustLuxe recognised The St. Regis Washington DC for its signature blend of tradition and impeccable service — a property where Christopher designed pricing strategy and commercial controls for a $2.5M budgeted beverage revenue stream, setting the benchmark for the brand's East Coast presence.
      </p>
    ),
  },
  {
    src: "/WineSpectator.png",
    category: "Wine Spectator · 2025",
    title: "Award of\nExcellence",
    href: "https://www.winespectator.com/restaurant-awards/detail/240260/name/kembara",
    content: (
      <p>
        Kembara at JW Marriott Desert Ridge earned Wine Spectator's prestigious Award of Excellence in 2025, recognising the programme's carefully curated wine selection and the thoughtful commercial approach to beverage strategy that underpinned the restaurant's critical success.
      </p>
    ),
  },
  {
    src: "/AZ_Daily.png",
    category: "CW7 Arizona · 2024",
    title: "Arizona Daily Mix\nKembara Opening",
    href: "https://www.youtube.com/watch?v=4_dFKeIZPs4",
    content: (
      <p>
        Arizona's CW7 Daily Mix covered the highly anticipated opening of Kembara at JW Marriott Desert Ridge, spotlighting the concept's culinary storytelling, immersive guest experience, and the commercial strategy behind one of Phoenix's most talked-about restaurant launches of the year.
      </p>
    ),
  },
  {
    src: "/press-instagram.jpg",
    category: "Instagram · KembaraPHX",
    title: "Behind the\nConcept",
    href: "https://www.instagram.com/p/C4_Qh4eOF-y/",
    content: (
      <p>
        A behind-the-scenes look at Kembara's concept and operations — from the brand philosophy and interior design to floor-level execution and team culture. A window into the commercial and creative decisions that shaped one of Marriott's most distinctive F&B launches.
      </p>
    ),
  },
  {
    src: "/press-worlditineraries.jpg",
    category: "World Itineraries · 2019",
    title: "The St. Regis DC\nA Political Landmark",
    href: "https://worlditineraries.co/2019/09/18/the-st-regis-washington-lavish-historic-and-neighbouring-the-white-house/",
    content: (
      <p>
        World Itineraries featured The St. Regis Washington DC as one of America's most storied luxury addresses — lavish, historic, and steps from the White House. Christopher managed commercial and beverage operations during a tenure that cemented his reputation for luxury service standards and strategic revenue management.
      </p>
    ),
  },
];

const expertise = [
  {
    Icon: MapPin,
    title: "Market Entry",
    desc: "Go-to-market strategy and commercial launch across new geographies",
  },
  {
    Icon: Building2,
    title: "Pre-Opening",
    desc: "Full commercial infrastructure build from concept to opening night",
  },
  {
    Icon: TrendingUp,
    title: "Revenue Growth",
    desc: "P&L ownership, pricing strategy, and regional commercial scaling",
  },
];

const experience = [
  {
    company: "JW Marriott Desert Ridge",
    role: "Senior Manager · Marriott International",
    years: "2023–2025",
    impact: "Directed $5M Kembara concept launch — brand positioning, pricing strategy and full market entry",
  },
  {
    company: "Aloft & Element Me'aisam, Dubai",
    role: "Senior Manager · Marriott International",
    years: "2021–2023",
    impact: "Acquired Fortune 500 corporate partners; drove 20% event revenue growth through outbound strategy",
  },
  {
    company: "Le Méridien Nice",
    role: "Manager · Contract Mission · Marriott International",
    years: "2021",
    impact: "Diagnosed, restructured and relaunched F&B operations post-shutdown in under 90 days",
  },
  {
    company: "The St. Regis Washington DC",
    role: "Manager · Marriott International",
    years: "2018–2020",
    impact: "Designed pricing strategy and commercial controls for a $2.5M budgeted beverage revenue stream",
  },
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

function ExpertiseStrip() {
  return (
    <div className="border-y border-border py-6" style={{ background: "var(--muted)" }}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 sm:grid-cols-3 md:px-12">
        {expertise.map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center">
            <Icon size={20} className="text-accent" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground">{title}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 flex items-center gap-5">
      <span className={`h-px flex-1 max-w-16 ${light ? "bg-white/20" : "bg-border"}`} />
      <span className={`eyebrow ${light ? "text-white/60" : ""}`}>{children}</span>
    </div>
  );
}

// ── Apple Cards Carousel (Aceternity-style) ──────────────────────────────────

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      callback();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

function BlurImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <img
      className={`transition duration-500 ${loading ? "blur-sm scale-[1.03]" : "blur-0 scale-100"} ${className ?? ""}`}
      onLoad={() => setLoading(false)}
      src={src}
      alt={alt}
    />
  );
}

function AppleCard({ card, index }: { card: AppleCardData; index: number }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = `apple-card-${index}`;

  useOutsideClick(containerRef, () => setOpen(false));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Expanded card */}
            <div className="relative z-[101] mx-auto my-10 w-[90%] max-w-4xl pb-10">
              <motion.div
                ref={containerRef}
                layoutId={id}
                className="overflow-hidden rounded-3xl"
                style={{ background: "var(--background)" }}
              >
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  ✕
                </button>

                {/* Hero image */}
                <BlurImage
                  src={card.src}
                  alt={card.title}
                  className="h-64 w-full object-cover md:h-96"
                />

                {/* Content */}
                <div className="p-8 md:p-12">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                    {card.category}
                  </p>
                  <h3
                    className="mt-3 font-serif text-3xl font-semibold text-foreground md:text-4xl"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {card.title}
                  </h3>
                  <div className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    {card.content}
                  </div>
                  {card.href && (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 pt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
                    >
                      Read full article
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Card thumbnail */}
      <motion.button
        layoutId={id}
        onClick={() => setOpen(true)}
        className="relative flex h-80 w-56 flex-shrink-0 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl focus:outline-none md:h-[40rem] md:w-96"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
      >
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/55 via-transparent to-black/45" />

        {/* Text */}
        <div className="absolute inset-x-0 top-0 z-30 p-7">
          <p className="text-left text-[10px] font-medium uppercase tracking-[0.25em] text-white/65">
            {card.category}
          </p>
          <h3
            className="mt-2 text-left font-serif text-xl font-semibold leading-snug text-white md:text-2xl"
            style={{ whiteSpace: "pre-line" }}
          >
            {card.title}
          </h3>
        </div>

        {/* Arrow hint */}
        <div className="absolute bottom-6 right-6 z-30 text-white/40 text-sm">↗</div>

        {/* Image */}
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
      </motion.button>
    </>
  );
}

function AppleCarousel({ items }: { items: AppleCardData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Arrow navigation */}
      <div className="flex justify-end gap-2 px-6 md:px-12 mb-6">
        <button
          onClick={() => trackRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
          disabled={!canScrollLeft}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white text-base disabled:opacity-25 hover:bg-white/20 transition-colors"
        >←</button>
        <button
          onClick={() => trackRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
          disabled={!canScrollRight}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white text-base disabled:opacity-25 hover:bg-white/20 transition-colors"
        >→</button>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto py-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 1200px) / 2 + 3rem))",
          paddingRight: "max(1.5rem, calc((100vw - 1200px) / 2 + 3rem))",
        }}
      >
        {items.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex-shrink-0"
          >
            <AppleCard card={card} index={i} />
          </motion.div>
        ))}
      </div>
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
          loading="lazy"
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
        {/* Hero photo — mobile: full background with bottom gradient */}
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <img
            src="/Christopher_hero.jpg"
            alt=""
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background" />
        </div>

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
            <span className="eyebrow">I build the commercial engine. Then I scale it.</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-6 text-foreground" style={{ fontSize: "clamp(60px, 9vw, 128px)" }}>
              Christopher<br /><em>Biguet</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md text-muted-foreground">
              Pre-opening strategy. Market entry. Revenue architecture. Senior commercial leadership across EMEA &amp; APAC.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a
                href="#about"
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 pt-3 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Explore
                <span aria-hidden>↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border-b border-foreground/50 pb-2 pt-3 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise strip */}
      <ExpertiseStrip />

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
                From blank page to <em>opening night.</em>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-lg text-muted-foreground leading-relaxed">
                From pre-opening brand builds to regional P&amp;L ownership, I've launched luxury hospitality
                concepts across six countries and led commercial teams from the ground up. Now operating
                at a senior regional level — focused on the kind of complexity that requires both
                strategic clarity and operational follow-through.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <a
                href="/SG_Christopher_BIGUET_CV_Manager.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 pt-3 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
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

      {/* Experience */}
      <section id="experience" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="mb-16 lg:col-span-4 lg:mb-0">
            <Reveal>
              <SectionLabel>Experience</SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              {experience.map((exp, i) => (
                <Reveal key={exp.company + exp.years} delay={i * 80}>
                  <div className="relative pl-8 pb-12 last:pb-0">
                    <div className="absolute left-0 top-[6px] h-2 w-2 -translate-x-[3.5px] rounded-full bg-accent" />
                    <div className="font-serif text-base font-semibold text-foreground">{exp.company}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{exp.role}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60">{exp.years}</div>
                    <p className="mt-2 max-w-xl text-sm italic text-foreground/70">{exp.impact}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                  style={{ maxHeight: "520px" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="featured" style={{ background: "linear-gradient(to bottom, var(--background) 0%, #000 72px)", paddingTop: "5rem", paddingBottom: "5rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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

        {/* Apple Cards Carousel */}
        <AppleCarousel items={pressCards} />

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
          loading="lazy"
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
                className="inline-flex items-center gap-3 rounded-sm bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-accent"
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
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 pt-3 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Download CV
                <span aria-hidden>↓</span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={480}>
            <p className="mt-10 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
              Based in Singapore &nbsp;·&nbsp; Open to relocation across EMEA &amp; APAC
            </p>
          </Reveal>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            © {new Date().getFullYear()} Christopher Biguet
          </span>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <a href="mailto:biguet.chris@gmail.com" className="transition-colors duration-200 hover:text-foreground">
              Email
            </a>
            <a href="https://linkedin.com/in/christopher-biguet" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
              LinkedIn
            </a>
            <a href="#top" className="transition-colors duration-200 hover:text-foreground">
              ↑ Top
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
