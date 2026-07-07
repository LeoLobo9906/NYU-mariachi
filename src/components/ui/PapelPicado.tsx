// Papel picado — detailed Mexican cut-paper banner in the NYU purple palette,
// rendered as ONE responsive SVG. Flags are wide landscape rectangles that hang
// along a deep catenary swag (anchored high at both ends, dipping in the middle),
// each rotated to the curve's tangent so they fan along it. Every flag punches a
// floral crown, mirrored laurel sprays + side flower, a lace dot border, a
// scalloped/pendant bottom, and a central daisy or ringed mariachi instrument.
// Decorative only; respects prefers-reduced-motion.

const PALETTE = ["#7a1fb0", "#b746ff", "#57068c", "#9b3fd0", "#c98cff", "#6a109a"];

// Flag geometry (viewBox units) — wide rectangle.
const FW = 190;
const FH = 150;
const CX = FW / 2; // 95

const diamond = (cx: number, cy: number, s = 3) =>
  `<rect x="${cx - s}" y="${cy - s}" width="${s * 2}" height="${s * 2}" transform="rotate(45 ${cx} ${cy})"/>`;

function daisy(cx: number, cy: number, petals = 12, len = 13, rx = 4.3, ry = 11, hole = 3) {
  let p = "";
  for (let k = 0; k < petals; k++)
    p += `<ellipse cx="${cx}" cy="${cy - len}" rx="${rx}" ry="${ry}" transform="rotate(${(360 / petals) * k} ${cx} ${cy})"/>`;
  return `<g>${p}<circle cx="${cx}" cy="${cy}" r="${hole + 3}"/><circle cx="${cx}" cy="${cy}" r="${hole}" fill="white"/></g>`;
}

// Mariachi instrument motifs, centered at (0,0). White sub-shapes (strings,
// f-holes, rims) read as panel-colour lines within the cut silhouette.
function instrument(name: string) {
  switch (name) {
    case "violin":
      return `<g>
        <rect x="-2" y="-46" width="4" height="18" rx="1.5"/>
        <circle cx="0" cy="-47" r="3.4"/><path d="M0,-50 c3,-1 4,3 1,4.2" fill="none" stroke="black" stroke-width="1.3"/>
        <path d="M0,-30 C9,-32 12,-22 8,-18 C5,-14 5,-10 6,-6 C11,-4 14,8 8,16 C5,20 2,22 0,22 C-2,22 -5,20 -8,16 C-14,8 -11,-4 -6,-6 C-5,-10 -5,-14 -8,-18 C-12,-22 -9,-32 0,-30 Z"/>
        <g stroke="white" stroke-width="0.8"><line x1="-1.6" y1="-44" x2="-1.6" y2="16"/><line x1="-0.5" y1="-44" x2="-0.5" y2="16"/><line x1="0.5" y1="-44" x2="0.5" y2="16"/><line x1="1.6" y1="-44" x2="1.6" y2="16"/></g>
        <path d="M-4.5,-2 q-2.4,6 0,11" fill="none" stroke="white" stroke-width="1.5"/><path d="M4.5,-2 q2.4,6 0,11" fill="none" stroke="white" stroke-width="1.5"/>
        <rect x="-4.5" y="6" width="9" height="1.8" fill="white"/><path d="M0,16 l-4,5 8,0 Z"/></g>`;
    case "trumpet":
      return `<g>
        <path d="M-20,4 C-27,11 -22,21 -9,21 L6,21 C11,21 11,14 8,11" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <rect x="-22" y="-4" width="30" height="8" rx="4"/>
        <path d="M6,-7 C11,-8 16,-16 26,-18 C28.5,-18 28.5,18 26,18 C16,16 11,8 6,7 Z"/>
        <path d="M24.5,-14 C26,-14 26,14 24.5,14" fill="none" stroke="white" stroke-width="1.5"/>
        <rect x="-9.5" y="-13" width="4.4" height="10" rx="1.2"/><rect x="-3.2" y="-13" width="4.4" height="10" rx="1.2"/><rect x="3.1" y="-13" width="4.4" height="10" rx="1.2"/>
        <rect x="-10.2" y="-15.5" width="5.8" height="3" rx="1.4"/><rect x="-3.9" y="-15.5" width="5.8" height="3" rx="1.4"/><rect x="2.4" y="-15.5" width="5.8" height="3" rx="1.4"/>
        <path d="M-22,-3 L-27,-5 L-27,5 L-22,3 Z"/><circle cx="-28.5" cy="0" r="2.6"/></g>`;
    case "guitar":
      return `<g><rect x="-2.4" y="-32" width="4.8" height="26" rx="1.6"/><rect x="-4.8" y="-35" width="9.6" height="5" rx="1.4"/><circle cx="0" cy="6" r="16"/><circle cx="0" cy="-9" r="10.5"/><circle cx="0" cy="2" r="4.5" fill="white"/><g stroke="white" stroke-width="0.7"><line x1="-2" y1="-30" x2="-2" y2="18"/><line x1="0" y1="-30" x2="0" y2="18"/><line x1="2" y1="-30" x2="2" y2="18"/></g></g>`;
    case "sombrero":
      return `<g><ellipse cx="0" cy="10" rx="27" ry="7.5"/><path d="M-12,10 Q-11,-13 0,-13 Q11,-13 12,10 Z"/><path d="M-9,3 Q0,7 9,3" fill="none" stroke="white" stroke-width="1.6"/><ellipse cx="0" cy="10" rx="19" ry="4.5" fill="none" stroke="white" stroke-width="1.4"/></g>`;
    default: // maracas
      return `<g><g transform="rotate(-16)"><circle cx="-12" cy="-6" r="8.5"/><rect x="-14" y="1" width="4.5" height="16" rx="2"/><circle cx="-12" cy="-6" r="3" fill="white"/></g><g transform="rotate(16)"><circle cx="12" cy="-6" r="8.5"/><rect x="9.5" y="1" width="4.5" height="16" rx="2"/><circle cx="12" cy="-6" r="3" fill="white"/></g></g>`;
  }
}

