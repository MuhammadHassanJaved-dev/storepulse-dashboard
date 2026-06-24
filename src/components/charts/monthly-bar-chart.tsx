"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { MONTHLY_PERFORMANCE } from "@/constants/mock-data";
import { ChartTooltip } from "./chart-tooltip";
import { ClientChart } from "./client-chart";

export function MonthlyBarChart() {
  return (
    <ClientChart height={300}>
      {(width) => (
        <BarChart width={width} height={300} data={MONTHLY_PERFORMANCE}
          margin={{ left: 10, right: 12, top: 8, bottom: 0 }}
          barGap={4} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }} dy={6} />
          <YAxis tickLine={false} axisLine={false} width={48}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<ChartTooltip valuePrefix="$" />}
            cursor={{ fill: "rgba(148,163,184,0.06)" }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
          <Bar dataKey="target" name="Target" fill="rgba(148,163,184,0.25)"
            radius={[5, 5, 0, 0]} animationDuration={900} />
          <Bar dataKey="actual" name="Actual" fill="#3B82F6"
            radius={[5, 5, 0, 0]} animationDuration={1100} />
        </BarChart>
      )}
    </ClientChart>
  );
}
