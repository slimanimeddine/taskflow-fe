export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { workspaceId } = await params
  return <div>workspace: {workspaceId}</div>
}
