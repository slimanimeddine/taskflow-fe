import EditWorkspaceWrapper from '@/components/workspaces/edit-workspace/wrapper'
import { verifyAuth } from '@/lib/dal'

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const {} = await verifyAuth()
  const { workspaceId } = await params
  return <EditWorkspaceWrapper workspaceId={workspaceId} />
}
