import 'server-only'

import { getSession } from '@/actions/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { Session } from '@/types/misc'
import { showAuthenticatedUserMember } from '@/hooks/endpoints/members'
import { isAxiosError } from 'axios'

export const verifyAuth = cache(async () => {
  const session = (await getSession()) as Session

  if (!(session?.id && session?.token)) {
    redirect('/sign-in')
  }

  return { isAuth: true, id: session.id, token: session.token }
})

export const verifyMember = async (token: string, workspaceId: string) => {
  let isMember = false
  try {
    await showAuthenticatedUserMember(workspaceId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    isMember = true
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      isMember = false
    }
  }

  return isMember
}
