import InvalidParams from "@/components/invalid-params";
import VerifyEmail from "@/components/auth/verify-email";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { parseParams } from "@/lib/utils";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = seo(
  "Verify Email",
  "Verify your email on TaskFlow",
);

const paramsSchema = z.object({
  id: z.uuid(),
  hash: z.string().regex(/^[a-f0-9]{40}$/),
});

const searchParamsSchema = z.object({
  expires: z.string().regex(/^\d+$/),
  signature: z.string().regex(/^[a-fA-F0-9]+$/),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
  searchParams: Promise<z.infer<typeof searchParamsSchema>>;
};

export default async function Page({ params, searchParams }: Props) {
  await verifyAuth();

  const { success: paramsSuccess, error: paramsError } = parseParams(
    await params,
    paramsSchema,
  );

  if (!paramsSuccess) {
    const errors = Object.values(z.flattenError(paramsError).fieldErrors).map(
      (err) => err.join(", "),
    );

    return <InvalidParams errors={errors} />;
  }

  const {
    data,
    success: searchParamsSuccess,
    error: searchParamsError,
  } = parseParams(await searchParams, searchParamsSchema);

  if (!searchParamsSuccess) {
    const errors = Object.values(
      z.flattenError(searchParamsError).fieldErrors,
    ).map((err) => err.join(", "));

    return <InvalidParams errors={errors} />;
  }

  const { expires, signature } = data;
  return <VerifyEmail expires={expires} signature={signature} />;
}
