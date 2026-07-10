"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/content/gallery";
import { Collage } from "./Collage";
import { VideoGrid } from "./VideoGrid";

type Tab = "photos" | "videos";

export function MediaTabs({ photos, videos }: { photos: GalleryPhoto[]; videos: string[] }) {
  const [tab, setTab] = useState<Tab>("photos");
  const tabs: { id: Tab; label: string }[] = [
    { id: "photos", label: `Photos` },
    { id: "videos", label: `Videos` },
  ];

  return (
    <div>
      <div className="mb-10 flex gap-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
              tab === t.id
                ? "bg-gold text-white"
                : "border border-violet/25 text-bone-dim hover:border-violet/40 hover:text-bone"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "photos" ? <Collage photos={photos} /> : <VideoGrid videos={videos} />}
    </div>
  );
}
