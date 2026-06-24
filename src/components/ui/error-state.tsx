import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-danger/20 bg-danger/5 py-14 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10">
        <AlertTriangle className="h-6 w-6 text-danger" />
      </div>
      <div>
        <p className="font-display font-semibold">{title}</p>
        <p className="text-sm text-muted mt-1 max-w-sm">{description}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
