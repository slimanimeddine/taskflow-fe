import { getGetAuthenticatedUserQueryOptions } from '@/hooks/endpoints/users'
import Dashboard from '@/components/dashboard'
import { verifyAuth } from '@/lib/dal'
import { authHeader } from '@/lib/utils'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Dashboard', 'Welcome to your dashboard'),
}

export default async function Page() {
  const auth = await verifyAuth()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    getGetAuthenticatedUserQueryOptions(authHeader(auth.token))
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard token={auth.token} />
    </HydrationBoundary>
  )
}
