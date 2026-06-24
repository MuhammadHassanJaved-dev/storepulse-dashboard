"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, Plus, Search, Pencil, Trash2, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CustomerFormDialog } from "@/components/customers/customer-form-dialog";
import { CustomerCard } from "@/components/customers/customer-card";
import { useCustomersStore } from "@/store/useCustomersStore";
import { Customer } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_VARIANT: Record<Customer["status"], "success" | "muted" | "warning"> = {
  active: "success",
  inactive: "muted",
  pending: "warning",
};

export default function CustomersPage() {
  const { customers, deleteCustomer } = useCustomersStore();
  const [view, setView] = React.useState<"table" | "cards">("table");
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Customer | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [customers, query, statusFilter]);

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers…"
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 rounded-xl border border-border p-1 bg-surface2/40 ml-auto">
          <button
            onClick={() => setView("table")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              view === "table" ? "bg-brand-gradient text-white" : "text-muted hover:bg-surface2"
            )}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("cards")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              view === "cards" ? "bg-brand-gradient text-white" : "text-muted hover:bg-surface2"
            )}
            aria-label="Card view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add customer
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No customers found"
          description="Try adjusting your search or filters, or add a new customer."
          action={
            <Button size="sm" onClick={() => { setEditing(null); setFormOpen(true); }}>
              <Plus className="h-4 w-4" /> Add customer
            </Button>
          }
        />
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c, i) => (
            <CustomerCard
              key={c.id}
              customer={c}
              index={i}
              onEdit={() => {
                setEditing(c);
                setFormOpen(true);
              }}
              onDelete={() => setDeleteTarget(c)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs text-muted border-b border-border bg-surface2/30">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Company</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Joined</th>
                  <th className="px-5 py-3 font-medium text-right">Spend</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
                    className="border-b border-border/60 last:border-0 hover:bg-surface2/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} color={c.avatarColor} size={32} />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{c.name}</p>
                          <p className="text-xs text-muted truncate">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted hidden md:table-cell">{c.company}</td>
                    <td className="px-5 py-3">
                      <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-muted font-mono-data text-xs hidden sm:table-cell">
                      {c.joined}
                    </td>
                    <td className="px-5 py-3 text-right font-mono-data font-medium">
                      {formatCurrency(c.spend)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(c);
                            setFormOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-foreground focus-ring"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          className="rounded-lg p-1.5 text-muted hover:bg-danger/10 hover:text-danger focus-ring"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <CustomerFormDialog open={formOpen} onOpenChange={setFormOpen} customer={editing} />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete customer?"
        description={`This will permanently remove ${deleteTarget?.name ?? "this customer"} from your workspace.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteCustomer(deleteTarget.id);
            toast.success("Customer deleted");
          }
        }}
      />
    </div>
  );
}
