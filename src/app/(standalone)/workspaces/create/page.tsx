import CreateWorkspaceForm from "@/components/workspaces/create-workspace/form";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo(
    "Create Workspace",
    "Create a new workspace to collaborate with your team.",
  ),
};

export default async function Page() {
  await verifyAuth();
  return <CreateWorkspaceForm />;
}
