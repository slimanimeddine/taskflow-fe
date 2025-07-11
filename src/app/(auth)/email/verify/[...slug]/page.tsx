import VerifyEmail from '@/components/auth/verify-email'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Verify Email', 'Verify your email on ArtHive'),
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string }>
}) {
  const {} = await verifyAuth()
  const { slug } = await params
  const { expires, signature } = await searchParams
  return (
    <VerifyEmail
      slug={slug}
      expires={expires}
      signature={signature}
    />
  )
}
