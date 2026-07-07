interface MarqueeProps {
  items: string[];
  className?: string;
}

// Infinite scrolling band of words — pure CSS, duplicated for seamless loop.
export function Marquee({ items, className }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-mask overflow-hidden border-y border-violet/15 bg-ink-800 py-6 ${className ?? ""}`}>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="kinetic text-4xl text-violet md:text-6xl">{item}</span>
            <span className="text-3xl text-gold-300">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
