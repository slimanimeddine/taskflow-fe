import Logo from '@/components/logo'
import ResetPasswordForm from '@/components/reset-password-form'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type SearchParams = { [key: string]: string }

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { token } = await searchParams
  if (!token) {
    redirect('/sign-in')
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex items-center justify-center h-full w-full"
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
  )
}
