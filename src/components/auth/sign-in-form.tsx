'use client'
import Logo from '@/components/logo'
import Link from 'next/link'
import { signInBody } from '@/schemas/authentication'
import { onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSession } from '@/actions/session'
import { useRouter } from 'next/navigation'
import { SignInBody, useSignIn } from '@/hooks/endpoints/authentication'
import { useForm } from 'react-hook-form'

export default function SignInForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignInBody>({
    resolver: zodResolver(signInBody),
  })

  const signInMutation = useSignIn()

  const router = useRouter()

  function onSubmit(data: SignInBody) {
    signInMutation.mutate(
      {
        data,
      },
      {
        onError,
        onSuccess: async (data) => {
          reset()
          await createSession(data.data.id, data.data.token)
          toast.success('User signed in successfully!')
          router.push('/')
        },
      }
    )
  }

  const isDisabled = formState.isSubmitting || signInMutation.isPending

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex justify-center items-center"
        >
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
                {...register('email')}
              />
            </div>
            {formState.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register('password')}
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
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
