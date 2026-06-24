import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types";

const STATUS_MAP: Record<OrderStatus, { label: string; variant: "success" | "warning" | "muted" | "danger" }> = {
  completed: { label: "Completed", variant: "success" },
  processing: { label: "Processing", variant: "warning" },
  pending: { label: "Pending", variant: "muted" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_MAP[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
