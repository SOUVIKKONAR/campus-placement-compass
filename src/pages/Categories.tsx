import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { CategoryTile } from "@/components/dashboard/CategoryTile";
import { CompanyCard } from "@/components/company/CompanyCard";
import { CompanyCardSkeleton } from "@/components/company/CompanyCardSkeleton";
import { EmptyState } from "@/components/company/EmptyState";
import { useCompanies } from "@/hooks/useCompanies";
import { Globe, Cpu, Briefcase, Rocket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { 
    id: "Tech Giant", 
    title: "Tech Giants", 
    icon: Globe, 
    colorClass: "tech-giant",
    description: "Major technology corporations with global presence"
  },
  { 
    id: "Product Company", 
    title: "Product Companies", 
    icon: Cpu, 
    colorClass: "product",
    description: "Companies focused on building and selling products"
  },
  { 
    id: "Service Company", 
    title: "Service Companies", 
    icon: Briefcase, 
    colorClass: "service",
    description: "IT services, consulting, and outsourcing firms"
  },
  { 
    id: "Startup", 
    title: "Startups & Scale-ups", 
    icon: Rocket, 
    colorClass: "startup",
    description: "Early-stage and growth-stage companies"
  },
];

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const { data: companies, isLoading } = useCompanies();

  const selectCategory = (categoryId: string | null) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  // Filter companies by selected category
  const filteredCompanies = selectedCategory
    ? (companies || []).filter(c => c.category === selectedCategory)
    : [];

  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Company Categories"
          description="Explore companies organized by type and business model"
        />

        {/* Category Selection */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => {
              const count = (companies || []).filter(c => c.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className="data-card text-left hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-lg shrink-0",
                      category.colorClass === "tech-giant" && "bg-chart-1/10",
                      category.colorClass === "product" && "bg-chart-2/10",
                      category.colorClass === "service" && "bg-chart-3/10",
                      category.colorClass === "startup" && "bg-chart-4/10",
                    )}>
                      <category.icon className={cn(
                        "h-7 w-7",
                        category.colorClass === "tech-giant" && "text-chart-1",
                        category.colorClass === "product" && "text-chart-2",
                        category.colorClass === "service" && "text-chart-3",
                        category.colorClass === "startup" && "text-chart-4",
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium mt-2">
                        {count} {count === 1 ? "company" : "companies"}
                      </p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-accent transition-colors text-xl">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectCategory(null)}
              >
                ← All Categories
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{selectedCategoryInfo?.title}</span>
            </div>

            {/* Category Header */}
            {selectedCategoryInfo && (
              <div className="data-card mb-6 flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg",
                  selectedCategoryInfo.colorClass === "tech-giant" && "bg-chart-1/10",
                  selectedCategoryInfo.colorClass === "product" && "bg-chart-2/10",
                  selectedCategoryInfo.colorClass === "service" && "bg-chart-3/10",
                  selectedCategoryInfo.colorClass === "startup" && "bg-chart-4/10",
                )}>
                  <selectedCategoryInfo.icon className={cn(
                    "h-6 w-6",
                    selectedCategoryInfo.colorClass === "tech-giant" && "text-chart-1",
                    selectedCategoryInfo.colorClass === "product" && "text-chart-2",
                    selectedCategoryInfo.colorClass === "service" && "text-chart-3",
                    selectedCategoryInfo.colorClass === "startup" && "text-chart-4",
                  )} />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{selectedCategoryInfo.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"}
                  </p>
                </div>
              </div>
            )}

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
                title="No companies in this category"
                description="Connect to the database to load company data"
              />
            )}
          </div>
        )}
      </PageContainer>
    </AppLayout>
  );
}
