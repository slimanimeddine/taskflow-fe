"use client";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { authHeader } from "@/lib/utils";
import { useResendEmailVerification } from "@/hooks/endpoints/authentication";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/use-session";
import { useGetAuthenticatedUser } from "@/hooks/endpoints/users";
import LoadingUI from "../loading-ui";
import ErrorUI from "../error-ui";
import EmptyUI from "../empty-ui";

export default function EmailNotVerifiedAlert() {
  const { token } = useSession();
  const authConfig = authHeader(token);
  const {
    isPending: isQueryPending,
    isError,
    data,
    error,
  } = useGetAuthenticatedUser(authConfig);

  const { mutate, isPending: isMutationPending } =
    useResendEmailVerification(authConfig);

  function handleResendEmailVerification() {
    mutate(undefined, {
      onError: (error) => {
        if (error.isAxiosError) {
          toast.error(error.response?.data.message ?? "Something went wrong");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        toast.success("Verification email sent successfully!");
      },
    });
  }

  const isDisabled = isMutationPending;

  if (isQueryPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <EmptyUI message="Email verification information not found" />;
  }

  if (data.data.email_verified_at) {
    return <span></span>;
  }

  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="h-5 w-5 text-blue-400"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">
            Your email address is not verified.
          </p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <button
              type="button"
              onClick={handleResendEmailVerification}
              disabled={isDisabled}
              className="font-medium whitespace-nowrap text-blue-700 hover:text-blue-600"
            >
              Send verification email
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
