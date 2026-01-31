import { ReactNode } from "react";
import { Search, Database, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: "search" | "database" | "alert";
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon = "database", 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const IconComponent = {
    search: Search,
    database: Database,
    alert: AlertCircle,
  }[icon];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-4 text-center",
      className
    )}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <IconComponent className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
