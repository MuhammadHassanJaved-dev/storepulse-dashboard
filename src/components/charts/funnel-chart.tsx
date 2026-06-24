"use client";

import { motion } from "framer-motion";
import { CONVERSION_FUNNEL } from "@/constants/mock-data";
import { formatNumber } from "@/lib/utils";

const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"];

export function ConversionFunnel() {
  const max = CONVERSION_FUNNEL[0].value;
  return (
    <div className="space-y-5 py-2">
      {CONVERSION_FUNNEL.map((stage, i) => {
        const pct = (stage.value / max) * 100;
        const conv = i === 0 ? 100 : (stage.value / CONVERSION_FUNNEL[i - 1].value) * 100;
        return (
          <div key={stage.stage}>
            <div className="flex items-center justify-between mb-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: COLORS[i] }} />
                <span className="font-medium">{stage.stage}</span>
              </div>
              <span className="font-mono-data text-sm text-muted">
                {formatNumber(stage.value)}
                {i > 0 && (
                  <span className="ml-2 text-xs text-success">({conv.toFixed(1)}%)</span>
                )}
              </span>
            </div>
            <div className="h-9 w-full rounded-xl bg-surface2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
                className="h-full rounded-xl relative overflow-hidden"
                style={{ background: COLORS[i] }}
              >
                <div className="absolute inset-0 bg-white/10" />
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
