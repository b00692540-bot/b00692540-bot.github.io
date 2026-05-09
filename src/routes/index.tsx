import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/editorial/Nav";
import { Marquee } from "@/components/editorial/Marquee";
import { Reveal } from "@/components/editorial/Reveal";

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

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 flex items-center gap-5">
      <span className="font-serif text-sm italic text-accent">{n}</span>
      <span className="h-px flex-1 max-w-16 bg-border" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function PressCarousel({ items }: { items: typeof press }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const unRevealRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      const cw = el.clientWidth;
      const cx = el.scrollLeft + cw / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cx - cardCenter);
        const maxDist = card.offsetWidth;
        const ratio = Math.max(0, 1 - dist / maxDist);
        const scale = 0.88 + 0.12 * ratio;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(0.65 + 0.35 * ratio);

        const imgEl = card.querySelector<HTMLElement>(".press-img");
        if (imgEl) {
          const offset = (cardCenter - cx) / cw;
          if (card.classList.contains("un-press-card")) {
            imgEl.style.transform = `translateX(${offset * -22}px)`;
          } else {
            imgEl.style.transform = `scale(1.1) translateX(${offset * -22}px)`;
          }
        }

        const textEl = card.querySelector<HTMLElement>(".press-text");
        if (textEl) {
          const offset = (cardCenter - cx) / cw;
          textEl.style.transform = `translateX(${offset * 18}px)`;
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const card = unRevealRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={scrollRef}
      className="press-carousel flex gap-3 md:gap-4 overflow-x-scroll snap-x snap-mandatory py-6"
      style={{
        scrollbarWidth: "none",
        paddingLeft: "max(24px, 6vw)",
        paddingRight: "max(24px, 6vw)",
      }}
    >
      {items.map((p, i) => {
        const isUN = i === 0;
        return (
          <a
            key={p.href}
            ref={(el) => {
              cardRefs.current[i] = el;
              if (isUN) unRevealRef.current = el;
            }}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={`group relative flex-none snap-center overflow-hidden${isUN ? " un-press-card" : ""}`}
            style={{
              width: isUN ? "clamp(200px, 42vw, 340px)" : "clamp(280px, 76vw, 620px)",
              aspectRatio: isUN ? "3 / 4" : "1 / 1",
              willChange: "transform, opacity",
            }}
          >
            {isUN ? (
              <div className="press-img absolute inset-0 overflow-hidden" style={{ willChange: "transform" }}>
                <img
                  src={p.img}
                  alt=""
                  className="un-press-img h-full w-full object-cover"
                  style={{ willChange: "transform" }}
                />
              </div>
            ) : (
              <img
                src={p.img}
                alt=""
                className="press-img absolute inset-0 h-full w-full object-cover"
                style={{ willChange: "transform" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div
              className="press-text absolute inset-0 flex flex-col justify-between p-7 md:p-10"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
                  {p.tag}
                </span>
                <span className="text-sm text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </div>
              <div className="font-serif text-2xl leading-snug text-white md:text-[1.85rem]">
                &ldquo;{p.title}&rdquo;
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function ActionShotVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-sm border border-border w-full max-w-xs">
      <video
        ref={videoRef}
        src="/Future_Content/Action_Shot_Chris.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover"
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-sm bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        {muted ? "🔇 Unmute" : "🔊 Mute"}
      </button>
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

      <Marquee />

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
      <section id="featured" className="border-t border-border py-28 md:py-36">
        {/* Header */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 mb-12">
          <Reveal>
            <SectionLabel n="04">Press &amp; Features</SectionLabel>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={120}>
              <h2 className="display text-foreground" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                Featured in.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <a
                href="https://linkedin.com/in/christopher-biguet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                See more on LinkedIn
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <PressCarousel items={press} />

        {/* Footer */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 mt-10">
          <Reveal delay={160}>
            <ActionShotVideo />
          </Reveal>
        </div>
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
