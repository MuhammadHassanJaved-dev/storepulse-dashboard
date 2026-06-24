"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const KanbanBoard = dynamic(
  () => import("@/components/projects/kanban-board").then((m) => m.KanbanBoard),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-2xl" />
        ))}
      </div>
    ),
  }
);

export default function ProjectsPage() {
  return (
    <div className="space-y-5 pb-2">
      <p className="text-sm text-muted -mt-1">
        Drag and drop tasks between columns, or use the menu on each card to edit and delete.
      </p>
      <KanbanBoard />
    </div>
  );
}
