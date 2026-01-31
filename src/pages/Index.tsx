import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Briefcase, 
  Rocket,
  ChevronRight,
  BarChart3,
  PieChart
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { StatCard } from "@/components/dashboard/StatCard";
import { CategoryTile } from "@/components/dashboard/CategoryTile";
import { InsightCard, InsightBar } from "@/components/dashboard/InsightCard";
import { SearchBar } from "@/components/filters/SearchBar";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder stats - will be populated from Supabase
  const stats = {
    total: 0,
    techGiants: 0,
    productCompanies: 0,
    serviceCompanies: 0,
    startups: 0,
  };

  const categories = [
    { 
      title: "Tech Giants", 
      count: stats.techGiants, 
      icon: Globe, 
      to: "/categories?category=Tech+Giant",
      colorClass: "tech-giant"
    },
    { 
      title: "Product Companies", 
      count: stats.productCompanies, 
      icon: Cpu, 
      to: "/categories?category=Product+Company",
      colorClass: "product"
    },
    { 
      title: "Service Companies", 
      count: stats.serviceCompanies, 
      icon: Briefcase, 
      to: "/categories?category=Service+Company",
      colorClass: "service"
    },
    { 
      title: "Startups & Scale-ups", 
      count: stats.startups, 
      icon: Rocket, 
      to: "/categories?category=Startup",
      colorClass: "startup"
    },
  ];

  return (
    <AppLayout>
      <PageContainer>
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Placement Intelligence
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Data-driven insights for smarter placement decisions. Analyze companies, 
            compare opportunities, and match your skills.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by company name, sector, or tech stack..."
            className="max-w-2xl"
          />
          {searchQuery && (
            <div className="mt-2">
              <Link to={`/companies?search=${encodeURIComponent(searchQuery)}`}>
                <Button variant="link" className="px-0">
                  Search all companies <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Companies"
            value={stats.total || "—"}
            icon={Building2}
          />
          <StatCard
            label="Active Hiring"
            value="—"
            icon={Users}
          />
          <StatCard
            label="High Velocity"
            value="—"
            icon={TrendingUp}
          />
          <StatCard
            label="Profitable"
            value="—"
            icon={BarChart3}
          />
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Browse by Category</h2>
            <Link to="/categories">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryTile
                key={category.title}
                title={category.title}
                count={category.count}
                icon={category.icon}
                to={category.to}
                colorClass={category.colorClass}
              />
            ))}
          </div>
        </div>

        {/* Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard title="Hiring Velocity Distribution" icon={TrendingUp}>
            <div className="space-y-3">
              <InsightBar label="High" value={0} maxValue={100} colorClass="bg-velocity-high" />
              <InsightBar label="Medium" value={0} maxValue={100} colorClass="bg-velocity-medium" />
              <InsightBar label="Low" value={0} maxValue={100} colorClass="bg-velocity-low" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Connect to database to view live data
            </p>
          </InsightCard>

          <InsightCard title="Profitability Status" icon={PieChart}>
            <div className="space-y-3">
              <InsightBar label="Profitable" value={0} maxValue={100} colorClass="bg-success" />
              <InsightBar label="Break-even" value={0} maxValue={100} colorClass="bg-warning" />
              <InsightBar label="Non-Profitable" value={0} maxValue={100} colorClass="bg-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Connect to database to view live data
            </p>
          </InsightCard>

          <InsightCard title="Work Mode Distribution" icon={Building2}>
            <div className="space-y-3">
              <InsightBar label="Remote" value={0} maxValue={100} colorClass="bg-chart-1" />
              <InsightBar label="Hybrid" value={0} maxValue={100} colorClass="bg-chart-2" />
              <InsightBar label="On-site" value={0} maxValue={100} colorClass="bg-chart-3" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Connect to database to view live data
            </p>
          </InsightCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/compare">
              <Button variant="outline">
                Compare Companies
              </Button>
            </Link>
            <Link to="/skills">
              <Button variant="outline">
                Match Your Skills
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}
