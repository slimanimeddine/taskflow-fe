"use client";
import {
  type SendPasswordResetLinkBody,
  useSendPasswordResetLink,
} from "@/hooks/endpoints/authentication";
import { sendPasswordResetLinkBody } from "@/schemas/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const { handleSubmit, register, formState, reset } =
    useForm<SendPasswordResetLinkBody>({
      resolver: zodResolver(sendPasswordResetLinkBody),
    });

  const { mutate, isPending } = useSendPasswordResetLink();

  function onSubmit(data: SendPasswordResetLinkBody) {
    mutate(
      {
        data,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          reset();
          toast.success("Password reset link sent successfully!");
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={isDisabled}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send reset link
        </button>
      </div>
    </form>
  );
}
