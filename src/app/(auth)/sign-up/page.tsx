import SignUpForm from "@/components/auth/sign-up-form";
import seo from "@/lib/seo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...seo("Sign Up", "Create a new account"),
};

export default function Page() {
  return <SignUpForm />;
}
