import { useQueryState, parseAsStringLiteral, parseAsArrayOf } from 'nuqs'

const sortValues = [
  'name',
  '-name',
  'due_date',
  '-due_date',
  'status',
  '-status',
  'project',
  '-project',
  'assignee',
  '-assignee',
] as const

type SortValue = (typeof sortValues)[number]

export function useTaskSort() {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsArrayOf(parseAsStringLiteral<SortValue>(sortValues))
  )

  return {
    sort,
    setSort,
  }
}
