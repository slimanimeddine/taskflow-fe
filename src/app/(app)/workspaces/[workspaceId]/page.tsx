import ViewWorkspace from "@/components/workspaces/view-workspace";
import { showWorkspace } from "@/hooks/endpoints/workspaces";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { type Metadata } from "next";
import z from "zod/v4";

const paramsSchema = z.object({
  workspaceId: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await verifyAuth();
  const { data, success } = parseParams(await params, paramsSchema);

  if (!success) {
    return {
      ...seo("Invalid workspace", "Invalid workspace"),
    };
  }

  const { workspaceId } = data;

  const workspace = await showWorkspace(workspaceId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...seo(
      workspace.data.name,
      `Manage settings for ${workspace.data.name} workspace`,
    ),
  };
}

export default async function Page() {
  await verifyAuth();
  return <ViewWorkspace />;
}