// Which motif sits in each flag: violins replace the old flowers, the rest cycle.
function motifFor(i: number): string {
  if (i % 2 === 0) return "violin";
  return ["trumpet", "guitar", "sombrero", "maracas"][Math.floor(i / 2) % 4];
}

// Left-half ornaments (mirrored to the right about x = CX). Denser than before —
// twin laurels, two side flowers, corner curls and scattered dots fill the panel.
function sideHalf() {
  let dots = "";
  for (let k = 0; k < 10; k++) dots += `<circle cx="8" cy="${16 + k * 12}" r="1.7"/>`;
  const fern = [
    [13, 60, -40], [24, 63, 32], [12, 74, -40], [25, 77, 32], [13, 88, -40],
    [26, 91, 32], [15, 102, -38], [27, 105, 32], [19, 116, -30], [29, 118, 30],
  ]
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="6.6" transform="rotate(${r} ${x} ${y})"/>`)
    .join("");
  return `<g>
    ${dots}
    <path d="M${CX - 8},29 C${CX - 22},21 ${CX - 36},18 ${CX - 48},21" fill="none" stroke="black" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="${CX - 20}" cy="24" rx="2.6" ry="5" transform="rotate(-40 ${CX - 20} 24)"/>
    <ellipse cx="${CX - 33}" cy="20" rx="2.6" ry="5" transform="rotate(-32 ${CX - 33} 20)"/>
    <circle cx="${CX - 50}" cy="21" r="3"/>
    <path d="M20,52 C10,78 16,106 30,126" fill="none" stroke="black" stroke-width="2.6" stroke-linecap="round"/>${fern}
    ${daisy(44, 64, 6, 7, 2.4, 5, 1.8)}${daisy(44, 108, 6, 7, 2.4, 5, 1.8)}
    <path d="M14,40 c-6,1 -7,8 -1,10 c4,1 6,-3 3,-6" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    <path d="M14,132 c-6,-1 -7,-8 -1,-10 c4,-1 6,3 3,6" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    ${diamond(58, 58, 2.2)}${diamond(58, 110, 2.2)}
    <circle cx="34" cy="86" r="1.8"/><circle cx="40" cy="46" r="1.6"/><circle cx="40" cy="126" r="1.6"/>
  </g>`;
}

function cutContent(i: number) {
  let tb = "";
  for (let k = 0; k < 17; k++) tb += `<circle cx="${(12 + k * ((FW - 24) / 16)).toFixed(1)}" cy="9" r="2"/>`;
  let db = "";
  for (let k = 0; k < 8; k++) db += diamond(24 + k * ((FW - 48) / 7), 18, 2.4);
  // medallion: ring outline + inner dot ring + outer petal ring
  const R = 40;
  let ring = "";
  for (let k = 0; k < 20; k++) {
    const a = (Math.PI / 10) * k;
    ring += `<circle cx="${(CX + Math.cos(a) * 33).toFixed(1)}" cy="${(84 + Math.sin(a) * 33).toFixed(1)}" r="1.7"/>`;
  }
  let outer = "";
  for (let k = 0; k < 16; k++) {
    const a = (Math.PI / 8) * k + 0.2;
    const px = CX + Math.cos(a) * R;
    const py = 84 + Math.sin(a) * R;
    outer += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="2.2" ry="4.4" transform="rotate(${(a * 180) / Math.PI + 90} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  let ped = "";
  for (let k = 0; k < 8; k++) ped += `<ellipse cx="${(16 + k * ((FW - 32) / 7)).toFixed(1)}" cy="126" rx="2" ry="4"/>`;

  const center = `<g transform="translate(${CX},84)">${instrument(motifFor(i))}</g>`;

  return `<g fill="black">${tb}${db}</g>
    ${daisy(CX, 30, 6, 7, 2.6, 5.2, 1.6)}
    ${sideHalf()}<g transform="translate(${FW},0) scale(-1,1)">${sideHalf()}</g>
    <g fill="black"><circle cx="${CX}" cy="84" r="${R}" fill="none" stroke="black" stroke-width="2"/>${outer}${ring}${center}</g>
    ${daisy(CX, 120, 6, 6.5, 2.4, 5, 1.5)}
    <g fill="black">${diamond(CX, 134, 2.6)}${ped}</g>`;
}

function flagMarkup(i: number) {
  const color = PALETTE[i % PALETTE.length];
  const id = `pp-${i}`;
  const scal = 8;
  const sw = FW / scal;
  const bodyH = FH - 24;
  let panel = `M0,0 H${FW} V${bodyH}`;
  for (let k = 0; k < scal; k++) {
    const x0 = FW - k * sw;
    panel += ` Q${(x0 - sw / 2).toFixed(1)},${bodyH + 21} ${(x0 - sw).toFixed(1)},${bodyH}`;
  }
  panel += " Z";
  return `<defs><mask id="${id}"><rect width="${FW}" height="${FH}" fill="white"/>${cutContent(i)}</mask></defs><circle cx="${CX}" cy="2" r="3.2" fill="${color}"/><path d="${panel}" fill="${color}" mask="url(#${id})"/>`;
}

export function PapelPicado({ count = 9, className = "" }: { count?: number; className?: string }) {
  const W = 1000;
  const dip = 90; // depth of the swag in viewBox units
  const top = 12; // headroom so rotated end-flag tops never clip
  const scale = (W / count / FW) * 0.99;
  const flagH = FH * scale;
  const H = Math.ceil(top + dip + flagH + 10);

  // The cord is a parabola: y(u) = top + 4·dip·u·(1−u), x(u) = u·W.
  // Flags AND the cord are both driven by u (the flag's centre fraction), so
  // every flag's knot sits exactly on the cord — no floating, no clipping.
  const cordY = (u: number) => top + dip * 4 * u * (1 - u);

  const flags = Array.from({ length: count }, (_, i) => {
    const u = (i + 0.5) / count;
    const cx = u * W;
    const cy = cordY(u);
    const slope = (dip * 4 * (1 - 2 * u)) / W; // dy/dx along the cord
    const rot = (Math.atan(slope) * 180) / Math.PI;
    const place = `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${-CX} 0)`;
    return (
      <g key={i} transform={place}>
        <g
          className="picado-flag"
          style={{ animationDelay: `${((i % 7) * -0.5).toFixed(2)}s` }}
          dangerouslySetInnerHTML={{ __html: flagMarkup(i) }}
        />
      </g>
    );
  });

  // Draw the cord only between the first and last knots (so it doesn't poke out
  // past the flags). A quadratic bezier reproduces the parabola exactly.
  const u0 = 0.5 / count;
  const u1 = (count - 0.5) / count;
  const x0 = u0 * W;
  const x1 = u1 * W;
  const xm = (x0 + x1) / 2;
  const yc = 2 * cordY((u0 + u1) / 2) - 0.5 * (cordY(u0) + cordY(u1));

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMin meet"
      className={`pointer-events-none block w-full select-none ${className}`}
    >
      <path
        d={`M${x0.toFixed(1)},${cordY(u0).toFixed(1)} Q${xm.toFixed(1)},${yc.toFixed(1)} ${x1.toFixed(1)},${cordY(u1).toFixed(1)}`}
        fill="none"
        stroke="var(--color-violet-500)"
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />
      {flags}
    </svg>
  );
}
