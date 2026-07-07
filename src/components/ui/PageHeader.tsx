import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PapelPicado } from "@/components/ui/PapelPicado";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <>
      {/* Papel picado garland — shown on inner pages (not the home hero),
          spans the full screen width edge to edge */}
      <div className="pt-20 md:pt-24">
        <PapelPicado />
      </div>
      <section className="pb-16 pt-4 md:pb-24 md:pt-6">
        <Container>
          {eyebrow && (
            <Reveal>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="font-display text-6xl leading-[0.9] text-bone md:text-8xl">{title}</h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">{intro}</p>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
