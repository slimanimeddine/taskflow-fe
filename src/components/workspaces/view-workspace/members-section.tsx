"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListWorkspaceMembers } from "@/hooks/endpoints/users";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader, getFirstLetter } from "@/lib/utils";
import type { Member, User } from "@/types/models";

type MemberUser = User & {
  pivot: Member;
};

export default function MembersSection() {
  const workspaceId = useWorkspaceId();
  const { token } = useSession();
  const { isPending, isError, data, error } = useListWorkspaceMembers(
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

  const members = data.data as MemberUser[];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900">Members</h2>
      <ul className="mt-4 space-y-4">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-x-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
              <span className="text-sm leading-none font-medium text-white">
                {getFirstLetter(member.name)}
              </span>
            </span>

            <div className="flex-auto">
              <p className="text-sm leading-6 font-semibold text-gray-900">
                {member.name}
              </p>
              <p className="text-xs leading-5 text-gray-500">{member.email}</p>
            </div>
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
              {member.pivot.role}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
