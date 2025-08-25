import InvalidParams from "@/components/invalid-params";
import JoinWorkspace from "@/components/workspaces/join-workspace";
import { verifyAuth, verifyMember } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod/v4";

export const metadata: Metadata = {
  ...seo("Join Workspace", "Join a workspace using an invite code"),
};

const paramsSchema = z.object({
  workspaceId: z.uuid(),
  inviteCode: z.string().regex(/^[a-zA-Z0-9]+$/),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

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
  if (isMember) {
    redirect("/");
  }

  return <JoinWorkspace />;
}
