"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Cinematic full-bleed hero: parallaxed photo, kinetic title over the image with
// scroll-driven scale + fade. A dark, immersive opening before the white site.
export function Hero() {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
 const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
 const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
 const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
 const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

 return (
 <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
 <motion.div style={{ y: imgY, scale }} className="absolute inset-0">
 <Image
 src="/images/mariachi_photos/mariachi_main.png"
 alt="NYU Mariachi performing"
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />
 {/* purple-lit stage wash */}
 <div className="absolute inset-0 bg-gradient-to-b from-shadow/40 via-shadow/35 to-shadow" />
 <div className="absolute inset-0 bg-violet/35 mix-blend-multiply" />
 <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(87,6,140,0.4),transparent)]" />
 </motion.div>

 <motion.div
 style={{ y: titleY, opacity: fade }}
 className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
 >
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3, duration: 0.8 }}
 className="mb-4 text-xs uppercase tracking-[0.4em] text-white/75"
 >
 New York University
 </motion.p>
 <h1 className="kinetic text-white">
 <span className="block text-[18vw] leading-[0.82] md:text-[13vw]">Mariachi</span>
 <span className="mt-1 block text-[11vw] leading-[0.82] text-violet-300 md:text-[7.5vw]">
 Violetas
 </span>
 </h1>
 <motion.p
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4, duration: 0.8 }}
 className="mt-3 text-sm uppercase tracking-[0.35em] text-white/80"
 >
 The NYU Mariachi
 </motion.p>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5, duration: 0.8 }}
 className="mt-6 max-w-md text-base text-white/80 md:text-lg"
 >
 Live mariachi from the heart of New York City. Authentic, electric, unforgettable.
 </motion.p>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.7, duration: 0.8 }}
 className="mt-8 flex gap-4"
 >
 <Link
 href="/contact"
 className="btn-glow bg-white px-7 py-3 text-sm uppercase tracking-widest text-violet transition-transform hover:scale-105"
 >
 Hire us
 </Link>
 </motion.div>
 </motion.div>

 <motion.div
 style={{ opacity: fade }}
 className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-white/70"
 >
 Scroll ↓
 </motion.div>
 </section>
 );
}
