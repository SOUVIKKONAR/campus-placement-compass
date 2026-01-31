import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function InsightCard({ title, icon: Icon, children, className }: InsightCardProps) {
  return (
    <div className={cn("data-card", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-accent" />
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      {children}
    </div>
  );
}

interface InsightBarProps {
  label: string;
  value: number;
  maxValue: number;
  colorClass?: string;
}

export function InsightBar({ label, value, maxValue, colorClass = "bg-accent" }: InsightBarProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
