import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#featured", label: "Featured In" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(href); },
        { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* Desktop pill nav — hidden on mobile */}
      <div className="fixed inset-x-0 top-0 z-50 hidden justify-center pt-5 pointer-events-none md:flex">
        <nav className="nav-pill pointer-events-auto">
          <span className={`nav-monogram${isScrolled ? " nav-monogram--visible" : ""}`}>CB</span>
          <ul className="flex items-center">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-pill__link${activeHref === l.href ? " nav-pill__link--active" : ""}`}
                  aria-current={activeHref === l.href ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-4 pointer-events-none md:hidden">
        <span
          className="font-serif text-base font-semibold tracking-wider text-foreground transition-opacity duration-300"
          style={{ opacity: isScrolled ? 1 : 0 }}
        >
          CB
        </span>
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-hamburger__line" style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : undefined }} />
          <span className="nav-hamburger__line" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="nav-hamburger__line" style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : undefined }} />
        </button>
      </div>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-md md:hidden"
          style={{ background: "oklch(0.985 0.003 80 / 97%)" }}
          onClick={close}
        >
          <ul className="flex flex-col items-center gap-10" onClick={(e) => e.stopPropagation()}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="font-serif text-4xl font-light text-foreground transition-colors duration-200 hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
