import type { Song } from "@/lib/types";

// The songs NYU Mariachi has under its belt — rendered as cover cards on
// /repertoire. `artist` is the best-known interpreter (used to fetch the most
// famous album cover). Cover art is auto-matched by title: a file at
// public/images/repertoire/<slugify(title)>.jpg is shown if present, otherwise
// the card falls back to a styled placeholder.
//
// To populate covers: run `npm run fetch-covers` (downloads from Apple's iTunes
// API into public/images/repertoire/). To add a song: add an entry here AND to
// the SONGS list in scripts/fetch-repertoire-covers.mjs, then re-run the script.
export const repertoire: Song[] = [
  { title: "Las Mañanitas", artist: "Pedro Infante", genre: "Traditional" },
  { title: "Hermoso Cariño", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "El Rey", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Acá Entre Nos", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Amor Eterno", artist: "Juan Gabriel", genre: "Balada Ranchera" },
  { title: "Así Fue", artist: "Juan Gabriel", genre: "Balada Ranchera" },
  { title: "Adiós Amor", artist: "Christian Nodal", genre: "Ranchera" },
  { title: "Bésame Mucho", artist: "Consuelo Velázquez", genre: "Bolero" },
  { title: "Cariño", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Cielito Lindo", artist: "Pedro Infante", genre: "Traditional" },
  { title: "Cien Años", artist: "Pedro Infante", genre: "Ranchera" },
  { title: "Como La Flor", artist: "Selena", genre: "Cumbia" },
  { title: "Cómo Quien Pierde Una Estrella", artist: "Alejandro Fernández", genre: "Ranchera" },
  { title: "Costumbres", artist: "Juan Gabriel", genre: "Ranchera" },
  { title: "Cruz de Olvido", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Cuando Sale La Luna", artist: "Javier Solís", genre: "Bolero" },
  { title: "Cucurrucucú Paloma", artist: "Lola Beltrán", genre: "Huapango" },
  { title: "El Aventurero", artist: "Antonio Aguilar", genre: "Corrido" },
  { title: "El Cascabel", artist: "Mariachi Vargas de Tecalitlán", genre: "Son Jarocho" },
  { title: "El Mariachi Loco", artist: "Mariachi", genre: "Cumbia" },
  { title: "El Milagro de Tus Ojos", artist: "Ramón Ayala", genre: "Ranchera" },
  { title: "El Niño Perdido", artist: "Mariachi Vargas de Tecalitlán", genre: "Instrumental" },
  { title: "El Son de la Negra", artist: "Mariachi Vargas de Tecalitlán", genre: "Son Jalisciense" },
  { title: "El Toro Relajo", artist: "Antonio Aguilar", genre: "Ranchera" },
  { title: "El Toro Viejo", artist: "Antonio Aguilar", genre: "Ranchera" },
  { title: "En Tu Pelo", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Estos Celos", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "La Feria de Las Flores", artist: "Antonio Aguilar", genre: "Ranchera" },
  { title: "Gema", artist: "Javier Solís", genre: "Bolero" },
  { title: "Guadalajara", artist: "Mariachi Vargas de Tecalitlán", genre: "Son Jalisciense" },
  { title: "Jesusita en Chihuahua", artist: "Mariachi Vargas de Tecalitlán", genre: "Polka" },
  { title: "Juan Colorado", artist: "Antonio Aguilar", genre: "Son Jalisciense" },
  { title: "La Bamba", artist: "Ritchie Valens", genre: "Son Jarocho" },
  { title: "La Bikina", artist: "Luis Miguel", genre: "Balada Ranchera" },
  { title: "La Bruja", artist: "Lila Downs", genre: "Son Jarocho" },
  { title: "La Gloria Eres Tú", artist: "Javier Solís", genre: "Bolero" },
  { title: "Los Laureles", artist: "Linda Ronstadt", genre: "Son" },
  { title: "Mátalas", artist: "Alejandro Fernández", genre: "Ranchera" },
  { title: "Motivos", artist: "Javier Solís", genre: "Bolero" },
  { title: "Paloma Negra", artist: "Lola Beltrán", genre: "Ranchera" },
  { title: "Pelea de Gallos", artist: "Mariachi Vargas de Tecalitlán", genre: "Instrumental" },
  { title: "Perfume de Gardenias", artist: "Los Panchos", genre: "Bolero" },
  { title: "Piel Canela", artist: "Los Panchos", genre: "Bolero" },
  { title: "Sabes una Cosa", artist: "Javier Solís", genre: "Bolero" },
  { title: "Sabor a Mí", artist: "Los Panchos", genre: "Bolero" },
  { title: "Si Nos Dejan", artist: "Luis Miguel", genre: "Ranchera" },
  { title: "Un Rinconcito en el Cielo", artist: "Ramón Ayala", genre: "Cumbia" },
  { title: "Volver Volver", artist: "Vicente Fernández", genre: "Ranchera" },
  { title: "Yo Quiero Ser", artist: "Vicente Fernández", genre: "Ranchera" },
];
