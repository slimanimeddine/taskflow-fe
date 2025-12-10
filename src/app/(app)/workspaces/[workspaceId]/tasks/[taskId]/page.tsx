import type { Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod/v4";
import InvalidParams from "@/components/invalid-params";
import ViewTask from "@/components/tasks/view-task";
import { showTask } from "@/hooks/endpoints/tasks";
import { verifyAuth, verifyMember } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";

const paramsSchema = z.object({
  workspaceId: z.uuid(),
  taskId: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await verifyAuth();
  const { data, success } = parseParams(await params, paramsSchema);

  if (!success) {
    return {
      ...seo("Invalid task or workspace", "Invalid task or workspace"),
    };
  }

  const { taskId } = data;

  const task = await showTask(taskId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...seo(task.data.name, `Manage settings for ${task.data.name} task`),
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

  return <ViewTask />;
}
