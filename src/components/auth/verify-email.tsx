"use client";

import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingUI from "@/components/loading-ui";
import { useSession } from "@/hooks/use-session";
import { useVerifyEmail } from "@/hooks/endpoints/authentication";
import { useParams } from "next/navigation";

type VerifyEmailProps = {
  expires: string;
  signature: string;
};

export default function VerifyEmail({ expires, signature }: VerifyEmailProps) {
  const [message, setMessage] = useState("");
  const { token } = useSession();

  const queryClient = useQueryClient();
  const { id, hash } = useParams<{ id: string; hash: string }>();
  const { isLoading, isError, isSuccess, error } = useVerifyEmail(
    id,
    hash,
    {
      expires,
      signature,
    },
    authHeader(token),
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified successfully");
      setMessage("Email verified successfully");
      void queryClient.invalidateQueries({
        queryKey: ["/api/v1/users/me"],
      });
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      if (error.isAxiosError && error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while verifying your email");
      }
    }
  }, [error, isError]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingUI />
      </div>
    );
  }

  return <>{message}</>;
}
