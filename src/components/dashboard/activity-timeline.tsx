"use client";

import { motion } from "framer-motion";
import { Users, CreditCard, FolderOpen, UsersRound } from "lucide-react";
import { ActivityItem } from "@/types";
import { cn } from "@/lib/utils";

const TYPE_META = {
  user:    { icon: Users, bg: "bg-brand-primary/10", color: "text-brand-primary" },
  payment: { icon: CreditCard, bg: "bg-success/10", color: "text-success" },
  project: { icon: FolderOpen, bg: "bg-brand-secondary/10", color: "text-brand-secondary" },
  team:    { icon: UsersRound, bg: "bg-brand-accent/10", color: "text-brand-accent" },
};

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  return (
    <div className="space-y-1">
      {items.map((item, i) => {
        const meta = TYPE_META[item.type];
        const Icon = meta.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-start gap-3 group rounded-xl p-2 hover:bg-surface2/50 transition-colors"
          >
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl mt-0.5", meta.bg)}>
              <Icon className={cn("h-4 w-4", meta.color)} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium leading-tight">{item.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-tight truncate">{item.description}</p>
              <p className="text-[11px] text-muted/70 mt-1">{item.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
