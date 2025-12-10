import type { Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod/v4";
import InvalidParams from "@/components/invalid-params";
import MyTasks from "@/components/tasks/my-tasks";
import { verifyAuth, verifyMember } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("My Tasks", "View your tasks"),
};

const paramsSchema = z.object({
  workspaceId: z.uuid(),
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
  if (!isMember) {
    redirect("/");
  }

  return <MyTasks />;
}
