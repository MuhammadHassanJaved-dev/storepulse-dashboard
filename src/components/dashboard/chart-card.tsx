"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ChartCard({
  title, description, delay = 0, action, children, className,
}: {
  title: string; description?: string; delay?: number;
  action?: React.ReactNode; children: React.ReactNode;
  className?: string; revealOnScroll?: boolean; loading?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      <Card className={className}>
        <CardHeader className="flex-row items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
        <div className="w-full" style={{ minHeight: 300 }}>
          {children}
        </div>
      </Card>
    </motion.div>
  );
}
