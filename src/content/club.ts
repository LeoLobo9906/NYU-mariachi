import type { Club } from "@/lib/types";

// Single source of truth for club identity. Referenced by the footer, contact
// page, and JSON-LD structured data. Update once, changes everywhere.
export const club: Club = {
  name: "NYU Mariachi Violetas",
  shortName: "NYU",
  tagline: "The sound of tradition, live from New York.",
  blurb:
    "NYU Mariachi Violetas is a student-led musical ensemble at New York University dedicated to celebrating and sharing the rich traditions of Mexican mariachi music. Through performances on campus and across New York City, the group brings together students from diverse backgrounds to honor cultural heritage, build community, and showcase live mariachi through authentic instrumentation, musicianship, and spirit.",
  email: "nyumariachi@gmail.com",
  location: "New York, NY",
  department: "Steinhardt Department of Music",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/mariachi_nyu/" },
    { label: "TikTok", href: "https://www.tiktok.com/@mariachivioletas" },
    { label: "YouTube", href: "https://www.youtube.com/@NYUMariachi/videos" },
    { label: "Email", href: "mailto:nyumariachi@gmail.com" },
  ],
  auditionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfKRn0ch_ze9j24kQS3Y6-hrXVqcYpd_Yu-SJcE0vQ5lIUPDQ/viewform",
};

// Short marketing lines reused across the site.
export const sectionCopy: Record<string, string> = {
  armonia:
    "The armonía section is the rhythmic and harmonic foundation of mariachi. Guitar, vihuela, guitarrón, and harp drive the pulse, support the melody, and give the group its unmistakable texture and energy.",
  violins:
    "The violins carry the melodic voice of the ensemble. Through expressive lines, harmonies, and flourishes, they shape the emotional character of every piece, moving between powerful unison passages and intricate counter-melodies.",
  woodwind_brass:
    "The woodwinds and brass add brilliance, power, and dynamic contrast. With bold accents, fanfares, and lyrical phrases, these instruments elevate performances and bring mariachi's iconic, celebratory sound to life.",
  vocalists:
    "Our vocalists are the heart of the story. They carry the lyric, the drama, and the feeling, turning every ranchera, bolero, and son into a moment the audience remembers.",
};
