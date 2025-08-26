"use client";
import { classNames } from "@/lib/utils";
import {
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import type { Route } from "next";

export default function LayoutNavigation() {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  const navigationLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    {
      name: "My Tasks",
      href: `/workspaces/${workspaceId}/tasks`,
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Members",
      href: `/workspaces/${workspaceId}/members`,
      icon: UsersIcon,
    },
    {
      name: "Settings",
      href: `/workspaces/${workspaceId}/settings`,
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigationLinks.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href as Route}
            aria-current={pathname === item.href ? "page" : undefined}
            className={classNames(
              pathname === item.href
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
            )}
          >
            <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
