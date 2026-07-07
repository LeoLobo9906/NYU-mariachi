"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Semester } from "@/lib/types";
import { SECTION_LABELS } from "@/content/roster";
import { MemberCard } from "./MemberCard";

const SECTION_ORDER = ["armonia", "violins", "woodwind_brass", "vocalists"];

export function SemesterRoster({ semesters }: { semesters: Semester[] }) {
 const [activeId, setActiveId] = useState(
 semesters.find((s) => s.current)?.id ?? semesters[0]?.id
 );
 const active = semesters.find((s) => s.id === activeId) ?? semesters[0];

 const sections = SECTION_ORDER.filter((sec) =>
 active.members.some((m) => m.section === sec)
 );

 return (
 <div>
 {/* Semester selector */}
 <div className="no-scrollbar mb-14 flex gap-3 overflow-x-auto">
 {semesters.map((s) => (
 <button
 key={s.id}
 onClick={() => setActiveId(s.id)}
 className={`whitespace-nowrap border px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
 s.id === activeId
 ? "border-gold bg-gold text-white"
 : "border-violet/25 text-bone-dim hover:border-violet/40 hover:text-bone"
 }`}
 >
 {s.label}
 </button>
 ))}
 </div>

 <AnimatePresence mode="wait">
 <motion.div
 key={active.id}
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -8 }}
 transition={{ duration: 0.4 }}
 >
 {sections.map((sec) => {
 const members = active.members.filter((m) => m.section === sec);
 return (
 <section key={sec} className="mb-20">
 <div className="mb-6 flex items-baseline gap-4">
 <h3 className="font-display text-3xl text-bone md:text-4xl">
 {SECTION_LABELS[sec] ?? sec}
 </h3>
 <span className="text-sm text-bone-dim">{members.length}</span>
 </div>
 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
 {members.map((m, i) => (
 <MemberCard key={m.photo} member={m} index={i} />
 ))}
 </div>
 </section>
 );
 })}
 </motion.div>
 </AnimatePresence>
 </div>
 );
}
