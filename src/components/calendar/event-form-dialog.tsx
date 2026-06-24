"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types";
import { useCalendarStore } from "@/store/useCalendarStore";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EC4899"];

export function EventFormDialog({
  open,
  onOpenChange,
  defaultDate,
  event,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate?: string;
  event?: CalendarEvent | null;
}) {
  const { addEvent, updateEvent } = useCalendarStore();
  const isEdit = !!event;
  const [color, setColor] = React.useState(COLORS[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", date: defaultDate ?? "", time: "", description: "" },
  });

  React.useEffect(() => {
    if (open) {
      reset({
        title: event?.title ?? "",
        date: event?.date ?? defaultDate ?? "",
        time: event?.time ?? "",
        description: event?.description ?? "",
      });
      setColor(event?.color ?? COLORS[0]);
    }
  }, [open, event, defaultDate, reset]);

  const onSubmit = (values: FormValues) => {
    if (isEdit && event) {
      updateEvent(event.id, { ...values, color });
      toast.success("Event updated");
    } else {
      addEvent({ id: `e${Date.now()}`, ...values, color });
      toast.success("Event added");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit event" : "Add event"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this event's details." : "Schedule a new event on your calendar."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Product sync" />
            {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-xs text-danger mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" placeholder="10:00 AM" {...register("time")} />
              {errors.time && <p className="text-xs text-danger mt-1">{errors.time.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Optional details…" />
          </div>
          <div>
            <Label>Color</Label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-7 w-7 rounded-full transition-transform",
                    color === c && "ring-2 ring-offset-2 ring-offset-surface scale-110"
                  )}
                  style={{ background: c, boxShadow: color === c ? `0 0 0 2px ${c}` : undefined }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Add event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
