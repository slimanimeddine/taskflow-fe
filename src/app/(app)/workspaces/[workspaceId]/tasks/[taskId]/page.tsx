import ViewTask from '@/components/tasks/view-task'
import { showTask } from '@/hooks/endpoints/tasks'
import { verifyAuth, verifyMember } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ workspaceId: string; taskId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { taskId } = await params
  const { token } = await verifyAuth()

  const task = await showTask(taskId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    ...seo(task.data.name, `Manage settings for ${task.data.name} task`),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string; taskId: string }>
}) {
  const { token } = await verifyAuth()
  const { workspaceId } = await params
  const isMember = await verifyMember(token, workspaceId)
  if (!isMember) {
    redirect('/')
  }

  return <ViewTask />
}
