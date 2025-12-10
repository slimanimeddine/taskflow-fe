"use client";

import Link from "next/link";
import { useTasksPage } from "@/hooks/filtering/use-tasks-page";
import { classNames } from "@/lib/utils";
import type { LinksField, MetaField } from "@/types/api-responses";

interface PaginationProps {
  links: LinksField;
  meta: MetaField;
}

export default function Pagination({ links, meta }: PaginationProps) {
  const { setPage } = useTasksPage();
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      void setPage(newPage);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className="mx-auto mt-6 flex max-w-7xl justify-between text-sm font-medium text-gray-700"
    >
      <div className="min-w-0 flex-1">
        {links?.prev && (
          <Link
            href={`?page=${(meta?.current_page ?? 1) - 1}`}
            onClick={() => handlePageChange((meta?.current_page ?? 1) - 1)}
            className="focus:ring-opacity-25 inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-none"
          >
            Previous
          </Link>
        )}
      </div>
      <div className="hidden space-x-2 sm:flex">
        {meta?.links
          ?.filter(
            (link) =>
              link.label !== "Next &raquo;" &&
              link.label !== "&laquo; Previous",
          )
          ?.map((link, index) =>
            link.url ? (
              <Link
                key={`${link.label}-${index}`}
                href={`?page=${link.label}`}
                onClick={() => handlePageChange(Number(link.label))}
                className={classNames(
                  "focus:ring-opacity-25 inline-flex h-10 items-center rounded-md border px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-none",
                  link.active
                    ? "border-indigo-600 ring-1 ring-indigo-600"
                    : "border-gray-300",
                )}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ) : (
              <span
                key={`${link.label}-${index}`}
                className="inline-flex h-10 items-center px-1.5 text-gray-500"
              >
                {link.label}
              </span>
            ),
          )}
      </div>
      <div className="flex min-w-0 flex-1 justify-end">
        {links?.next && (
          <Link
            href={`?page=${(meta?.current_page ?? 1) + 1}`}
            onClick={() => handlePageChange((meta?.current_page ?? 1) + 1)}
            className="focus:ring-opacity-25 inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-none"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
