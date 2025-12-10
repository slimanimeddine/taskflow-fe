"use client";
import { useShowWorkspace } from "@/hooks/endpoints/workspaces";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import ErrorUI from "../../error-ui";
import LoadingUI from "../../loading-ui";
import MembersSection from "./members-section";
import ProjectsSection from "./projects-section";
import WorkspaceStats from "./stats";
import TasksCard from "./tasks-card";

export default function ViewWorkspace() {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();

  const { isPending, isError, data, error } = useShowWorkspace(
    workspaceId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <div></div>;
  }

  const workspace = data.data;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-gray-900">
            Welcome to <span className="text-indigo-600">{workspace.name}</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here&apos;s a snapshot of your workspace activity.
          </p>
        </header>

        {/* Stats Section */}
        <WorkspaceStats />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <TasksCard />

          <div className="space-y-12">
            <ProjectsSection />
            <MembersSection />
          </div>
        </div>
      </div>
    </div>
  );
}
