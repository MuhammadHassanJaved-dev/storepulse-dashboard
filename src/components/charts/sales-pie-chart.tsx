"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";
import { SALES_DISTRIBUTION } from "@/constants/mock-data";
import { ChartTooltip } from "./chart-tooltip";
import { ClientChart } from "./client-chart";

export function SalesPieChart({
  data = SALES_DISTRIBUTION,
}: {
  data?: { name: string; value: number; color: string }[];
}) {
  return (
    <ClientChart height={300}>
      {(width) => (
        <PieChart width={width} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={Math.min(width * 0.15, 65)}
            outerRadius={Math.min(width * 0.22, 100)}
            paddingAngle={3}
            cornerRadius={5}
            animationDuration={1000}
            animationBegin={150}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip valueSuffix="%" />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={9}
            wrapperStyle={{ fontSize: 12, lineHeight: "26px" }}
          />
        </PieChart>
      )}
    </ClientChart>
  );
}
