"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { USER_GROWTH_DATA } from "@/constants/mock-data";
import { ChartTooltip } from "./chart-tooltip";
import { ClientChart } from "./client-chart";

export function UserGrowthChart() {
  return (
    <ClientChart height={300}>
      {(width) => (
        <LineChart width={width} height={300} data={USER_GROWTH_DATA}
          margin={{ left: 10, right: 12, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }} dy={6} />
          <YAxis tickLine={false} axisLine={false} width={40}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<ChartTooltip />}
            cursor={{ stroke: "rgba(148,163,184,0.2)", strokeWidth: 1 }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
          <Line type="monotone" dataKey="users" name="Total users"
            stroke="#8B5CF6" strokeWidth={2.5} dot={false}
            activeDot={{ r: 5, strokeWidth: 0, fill: "#8B5CF6" }} animationDuration={1200} />
          <Line type="monotone" dataKey="active" name="Active users"
            stroke="#06B6D4" strokeWidth={2.5} dot={false}
            activeDot={{ r: 5, strokeWidth: 0, fill: "#06B6D4" }} animationDuration={1200} />
        </LineChart>
      )}
    </ClientChart>
  );
}
