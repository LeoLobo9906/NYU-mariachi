"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Member } from "@/lib/types";

// A cinematic headshot card. Image desaturates to violet at rest and blooms
// into full color + rises on hover, with the name/instrument sliding up.
export function MemberCard({ member, index = 0 }: { member: Member; index?: number }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-5% 0px" }}
 transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 8) * 0.04 }}
 className="group relative aspect-[3/4] overflow-hidden bg-ink-700"
 >
 <Image
 src={member.photo}
 alt={`${member.name}, ${member.instruments.join(", ")}`}
 fill
 sizes="(max-width: 768px) 45vw, 20vw"
 className="object-cover object-top grayscale-[0.35] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/20 to-transparent opacity-90" />
 <div className="absolute inset-0 bg-violet/30 mix-blend-color opacity-60 transition-opacity duration-700 group-hover:opacity-0" />
 <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 transition-transform duration-500 group-hover:-translate-y-1">
 <p className="font-display text-lg leading-tight text-white">{member.name}</p>
 <p className="text-xs uppercase tracking-widest text-violet-300">{member.instruments.join(" · ")}</p>
 </div>
 </motion.div>
 );
}
