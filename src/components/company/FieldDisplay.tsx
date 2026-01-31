import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface FieldDisplayProps {
  label: string;
  value: string | number | null | undefined;
  type?: "text" | "link" | "email" | "phone" | "rating" | "list";
  className?: string;
}

export function FieldDisplay({ label, value, type = "text", className }: FieldDisplayProps) {
  const isEmpty = value === null || value === undefined || value === "";

  const renderValue = () => {
    if (isEmpty) {
      return <span className="field-value-empty">Not available</span>;
    }

    switch (type) {
      case "link":
        return (
          <a
            href={value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="field-value text-accent hover:underline inline-flex items-center gap-1"
          >
            {value}
            <ExternalLink className="h-3 w-3" />
          </a>
        );
      case "email":
        return (
          <a
            href={`mailto:${value}`}
            className="field-value text-accent hover:underline"
          >
            {value}
          </a>
        );
      case "phone":
        return (
          <a
            href={`tel:${value}`}
            className="field-value text-accent hover:underline"
          >
            {value}
          </a>
        );
      case "rating":
        return (
          <span className="field-value font-medium">
            ★ {value}
          </span>
        );
      case "list":
        const items = String(value).split(",").map(s => s.trim()).filter(Boolean);
        return (
          <div className="flex flex-wrap gap-1">
            {items.map((item, idx) => (
              <span 
                key={idx}
                className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded"
              >
                {item}
              </span>
            ))}
          </div>
        );
      default:
        return <span className="field-value">{value}</span>;
    }
  };

  return (
    <div className={cn("field-item", className)}>
      <span className="field-label">{label}</span>
      {renderValue()}
    </div>
  );
}

interface FieldGroupProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function FieldGroup({ children, columns = 2, className }: FieldGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("field-group", gridCols[columns], className)}>
      {children}
    </div>
  );
}
