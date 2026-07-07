import type { Metadata } from "next";
import { club } from "@/content/club";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://nyumariachi.com";

interface PageSeo {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildMetadata({ title, description, path = "/", image }: PageSeo = {}): Metadata {
  const fullTitle = title ? `${title} | ${club.name}` : `${club.name} | ${club.tagline}`;
  const desc = description ?? club.blurb;
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? "/images/mariachi_photos/mariachi_main.png";
  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: club.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: club.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

// JSON-LD MusicGroup — tells Google we're a bookable musical ensemble.
export function musicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: club.name,
    genre: "Mariachi",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/nyu_logo.png`,
    email: club.email,
    areaServed: "New York City",
    location: {
      "@type": "Place",
      name: "New York University",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
    },
    sameAs: club.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };
}
