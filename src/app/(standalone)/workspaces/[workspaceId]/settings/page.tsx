import DeleteWorkspace from '@/components/workspaces/delete-workspace'
import EditWorkspaceWrapper from '@/components/workspaces/edit-workspace/wrapper'
import InviteMembers from '@/components/workspaces/invite-members/component'
import { showWorkspace } from '@/hooks/endpoints/workspaces'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

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

export default async function Page() {
  const {} = await verifyAuth()
  return (
    <div className="space-y-6">
      <EditWorkspaceWrapper />
      <InviteMembers />
      <DeleteWorkspace />
    </div>
  )
}
