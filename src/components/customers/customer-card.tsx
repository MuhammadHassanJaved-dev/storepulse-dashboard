"use client";

import { motion } from "framer-motion";
import { MoreVertical, Pencil, Trash2, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";

const STATUS_VARIANT: Record<Customer["status"], "success" | "muted" | "warning"> = {
  active: "success",
  inactive: "muted",
  pending: "warning",
};

export function CustomerCard({
  customer,
  index,
  onEdit,
  onDelete,
}: {
  customer: Customer;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -3 }}
    >
      <Card glow className="h-full">
        <div className="flex items-start justify-between mb-3">
          <Avatar name={customer.name} color={customer.avatarColor} size={44} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg p-1.5 text-muted hover:bg-surface2 hover:text-foreground focus-ring">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-danger hover:!bg-danger/10">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="font-display font-semibold truncate">{customer.name}</p>
        <p className="text-sm text-muted truncate">{customer.company}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted mt-2 truncate">
          <Mail className="h-3 w-3 shrink-0" /> {customer.email}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <Badge variant={STATUS_VARIANT[customer.status]}>{customer.status}</Badge>
          <span className="font-mono-data text-sm font-semibold">{formatCurrency(customer.spend)}</span>
        </div>
      </Card>
    </motion.div>
  );
}
