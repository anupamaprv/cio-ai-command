import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "warning" | "critical" | "inactive";
  label?: string;
}

const statusStyles = {
  active: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
  inactive: "bg-muted text-muted-foreground border-border",
};

const statusDots = {
  active: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
  inactive: "bg-muted-foreground",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel = label ?? status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status]
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", statusDots[status])} />
      {displayLabel}
    </span>
  );
}
