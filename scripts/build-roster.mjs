// Scans public/images/roster/<semester>/<section>/<name>_<instrument>.png
// and writes src/content/roster.ts. Run: npm run build-roster
//
// Vocalists: many singers also play an instrument, so their headshot lives in
// their instrument folder (armonia/violins/brass). Rather than duplicate photos,
// the VOCALISTS map below lists who sang each semester by name, and the script
// reuses each person's existing headshot (looked up across all semesters).
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public", "images", "roster");
const OUT = join(process.cwd(), "src", "content", "roster.ts");

const SECTION_LABEL = {
  armonia: "Armonía",
  violins: "Violins & Flutes",
  woodwind_brass: "Brass",
  vocalists: "Vocalists",
};

const INSTRUMENT_LABEL = {
  guitar: "Guitar", vihuela: "Vihuela", guitarron: "Guitarrón", harp: "Harp",
  violin: "Violin", violins: "Violin", trumpet: "Trumpet", trombone: "Trombone",
  trumbone: "Trombone", flute: "Flute", altosax: "Alto Sax", sopranosax: "Soprano Sax",
  supranosax: "Soprano Sax", singer: "Vocals",
};

// Who sang each semester (by filename first-name). Their headshot is reused from
// their instrument folder — no need to duplicate the photo into a vocalists folder.
const VOCALISTS = {
  fall_2024: ["eric", "anahi", "paola", "kelsey", "clarissa", "abi", "jose", "thomas"],
  spring_2025: ["eric", "anahi", "paola", "abi", "kelsey", "jose", "thomas"],
  fall_2025: ["eric:armonia", "anahi", "jazmeen", "clarissa", "abi", "lizzy", "jose"],
  spring_2026: ["lizzy", "jazmeen", "susie", "clarissa", "isabella", "eric:armonia", "anahi", "jose"],
};

// Preferred display spellings (e.g. accents) that a filename can't easily carry.
const NAME_FIX = { anahi: "Anahí" };
const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const prettyName = (raw) => NAME_FIX[raw.toLowerCase()] ?? titleCase(raw);
const prettyInstrument = (raw) => INSTRUMENT_LABEL[raw] ?? titleCase(raw);
const prettySemester = (id) => {
  const [term, year] = id.split("_");
  return `${titleCase(term)} ${year}`;
};

function dirs(p) {
  try { return readdirSync(p).filter((d) => statSync(join(p, d)).isDirectory()); }
  catch { return []; }
}
function files(p) {
  try { return readdirSync(p).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)); }
  catch { return []; }
}

// order newest first
const TERM_ORDER = { spring: 1, fall: 2 };
const semesters = dirs(ROOT).sort((a, b) => {
  const [ta, ya] = a.split("_"); const [tb, yb] = b.split("_");
  if (yb !== ya) return Number(yb) - Number(ya);
  return (TERM_ORDER[tb] ?? 0) - (TERM_ORDER[ta] ?? 0);
});
const semOrder = Object.fromEntries(semesters.map((id, i) => [id, i]));

// --- Pass 1: read every photo file into raw members + a global photo index ----
const rawBySem = {};
const photoIndex = {}; // stem -> [{ semId, order, isSinger, photo }]

for (const semId of semesters) {
  const list = [];
  for (const section of dirs(join(ROOT, semId))) {
    for (const file of files(join(ROOT, semId, section))) {
      // A trailing `~tag` (e.g. name_instrument~v2.png) is a cache-buster so an
      // updated photo gets a fresh URL; it's ignored when parsing name/instrument.
      const fileStem = file.replace(/\.[^.]+$/, "").replace(/~[^~]*$/, "");
      const [namePart, instrPart = ""] = fileStem.split(/_(.+)/);
      const stem = namePart.toLowerCase();
      const instruments = instrPart.split("-").filter(Boolean).map(prettyInstrument);
      const isSinger = /singer|vocal/i.test(instrPart);
      const photo = `/images/roster/${semId}/${section}/${file}`;
      list.push({
        stem,
        name: prettyName(namePart),
        section,
        instruments: instruments.length ? instruments : ["Member"],
        isVocalist: isSinger,
        photo,
      });
      (photoIndex[stem] ??= []).push({ semId, order: semOrder[semId], section, isSinger, photo });
    }
  }
  rawBySem[semId] = list;
}

// Find the best headshot for a person (stem), preferring the same semester,
// then the nearest semester; among ties prefer a singer photo, then most recent.
function findPhoto(stem, semId, prefSection) {
  const entries = photoIndex[stem];
  if (!entries || !entries.length) return null;
  const target = semOrder[semId];
  const best = [...entries].sort((a, b) => {
    // When a section is specified (to disambiguate two people who share a
    // first name, e.g. an armonia Eric and a brass Eric), prefer that section.
    if (prefSection) {
      const ma = a.section === prefSection ? 0 : 1;
      const mb = b.section === prefSection ? 0 : 1;
      if (ma !== mb) return ma - mb;
    }
    const da = Math.abs(a.order - target);
    const db = Math.abs(b.order - target);
    if (da !== db) return da - db;
    if (a.isSinger !== b.isSinger) return a.isSinger ? -1 : 1;
    return a.order - b.order; // more recent first
  })[0];
  return best.photo;
}

// --- Pass 2: assemble each semester --------------------------------------------
const data = semesters.map((semId, i) => {
  // Instrument sections come straight from the folders.
  const members = rawBySem[semId]
    .filter((m) => m.section !== "vocalists")
    .map(({ stem, ...m }) => m); // drop internal `stem`

  // Vocalists: from the VOCALISTS map when defined, else the physical folder.
  if (VOCALISTS[semId]) {
    for (const entry of VOCALISTS[semId]) {
      // Entries may be "name" or "name:section" — the section pins which
      // person's headshot to reuse when two members share a first name.
      const [stem, prefSection] = entry.split(":");
      const photo = findPhoto(stem, semId, prefSection);
      if (!photo) {
        console.warn(`  ! no photo found for vocalist "${stem}" in ${semId} — skipped`);
        continue;
      }
      members.push({
        name: prettyName(stem),
        section: "vocalists",
        instruments: ["Vocals"],
        isVocalist: true,
        photo,
      });
    }
  } else {
    for (const m of rawBySem[semId].filter((m) => m.section === "vocalists")) {
      const { stem, ...rest } = m;
      members.push(rest);
    }
  }

  members.sort((a, b) => a.name.localeCompare(b.name));
  return { id: semId, label: prettySemester(semId), current: i === 0, members };
});

const header = `// AUTO-GENERATED by scripts/build-roster.mjs — do not edit by hand.
// Run \`npm run build-roster\` after changing photos in public/images/roster.
import type { Semester } from "@/lib/types";

export const SECTION_LABELS: Record<string, string> = ${JSON.stringify(SECTION_LABEL, null, 2)};

export const roster: Semester[] = `;

writeFileSync(OUT, header + JSON.stringify(data, null, 2) + ";\n");
console.log(`Wrote ${OUT} — ${data.length} semesters, ${data.reduce((n, s) => n + s.members.length, 0)} members.`);
