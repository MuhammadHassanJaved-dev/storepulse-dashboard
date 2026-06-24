"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { REVENUE_DATA } from "@/constants/mock-data";
import { ChartTooltip } from "./chart-tooltip";
import { ClientChart } from "./client-chart";

export function RevenueAreaChart() {
  return (
    <ClientChart height={300}>
      {(width) => (
        <AreaChart width={width} height={300} data={REVENUE_DATA}
          margin={{ left: 10, right: 12, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="grad-profit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }} dy={6} />
          <YAxis tickLine={false} axisLine={false} width={48}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<ChartTooltip valuePrefix="$" />}
            cursor={{ stroke: "rgba(148,163,184,0.2)", strokeWidth: 1 }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
          <Area type="monotone" dataKey="revenue" name="Revenue"
            stroke="#3B82F6" strokeWidth={2.5} fill="url(#grad-revenue)"
            activeDot={{ r: 5, strokeWidth: 0, fill: "#3B82F6" }} animationDuration={1200} />
          <Area type="monotone" dataKey="profit" name="Profit"
            stroke="#8B5CF6" strokeWidth={2.5} fill="url(#grad-profit)"
            activeDot={{ r: 5, strokeWidth: 0, fill: "#8B5CF6" }} animationDuration={1200} />
        </AreaChart>
      )}
    </ClientChart>
  );
}
