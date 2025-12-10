import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navigate from "@/components/navigate";
import { listAuthenticatedUserWorkspaces } from "@/hooks/endpoints/workspaces";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Dashboard", "Your Dashboard"),
};

export default async function Page() {
  const { token } = await verifyAuth();
  const workspaces = await listAuthenticatedUserWorkspaces({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (workspaces.data.length === 0) {
    redirect("/workspaces/create");
  }
  return (
    <Navigate to={`/workspaces/${workspaces.data[0].id}`} replace={false} />
  );
}
