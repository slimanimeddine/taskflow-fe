import Home from '@/components/home'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Dashboard', 'Your Dashboard'),
}

export default async function Page() {
  await verifyAuth()
  return <Home />
}
