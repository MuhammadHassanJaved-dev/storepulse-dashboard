"use client";

import * as React from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Download
} from "lucide-react";
import { exportPDF, exportCSV, exportExcel } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderStatusBadge } from "./order-status-badge";
import { ORDERS } from "@/constants/mock-data";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];
const colorFor = (name: string) => COLORS[name.charCodeAt(0) % COLORS.length];

type SortKey = keyof Order;
const PAGE_SIZE = 6;

export function RecentOrdersTable() {
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("date");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORDERS.filter(
      o =>
        !q ||
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
    );
  }, [query]);

  const sorted = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const page_ = Math.min(page, Math.max(0, totalPages - 1));
  const rows = sorted.slice(page_ * PAGE_SIZE, (page_ + 1) * PAGE_SIZE);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortDir === "asc"
        ? <ChevronUp className="h-3 w-3 text-brand-primary" />
        : <ChevronDown className="h-3 w-3 text-brand-primary" />
      : <ChevronDown className="h-3 w-3 opacity-30" />;

  return (
    <div>
      <div className="flex justify-end mb-4 gap-2">
  <Button
    variant="outline"
    size="sm"
    onClick={() => exportPDF(ORDERS)}
  >
    PDF
  </Button>

  <Button
    variant="outline"
    size="sm"
    onClick={() => exportCSV(ORDERS)}
  >
    CSV
  </Button>

  <Button
    variant="outline"
    size="sm"
    onClick={() => exportExcel(ORDERS)}
  >
    <Download className="h-4 w-4 mr-2" />
    Excel
  </Button>
</div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(0); }}
          placeholder="Search orders…"
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Table - scrollable on mobile */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm min-w-[540px]">
          <thead>
            <tr className="text-left border-b border-border">
              {[
                { label: "Order", key: "id" as SortKey, cls: "" },
                { label: "Customer", key: "customer" as SortKey, cls: "" },
                { label: "Date", key: "date" as SortKey, cls: "hidden sm:table-cell" },
                { label: "Status", key: "status" as SortKey, cls: "" },
                { label: "Amount", key: "amount" as SortKey, cls: "text-right" },
              ].map(col => (
                <th key={col.key}
                  className={`pb-2.5 pt-1 text-xs font-medium text-muted cursor-pointer select-none ${col.cls}`}
                  onClick={() => toggleSort(col.key)}>
                  <span className="flex items-center gap-1">
                    {col.label} <SortIcon k={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(o => (
              <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-surface2/40 transition-colors">
                <td className="py-3 pr-3">
                  <span className="font-mono-data text-xs text-muted">{o.id}</span>
                </td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={o.customer} color={colorFor(o.customer)} size={28} />
                    <span className="font-medium truncate max-w-[110px] sm:max-w-[160px]">{o.customer}</span>
                  </div>
                </td>
                <td className="py-3 pr-3 text-muted text-xs font-mono-data hidden sm:table-cell">
                  {o.date}
                </td>
                <td className="py-3 pr-3">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="py-3 text-right font-mono-data font-semibold">
                  {formatCurrency(o.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-sm text-muted">
          <span className="text-xs">{sorted.length} orders · page {page_ + 1} of {totalPages}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page_ === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface2 disabled:opacity-30 transition-colors focus-ring"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page_ >= totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface2 disabled:opacity-30 transition-colors focus-ring"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
