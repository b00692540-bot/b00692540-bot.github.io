import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#featured", label: "Featured In" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-5 pointer-events-none">
      <nav className={`nav-pill pointer-events-auto${scrolled ? " nav-pill--scrolled" : ""}`}>
        <ul className="flex items-center">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-pill__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
