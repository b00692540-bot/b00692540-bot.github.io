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
    degree: "Global MBA — Innovation & Strategy",
    school: "ESSEC Business School",
    detail: "Pro bono consultancy with the United Nations (UNCTAD) — Fundraising strategy & financial roadmap.",
  },
];

const press = [
  { tag: "United Nations · MBA Consultancy", title: "UNCTAD Pro Bono Consultancy — Fundraising Strategy & Financial Roadmap", href: "https://www.linkedin.com/posts/essecgmba-innovation-pedagogicalinnovation-ugcPost-7417134795131953152-qScn", img: "/United_Nation.jpg" },
  { tag: "Forbes · 2023", title: "Angelo Sosa's Kembara Is a Love Letter to His Asian Travels", href: "https://www.forbes.com/sites/alywalansky/2023/12/06/angelo-sosas-kembara-is-a-love-letter-to-his-asian-travels/", img: "/press-forbes.jpg" },
  { tag: "JustLuxe · Luxury Travel", title: "Tradition Plays Key Role in Service & Style at The St. Regis Washington DC", href: "https://www.justluxe.com/travel/hotels/tradition-plays-key-role-in-service-and-style-at-the-st-regis-washington-dc-38134/", img: "/press-justluxe.jpg" },
  { tag: "Wine Spectator · Award", title: "Kembara, Phoenix — Award of Excellence", href: "https://www.winespectator.com/restaurant-awards/detail/240260/name/kembara", img: "/press-winespectator.jpg" },
  { tag: "Video · JW Marriott", title: "Kembara at JW Marriott Desert Ridge", href: "https://www.youtube.com/watch?v=4_dFKeIZPs4", img: "/press-youtube.jpg" },
  { tag: "Instagram · Feature", title: "Kembara by Angelo Sosa — Behind the Concept", href: "https://www.instagram.com/p/C4_Qh4eOF-y/", img: "/press-instagram.jpg" },
  { tag: "World Itineraries · 2019", title: "The St. Regis Washington: Lavish, Historic & Neighbouring the White House", href: "https://worlditineraries.co/2019/09/18/the-st-regis-washington-lavish-historic-and-neighbouring-the-white-house/", img: "/press-worlditineraries.jpg" },
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
      <section id="featured" className="border-t border-border px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="mb-16 lg:col-span-5 lg:mb-0">
            <Reveal>
              <SectionLabel n="04">Press &amp; Features</SectionLabel>
            </Reveal>
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
                  className="group flex items-start gap-6 border-t border-border py-7 transition-colors duration-300 last:border-b hover:border-accent"
                >
                  <div className="hidden shrink-0 sm:block w-20 h-16 overflow-hidden bg-muted">
                    <img
                      src={p.img}
                      alt=""
                      className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                      {p.tag}
                    </div>
                    <div className="mt-3 font-serif text-xl leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                      &ldquo;{p.title}&rdquo;
                    </div>
                  </div>
                  <span aria-hidden className="mt-2 shrink-0 text-foreground/60 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">↗</span>
                </a>
              </Reveal>
            ))}
          </ul>
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
                <div className="border border-border p-6 text-left">
                  <div className="font-serif text-lg text-foreground">{c.name}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{c.issuer}</div>
                </div>
              </Reveal>
            ))}
          </div>
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
