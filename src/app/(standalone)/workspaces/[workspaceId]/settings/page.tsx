import DeleteWorkspace from '@/components/workspaces/delete-workspace'
import EditWorkspaceWrapper from '@/components/workspaces/edit-workspace/wrapper'
import InviteMembers from '@/components/workspaces/invite-members/component'
import { showWorkspace } from '@/hooks/endpoints/workspaces'
import { verifyAuth, verifyMember } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ workspaceId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { workspaceId } = await params
  const { token } = await verifyAuth()

  const workspace = await showWorkspace(workspaceId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    ...seo(
      workspace.data.name,
      `Manage settings for ${workspace.data.name} workspace`
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
      <EditWorkspaceWrapper />
      <InviteMembers />
      <DeleteWorkspace />
    </div>
  )
}
