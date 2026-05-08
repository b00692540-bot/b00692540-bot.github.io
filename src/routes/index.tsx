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

const press = [
  { tag: "United Nations · MBA Consultancy", title: "UNCTAD Pro Bono Consultancy — Fundraising Strategy & Financial Roadmap", href: "https://www.linkedin.com/posts/essecgmba-innovation-pedagogicalinnovation-ugcPost-7417134795131953152-qScn" },
  { tag: "Forbes · 2023", title: "Angelo Sosa's Kembara Is a Love Letter to His Asian Travels", href: "https://www.forbes.com/sites/alywalansky/2023/12/06/angelo-sosas-kembara-is-a-love-letter-to-his-asian-travels/" },
  { tag: "JustLuxe · Luxury Travel", title: "Tradition Plays Key Role in Service & Style at The St. Regis Washington DC", href: "https://www.justluxe.com/travel/hotels/tradition-plays-key-role-in-service-and-style-at-the-st-regis-washington-dc-38134/" },
  { tag: "Wine Spectator · Award", title: "Kembara, Phoenix — Award of Excellence", href: "https://www.winespectator.com/restaurant-awards/detail/240260/name/kembara" },
  { tag: "Video · JW Marriott", title: "Kembara at JW Marriott Desert Ridge", href: "https://www.youtube.com/watch?v=4_dFKeIZPs4" },
  { tag: "Instagram · Feature", title: "Kembara by Angelo Sosa — Behind the Concept", href: "https://www.instagram.com/p/C4_Qh4eOF-y/" },
  { tag: "World Itineraries · 2019", title: "The St. Regis Washington: Lavish, Historic & Neighbouring the White House", href: "https://worlditineraries.co/2019/09/18/the-st-regis-washington-lavish-historic-and-neighbouring-the-white-house/" },
];

