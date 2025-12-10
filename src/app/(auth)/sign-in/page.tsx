import type { Metadata } from "next";
import SignInForm from "@/components/auth/sign-in-form";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Sign In", "Sign in to your account"),
};

export default function Page() {
  return <SignInForm />;
}
