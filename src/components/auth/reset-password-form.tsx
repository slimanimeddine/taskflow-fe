"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  type ResetPasswordBody,
  useResetPassword,
} from "@/hooks/endpoints/authentication";
import { resetPasswordBody } from "@/schemas/authentication";

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { handleSubmit, register, formState, reset } =
    useForm<ResetPasswordBody>({
      resolver: zodResolver(resetPasswordBody),
      defaultValues: {
        token,
      },
    });

  const router = useRouter();

  const { mutate, isPending } = useResetPassword();

  function onSubmit(data: ResetPasswordBody) {
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
          toast.success("Password reset successfully!");
          reset();
          router.push("/sign-in");
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
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          New password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password_confirmation"
          className="block text-sm/6 font-medium text-gray-900"
        >
          New password confirmation
        </label>
        <div className="mt-2">
          <input
            id="password_confirmation"
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...register("password_confirmation")}
          />
          {formState.errors.password_confirmation && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password_confirmation.message}
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
          Reset password
        </button>
      </div>
    </form>
  );
}
