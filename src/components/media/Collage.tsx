"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPhoto } from "@/content/gallery";

// Pinterest-style masonry collage. Every photo keeps its natural aspect ratio
// (no cropping) and flows into columns, so heights vary and the wall packs like
// a pin board. Clicking a photo opens a focus lightbox with keyboard navigation.
export function Collage({ photos }: { photos: GalleryPhoto[] }) {
 const [active, setActive] = useState<number | null>(null);

 const close = useCallback(() => setActive(null), []);
 const go = useCallback(
 (dir: number) =>
 setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
 [photos.length]
 );

 useEffect(() => {
 if (active === null) return;
 document.body.style.overflow = "hidden";
 const onKey = (e: KeyboardEvent) => {
 if (e.key === "Escape") close();
 if (e.key === "ArrowRight") go(1);
 if (e.key === "ArrowLeft") go(-1);
 };
 window.addEventListener("keydown", onKey);
 return () => {
 document.body.style.overflow = "";
 window.removeEventListener("keydown", onKey);
 };
 }, [active, close, go]);

 return (
 <>
 <div className="columns-2 gap-3 [column-fill:balance] sm:columns-3 lg:columns-4 [&>*]:mb-3">
 {photos.map((p, i) => (
 <motion.button
 key={p.src}
 onClick={() => setActive(i)}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-5% 0px" }}
 transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.04 }}
 className="group relative block w-full overflow-hidden bg-ink-700 [break-inside:avoid]"
 >
 <Image
 src={p.src}
 alt={p.alt}
 width={p.w}
 height={p.h}
 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
 className="h-auto w-full object-cover grayscale-[0.3] transition-all duration-700 ease-out group-hover:grayscale-0"
 />
 <div className="pointer-events-none absolute inset-0 bg-violet/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
 <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-violet/15 transition-colors group-hover:ring-violet/50" />
 </motion.button>
 ))}
 </div>

 <AnimatePresence>
 {active !== null && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.25 }}
 onClick={close}
 className="fixed inset-0 z-[70] flex items-center justify-center bg-shadow/95 backdrop-blur-sm"
 >
 <button
 onClick={close}
 aria-label="Close"
 className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-white hover:bg-white/10"
 >
 ×
 </button>
 <button
 onClick={(e) => { e.stopPropagation(); go(-1); }}
 aria-label="Previous"
 className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 md:left-8"
 >
 ‹
 </button>
 <button
 onClick={(e) => { e.stopPropagation(); go(1); }}
 aria-label="Next"
 className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 md:right-8"
 >
 ›
 </button>

 <motion.div
 key={active}
 initial={{ opacity: 0, scale: 0.94 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
 onClick={(e) => e.stopPropagation()}
 className="relative flex max-h-[86vh] max-w-[92vw] flex-col items-center"
 >
 <Image
 src={photos[active].src}
 alt={photos[active].alt}
 width={photos[active].w}
 height={photos[active].h}
 sizes="92vw"
 className="max-h-[82vh] w-auto object-contain shadow-2xl shadow-black/60"
 priority
 />
 <p className="mt-3 text-xs uppercase tracking-widest text-white/70">
 {active + 1} / {photos.length}
 </p>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
