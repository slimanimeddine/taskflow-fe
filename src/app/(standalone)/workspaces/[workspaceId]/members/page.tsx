import MembersList from '@/components/workspaces/members-list'
import { verifyAuth, verifyMember } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { token } = await verifyAuth()
  const { workspaceId } = await params
  const isMember = await verifyMember(token, workspaceId)
  if (!isMember) {
    redirect('/')
  }
  return <MembersList />
}
