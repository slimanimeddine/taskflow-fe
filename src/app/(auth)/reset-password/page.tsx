import Link from "next/link";
import z from "zod/v4";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import InvalidParams from "@/components/invalid-params";
import Logo from "@/components/logo";
import { parseParams } from "@/lib/utils";

const searchParamsSchema = z.object({
  token: z
    .string()
    .length(64)
    .regex(/^[a-z0-9]{64}$/),
});

type Props = {
  searchParams: Promise<z.infer<typeof searchParamsSchema>>;
};

export default async function Page({ searchParams }: Props) {
  const { data, success, error } = parseParams(
    await searchParams,
    searchParamsSchema,
  );

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { token } = data;

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
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
