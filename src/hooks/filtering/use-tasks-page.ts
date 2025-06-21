import { useQueryState, parseAsInteger } from 'nuqs'

export function useTasksPage() {
  const [page, setPage] = useQueryState('page', parseAsInteger)

  return {
    page,
    setPage,
  }
}
