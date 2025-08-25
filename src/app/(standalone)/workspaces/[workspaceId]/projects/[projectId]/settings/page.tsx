import InvalidParams from "@/components/invalid-params";
import DeleteProject from "@/components/projects/delete-project";
import EditProjectWrapper from "@/components/projects/edit-project/wrapper";
import { showProject } from "@/hooks/endpoints/projects";
import { verifyAuth, verifyMember } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod/v4";

const paramsSchema = z.object({
  workspaceId: z.uuid(),
  projectId: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await verifyAuth();
  const { data, success } = parseParams(await params, paramsSchema);

  if (!success) {
    return {
      ...seo("Invalid project or workspace", "Invalid project or workspace"),
    };
  }

  const { projectId } = data;

  const project = await showProject(projectId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...seo(
      project.data.name,
      `Manage settings for ${project.data.name} project`,
    ),
  };
}

export default async function Page({ params }: Props) {
  const { token } = await verifyAuth();
  const { data, success, error } = parseParams(await params, paramsSchema);

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { workspaceId } = data;

  const isMember = await verifyMember(token, workspaceId);
  if (!isMember) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <EditProjectWrapper />
      <DeleteProject />
    </div>
  );
}
