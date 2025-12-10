"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type Props = {
  errors: string[];
  title?: string;
  showBackButton?: boolean;
};

export default function InvalidParams({
  errors,
  title = "Invalid parameters",
  showBackButton = true,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-md border border-yellow-200 bg-yellow-50 p-6 shadow">
        <div className="flex items-start gap-4">
          <ExclamationTriangleIcon className="h-6 w-6 shrink-0 text-yellow-500" />
          <div className="min-w-0">
            {" "}
            {/* Ensures flex child can shrink properly */}
            <h2 className="text-base font-semibold text-yellow-800">{title}</h2>
            <ul className="mt-1 max-w-full list-disc space-y-1 pl-5 text-sm wrap-break-word text-yellow-700">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
            {showBackButton && (
              <button
                type="button"
                onClick={() => router.back()}
                className="mt-4 inline-flex items-center text-sm text-yellow-800 underline transition hover:text-yellow-900"
              >
                Go back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
