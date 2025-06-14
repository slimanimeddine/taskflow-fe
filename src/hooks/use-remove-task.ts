import { useSession } from '@/hooks/use-session'
import { useDeleteTask } from '@/hooks/endpoints/tasks'
import { authHeader, onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

export function useRemoveTask(taskId: string) {
  const { token } = useSession()
  const deleteTaskMutation = useDeleteTask(authHeader(token))

  const queryClient = useQueryClient()

  function removeTask() {
    if (
      window.confirm(
        'Are you sure you want to delete this task? This action cannot be undone.'
      )
    ) {
      deleteTaskMutation.mutate(
        {
          taskId,
        },
        {
          onError,
          onSuccess: async () => {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/tasks'],
            })
            toast.success('Task deleted successfully')
          },
        }
      )
    }
  }

  const isDisabled = deleteTaskMutation.isPending

  return {
    removeTask,
    isDisabled,
  }
}
