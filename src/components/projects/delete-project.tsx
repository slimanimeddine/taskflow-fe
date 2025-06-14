'use client'
import { useDeleteProject } from '@/hooks/endpoints/projects'
import { useProjectId } from '@/hooks/params/use-project-id'
import { useSession } from '@/hooks/use-session'
import { authHeader, onError } from '@/lib/utils'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function DeleteProject() {
  const { token } = useSession()
  const projectId = useProjectId()
  const deleteProjectMutation = useDeleteProject(authHeader(token))
  const router = useRouter()

  function onDelete() {
    if (
      window.confirm(
        'Are you sure you want to delete this project? This action cannot be undone.'
      )
    ) {
      deleteProjectMutation.mutate(
        {
          projectId,
        },
        {
          onError,
          onSuccess: async () => {
            toast.success('Project deleted successfully')
            router.push('/')
          },
        }
      )
    }
  }

  const isDisabled = deleteProjectMutation.isPending

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Delete project</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Deleting a project is an irreversible action. All data associated
              with this project will be permanently removed.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={onDelete}
              disabled={isDisabled}
              type="button"
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
