"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Song } from "@/lib/types";
import { slugify } from "@/lib/utils";

// Album/cover card. Cover art resolves to song.cover, or is auto-matched by
// title at /images/repertoire/<slug>.jpg (populated by `npm run fetch-covers`).
// Falls back to a styled violet→gold gradient plate with the title when the art
// is missing, so the grid never shows a broken image.
export function SongCard({ song, index = 0 }: { song: Song; index?: number }) {
 const [failed, setFailed] = useState(false);
 const cover = song.cover ?? `/images/repertoire/${slugify(song.title)}.jpg`;
 const showArt = Boolean(cover) && !failed;

 return (
 <motion.a
 href={song.spotifyUrl ?? song.youtubeUrl ?? undefined}
 target={song.spotifyUrl || song.youtubeUrl ? "_blank" : undefined}
 rel="noreferrer"
 initial={{ opacity: 0, y: 26 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-5% 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.05 }}
 className="group block"
 >
 <div className="relative aspect-square overflow-hidden bg-ink-700 shadow-lg shadow-black/40">
 {showArt ? (
 <Image
 src={cover}
 alt={`${song.title} cover`}
 fill
 sizes="(max-width: 768px) 45vw, 22vw"
 onError={() => setFailed(true)}
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 ) : (
 <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet via-violet-600 to-shadow p-4 text-center">
 <span className="text-2xl text-white/80">♪</span>
 <span className="mt-2 font-display text-lg leading-tight text-white">{song.title}</span>
 </div>
 )}
 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-shadow/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
 {(song.spotifyUrl || song.youtubeUrl) && (
 <span className="absolute bottom-3 right-3 translate-y-2 bg-gold px-3 py-1 text-xs font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
 Listen ↗
 </span>
 )}
 </div>
 <div className="mt-3">
 <p className="font-display text-base text-bone">{song.title}</p>
 <p className="text-sm text-bone-dim">
 {song.artist}
 {song.genre ? ` · ${song.genre}` : ""}
 </p>
 </div>
 </motion.a>
 );
}
