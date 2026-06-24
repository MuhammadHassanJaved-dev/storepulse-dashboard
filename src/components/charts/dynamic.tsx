/**
 * Dynamic (client-only) wrappers.
 * ssr:false is required — Recharts crashes on the server.
 * The ClientChart wrapper inside each component handles
 * its own loading state (renders nothing until width is measured).
 */
import dynamic from "next/dynamic";

export const DynRevenueAreaChart = dynamic(
  () => import("./revenue-area-chart").then((m) => m.RevenueAreaChart),
  { ssr: false }
);

export const DynUserGrowthChart = dynamic(
  () => import("./user-growth-chart").then((m) => m.UserGrowthChart),
  { ssr: false }
);

export const DynSalesPieChart = dynamic(
  () => import("./sales-pie-chart").then((m) => m.SalesPieChart),
  { ssr: false }
);

export const DynMonthlyBarChart = dynamic(
  () => import("./monthly-bar-chart").then((m) => m.MonthlyBarChart),
  { ssr: false }
);
