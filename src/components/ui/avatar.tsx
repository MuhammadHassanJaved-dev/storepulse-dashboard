"use client";
import * as React from "react";
import { cn, initials } from "@/lib/utils";

export function Avatar({
  name,
  color = "#3B82F6",
  size = 40,
  className,
  ring,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-display font-semibold text-white shrink-0",
        ring && "ring-2 ring-surface ring-offset-2 ring-offset-background",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
      }}
    >
      {initials(name)}
    </div>
  );
}
