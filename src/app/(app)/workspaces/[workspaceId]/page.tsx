import { verifyAuth } from '@/lib/dal'

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { workspaceId } = await params
  const {} = await verifyAuth()
  return <div>workspace: {workspaceId}</div>
}
