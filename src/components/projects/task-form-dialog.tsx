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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Column, Task } from "@/types";
import { useKanbanStore } from "@/store/useKanbanStore";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

type FormValues = z.infer<typeof schema>;

const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

export function TaskFormDialog({
  open,
  onOpenChange,
  columnId,
  task,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: Column["id"];
  task?: Task | null;
}) {
  const { addTask, updateTask } = useKanbanStore();
  const isEdit = !!task;
  const [priority, setPriority] = React.useState<Task["priority"]>("medium");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", priority: "medium", assignee: "", dueDate: "" },
  });

  React.useEffect(() => {
    if (open) {
      reset({
        title: task?.title ?? "",
        description: task?.description ?? "",
        priority: task?.priority ?? "medium",
        assignee: task?.assignee ?? "",
        dueDate: task?.dueDate ?? "",
      });
      setPriority(task?.priority ?? "medium");
    }
  }, [open, task, reset]);

  const onSubmit = (values: FormValues) => {
    if (isEdit && task) {
      updateTask(task.id, { ...values, priority });
      toast.success("Task updated");
    } else {
      addTask(columnId, {
        id: `t${Date.now()}`,
        title: values.title,
        description: values.description ?? "",
        priority,
        assignee: values.assignee,
        avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        dueDate: values.dueDate,
        tags: [],
      });
      toast.success("Task added");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit task" : "Add task"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this task's details." : "Add a new task to this column."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Design new pricing page" />
            {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Add more detail…" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Task["priority"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due date</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
              {errors.dueDate && <p className="text-xs text-danger mt-1">{errors.dueDate.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input id="assignee" {...register("assignee")} placeholder="Amelia Frost" />
            {errors.assignee && <p className="text-xs text-danger mt-1">{errors.assignee.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Add task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
