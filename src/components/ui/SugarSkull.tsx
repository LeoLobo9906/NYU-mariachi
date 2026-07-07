// Line-art Mexican sugar skull (calavera): floral flower-eyes with scalloped
// petal rings, a forehead flourish, side flowers with leaves, a spade nose,
// filigree curls, a teeth row, and a chin flourish. Drawn in strokes so it
// inherits `color` (default currentColor) — set text-violet on light sections
// or text-white on the violet band. Decorative only.

const petal = (cx: number, cy: number, R: number, w: number) =>
  `M${cx},${cy} C${cx - w},${cy - R * 0.5} ${cx - w * 0.55},${cy - R} ${cx},${cy - R} C${cx + w * 0.55},${cy - R} ${cx + w},${cy - R * 0.5} ${cx},${cy} Z`;

function flower(cx: number, cy: number, R: number, n: number, w: number, color: string) {
  let s = "";
  for (let k = 0; k < n; k++) s += `<path d="${petal(cx, cy, R, w)}" transform="rotate(${(360 / n) * k} ${cx} ${cy})"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${(R * 0.26).toFixed(1)}"/><circle cx="${cx}" cy="${cy}" r="2.2" fill="${color}"/>`;
  return s;
}

function eye(cx: number, cy: number, color: string) {
  const rr = 32;
  let ring = "";
  for (let k = 0; k < 16; k++) {
    const a = (Math.PI * 2 * k) / 16;
    const px = cx + Math.cos(a) * (rr + 11);
    const py = cy + Math.sin(a) * (rr + 11);
    ring += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="4" ry="8.5" transform="rotate(${(a * 180) / Math.PI + 90} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${rr}"/>${ring}${flower(cx, cy, 20, 6, 9, color)}`;
}

const leaf = (cx: number, cy: number, ang: number, len: number) =>
  `<g transform="rotate(${ang} ${cx} ${cy})"><path d="M${cx},${cy} C${cx - len * 0.32},${cy - len * 0.4} ${cx - len * 0.32},${cy - len * 0.8} ${cx},${cy - len} C${cx + len * 0.32},${cy - len * 0.8} ${cx + len * 0.32},${cy - len * 0.4} ${cx},${cy} Z"/><path d="M${cx},${cy - len * 0.15} L${cx},${cy - len * 0.85}"/></g>`;

const curl = (cx: number, cy: number, d = 1) =>
  `<path d="M${cx},${cy} c${8 * d},-2 ${12 * d},4 ${6 * d},10 c${-4 * d},4 ${-9 * d},0 ${-6 * d},-5"/>`;

export function SugarSkull({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  const skull =
    "M150,20 C212,20 258,60 258,122 C258,166 249,196 231,220 C221,234 214,249 206,262 C196,282 176,296 150,298 C124,296 104,282 94,262 C86,249 79,234 69,220 C51,196 42,166 42,122 C42,60 88,20 150,20 Z";

  let fan = "";
  for (let k = -2; k <= 2; k++) fan += `<path d="${petal(150, 46, 20, 7)}" transform="rotate(${k * 15} 150 52)"/>`;

  const spade = `<path d="M150,172 C160,188 178,200 178,214 C178,224 169,228 162,224 C163,230 166,234 150,238 C134,234 137,230 138,224 C131,228 122,224 122,214 C122,200 140,188 150,172 Z" fill="${color}"/>`;

  let teeth = `<path d="M92,240 Q150,233 208,240 L208,272 Q150,286 92,272 Z"/><path d="M97,247 Q150,242 203,247"/>`;
  for (let k = 1; k < 11; k++) {
    const x = 97 + k * 9.6;
    teeth += `<path d="M${x.toFixed(1)},247 L${x.toFixed(1)},276"/>`;
  }
  teeth += `<path d="M97,276 Q150,282 203,276"/>`;

  const chin = `${curl(138, 284, -1)}${curl(162, 284, 1)}<rect x="147" y="288" width="6" height="6" transform="rotate(45 150 291)"/>`;

  const inner = `<g fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="${skull}"/>
    ${fan}
    <rect x="143" y="74" width="14" height="14" transform="rotate(45 150 81)"/><circle cx="150" cy="81" r="2.4" fill="${color}"/>
    <circle cx="150" cy="122" r="6"/><circle cx="150" cy="122" r="2.4" fill="${color}"/>
    ${curl(130, 124, -1)}${curl(170, 124, 1)}
    ${flower(98, 98, 17, 6, 8, color)}${flower(202, 98, 17, 6, 8, color)}
    ${leaf(124, 112, -42, 26)}${leaf(176, 112, 42, 26)}${leaf(112, 120, -72, 20)}${leaf(188, 120, 72, 20)}
    ${eye(102, 156, color)}${eye(198, 156, color)}
    ${spade}
    ${curl(92, 210, -1)}${curl(208, 210, 1)}${leaf(120, 220, -62, 20)}${leaf(180, 220, 62, 20)}
    ${teeth}
    ${chin}
  </g>`;

  return (
    <svg
      viewBox="0 0 300 322"
      className={className}
      role="presentation"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
