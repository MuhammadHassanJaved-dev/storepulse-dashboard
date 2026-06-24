"use client";

import * as React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, CalendarX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EventFormDialog } from "@/components/calendar/event-form-dialog";
import { useCalendarStore } from "@/store/useCalendarStore";
import { CalendarEvent } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { events, deleteEvent } = useCalendarStore();
  const [view, setView] = React.useState<"month" | "week">("month");
  const [cursor, setCursor] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<CalendarEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<CalendarEvent | null>(null);

  const eventsByDate = React.useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const e of events) {
      (map[e.date] ??= []).push(e);
    }
    return map;
  }, [events]);

  const monthDays = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor));
    const end = endOfWeek(endOfMonth(cursor));
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const weekDays = React.useMemo(() => {
    const start = startOfWeek(cursor);
    const end = endOfWeek(cursor);
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const navigate = (dir: 1 | -1) => {
    setCursor((c) => (view === "month" ? (dir === 1 ? addMonths(c, 1) : subMonths(c, 1)) : dir === 1 ? addWeeks(c, 1) : subWeeks(c, 1)));
  };

  const selectedEvents = (eventsByDate[selectedDate] ?? []).sort((a, b) => a.time.localeCompare(b.time));

  const DayCell = ({ day, compact }: { day: Date; compact?: boolean }) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDate[dateStr] ?? [];
    const inMonth = isSameMonth(day, cursor);
    const selected = dateStr === selectedDate;

    return (
      <button
        onClick={() => setSelectedDate(dateStr)}
        className={cn(
          "flex flex-col items-start gap-1 rounded-xl border p-2 text-left transition-colors min-h-[88px] sm:min-h-[104px]",
          selected ? "border-brand-primary/50 bg-brand-primary/5" : "border-border hover:bg-surface2/50",
          !inMonth && "opacity-40"
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
            isToday(day) && "bg-brand-gradient text-white"
          )}
        >
          {format(day, "d")}
        </span>
        <div className="flex flex-col gap-1 w-full">
          {dayEvents.slice(0, compact ? 3 : 2).map((e) => (
            <span
              key={e.id}
              className="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white"
              style={{ background: e.color }}
            >
              {e.title}
            </span>
          ))}
          {dayEvents.length > (compact ? 3 : 2) && (
            <span className="text-[10px] text-muted">+{dayEvents.length - (compact ? 3 : 2)} more</span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Button variant="secondary" size="icon" onClick={() => navigate(-1)} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => navigate(1)} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCursor(new Date())}>
            Today
          </Button>
        </div>
        <h2 className="font-display text-lg font-semibold">
          {view === "month" ? format(cursor, "MMMM yyyy") : `Week of ${format(weekDays[0], "MMM d")}`}
        </h2>

        <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week")} className="ml-0 sm:ml-2">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          className="ml-auto"
          onClick={() => {
            setEditingEvent(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add event
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        <Card>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {WEEKDAYS.map((d) => (
              <p key={d} className="text-center text-xs font-medium text-muted py-1">
                {d}
              </p>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={view + cursor.toDateString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-7 gap-2"
            >
              {(view === "month" ? monthDays : weekDays).map((day) => (
                <DayCell key={day.toISOString()} day={day} compact={view === "week"} />
              ))}
            </motion.div>
          </AnimatePresence>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">
              {format(new Date(selectedDate), "EEEE, MMM d")}
            </h3>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setEditingEvent(null);
                setFormOpen(true);
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>

          {selectedEvents.length === 0 ? (
            <EmptyState
              icon={CalendarX}
              title="No events"
              description="Nothing scheduled for this day yet."
              className="py-10"
            />
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl border border-border p-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ background: e.color }} />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{e.title}</p>
                        <p className="text-xs text-muted">{e.time}</p>
                        {e.description && (
                          <p className="text-xs text-muted mt-1 leading-relaxed">{e.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => {
                          setEditingEvent(e);
                          setFormOpen(true);
                        }}
                        className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-foreground focus-ring"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(e)}
                        className="rounded-lg p-1.5 text-muted hover:bg-danger/10 hover:text-danger focus-ring"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <EventFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        defaultDate={selectedDate}
        event={editingEvent}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete event?"
        description={`This will remove "${deleteTarget?.title}" from your calendar.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteEvent(deleteTarget.id);
            toast.success("Event deleted");
          }
        }}
      />
    </div>
  );
}
