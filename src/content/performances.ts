import type { PerformanceEvent } from "@/lib/types";

// Past + upcoming performances. `upcoming: true` surfaces it in the "next" list.
export const performances: PerformanceEvent[] = [
  {
    title: "Hispanic Heritage Month Showcase",
    date: "2026-09-26",
    venue: "NYU Skirball Center",
    description: "A full-length set celebrating the season with the current ensemble.",
    upcoming: true,
    photo: "/images/mariachi_photos/mariachi_main.png",
  },
  {
    title: "Washington Square Park: Fall Sessions",
    date: "2026-10-18",
    venue: "Washington Square Park",
    description: "Open-air performance in the heart of the Village.",
    upcoming: true,
    photo: "/images/mariachi_photos/photo_3.png",
  },
  {
    title: "Día de los Muertos Celebration",
    date: "2025-11-02",
    venue: "NYU Kimmel Center",
    description: "Community ofrenda and live mariachi performance.",
    upcoming: false,
    photo: "/images/mariachi_photos/photo_6.png",
  },
  {
    title: "Spring Gala Performance",
    date: "2025-04-19",
    venue: "The Cube, Astor Place",
    description: "Street performance drawing a downtown crowd.",
    upcoming: false,
    photo: "/images/mariachi_photos/photo_9.png",
  },
];
