import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Logo from "@/components/logo";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Forgot Password", "Reset your password"),
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex h-full w-full items-center justify-center"
        >
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Get a link to reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
