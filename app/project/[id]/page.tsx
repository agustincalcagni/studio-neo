import { ProjectClient } from "../project-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section className="p-6">
      <ProjectClient id={id} />
    </section>
  );
}
