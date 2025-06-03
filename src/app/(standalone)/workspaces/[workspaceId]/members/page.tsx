import MembersList from '@/components/workspaces/members-list/component'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  const {} = await verifyAuth()
  return <MembersList />
}
