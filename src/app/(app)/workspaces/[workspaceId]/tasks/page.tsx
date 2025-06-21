import MyTasks from '@/components/tasks/my-tasks'
import { verifyAuth, verifyMember } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  ...seo('My Tasks', 'View your tasks'),
}

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

  return <MyTasks />
}
