"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, TrendingUp, Users, Globe, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ConversionFunnel } from "@/components/charts/funnel-chart";
import {
  DynRevenueAreaChart,
  DynUserGrowthChart,
  DynSalesPieChart,
} from "@/components/charts/dynamic";
import { TRAFFIC_SOURCES, DEVICE_ANALYTICS } from "@/constants/mock-data";
import { formatNumber } from "@/lib/utils";

const DEVICE_ICONS = { Desktop: Monitor, Mobile: Smartphone, Tablet } as const;

function DeviceBars() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className="space-y-5 py-1">
      {DEVICE_ANALYTICS.map((d, i) => {
        const Icon = DEVICE_ICONS[d.name as keyof typeof DEVICE_ICONS];
        return (
          <div key={d.name} className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${d.color}20` }}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: d.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="font-medium text-xs sm:text-sm">{d.name}</span>
                <span className="font-mono-data font-semibold text-xs sm:text-sm">{d.value}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-surface2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${d.value}%` : 0 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: d.color }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const INSIGHT_CARDS = [
  { icon: TrendingUp, label: "Best performing month", value: "August — $156k", color: "#3B82F6" },
  { icon: Globe, label: "Top traffic source", value: "Organic Search — 42%", color: "#8B5CF6" },
  { icon: Users, label: "Visitor → paid conversion", value: "3.1% CVR", color: "#06B6D4" },
  { icon: Zap, label: "Monthly active users", value: formatNumber(32700), color: "#10B981" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Insight cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {INSIGHT_CARDS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
          >
            <Card glow className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 h-auto sm:h-[88px] p-3 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${item.color}20` }}>
                <item.icon className="h-5 w-5" style={{ color: item.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted leading-tight">{item.label}</p>
                <p className="font-display font-semibold mt-0.5 text-sm sm:text-base truncate">{item.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Full-width revenue chart */}
      <ChartCard
        title="Revenue Overview"
        description="Detailed monthly revenue trend with profit margin"
        delay={0.08}
      >
        <DynRevenueAreaChart />
      </ChartCard>

      {/* User Growth + Traffic Sources */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard
          title="User Growth"
          description="Acquisition vs. active engagement over 12 months"
          delay={0.12}
        >
          <DynUserGrowthChart />
        </ChartCard>
        <ChartCard
          title="Traffic Sources"
          description="Where your visitors are coming from"
          delay={0.16}
        >
          <DynSalesPieChart data={TRAFFIC_SOURCES} />
        </ChartCard>
      </div>

      {/* Conversion funnel + Device breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard
          title="Conversion Funnel"
          description="Visitor → signup → trial → paid"
          delay={0.2}
        >
          <ConversionFunnel />
        </ChartCard>
        <ChartCard
          title="Device Analytics"
          description="Sessions broken down by device type"
          delay={0.24}
        >
          <DeviceBars />
        </ChartCard>
      </div>
    </div>
  );
}
