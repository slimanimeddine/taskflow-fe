"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { signUpBody } from "@/schemas/authentication";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SignUpBody, useSignUp } from "@/hooks/endpoints/authentication";

export default function SignUpForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignUpBody>({
    resolver: zodResolver(signUpBody),
  });

  const router = useRouter();

  const { mutate, isPending } = useSignUp();

  function onSubmit(data: SignUpBody) {
    mutate(
      {
        data,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("Account created successfully!");
          reset();
          router.back();
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("name")}
              />
            </div>
            {formState.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.name.message}
              </p>
            )}
          </div>

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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("email")}
              />
            </div>
            {formState.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("password")}
              />
            </div>
            {formState.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
