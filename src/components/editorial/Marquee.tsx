const KEYWORDS = [
  "Commercial Strategy",
  "Go-to-Market",
  "Concept Launch",
  "Digital Transformation",
  "P&L Ownership",
  "EMEA · APAC",
  "Luxury Hospitality",
  "Business Development",
  "Customer Experience",
  "Executive Stakeholders",
];

export function Marquee() {
  const items = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="marquee relative overflow-hidden border-y border-border bg-background py-6">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {items.map((k, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-serif text-2xl italic text-foreground/80 md:text-3xl">{k}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
