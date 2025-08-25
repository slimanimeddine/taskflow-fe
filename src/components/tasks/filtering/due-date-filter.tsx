"use client";

import { useTaskDueDateFilter } from "@/hooks/filtering/use-task-due-date-filter";
import { type ChangeEvent } from "react";

export default function DueDateFilter() {
  const { dueDate, setDueDate } = useTaskDueDateFilter();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    void setDueDate(dateValue ? new Date(dateValue) : null);
  };
  return (
    <div className="mt-2">
      <label
        htmlFor="due-date"
        className="block text-sm leading-6 font-medium text-gray-900"
      >
        Due Date
      </label>
      <div>
        <input
          id="due-date"
          name="due-date"
          type="date"
          value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
          onChange={handleDateChange}
          className="inline-flex cursor-default rounded-md bg-white p-1.5 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
