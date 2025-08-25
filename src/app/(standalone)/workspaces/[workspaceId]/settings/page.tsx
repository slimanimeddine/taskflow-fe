import InvalidParams from "@/components/invalid-params";
import DeleteWorkspace from "@/components/workspaces/delete-workspace";
import EditWorkspaceWrapper from "@/components/workspaces/edit-workspace/wrapper";
import InviteMembers from "@/components/workspaces/invite-members";
import { showWorkspace } from "@/hooks/endpoints/workspaces";
import { verifyAuth, verifyMember } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod/v4";

const paramsSchema = z.object({
  workspaceId: z.uuid(),
  inviteCode: z.string().regex(/^[a-zA-Z0-9]+$/),
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
      <EditWorkspaceWrapper />
      <InviteMembers />
      <DeleteWorkspace />
    </div>
  );
}
