import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { SkillInput } from "@/components/skills/SkillInput";
import { SkillMatchCard } from "@/components/skills/SkillMatchCard";
import { EmptyState } from "@/components/company/EmptyState";
import { useCompanies } from "@/hooks/useCompanies";
import { matchSkillsToCompany } from "@/services/companyService";
import { SkillMatchResult } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Target, AlertCircle, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SkillMapping() {
  const [skills, setSkills] = useState<string[]>([]);
  const [matchFilter, setMatchFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const { data: companies, isLoading } = useCompanies();

  // Compute skill matches for all companies
  const matchResults = useMemo<SkillMatchResult[]>(() => {
    if (!skills.length || !companies?.length) return [];

    return companies
      .map(company => matchSkillsToCompany(skills, company))
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.matchLevel] - order[b.matchLevel];
      });
  }, [skills, companies]);

  // Filter results by match level
  const filteredResults = useMemo(() => {
    if (matchFilter === "all") return matchResults;
    return matchResults.filter(r => r.matchLevel === matchFilter);
  }, [matchResults, matchFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      high: matchResults.filter(r => r.matchLevel === "high").length,
      medium: matchResults.filter(r => r.matchLevel === "medium").length,
      low: matchResults.filter(r => r.matchLevel === "low").length,
    };
  }, [matchResults]);

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Skill Mapping"
          description="Match your skills against company requirements to find the best fit"
        />

        {/* Skill Input Section */}
        <div className="data-card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="font-semibold">Your Skills</h2>
          </div>
          <SkillInput
            skills={skills}
            onChange={setSkills}
            placeholder="Add skills (React, Python, AWS, etc.)"
          />
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border mb-6">
          <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How it works</p>
            <p>
              Skills are matched against company tech stacks, AI/ML adoption, automation levels, 
              and skill relevance fields. This is rule-based matching — no AI inference.
            </p>
          </div>
        </div>

        {/* Results Section */}
        {skills.length > 0 && (
          <div>
            {/* Stats & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredResults.length} companies matched
                </span>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-success/10 text-success">
                    High: {stats.high}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-warning/10 text-warning">
                    Medium: {stats.medium}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                    Low: {stats.low}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={matchFilter} onValueChange={(v) => setMatchFilter(v as typeof matchFilter)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter matches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matches</SelectItem>
                    <SelectItem value="high">High Match</SelectItem>
                    <SelectItem value="medium">Medium Match</SelectItem>
                    <SelectItem value="low">Low Match</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <p className="text-muted-foreground">Analyzing matches...</p>
            ) : filteredResults.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredResults.map((result) => (
                  <SkillMatchCard 
                    key={result.company.id || result.company.name} 
                    result={result} 
                  />
                ))}
              </div>
            ) : matchResults.length > 0 ? (
              <EmptyState
                icon="search"
                title="No matches for this filter"
                description="Try selecting a different match level filter"
                action={
                  <Button variant="outline" onClick={() => setMatchFilter("all")}>
                    Show All Matches
                  </Button>
                }
              />
            ) : (
              <EmptyState
                icon="database"
                title="No companies to match"
                description="Connect to the database to load company data for skill matching"
              />
            )}
          </div>
        )}

        {/* Empty state when no skills entered */}
        {skills.length === 0 && (
          <EmptyState
            icon="search"
            title="Add your skills to get started"
            description="Enter skills like React, Python, Machine Learning to see which companies match your profile"
          />
        )}
      </PageContainer>
    </AppLayout>
  );
}
