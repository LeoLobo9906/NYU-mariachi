import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Marquee } from "@/components/ui/Marquee";
import { MemberCard } from "@/components/members/MemberCard";
import { SongCard } from "@/components/repertoire/SongCard";
import { SugarSkull } from "@/components/ui/SugarSkull";
import { club, sectionCopy } from "@/content/club";
import { roster, SECTION_LABELS } from "@/content/roster";
import { repertoire } from "@/content/repertoire";

const GROUPS = [
 { key: "armonia", photo: "/images/mariachi_photos/photo_1.png" },
 { key: "violins", photo: "/images/mariachi_photos/photo_4.png" },
 { key: "woodwind_brass", photo: "/images/mariachi_photos/photo_7.png" },
];

export default function HomePage() {
 const current = roster.find((s) => s.current) ?? roster[0];
 const preview = current.members.slice(0, 5);

 return (
 <>
 <Hero />

 <Marquee items={["Ranchera", "Son Jalisciense", "Bolero", "Huapango", "Live in NYC"]} />

 {/* About ---------------------------------------------------------- */}
 <section className="relative py-28 md:py-40">
 <Container>
 <div className="grid gap-12 md:grid-cols-12 md:gap-16">
 <div className="md:col-span-5">
 <Reveal>
 <h2 className="font-display text-5xl leading-[0.95] text-bone md:text-7xl">
 The NYU
 <br />
 Mariachi
 <br />
 <span className="text-gold">Violetas</span>
 </h2>
 </Reveal>
 </div>
 <div className="md:col-span-7">
 <Reveal delay={0.1}>
 <p className="text-lg leading-relaxed text-bone-dim md:text-xl">{club.blurb}</p>
 <Link
 href="/about"
 className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gold hover:gap-3"
 >
 Our story <span>→</span>
 </Link>
 </Reveal>
 </div>
 </div>
 </Container>
 </section>

 {/* Instrument groups --------------------------------------------- */}
 <section className="py-20">
 <Container>
 <Reveal>
 <p className="mb-14 text-center text-xs uppercase tracking-[0.4em] text-gold">Instrument groups</p>
 </Reveal>
 <div className="grid gap-8 md:grid-cols-3">
 {GROUPS.map((g, i) => (
 <Reveal key={g.key} delay={i * 0.1}>
 <div className="group">
 <div className="relative aspect-[4/5] overflow-hidden ">
 <Image
 src={g.photo}
 alt={SECTION_LABELS[g.key]}
 fill
 sizes="(max-width: 768px) 100vw, 33vw"
 className="object-cover grayscale-[0.4] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/20 to-transparent" />
 <h3 className="absolute bottom-5 left-5 font-display text-3xl text-white">
 {SECTION_LABELS[g.key]}
 </h3>
 </div>
 <p className="mt-4 text-sm leading-relaxed text-bone-dim">{sectionCopy[g.key]}</p>
 </div>
 </Reveal>
 ))}
 </div>
 </Container>
 </section>

 {/* Repertoire teaser --------------------------------------------- */}
 <section className="bg-ink-800 py-28">
 <Container>
 <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
 <Reveal>
 <div>
 <p className="mb-2 text-xs uppercase tracking-[0.4em] text-gold">Under our belt</p>
 <h2 className="font-display text-5xl text-bone md:text-6xl">Repertoire</h2>
 </div>
 </Reveal>
 <Link href="/repertoire" className="text-sm uppercase tracking-widest text-gold">
 Full setlist →
 </Link>
 </div>
 <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
 {repertoire.slice(0, 6).map((song, i) => (
 <SongCard key={song.title} song={song} index={i} />
 ))}
 </div>
 </Container>
 </section>

 {/* Members teaser ------------------------------------------------- */}
 <section className="py-28">
 <Container>
 <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
 <Reveal>
 <h2 className="font-display text-5xl text-bone md:text-6xl">Meet your mariachi</h2>
 </Reveal>
 <Link href="/members" className="text-sm uppercase tracking-widest text-gold">
 Full roster →
 </Link>
 </div>
 <div className="grid grid-cols-2 gap-4 [&>*:last-child]:col-span-2 [&>*:last-child]:mx-auto [&>*:last-child]:w-[calc(50%-0.5rem)] sm:grid-cols-3 sm:[&>*:last-child]:col-span-1 sm:[&>*:last-child]:mx-0 sm:[&>*:last-child]:w-auto md:grid-cols-5">
 {preview.map((m, i) => (
 <MemberCard key={m.photo} member={m} index={i} />
 ))}
 </div>
 </Container>
 </section>


 {/* Join CTA ------------------------------------------------------- */}
 <section className="relative overflow-hidden py-32">
 <Parallax className="absolute inset-0" distance={60}>
 <Image
 src="/images/mariachi_photos/photo_5.png"
 alt=""
 fill
 sizes="100vw"
 className="scale-110 object-cover"
 />
 </Parallax>
 <div className="absolute inset-0 bg-violet/80 mix-blend-multiply" />
 <div className="absolute inset-0 bg-shadow/55" />
 <Container className="relative z-10 text-center">
 <Reveal>
 <SugarSkull className="mx-auto mb-6 h-24 w-auto text-white opacity-90" />
 <h2 className="font-display text-6xl text-white md:text-8xl">Wanna join?</h2>
 <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
 Whether you play, sing, or want to hire us for your event, let&apos;s talk.
 </p>
 <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
 <a
 href={club.auditionUrl}
 target="_blank"
 rel="noreferrer"
 className=" bg-white px-8 py-4 text-sm uppercase tracking-widest text-violet transition-transform hover:scale-105"
 >
 Audition now ↗
 </a>
 <Link
 href="/contact"
 className=" border border-white/50 px-8 py-4 text-sm uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-violet"
 >
 Book us to play
 </Link>
 </div>
 </Reveal>
 </Container>
 </section>
 </>
 );
}
