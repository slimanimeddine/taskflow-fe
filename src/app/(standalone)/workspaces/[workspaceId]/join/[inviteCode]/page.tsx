import JoinWorkspace from '@/components/workspaces/join-workspace'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Join Workspace', 'Join a workspace using an invite code'),
}

export default async function Page() {
  const {} = await verifyAuth()
  return <JoinWorkspace />
}
