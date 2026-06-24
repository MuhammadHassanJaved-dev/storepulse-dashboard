import { create } from "zustand";
import { Column, Task } from "@/types";
import { COLUMNS, TASKS } from "@/constants/mock-data";

type KanbanState = {
  columns: Column[];
  tasks: Record<string, Task>;
  moveTask: (
    taskId: string,
    fromColId: Column["id"],
    toColId: Column["id"],
    toIndex: number
  ) => void;
  addTask: (colId: Column["id"], task: Task) => void;
  updateTask: (taskId: string, data: Partial<Task>) => void;
  deleteTask: (colId: Column["id"], taskId: string) => void;
};

const tasksRecord = TASKS.reduce<Record<string, Task>>((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});

export const useKanbanStore = create<KanbanState>((set) => ({
  columns: COLUMNS,
  tasks: tasksRecord,
  moveTask: (taskId, fromColId, toColId, toIndex) =>
    set((s) => {
      const columns = s.columns.map((c) => ({ ...c, taskIds: [...c.taskIds] }));
      const fromCol = columns.find((c) => c.id === fromColId)!;
      const toCol = columns.find((c) => c.id === toColId)!;
      fromCol.taskIds = fromCol.taskIds.filter((id) => id !== taskId);
      toCol.taskIds.splice(toIndex, 0, taskId);
      return { columns };
    }),
  addTask: (colId, task) =>
    set((s) => ({
      tasks: { ...s.tasks, [task.id]: task },
      columns: s.columns.map((c) =>
        c.id === colId ? { ...c, taskIds: [task.id, ...c.taskIds] } : c
      ),
    })),
  updateTask: (taskId, data) =>
    set((s) => ({
      tasks: { ...s.tasks, [taskId]: { ...s.tasks[taskId], ...data } },
    })),
  deleteTask: (colId, taskId) =>
    set((s) => ({
      columns: s.columns.map((c) =>
        c.id === colId
          ? { ...c, taskIds: c.taskIds.filter((id) => id !== taskId) }
          : c
      ),
    })),
}));
