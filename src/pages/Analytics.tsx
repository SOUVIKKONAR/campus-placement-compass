import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { InsightCard, InsightBar } from "@/components/dashboard/InsightCard";
import { EmptyState } from "@/components/company/EmptyState";
import { useCompanies } from "@/hooks/useCompanies";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Building2,
  Target,
  Briefcase,
  Rocket,
  Globe
} from "lucide-react";
import { useMemo } from "react";

export default function Analytics() {
  const { data: companies, isLoading } = useCompanies();

  // Compute analytics from company data
  const analytics = useMemo(() => {
    if (!companies?.length) return null;

    // Category distribution
    const categoryCount: Record<string, number> = {};
    companies.forEach(c => {
      const cat = c.category || "Unknown";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    // Hiring velocity distribution
    const velocityCount: Record<string, number> = { High: 0, Medium: 0, Low: 0 };
    companies.forEach(c => {
      const vel = c.hiring_velocity || "Unknown";
      if (vel.includes("High")) velocityCount.High++;
      else if (vel.includes("Low")) velocityCount.Low++;
      else velocityCount.Medium++;
    });

    // Profitability distribution
    const profitCount: Record<string, number> = { Profitable: 0, "Non-Profitable": 0, "Break-even": 0 };
    companies.forEach(c => {
      const status = c.profitability_status || "";
      if (status.includes("Profitable") && !status.includes("Non")) profitCount.Profitable++;
      else if (status.includes("Non")) profitCount["Non-Profitable"]++;
      else profitCount["Break-even"]++;
    });

    // Remote policy distribution
    const remoteCount: Record<string, number> = { Remote: 0, Hybrid: 0, "On-site": 0 };
    companies.forEach(c => {
      const policy = (c.remote_policy_details || "").toLowerCase();
      if (policy.includes("remote") && !policy.includes("hybrid")) remoteCount.Remote++;
      else if (policy.includes("hybrid")) remoteCount.Hybrid++;
      else remoteCount["On-site"]++;
    });

    // Product vs Service
    const productVsService = {
      Product: companies.filter(c => c.category?.toLowerCase().includes("product")).length,
      Service: companies.filter(c => c.category?.toLowerCase().includes("service")).length,
    };

    // Enterprise vs Startup
    const enterpriseVsStartup = {
      Enterprise: companies.filter(c => 
        c.category?.toLowerCase().includes("enterprise") || 
        c.category?.toLowerCase().includes("tech giant")
      ).length,
      Startup: companies.filter(c => 
        c.category?.toLowerCase().includes("startup") || 
        c.category?.toLowerCase().includes("scale")
      ).length,
    };

    return {
      total: companies.length,
      categoryCount,
      velocityCount,
      profitCount,
      remoteCount,
      productVsService,
      enterpriseVsStartup,
    };
  }, [companies]);

  const maxCategory = analytics 
    ? Math.max(...Object.values(analytics.categoryCount)) 
    : 100;

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader
          title="Analytics & Insights"
          description="Visual overview of the placement landscape across all companies"
        />

        {isLoading ? (
          <p className="text-muted-foreground">Loading analytics...</p>
        ) : !analytics ? (
          <EmptyState
            icon="database"
            title="No data available"
            description="Connect to the database to view analytics and insights"
          />
        ) : (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="data-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="stat-label">Total Companies</p>
                    <p className="stat-value">{analytics.total}</p>
                  </div>
                </div>
              </div>
              <div className="data-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velocity-high/10">
                    <TrendingUp className="h-5 w-5 text-velocity-high" />
                  </div>
                  <div>
                    <p className="stat-label">High Velocity</p>
                    <p className="stat-value">{analytics.velocityCount.High}</p>
                  </div>
                </div>
              </div>
              <div className="data-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <BarChart3 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="stat-label">Profitable</p>
                    <p className="stat-value">{analytics.profitCount.Profitable}</p>
                  </div>
                </div>
              </div>
              <div className="data-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-6/10">
                    <Target className="h-5 w-5 text-chart-6" />
                  </div>
                  <div>
                    <p className="stat-label">Remote-friendly</p>
                    <p className="stat-value">{analytics.remoteCount.Remote + analytics.remoteCount.Hybrid}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard title="Company Distribution by Category" icon={PieChart}>
                <div className="space-y-3">
                  {Object.entries(analytics.categoryCount)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count], idx) => (
                      <InsightBar
                        key={category}
                        label={category}
                        value={count}
                        maxValue={maxCategory}
                        colorClass={`bg-chart-${(idx % 6) + 1}`}
                      />
                    ))}
                </div>
              </InsightCard>

              <InsightCard title="Hiring Velocity Trends" icon={TrendingUp}>
                <div className="space-y-3">
                  <InsightBar
                    label="High"
                    value={analytics.velocityCount.High}
                    maxValue={analytics.total}
                    colorClass="bg-velocity-high"
                  />
                  <InsightBar
                    label="Medium"
                    value={analytics.velocityCount.Medium}
                    maxValue={analytics.total}
                    colorClass="bg-velocity-medium"
                  />
                  <InsightBar
                    label="Low"
                    value={analytics.velocityCount.Low}
                    maxValue={analytics.total}
                    colorClass="bg-velocity-low"
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {Math.round((analytics.velocityCount.High / analytics.total) * 100)}% of companies 
                    are actively hiring at high velocity
                  </p>
                </div>
              </InsightCard>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InsightCard title="Product vs Service Mix" icon={Briefcase}>
                <div className="space-y-3">
                  <InsightBar
                    label="Product Companies"
                    value={analytics.productVsService.Product}
                    maxValue={Math.max(analytics.productVsService.Product, analytics.productVsService.Service) || 1}
                    colorClass="bg-chart-2"
                  />
                  <InsightBar
                    label="Service Companies"
                    value={analytics.productVsService.Service}
                    maxValue={Math.max(analytics.productVsService.Product, analytics.productVsService.Service) || 1}
                    colorClass="bg-chart-3"
                  />
                </div>
              </InsightCard>

              <InsightCard title="Enterprise vs Startup Exposure" icon={Rocket}>
                <div className="space-y-3">
                  <InsightBar
                    label="Enterprise / Tech Giant"
                    value={analytics.enterpriseVsStartup.Enterprise}
                    maxValue={Math.max(analytics.enterpriseVsStartup.Enterprise, analytics.enterpriseVsStartup.Startup) || 1}
                    colorClass="bg-chart-1"
                  />
                  <InsightBar
                    label="Startup / Scale-up"
                    value={analytics.enterpriseVsStartup.Startup}
                    maxValue={Math.max(analytics.enterpriseVsStartup.Enterprise, analytics.enterpriseVsStartup.Startup) || 1}
                    colorClass="bg-chart-4"
                  />
                </div>
              </InsightCard>

              <InsightCard title="Work Mode Distribution" icon={Globe}>
                <div className="space-y-3">
                  <InsightBar
                    label="Remote"
                    value={analytics.remoteCount.Remote}
                    maxValue={analytics.total}
                    colorClass="bg-chart-1"
                  />
                  <InsightBar
                    label="Hybrid"
                    value={analytics.remoteCount.Hybrid}
                    maxValue={analytics.total}
                    colorClass="bg-chart-2"
                  />
                  <InsightBar
                    label="On-site"
                    value={analytics.remoteCount["On-site"]}
                    maxValue={analytics.total}
                    colorClass="bg-chart-3"
                  />
                </div>
              </InsightCard>
            </div>

            {/* Profitability Row */}
            <InsightCard title="Profitability Status Overview" icon={BarChart3} className="max-w-2xl">
              <div className="space-y-3">
                <InsightBar
                  label="Profitable"
                  value={analytics.profitCount.Profitable}
                  maxValue={analytics.total}
                  colorClass="bg-success"
                />
                <InsightBar
                  label="Break-even"
                  value={analytics.profitCount["Break-even"]}
                  maxValue={analytics.total}
                  colorClass="bg-warning"
                />
                <InsightBar
                  label="Non-Profitable"
                  value={analytics.profitCount["Non-Profitable"]}
                  maxValue={analytics.total}
                  colorClass="bg-destructive"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-success">
                    {Math.round((analytics.profitCount.Profitable / analytics.total) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Profitable</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">
                    {Math.round((analytics.profitCount["Break-even"] / analytics.total) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Break-even</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">
                    {Math.round((analytics.profitCount["Non-Profitable"] / analytics.total) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Non-Profitable</p>
                </div>
              </div>
            </InsightCard>
          </div>
        )}
      </PageContainer>
    </AppLayout>
  );
}
