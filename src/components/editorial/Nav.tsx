import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#featured", label: "Press" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,height] duration-300 ease-out ${
        scrolled
          ? "h-14 bg-background/70 backdrop-blur-md border-border/60"
          : "h-20 bg-background/95 border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-serif text-lg font-medium tracking-tight text-foreground">
          Christopher <span className="italic">Biguet</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-foreground link-underline md:inline-block"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}
