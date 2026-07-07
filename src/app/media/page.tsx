import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { Collage } from "@/components/media/Collage";
import { gallery } from "@/content/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Media",
  description: "A photo album of NYU Mariachi performances across New York City.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <LogoWatermark />
      <PageHeader
        eyebrow="Watch & listen"
        title="Media"
        intro="Moments from the stage and the street, NYU Mariachi in the wild."
      />
      <section className="pb-32">
        <Container>
          <Collage photos={gallery} />
        </Container>
      </section>
    </>
  );
}
