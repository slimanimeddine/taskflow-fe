import CreateWorkspaceForm from '@/components/workspaces/create-workspace/form'
import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  await verifyAuth()
  return <CreateWorkspaceForm />
}
