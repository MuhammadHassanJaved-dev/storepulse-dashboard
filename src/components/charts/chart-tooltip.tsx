"use client";

import { cn } from "@/lib/utils";

export function ChartTooltip({
  active,
  payload,
  label,
  valuePrefix = "",
  valueSuffix = "",
  className,
}: any) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/95 backdrop-blur-xl px-3.5 py-2.5 shadow-glass text-xs",
        className
      )}
    >
      {label && <p className="font-medium text-foreground mb-1.5">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: entry.color || entry.fill }}
            />
            <span className="text-muted capitalize">{entry.name}:</span>
            <span className="font-mono-data font-medium text-foreground">
              {valuePrefix}
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              {valueSuffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
