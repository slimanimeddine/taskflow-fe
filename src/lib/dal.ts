import 'server-only'

import { getSession } from '@/actions/session'
import { redirect } from 'next/navigation'

export const verifyAuth = async () => {
  const session = await getSession()

  if (!(session?.id && session?.token)) {
    redirect('/sign-in')
  }
}
