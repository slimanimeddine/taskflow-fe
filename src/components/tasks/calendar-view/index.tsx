"use client";

import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { Task } from "@/types/models";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-view.css";
import CustomToolbar from "./custom-toolbar";
import EventCard from "./event-card";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarViewProps = {
  tasks: Task[];
};

export default function CalendarView({ tasks }: CalendarViewProps) {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [value, setValue] = useState(
    tasks.length > 0 ? tasks[0].due_date : new Date(),
  );

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.name,
    status: task.status,
    start: new Date(task.due_date),
    end: new Date(task.due_date),
    project: task.project,
    assignee: task.assignee,
  }));

  const handleNavigate = (action: "prev" | "next" | "today") => {
    if (action === "prev") {
      setValue(subMonths(value, 1));
    } else if (action === "next") {
      setValue(addMonths(value, 1));
    } else if (action === "today") {
      setValue(new Date());
    }
  };

  const handleViewChange = (newView: "month" | "week" | "day") => {
    setView(newView);
  };

  const max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      defaultView="month"
      toolbar
      showAllEvents
      max={max}
      view={view}
      className="h-full"
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),
        toolbar: () => (
          <CustomToolbar
            date={value}
            onNavigate={handleNavigate}
            onViewChange={handleViewChange}
            view={view}
          />
        ),
      }}
    />
  );
}
