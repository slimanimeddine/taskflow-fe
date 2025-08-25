import SignInForm from "@/components/auth/sign-in-form";
import seo from "@/lib/seo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Sign In", "Sign in to your account"),
};

export default function Page() {
  return <SignInForm />;
}
