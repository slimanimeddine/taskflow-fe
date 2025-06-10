import DeleteProject from '@/components/projects/delete-project'
import EditProjectWrapper from '@/components/projects/edit-project/wrapper'
import { showProject } from '@/hooks/endpoints/projects'
import { verifyAuth, verifyMember } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ workspaceId: string; projectId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params
  const { token } = await verifyAuth()

  const project = await showProject(projectId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    ...seo(
      project.data.name,
      `Manage settings for ${project.data.name} project`
    ),
  }
}

export default async function Page({ params }: Props) {
  const { token } = await verifyAuth()
  const { workspaceId } = await params
  const isMember = await verifyMember(token, workspaceId)
  if (!isMember) {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <EditProjectWrapper />
      <DeleteProject />
    </div>
  )
}
