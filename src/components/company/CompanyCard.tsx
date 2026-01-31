import { Company } from "@/types/company";
import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getCategoryClass = (category: string | null) => {
    if (!category) return "category-service";
    const cat = category.toLowerCase();
    if (cat.includes("tech giant") || cat.includes("big tech")) return "category-tech-giant";
    if (cat.includes("product")) return "category-product";
    if (cat.includes("startup") || cat.includes("scale")) return "category-startup";
    return "category-service";
  };

  const getVelocityClass = (velocity: string | null) => {
    if (!velocity) return "velocity-medium";
    const vel = velocity.toLowerCase();
    if (vel.includes("high")) return "velocity-high";
    if (vel.includes("low")) return "velocity-low";
    return "velocity-medium";
  };

  return (
    <Link
      to={`/company/${company.id || encodeURIComponent(company.name)}`}
      className="data-card group block transition-all hover:border-accent/50"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.name}
              className="h-10 w-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <Building2 className={cn("h-6 w-6 text-muted-foreground", company.logo_url && "hidden")} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                {company.name}
              </h3>
              {company.short_name && company.short_name !== company.name && (
                <p className="text-xs text-muted-foreground">{company.short_name}</p>
              )}
            </div>
            {company.category && (
              <span className={cn("category-badge shrink-0", getCategoryClass(company.category))}>
                {company.category}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {company.employee_size && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {company.employee_size}
              </span>
            )}
            {company.hiring_velocity && (
              <span className={cn("flex items-center gap-1", getVelocityClass(company.hiring_velocity))}>
                <TrendingUp className="h-3 w-3" />
                {company.hiring_velocity}
              </span>
            )}
            {company.office_location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[120px]">{company.office_location}</span>
              </span>
            )}
          </div>

          {/* Focus sectors */}
          {company.focus_sectors && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-1">
              {company.focus_sectors}
            </p>
          )}
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className={cn(
          "font-medium",
          company.profitability_status?.toLowerCase().includes("profitable") 
            ? "text-success" 
            : "text-muted-foreground"
        )}>
          {company.profitability_status || "—"}
        </span>
        <span className="text-muted-foreground">
          View Details →
        </span>
      </div>
    </Link>
  );
}
