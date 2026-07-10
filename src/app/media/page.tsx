import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { MediaTabs } from "@/components/media/MediaTabs";
import { gallery } from "@/content/gallery";
import { videos } from "@/content/videos";
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
        intro="Moments from the stage and the street, Mariachi Violetas in the wild."
      />
      <section className="pb-32">
        <Container>
          <MediaTabs photos={gallery} videos={videos} />
        </Container>
      </section>
    </>
  );
}
