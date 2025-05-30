import { verifyAuth } from '@/lib/dal'

export default async function Page() {
  await verifyAuth()
  return <div className="flex flex-col justify-between">hi</div>
}
