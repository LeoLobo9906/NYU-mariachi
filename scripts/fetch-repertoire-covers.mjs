// Downloads the most famous album cover for each repertoire song from Apple's
// public iTunes Search API into public/images/repertoire/<slug>.jpg.
//
//   npm run fetch-covers            # fetch missing covers
//   npm run fetch-covers -- --force # re-download everything
//
// Requires Node 18+ (global fetch). No API key needed. This only reads public
// artwork URLs Apple exposes for search results.
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "images", "repertoire");
const FORCE = process.argv.includes("--force");

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// title, artist (used to bias toward the most iconic version). Keep in sync with
// src/content/repertoire.ts.
const SONGS = [
  ["Las Mañanitas", "Pedro Infante"],
  ["Hermoso Cariño", "Vicente Fernández"],
  ["El Rey", "Vicente Fernández"],
  ["Acá Entre Nos", "Vicente Fernández"],
  ["Amor Eterno", "Juan Gabriel"],
  ["Así Fue", "Juan Gabriel"],
  ["Adiós Amor", "Christian Nodal"],
  ["Bésame Mucho", "Consuelo Velázquez"],
  ["Cariño", "Vicente Fernández"],
  ["Cielito Lindo", "Pedro Infante"],
  ["Cien Años", "Pedro Infante"],
  ["Como La Flor", "Selena"],
  ["Cómo Quien Pierde Una Estrella", "Alejandro Fernández"],
  ["Costumbres", "Juan Gabriel"],
  ["Cruz de Olvido", "Vicente Fernández"],
  ["Cuando Sale La Luna", "Javier Solís"],
  ["Cucurrucucú Paloma", "Lola Beltrán"],
  ["El Aventurero", "Antonio Aguilar"],
  ["El Cascabel", "Mariachi Vargas de Tecalitlán"],
  ["El Mariachi Loco", "Mariachi"],
  ["El Milagro de Tus Ojos", "Ramón Ayala"],
  ["El Niño Perdido", "Mariachi Vargas de Tecalitlán"],
  ["El Son de la Negra", "Mariachi Vargas de Tecalitlán"],
  ["El Toro Relajo", "Antonio Aguilar"],
  ["El Toro Viejo", "Antonio Aguilar"],
  ["En Tu Pelo", "Vicente Fernández"],
  ["Estos Celos", "Vicente Fernández"],
  ["La Feria de Las Flores", "Antonio Aguilar"],
  ["Gema", "Javier Solís"],
  ["Guadalajara", "Mariachi Vargas de Tecalitlán"],
  ["Jesusita en Chihuahua", "Mariachi Vargas de Tecalitlán"],
  ["Juan Colorado", "Antonio Aguilar"],
  ["La Bamba", "Ritchie Valens"],
  ["La Bikina", "Luis Miguel"],
  ["La Bruja", "Lila Downs"],
  ["La Gloria Eres Tú", "Javier Solís"],
  ["Los Laureles", "Linda Ronstadt"],
  ["Mátalas", "Alejandro Fernández"],
  ["Motivos", "Javier Solís"],
  ["Paloma Negra", "Lola Beltrán"],
  ["Pelea de Gallos", "Mariachi Vargas de Tecalitlán"],
  ["Perfume de Gardenias", "Los Panchos"],
  ["Piel Canela", "Los Panchos"],
  ["Sabes una Cosa", "Javier Solís"],
  ["Sabor a Mí", "Los Panchos"],
  ["Si Nos Dejan", "Luis Miguel"],
  ["Un Rinconcito en el Cielo", "Ramón Ayala"],
  ["Volver Volver", "Vicente Fernández"],
  ["Yo Quiero Ser", "Vicente Fernández"],
];

async function search(term) {
  const url =
    "https://itunes.apple.com/search?" +
    new URLSearchParams({ term, media: "music", entity: "song", limit: "1" }).toString();
  const res = await fetch(url, { headers: { "User-Agent": "NYU-Mariachi-site" } });
  if (!res.ok) throw new Error(`iTunes ${res.status}`);
  const data = await res.json();
  return data.results?.[0] ?? null;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`art ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0,
    skip = 0,
    miss = 0;

  for (const [title, artist] of SONGS) {
    const slug = slugify(title);
    const dest = join(OUT_DIR, `${slug}.jpg`);
    if (!FORCE && existsSync(dest)) {
      skip++;
      continue;
    }
    try {
      // Try "title artist" first, then fall back to the title alone.
      let hit = await search(`${title} ${artist}`);
      if (!hit) hit = await search(title);
      if (!hit?.artworkUrl100) {
        console.warn(`  ✗ no match: ${title}`);
        miss++;
        continue;
      }
      const art = hit.artworkUrl100.replace("100x100bb", "600x600bb");
      await download(art, dest);
      console.log(`  ✓ ${title}  ←  ${hit.artistName} · ${hit.collectionName ?? hit.trackName}`);
      ok++;
      await new Promise((r) => setTimeout(r, 250)); // be polite to the API
    } catch (e) {
      console.warn(`  ✗ error: ${title} — ${e.message}`);
      miss++;
    }
  }

  console.log(`\nDone. ${ok} downloaded, ${skip} skipped (already present), ${miss} missing.`);
  if (miss) console.log("Missing ones will show a styled placeholder card — safe to leave, or add art manually.");
}

main();
