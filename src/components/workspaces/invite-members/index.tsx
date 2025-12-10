"use client";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useState } from "react";
import toast from "react-hot-toast";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useShowWorkspace } from "@/hooks/endpoints/workspaces";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import ResetInviteCode from "./reset-invite-code";

export default function InviteMembers() {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();
  const { isPending, isError, data, error } = useShowWorkspace(
    workspaceId,
    authHeader(token),
  );
  const [, copyToClipboard] = useCopyToClipboard();
  const [hasCopiedText, setHasCopiedText] = useState(false);

  function handleCopy(inviteLink: string) {
    void copyToClipboard(inviteLink);
    toast.success("Invite link copied to clipboard!", {
      duration: 2000,
    });
    setHasCopiedText(true);
    setTimeout(() => {
      setHasCopiedText(false);
    }, 2000);
  }

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
  const inviteLink = `${window.location.origin}/workspaces/${workspace.id}/join/${workspace.invite_code}`;

  return (
    <div className="space-y-6 rounded-lg bg-gray-50 p-6 shadow-sm">
      <div>
        <h2 className="text-xl leading-7 font-semibold text-gray-900">
          Invite Members
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Invite members to your workspace by sharing the invite link below.
          They will be able to join your workspace and collaborate with you.
        </p>
        <div className="mt-4 border-t border-dotted border-gray-300"></div>
      </div>

      <div className="space-y-8">
        <div>
          <label
            htmlFor="invite-link"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Invite Link
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              {/* The invite link displayed as a non-editable span */}
              <span
                id="invite-link-display"
                className="block w-full truncate rounded-l-md border-0 bg-white py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
              >
                {inviteLink}
              </span>
            </div>
            {/* Copy Button */}
            <button
              disabled={hasCopiedText}
              type="button"
              onClick={() => handleCopy(inviteLink)}
              className="relative -ml-px inline-flex cursor-pointer items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            >
              {hasCopiedText ? (
                <CheckIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <DocumentDuplicateIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-dotted border-gray-300"></div>

      <div className="flex items-center justify-end gap-x-6">
        <ResetInviteCode />
      </div>
    </div>
  );
}