const certs = [
  { name: "Spreadsheet Modelling", issuer: "Harvard University" },
  { name: "Financial Accounting", issuer: "AHLEI" },
  { name: "Python for Data Science", issuer: "University of Michigan" },
  { name: "Power BI", issuer: "Microsoft" },
  { name: "Tableau Data Visualisation", issuer: "Duke University" },
  { name: "Sales & Marketing", issuer: "AHLEI" },
  { name: "STR Hotel Industry Analytics", issuer: "AHLEI / STR" },
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

function Index() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Nav />

      {/* 1. HERO — full viewport, typographic, single CTA */}
      <section className="relative flex min-h-screen flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pt-40">
        <Reveal as="div" className="mx-auto w-full max-w-[1400px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="eyebrow">Singapore · Available 2026</span>
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-[1400px] flex-1 flex flex-col justify-center py-16">
          <Reveal delay={120}>
            <h1 className="display text-foreground" style={{ fontSize: "clamp(64px, 12vw, 168px)" }}>
              Christopher
              <br />
              <em className="text-foreground/90">Biguet.</em>
            </h1>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-10 max-w-2xl font-serif text-2xl italic text-muted-foreground md:text-3xl">
              Go-to-market strategy, concept launches &amp; commercial growth across EMEA and APAC.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a
                href="SG_Christopher_BIGUET_CV_Manager.pdf"
                download
                className="group inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
              >
                Download Resume
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#about"
                className="link-underline text-[12px] font-medium uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
              >
                Read the story
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={700} className="mx-auto w-full max-w-[1400px]">
          <div className="flex items-end justify-between border-t border-border pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Business Development</span>
              <span aria-hidden>·</span>
              <span>Commercial Strategy</span>
              <span aria-hidden>·</span>
              <span>Digital Transformation</span>
            </div>
            <div className="hidden font-serif text-sm italic text-muted-foreground md:block">
              Scroll &nbsp;↓
            </div>
          </div>
        </Reveal>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* 2. STATS — large numerals, small descriptors */}
      <section className="px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionLabel n="01">By the numbers</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="border-t border-border pt-8">
                  <div className="display text-foreground" style={{ fontSize: "clamp(56px, 7vw, 104px)" }}>
                    {s.n}
                  </div>
                  <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                    {s.label}
                  </div>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT — left-aligned editorial */}
      <section id="about" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel n="02">About</SectionLabel>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display text-foreground" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
                A commercial mind, <em>built across</em> three continents.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={200}>
              <p className="font-serif text-xl leading-relaxed text-foreground/85 md:text-2xl">
                Senior commercial manager with a track record of delivering multi-million dollar
                results across EMEA and North America.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                A background spanning business development, customer experience and digital
                transformation. I've recruited and built teams from scratch, launched concepts
                with full entrepreneurial ownership, built executive-level business cases, and
                driven technology adoption from ROI justification through to vendor
                implementation — whether presenting P&amp;L strategy to cross-border
                stakeholders, negotiating with a union, or partnering with IT and external
                vendors to bring a digital solution to life.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                Currently completing an MBA at ESSEC Business School in Singapore — deepening
                expertise in strategic consulting frameworks, financial modelling and digital
                transformation, positioning for a senior commercial role across APAC.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION — centered */}
      <section id="education" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1100px] text-center">
          <Reveal>
            <div className="mb-12 flex items-center justify-center gap-5">
              <span className="font-serif text-sm italic text-accent">03</span>
              <span className="h-px w-16 bg-border" />
              <span className="eyebrow">Education</span>
              <span className="h-px w-16 bg-border" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mx-auto max-w-3xl text-foreground" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              <em>Trained</em> at institutions that think across borders.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {[
              {
                school: "ESSEC Business School",
                degree: "Global MBA — Finance, Consulting & Digital Transformation",
                detail: "AMBA Triple Crown · MOM Top-Tier · Singapore · Graduating 2026",
              },
              {
                school: "Ecole de Savignac & Stratford-upon-Avon University",
                degree: "Bachelor's Degree in Hospitality Management",
                detail: "Dual Degree · France & United Kingdom",
              },
            ].map((e, i) => (
              <Reveal key={e.school} delay={i * 140}>
                <div className="group h-full bg-background p-10 text-left transition-colors duration-300 hover:bg-secondary md:p-12">
                  <div className="font-serif text-2xl text-foreground md:text-3xl">{e.school}</div>
                  <div className="mt-3 text-[15px] text-muted-foreground">{e.degree}</div>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-accent">
                    {e.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRESS — left-aligned editorial grid */}
      <section id="featured" className="border-t border-border bg-secondary px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel n="04">Featured in</SectionLabel>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="display text-foreground" style={{ fontSize: "clamp(48px, 6vw, 88px)" }}>
                  Selected <em>press</em> &amp; recognition.
                </h2>
              </Reveal>
              <Reveal delay={240}>
                <a
                  href="https://linkedin.com/in/christopher-biguet"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:gap-5 hover:text-accent hover:border-accent"
                >
                  See more on LinkedIn
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Reveal>
            </div>

            <ul className="lg:col-span-7">
              {press.map((p, i) => (
                <Reveal key={p.href} delay={i * 80} as="li">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-8 border-t border-border py-7 transition-colors duration-300 last:border-b hover:border-accent"
                  >
                    <div className="flex-1">
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                        {p.tag}
                      </div>
                      <div className="mt-3 font-serif text-xl leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                        "{p.title}"
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="mt-2 text-foreground/60 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS — centered minimalist */}
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

          <div className="mt-16 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-4">
            {certs.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div className="h-full bg-background p-8 text-left transition-colors duration-300 hover:bg-secondary">
                  <div className="font-serif text-lg text-foreground">{c.name}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {c.issuer}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT — centered, hero-like close */}
      <section
        id="contact"
        className="border-t border-border bg-foreground px-6 py-32 text-background md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow text-background/60">06 — Contact</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mt-8" style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>
              Let's <em>connect.</em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic text-background/70 md:text-2xl">
              For commercial leadership opportunities, MBA collaborations or a coffee in Singapore.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              <a
                href="mailto:christopher.biguet@essec.edu"
                className="link-underline text-[13px] font-medium uppercase tracking-[0.18em] text-background"
              >
                christopher.biguet@essec.edu
              </a>
              <span aria-hidden className="hidden h-3 w-px bg-background/30 md:inline-block" />
              <a
                href="https://linkedin.com/in/christopher-biguet"
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[13px] font-medium uppercase tracking-[0.18em] text-background"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row">
          <span>© 2026 Christopher Biguet</span>
          <span>Singapore</span>
        </div>
      </footer>
    </main>
  );
}
