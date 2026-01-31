import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/filters/SearchBar";
import { FilterGroup, FilterPill } from "@/components/filters/FilterPill";
import { CompanyCard } from "@/components/company/CompanyCard";
import { CompanyCardSkeleton } from "@/components/company/CompanyCardSkeleton";
import { EmptyState } from "@/components/company/EmptyState";
import { useCompanies } from "@/hooks/useCompanies";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Filter options - will be populated from distinct values
const filterOptions = {
  category: ["Tech Giant", "Product Company", "Service Company", "Startup", "Scale-up"],
  hiring_velocity: ["High", "Medium", "Low"],
  profitability_status: ["Profitable", "Non-Profitable", "Break-even"],
  employee_size: ["1-50", "51-200", "201-500", "501-1000", "1000+"],
};

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "employee_size-desc", label: "Size (Largest)" },
  { value: "employee_size-asc", label: "Size (Smallest)" },
];

export default function Companies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    hiring_velocity: [],
    profitability_status: [],
    employee_size: [],
  });
  const [sortBy, setSortBy] = useState("name-asc");

  const { data: companies, isLoading } = useCompanies();

  const toggleFilter = (group: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[group] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      hiring_velocity: [],
      profitability_status: [],
      employee_size: [],
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  // Filter and sort companies (client-side for now)
  const filteredCompanies = (companies || []).filter(company => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableText = `${company.name} ${company.focus_sectors || ""} ${company.tech_stack || ""}`.toLowerCase();
      if (!searchableText.includes(query)) return false;
    }

    // Category filter
    if (activeFilters.category.length > 0) {
      if (!company.category || !activeFilters.category.includes(company.category)) return false;
    }

    // Hiring velocity filter
    if (activeFilters.hiring_velocity.length > 0) {
      if (!company.hiring_velocity || !activeFilters.hiring_velocity.includes(company.hiring_velocity)) return false;
    }

    // Profitability filter
    if (activeFilters.profitability_status.length > 0) {
      if (!company.profitability_status || !activeFilters.profitability_status.includes(company.profitability_status)) return false;
    }

    return true;
  });

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Explore Companies"
          description="Browse and filter companies visiting campus for placements"
        />

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, sector, or tech stack..."
            className="flex-1"
          />
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {Object.values(activeFilters).flat().length}
                </span>
              )}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="data-card mb-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <FilterGroup label="Category">
              {filterOptions.category.map(option => (
                <FilterPill
                  key={option}
                  label={option}
                  active={activeFilters.category.includes(option)}
                  onClick={() => toggleFilter("category", option)}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="Hiring Velocity">
              {filterOptions.hiring_velocity.map(option => (
                <FilterPill
                  key={option}
                  label={option}
                  active={activeFilters.hiring_velocity.includes(option)}
                  onClick={() => toggleFilter("hiring_velocity", option)}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="Profitability">
              {filterOptions.profitability_status.map(option => (
                <FilterPill
                  key={option}
                  label={option}
                  active={activeFilters.profitability_status.includes(option)}
                  onClick={() => toggleFilter("profitability_status", option)}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="Employee Size">
              {filterOptions.employee_size.map(option => (
                <FilterPill
                  key={option}
                  label={option}
                  active={activeFilters.employee_size.includes(option)}
                  onClick={() => toggleFilter("employee_size", option)}
                />
              ))}
            </FilterGroup>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${filteredCompanies.length} companies found`}
          </p>
        </div>

        {/* Company Grid */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id || company.name} company={company} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="database"
            title="No companies found"
            description={
              hasActiveFilters || searchQuery
                ? "Try adjusting your filters or search query"
                : "Connect to the database to load company data"
            }
          />
        )}
      </PageContainer>
    </AppLayout>
  );
}
