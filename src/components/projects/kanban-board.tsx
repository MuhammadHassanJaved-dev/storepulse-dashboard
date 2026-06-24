"use client";

import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useKanbanStore } from "@/store/useKanbanStore";
import { Column, Task } from "@/types";
import { TaskCard } from "./task-card";
import { TaskFormDialog } from "./task-form-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const COLUMN_ACCENT: Record<Column["id"], string> = {
  todo: "#3B82F6",
  "in-progress": "#F59E0B",
  review: "#8B5CF6",
  completed: "#10B981",
};

export function KanbanBoard() {
  const { columns, tasks, moveTask, deleteTask } = useKanbanStore();
  const [formState, setFormState] = React.useState<{
    open: boolean; columnId: Column["id"]; task: Task | null;
  }>({ open: false, columnId: "todo", task: null });
  const [deleteTarget, setDeleteTarget] = React.useState<{
    colId: Column["id"]; task: Task;
  } | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    moveTask(
      draggableId,
      source.droppableId as Column["id"],
      destination.droppableId as Column["id"],
      destination.index
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {/*
          Mobile: vertical stack of columns (one per row)
          sm: 2-col grid
          xl: 4-col grid (all columns side by side)
          We also allow horizontal scroll on small screens as a fallback.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-start">
          {columns.map((col) => (
            <div
              key={col.id}
              className="flex flex-col rounded-2xl border border-border bg-surface2/30 p-3 sm:p-3.5 min-h-[140px]"
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: COLUMN_ACCENT[col.id] }}
                  />
                  <h3 className="font-display font-semibold text-sm">{col.title}</h3>
                  <span className="text-xs text-muted rounded-full bg-surface2 border border-border px-1.5 py-0.5 leading-none">
                    {col.taskIds.length}
                  </span>
                </div>
                <button
                  onClick={() => setFormState({ open: true, columnId: col.id, task: null })}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-foreground transition-colors focus-ring"
                  aria-label={`Add task to ${col.title}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Droppable area */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 min-h-[80px] rounded-xl transition-colors duration-150",
                      snapshot.isDraggingOver
                        ? "bg-brand-primary/5 ring-1 ring-brand-primary/25"
                        : "bg-transparent"
                    )}
                  >
                    {col.taskIds.map((taskId, i) => (
                      <TaskCard
                        key={taskId}
                        task={tasks[taskId]}
                        index={i}
                        onEdit={() =>
                          setFormState({ open: true, columnId: col.id, task: tasks[taskId] })
                        }
                        onDelete={() =>
                          setDeleteTarget({ colId: col.id, task: tasks[taskId] })
                        }
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskFormDialog
        open={formState.open}
        onOpenChange={(open) => setFormState((s) => ({ ...s, open }))}
        columnId={formState.columnId}
        task={formState.task}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete task?"
        description={`This will permanently remove "${deleteTarget?.task.title}" from the board.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteTask(deleteTarget.colId, deleteTarget.task.id);
            toast.success("Task deleted");
          }
        }}
      />
    </div>
  );
}
