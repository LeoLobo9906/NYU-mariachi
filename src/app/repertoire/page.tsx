import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { SongCard } from "@/components/repertoire/SongCard";
import { repertoire } from "@/content/repertoire";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Repertoire",
  description: "The songs NYU Mariachi has under its belt: rancheras, sones, boleros, and more.",
  path: "/repertoire",
});

export default function RepertoirePage() {
  return (
    <>
      <LogoWatermark />
      <PageHeader
        eyebrow="Under our belt"
        title="Repertoire"
        intro="From classic rancheras to sones jaliscienses, a growing catalog we bring to every stage."
      />
      <section className="pb-32">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {repertoire.map((song, i) => (
              <SongCard key={song.title} song={song} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
