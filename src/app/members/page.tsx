import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { SemesterRoster } from "@/components/members/SemesterRoster";
import { roster } from "@/content/roster";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Members",
  description: "Meet the musicians of NYU Mariachi, semester by semester.",
  path: "/members",
});

export default function MembersPage() {
  return (
    <>
      <LogoWatermark />
      <PageHeader
        eyebrow="Get to meet your mariachi"
        title="Members"
        intro="Every semester brings new voices and strings. Browse the ensemble by term and section."
      />
      <section className="pb-32">
        <Container>
          <SemesterRoster semesters={roster} />
        </Container>
      </section>
    </>
  );
}
