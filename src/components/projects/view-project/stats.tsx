"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useViewProjectStats } from "@/hooks/endpoints/projects";
import { useProjectId } from "@/hooks/params/use-project-id";
import { useSession } from "@/hooks/use-session";
import { authHeader, classNames } from "@/lib/utils";

export default function ProjectStats() {
  const { token } = useSession();
  const projectId = useProjectId();
  const { isPending, isError, data, error } = useViewProjectStats(
    projectId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error?.message ?? "Something went wrong!"} />;
  }

  if (!data) {
    return <></>;
  }

  const stats = data.data;

  const formattedStats = Object.entries(stats).map(([key, value], index) => ({
    id: (index + 1).toString(),
    type: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    count: value,
  }));

  return (
    <section className="relative isolate overflow-hidden">
      <div>
        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 lg:px-2 xl:px-0">
          {formattedStats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border border-gray-900/5 px-2 py-6 sm:px-4 xl:px-6"
            >
              <dt className="text-sm leading-6 font-medium text-gray-500">
                {stat.type}
              </dt>
              <dd
                className={classNames(
                  stat.type === "Overdue" ? "text-rose-600" : "text-green-600",
                  "text-xs font-medium",
                )}
              >
                {stat.type === "Overdue" ? "-" : "+"} {stat.count}
              </dd>
              <dd className="w-full flex-none text-3xl leading-10 font-medium tracking-tight text-gray-900">
                {stat.count}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
      >
        <div
          style={{
            clipPath:
              "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
          }}
          className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
        />
      </div>
    </section>
  );
}
