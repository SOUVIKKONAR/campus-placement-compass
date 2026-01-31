import { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Building2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareSelectorProps {
  selectedCompanies: Company[];
  onRemove: (company: Company) => void;
  onClear: () => void;
  maxCompanies?: number;
}

export function CompareSelector({ 
  selectedCompanies, 
  onRemove, 
  onClear,
  maxCompanies = 2 
}: CompareSelectorProps) {
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Selected for Comparison</h3>
        {selectedCompanies.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: maxCompanies }).map((_, idx) => {
          const company = selectedCompanies[idx];
          
          return (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border-2 border-dashed",
                company 
                  ? "border-accent bg-accent/5" 
                  : "border-border"
              )}
            >
              {company ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary shrink-0">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.category}</p>
                  </div>
                  <button
                    onClick={() => onRemove(company)}
                    className="shrink-0 p-1 hover:bg-secondary rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <div className="flex-1 text-center py-2">
                  <p className="text-sm text-muted-foreground">
                    Select Company {idx + 1}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
