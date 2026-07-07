import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { club } from "@/content/club";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
 title: "Contact & Booking",
 description: "Hire NYU Mariachi for your event, or join the club. Send us a message.",
 path: "/contact",
});

export default function ContactPage() {
 return (
 <>
 <LogoWatermark />
 <PageHeader
 eyebrow="Let's talk"
 title="Book us"
 intro="Planning an event, or want to play with us? Fill out the form and we&apos;ll get right back to you."
 />
 <section className="pb-32">
 <Container>
 <div className="grid gap-16 md:grid-cols-12">
 <div className="md:col-span-7">
 <Reveal>
 <ContactForm />
 </Reveal>
 </div>
 <div className="md:col-span-5">
 <Reveal delay={0.1}>
 <div className="neon-rim bg-ink-800/70 p-8">
 <p className="text-xs uppercase tracking-widest text-gold">Direct</p>
 <a href={`mailto:${club.email}`} className="mt-2 block font-display text-2xl text-bone hover:text-gold">
 {club.email}
 </a>
 <p className="mt-6 text-sm text-bone-dim">{club.department}</p>
 <p className="text-sm text-bone-dim">{club.location}</p>
 <div className="mt-8 flex gap-4">
 {club.socials.map((s) => (
 <a key={s.label} href={s.href} className="text-sm text-bone hover:text-gold" target="_blank" rel="noreferrer">
 {s.label}
 </a>
 ))}
 </div>
 </div>

 {club.auditionUrl && (
 <a
 href={club.auditionUrl}
 target="_blank"
 rel="noreferrer"
 className="mt-4 flex items-center justify-between gap-4 bg-violet p-6 text-white transition-transform hover:scale-[1.01]"
 >
 <span>
 <span className="block text-xs uppercase tracking-widest text-white/70">Students</span>
 <span className="font-display text-xl">Audition to join →</span>
 </span>
 <span className="text-2xl">♪</span>
 </a>
 )}
 </Reveal>
 </div>
 </div>
 </Container>
 </section>
 </>
 );
}
