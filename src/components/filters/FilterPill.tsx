import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

export function FilterPill({ label, active, onClick, onRemove }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "filter-pill",
        active ? "filter-pill-active" : "filter-pill-inactive"
      )}
    >
      {label}
      {active && onRemove && (
        <X 
          className="h-3 w-3 ml-1 hover:text-foreground" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </button>
  );
}

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

export function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}
