"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, prefix, suffix, decimals = 0,
  change, trend, icon: Icon, color, delay = 0,
}: {
  label: string; value: number;
  prefix?: string; suffix?: string; decimals?: number;
  change: number; trend: "up" | "down";
  icon: LucideIcon; color: string; delay?: number;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  const animated = useCountUp(value, 1400, mounted);
  const isUp = trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="group"
    >
      <div className="glass-card relative overflow-hidden p-4 sm:p-5 h-full flex flex-col justify-between min-h-[130px] sm:min-h-[148px] hover:shadow-glow transition-shadow duration-300">
        {/* Glow orb */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-300"
          style={{ background: color }}
        />

        {/* Top: icon + badge */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl shrink-0"
            style={{ background: `${color}1f` }}>
            <Icon className="h-5 w-5 sm:h-5 sm:w-5" style={{ color }} />
          </div>
          <span className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold shrink-0",
            isUp ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        </div>

        {/* Bottom: label + value */}
        <div className="relative z-10">
          <p className="text-xs sm:text-sm text-muted">{label}</p>
          <p className="font-mono-data text-2xl sm:text-3xl font-semibold tracking-tight mt-0.5 leading-none">
            {prefix}
            {animated.toLocaleString("en-US", {
              maximumFractionDigits: decimals,
              minimumFractionDigits: decimals,
            })}
            {suffix}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
