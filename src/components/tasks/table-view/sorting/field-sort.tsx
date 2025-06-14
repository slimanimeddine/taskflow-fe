'use client'
import { useTaskSort } from '@/hooks/sorting/use-task-sort'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'

type FieldSortProps = {
  field: 'name' | 'due_date' | 'status' | 'project' | 'assignee'
}

type DescendingField = `-${FieldSortProps['field']}`

export default function FieldSort({ field }: FieldSortProps) {
  const { sort, setSort } = useTaskSort()

  const ascendingValue = field
  const descendingValue = `-${field}` as DescendingField

  const isSortingByFieldAsc = sort?.includes(ascendingValue)
  const isSortingByFieldDesc = sort?.includes(descendingValue)

  const handleClick = () => {
    let newSort: typeof sort = []

    if (isSortingByFieldAsc) {
      newSort = sort?.map((s) =>
        s === ascendingValue ? descendingValue : s
      ) || [descendingValue]
    } else if (isSortingByFieldDesc) {
      newSort = sort?.filter((s) => s !== descendingValue) || []
    } else {
      newSort = [...(sort || []), ascendingValue]
    }

    setSort(newSort.length > 0 ? newSort : null)
  }

  return (
    <span
      className="flex-none rounded bg-gray-100 hover:bg-gray-200 p-0.5 cursor-pointer"
      onClick={handleClick}
    >
      {isSortingByFieldAsc ? (
        <ChevronUpIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 text-gray-900"
        />
      ) : isSortingByFieldDesc ? (
        <ChevronDownIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 text-gray-900"
        />
      ) : (
        <ChevronUpDownIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 text-gray-400"
        />
      )}
    </span>
  )
}
