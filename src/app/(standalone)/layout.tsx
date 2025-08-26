"use client";
import { deleteSession } from "@/actions/session";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import Logo from "@/components/logo";
import UserDropdown from "@/components/user-dropdown";
import { useSignOut } from "@/hooks/endpoints/authentication";
import { useGetAuthenticatedUser } from "@/hooks/endpoints/users";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = Readonly<{
  children: React.ReactNode;
}>;

function UserInformation() {
  const { token } = useSession();
  const { isPending, isError, data, error } = useGetAuthenticatedUser(
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <div className="text-base font-medium text-gray-800">
        {data.data.name}
      </div>
      <div className="text-sm font-medium text-gray-500">{data.data.email}</div>
    </div>
  );
}

export default function Layout({ children }: Props) {
  const { token } = useSession();
  const authConfig = authHeader(token);
  const getAuthenticatedUserQuery = useGetAuthenticatedUser(authConfig);
  const { mutate, isPending } = useSignOut(authConfig);

  const router = useRouter();

  function onSignOut() {
    mutate(undefined, {
      onError: (error) => {
        if (error.isAxiosError) {
          toast.error(error.response?.data.message ?? "Something went wrong");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        void deleteSession();
        toast.success("You have been signed out");
        router.push("/sign-in");
      },
    });
  }

  const isDisabled = isPending;

  return (
    <div>
      <Disclosure as="nav" className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Profile dropdown */}
              <UserDropdown />
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <UserInformation />
            </div>
            <div className="mt-3 space-y-1">
              <DisclosureButton
                onClick={onSignOut}
                disabled={isDisabled}
                className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign out
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
