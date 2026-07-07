// Shared content contracts. All src/content/*.ts data conforms to these.

export type Section = "armonia" | "violins" | "woodwind_brass" | "vocalists";

export interface Member {
  name: string;
  section: Section | string;
  instruments: string[];
  isVocalist?: boolean;
  photo: string; // path under /public
}

export interface Semester {
  id: string;      // "spring_2026"
  label: string;   // "Spring 2026"
  current?: boolean;
  members: Member[];
}

export interface Song {
  title: string;
  artist?: string;     // original artist or "arr. by ..."
  cover?: string;      // "/images/repertoire/el_rey.jpg" (optional — falls back to a styled card)
  genre?: string;      // "Ranchera", "Son", "Bolero", "Huapango"...
  year?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface PerformanceEvent {
  title: string;
  date: string;        // ISO "2026-04-18"
  venue?: string;
  description?: string;
  photo?: string;
  upcoming: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Club {
  name: string;
  shortName: string;
  tagline: string;
  blurb: string;
  email: string;
  location: string;
  department: string;
  socials: SocialLink[];
  auditionUrl?: string; // Google Form for auditions / joining
}
