import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { CompareSelector } from "@/components/compare/CompareSelector";
import { ComparisonTable, defaultComparisonSections } from "@/components/compare/ComparisonTable";
import { CompanyCard } from "@/components/company/CompanyCard";
import { EmptyState } from "@/components/company/EmptyState";
import { SearchBar } from "@/components/filters/SearchBar";
import { useCompanies } from "@/hooks/useCompanies";
import { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { GitCompare, AlertCircle } from "lucide-react";

export default function Compare() {
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: companies, isLoading } = useCompanies();

  const addCompany = (company: Company) => {
    if (selectedCompanies.length < 2 && !selectedCompanies.find(c => c.name === company.name)) {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const removeCompany = (company: Company) => {
    setSelectedCompanies(selectedCompanies.filter(c => c.name !== company.name));
  };

  const clearSelection = () => {
    setSelectedCompanies([]);
  };

  // Filter available companies
  const availableCompanies = (companies || []).filter(company => {
    // Exclude already selected
    if (selectedCompanies.find(c => c.name === company.name)) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableText = `${company.name} ${company.category || ""}`.toLowerCase();
      if (!searchableText.includes(query)) return false;
    }
    
    return true;
  });

  const canCompare = selectedCompanies.length === 2;

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Compare Companies"
          description="Select two companies for side-by-side structured comparison"
        />

        {/* Selection Area */}
        <div className="mb-8">
          <CompareSelector
            selectedCompanies={selectedCompanies}
            onRemove={removeCompany}
            onClear={clearSelection}
          />
        </div>

        {/* Comparison View */}
        {canCompare ? (
          <div className="data-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-accent" />
                Comparison Results
              </h2>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                New Comparison
              </Button>
            </div>
            
            <ComparisonTable
              companies={selectedCompanies as [Company, Company]}
              sections={defaultComparisonSections}
            />
          </div>
        ) : (
          <div>
            {/* Info Banner */}
            {selectedCompanies.length === 1 && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20 mb-6">
                <AlertCircle className="h-5 w-5 text-accent shrink-0" />
                <p className="text-sm">
                  Select one more company to start comparing. Choose from the list below.
                </p>
              </div>
            )}

            {/* Search */}
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search companies to compare..."
                className="max-w-md"
              />
            </div>

            {/* Available Companies Grid */}
            {isLoading ? (
              <p className="text-muted-foreground">Loading companies...</p>
            ) : availableCompanies.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableCompanies.map((company) => (
                  <div
                    key={company.id || company.name}
                    onClick={() => addCompany(company)}
                    className="cursor-pointer"
                  >
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="database"
                title="No companies available"
                description="Connect to the database to load companies for comparison"
              />
            )}
          </div>
        )}
      </PageContainer>
    </AppLayout>
  );
}
