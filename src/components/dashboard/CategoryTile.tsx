import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryTileProps {
  title: string;
  count: number;
  icon: LucideIcon;
  to: string;
  colorClass?: string;
}

export function CategoryTile({ 
  title, 
  count, 
  icon: Icon, 
  to,
  colorClass = "category-service"
}: CategoryTileProps) {
  return (
    <Link
      to={to}
      className="data-card group flex items-center gap-4 hover:border-accent/50 transition-all"
    >
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg",
        colorClass.includes("tech-giant") && "bg-chart-1/10",
        colorClass.includes("product") && "bg-chart-2/10",
        colorClass.includes("service") && "bg-chart-3/10",
        colorClass.includes("startup") && "bg-chart-4/10",
        !colorClass.includes("tech-giant") && !colorClass.includes("product") && 
        !colorClass.includes("service") && !colorClass.includes("startup") && "bg-accent/10"
      )}>
        <Icon className={cn(
          "h-6 w-6",
          colorClass.includes("tech-giant") && "text-chart-1",
          colorClass.includes("product") && "text-chart-2",
          colorClass.includes("service") && "text-chart-3",
          colorClass.includes("startup") && "text-chart-4",
          !colorClass.includes("tech-giant") && !colorClass.includes("product") && 
          !colorClass.includes("service") && !colorClass.includes("startup") && "text-accent"
        )} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {count} {count === 1 ? "company" : "companies"}
        </p>
      </div>
      <span className="text-muted-foreground group-hover:text-accent transition-colors">
        →
      </span>
    </Link>
  );
}
