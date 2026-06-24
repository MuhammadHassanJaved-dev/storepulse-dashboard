# StorePulse — Modern SaaS Dashboard

A production-ready SaaS analytics dashboard built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts, Zustand, React Hook Form + Zod, and Radix UI primitives.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## What's inside

- **Dashboard** — animated stat cards (count-up, trend indicators, glow on hover), revenue area chart, user growth line chart, sales distribution pie chart, monthly performance bar chart, activity timeline, and a searchable/sortable/paginated orders table with status badges.
- **Analytics** — revenue overview, user growth, traffic sources, conversion funnel, device breakdown, auto-generated insight cards. Charts animate in on scroll.
- **Customers** — table and card views, search, status filter, add/edit/delete via modal forms (Zustand-backed local state), validated with Zod.
- **Projects** — drag-and-drop Kanban board (`@hello-pangea/dnd`) with four columns, add/edit/delete tasks, priority and due-date badges.
- **Messages** — conversation list with online status and unread counts, chat thread with typing indicator and message animations, mobile-responsive (drawer-style conversation list on small screens).
- **Calendar** — month and week views, click a day to add an event, edit/delete existing events.
- **Team** — member grid with skill tags, progress bars, and status, plus team-wide stats.
- **Settings** — tabbed forms (Profile, Account, Security, Notifications, Appearance) built with React Hook Form + Zod validation; Appearance tab controls the persisted dark/light theme.

## Architecture

```
src/
 ├─ app/              # routes (App Router)
 ├─ components/
 │   ├─ dashboard/    # stat cards, activity feed, orders table
 │   ├─ charts/       # Recharts wrappers
 │   ├─ ui/           # design-system primitives (button, card, dialog, etc.)
 │   └─ layout/       # sidebar, navbar, shell, providers
 ├─ store/            # Zustand stores (UI, customers, kanban, calendar)
 ├─ hooks/            # useCountUp, useLoading
 ├─ types/            # shared TypeScript types
 └─ constants/        # nav config + mock data
```

## Notes

- Theme is persisted via `next-themes` (`localStorage`-backed) and the rest of the app state lives in Zustand stores — all data is local/mock, nothing hits a real backend.
- Fonts (Space Grotesk, Inter, JetBrains Mono) are self-hosted via `@fontsource`, so there's no external font request at runtime.
- Drag-and-drop, charts, and the Kanban board are tree-shaken behind their own client components to keep the initial bundle lean.
