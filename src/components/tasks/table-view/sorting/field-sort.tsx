"use client";
import { useTaskSort } from "@/hooks/sorting/use-task-sort";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

type FieldSortProps = {
  field: "name" | "due_date" | "status" | "project" | "assignee";
};

type DescendingField = `-${FieldSortProps["field"]}`;

export default function FieldSort({ field }: FieldSortProps) {
  const { sort, setSort } = useTaskSort();

  const ascendingValue = field;
  const descendingValue: DescendingField = `-${field}`;

  const isSortingByFieldAsc = sort?.includes(ascendingValue);
  const isSortingByFieldDesc = sort?.includes(descendingValue);

  const handleClick = () => {
    let newSort: typeof sort = [];

    if (isSortingByFieldAsc) {
      newSort = sort?.map((s) =>
        s === ascendingValue ? descendingValue : s,
      ) ?? [descendingValue];
    } else if (isSortingByFieldDesc) {
      newSort = sort?.filter((s) => s !== descendingValue) ?? [];
    } else {
      newSort = [...(sort ?? []), ascendingValue];
    }

    void setSort(newSort.length > 0 ? newSort : null);
  };

  return (
    <span
      className="flex-none cursor-pointer rounded bg-gray-100 p-0.5 hover:bg-gray-200"
      onClick={handleClick}
    >
      {isSortingByFieldAsc ? (
        <ChevronUpIcon
          aria-hidden="true"
          className="h-4 w-4 text-gray-900 transition-transform duration-200"
        />
      ) : isSortingByFieldDesc ? (
        <ChevronDownIcon
          aria-hidden="true"
          className="h-4 w-4 text-gray-900 transition-transform duration-200"
        />
      ) : (
        <ChevronUpDownIcon
          aria-hidden="true"
          className="h-4 w-4 text-gray-400 transition-transform duration-200"
        />
      )}
    </span>
  );
}
