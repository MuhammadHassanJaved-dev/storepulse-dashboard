"use client";

import { Draggable } from "@hello-pangea/dnd";
import { MoreVertical, Pencil, Trash2, CalendarClock } from "lucide-react";
import { Task } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const PRIORITY_VARIANT: Record<Task["priority"], "danger" | "warning" | "muted"> = {
  high: "danger", medium: "warning", low: "muted",
};

export function TaskCard({
  task, index, onEdit, onDelete,
}: { task: Task; index: number; onEdit: () => void; onDelete: () => void }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "rounded-xl border border-border bg-surface p-3 sm:p-3.5 mb-2.5 shadow-soft",
            "transition-all duration-150 cursor-grab active:cursor-grabbing select-none touch-none",
            snapshot.isDragging && "shadow-glow rotate-1 ring-2 ring-brand-primary/40 scale-[1.02]"
          )}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant={PRIORITY_VARIANT[task.priority]} className="text-[11px]">
              {task.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-foreground focus-ring -mt-0.5 -mr-0.5 shrink-0">
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-danger hover:!bg-danger/10">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="font-medium text-sm leading-snug">{task.title}</p>
          {task.description && (
            <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">{task.description}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <CalendarClock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{task.dueDate}</span>
            </span>
            <Avatar name={task.assignee} color={task.avatarColor} size={24} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
