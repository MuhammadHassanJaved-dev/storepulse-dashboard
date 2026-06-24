import { create } from "zustand";
import { CalendarEvent } from "@/types";
import { CALENDAR_EVENTS } from "@/constants/mock-data";

type CalendarState = {
  events: CalendarEvent[];
  addEvent: (e: CalendarEvent) => void;
  updateEvent: (id: string, e: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  events: CALENDAR_EVENTS,
  addEvent: (e) => set((s) => ({ events: [...s.events, e] })),
  updateEvent: (id, e) =>
    set((s) => ({
      events: s.events.map((x) => (x.id === id ? { ...x, ...e } : x)),
    })),
  deleteEvent: (id) =>
    set((s) => ({ events: s.events.filter((x) => x.id !== id) })),
}));
