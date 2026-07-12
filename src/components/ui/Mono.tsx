// The group's mono — a vector (SVG) recreation of the moño worn at performances,
// traced from the photo. Scales crisply at any size. Set size/opacity via
// className (e.g. "h-16 w-auto" or "h-56 opacity-10").
export function Mono({ className = "" }: { className?: string }) {
  // Plain <img> so the standalone SVG file is fetched once and cached.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/mono.png" alt="" aria-hidden className={className} />;
}
