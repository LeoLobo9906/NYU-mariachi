import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { performances } from "@/content/performances";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
 title: "Performances",
 description: "Upcoming shows and past performances by NYU Mariachi across New York City.",
 path: "/performances",
});

export default function PerformancesPage() {
 const upcoming = performances.filter((p) => p.upcoming);
 const past = performances.filter((p) => !p.upcoming);

 return (
 <>
 <PageHeader
 eyebrow="On stage"
 title="Performances"
 intro="Catch us live across campus and the city, or relive where we&apos;ve been."
 />

 <section className="pb-16">
 <Container>
 <Reveal>
 <h2 className="mb-8 font-display text-3xl text-gold md:text-4xl">Upcoming</h2>
 </Reveal>
 <div className="grid gap-8 md:grid-cols-2">
 {upcoming.map((p, i) => (
 <Reveal key={p.title} delay={i * 0.08}>
 <article className="group overflow-hidden border border-white/10 bg-ink-800">
 {p.photo && (
 <div className="relative aspect-[16/10] overflow-hidden">
 <Image
 src={p.photo}
 alt={p.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 </div>
 )}
 <div className="p-6">
 <p className="text-xs uppercase tracking-widest text-gold">{formatDate(p.date)}</p>
 <h3 className="mt-2 font-display text-2xl text-bone">{p.title}</h3>
 <p className="mt-1 text-sm text-bone-dim">{p.venue}</p>
 {p.description && <p className="mt-3 text-bone-dim">{p.description}</p>}
 </div>
 </article>
 </Reveal>
 ))}
 </div>
 </Container>
 </section>

 <section className="py-16">
 <Container>
 <Reveal>
 <h2 className="mb-8 font-display text-3xl text-bone-dim md:text-4xl">Past shows</h2>
 </Reveal>
 <div className="space-y-px">
 {past.map((p, i) => (
 <Reveal key={p.title} delay={i * 0.05}>
 <div className="grid grid-cols-12 items-center gap-4 border-t border-white/10 py-6">
 <span className="col-span-4 text-sm text-bone-dim md:col-span-2">{formatDate(p.date)}</span>
 <span className="col-span-8 font-display text-xl text-bone md:col-span-7 md:text-2xl">
 {p.title}
 </span>
 <span className="col-span-12 text-sm text-bone-dim md:col-span-3 md:text-right">{p.venue}</span>
 </div>
 </Reveal>
 ))}
 </div>
 </Container>
 </section>
 </>
 );
}
