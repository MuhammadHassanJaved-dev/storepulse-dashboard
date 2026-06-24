import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-14 px-6 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient/10">
        <Icon className="h-6 w-6 text-brand-primary" />
      </div>
      <div>
        <p className="font-display font-semibold">{title}</p>
        {description && <p className="text-sm text-muted mt-1 max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
