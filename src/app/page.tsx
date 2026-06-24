"use client";

import {
  DollarSign,
  Users,
  UserPlus,
  TrendingUp,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportDropdown } from "@/components/dashboard/report-dropdown";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DynRevenueAreaChart,
  DynUserGrowthChart,
  DynSalesPieChart,
  DynMonthlyBarChart,
} from "@/components/charts/dynamic";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import { STATS, ACTIVITIES } from "@/constants/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="text-muted-foreground">
      Monitor your business performance.
    </p>
  </div>

  <ReportDropdown />
</div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total Revenue" value={STATS.revenue.value}
          prefix="$" change={STATS.revenue.change} trend={STATS.revenue.trend}
          icon={DollarSign} color="#3B82F6" delay={0}
        />
        <StatCard
          label="Total Users" value={STATS.users.value}
          change={STATS.users.change} trend={STATS.users.trend}
          icon={Users} color="#8B5CF6" delay={0.06}
        />
        <StatCard
          label="New Customers" value={STATS.newCustomers.value}
          change={STATS.newCustomers.change} trend={STATS.newCustomers.trend}
          icon={UserPlus} color="#06B6D4" delay={0.12}
        />
        <StatCard
          label="Growth Rate" value={STATS.growthRate.value}
          suffix="%" decimals={1} change={STATS.growthRate.change} trend={STATS.growthRate.trend}
          icon={TrendingUp} color="#10B981" delay={0.18}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="Revenue Overview"
          description="Monthly revenue & profit across the last 12 months" delay={0.1}>
          <DynRevenueAreaChart />
        </ChartCard>
        <ChartCard title="User Growth"
          description="Total vs. active users over time" delay={0.15}>
          <DynUserGrowthChart />
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="Sales Distribution"
          description="Revenue share by product category" delay={0.2}>
          <DynSalesPieChart />
        </ChartCard>
        <ChartCard title="Monthly Performance"
          description="Actual revenue vs. target (Jan – Jun)" delay={0.25}>
          <DynMonthlyBarChart />
        </ChartCard>
      </div>

      {/* Activity + Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What&rsquo;s happening across your workspace</CardDescription>
          </CardHeader>
          <ActivityTimeline items={ACTIVITIES} />
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest transactions from your customers</CardDescription>
          </CardHeader>
          <RecentOrdersTable />
        </Card>
      </div>
    </div>
  );
}
