import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/company/SectionHeader";
import { FieldDisplay, FieldGroup } from "@/components/company/FieldDisplay";
import { EmptyState } from "@/components/company/EmptyState";
import { useCompany } from "@/hooks/useCompanies";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Briefcase, 
  Users, 
  GraduationCap, 
  DollarSign,
  MapPin,
  TrendingUp,
  Cpu,
  UserCircle,
  Globe,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "culture", label: "Culture", icon: Users },
  { id: "growth", label: "Growth", icon: GraduationCap },
  { id: "compensation", label: "Compensation", icon: DollarSign },
  { id: "logistics", label: "Logistics", icon: MapPin },
  { id: "financials", label: "Financials", icon: TrendingUp },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "leadership", label: "Leadership", icon: UserCircle },
  { id: "brand", label: "Brand", icon: Globe },
];

export default function CompanyDetail() {
  const { id } = useParams();
  const { data: company, isLoading, error } = useCompany(id);

  if (isLoading) {
    return (
      <AppLayout>
        <PageContainer>
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </PageContainer>
      </AppLayout>
    );
  }

  if (!company) {
    return (
      <AppLayout>
        <PageContainer>
          <EmptyState
            icon="database"
            title="Company not found"
            description="The company you're looking for doesn't exist or hasn't been loaded yet."
            action={
              <Link to="/companies">
                <Button>Browse Companies</Button>
              </Link>
            }
          />
        </PageContainer>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageContainer className="max-w-5xl">
        {/* Back Link */}
        <Link to="/companies" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Companies
        </Link>

        {/* Company Header */}
        <div className="data-card mb-6">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-secondary shrink-0">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-16 w-16 object-contain"
                />
              ) : (
                <Building2 className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{company.name}</h1>
                  {company.short_name && company.short_name !== company.name && (
                    <p className="text-muted-foreground">{company.short_name}</p>
                  )}
                </div>
                {company.category && (
                  <span className={cn(
                    "category-badge text-sm",
                    company.category.toLowerCase().includes("tech") && "category-tech-giant",
                    company.category.toLowerCase().includes("product") && "category-product",
                    company.category.toLowerCase().includes("service") && "category-service",
                    company.category.toLowerCase().includes("startup") && "category-startup",
                  )}>
                    {company.category}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                {company.employee_size && (
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {company.employee_size} employees
                  </span>
                )}
                {company.headquarters_address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.headquarters_address}
                  </span>
                )}
                {company.incorporation_year && (
                  <span>Est. {company.incorporation_year}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 mb-6">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="gap-2 whitespace-nowrap"
              >
                <section.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Section 1: Overview */}
          <TabsContent value="overview" className="data-card animate-fade-in">
            <SectionHeader icon={Building2} title="Company Overview" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Name" value={company.name} />
              <FieldDisplay label="Short Name" value={company.short_name} />
              <FieldDisplay label="Category" value={company.category} />
              <FieldDisplay label="Nature of Company" value={company.nature_of_company} />
              <FieldDisplay label="Incorporation Year" value={company.incorporation_year} />
              <FieldDisplay label="Employee Size" value={company.employee_size} />
              <FieldDisplay label="Headquarters" value={company.headquarters_address} />
              <FieldDisplay label="Operating Countries" value={company.operating_countries} />
              <FieldDisplay label="Office Count" value={company.office_count} />
              <FieldDisplay label="Office Locations" value={company.office_location} />
            </FieldGroup>
            <div className="mt-6">
              <FieldDisplay label="Overview" value={company.overview_text} />
            </div>
            <div className="mt-4">
              <FieldDisplay label="History Timeline" value={company.history_timeline} />
            </div>
            <div className="mt-4">
              <FieldDisplay label="Recent News" value={company.recent_news} />
            </div>
          </TabsContent>

          {/* Section 2: Business & Market */}
          <TabsContent value="business" className="data-card animate-fade-in">
            <SectionHeader icon={Briefcase} title="Business & Market" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Focus Sectors" value={company.focus_sectors} type="list" />
              <FieldDisplay label="Pain Points Addressed" value={company.pain_points_addressed} />
              <FieldDisplay label="Core Value Proposition" value={company.core_value_proposition} />
              <FieldDisplay label="Unique Differentiators" value={company.unique_differentiators} />
              <FieldDisplay label="Competitive Advantages" value={company.competitive_advantages} />
              <FieldDisplay label="Weaknesses & Gaps" value={company.weaknesses_gaps} />
              <FieldDisplay label="Key Challenges" value={company.key_challenges_needs} />
              <FieldDisplay label="Key Competitors" value={company.key_competitors} />
              <FieldDisplay label="Top Customers" value={company.top_customers} />
              <FieldDisplay label="Offerings" value={company.offerings_descriptions} />
            </FieldGroup>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="data-card-dense">
                <span className="stat-label">TAM</span>
                <span className="stat-value-sm">{company.tam || "—"}</span>
              </div>
              <div className="data-card-dense">
                <span className="stat-label">SAM</span>
                <span className="stat-value-sm">{company.sam || "—"}</span>
              </div>
              <div className="data-card-dense">
                <span className="stat-label">SOM</span>
                <span className="stat-value-sm">{company.som || "—"}</span>
              </div>
            </div>
          </TabsContent>

          {/* Section 3: Culture */}
          <TabsContent value="culture" className="data-card animate-fade-in">
            <SectionHeader icon={Users} title="Culture, People & Work" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Work Culture Summary" value={company.work_culture_summary} />
              <FieldDisplay label="Hiring Velocity" value={company.hiring_velocity} />
              <FieldDisplay label="Employee Turnover" value={company.employee_turnover} />
              <FieldDisplay label="Avg Retention Tenure" value={company.avg_retention_tenure} />
              <FieldDisplay label="Manager Quality" value={company.manager_quality} />
              <FieldDisplay label="Psychological Safety" value={company.psychological_safety} />
              <FieldDisplay label="Feedback Culture" value={company.feedback_culture} />
              <FieldDisplay label="Diversity Metrics" value={company.diversity_metrics} />
              <FieldDisplay label="D&I Score" value={company.diversity_inclusion_score} />
              <FieldDisplay label="Ethical Standards" value={company.ethical_standards} />
              <FieldDisplay label="Layoff History" value={company.layoff_history} />
              <FieldDisplay label="Burnout Risk" value={company.burnout_risk} />
              <FieldDisplay label="Mission Clarity" value={company.mission_clarity} />
            </FieldGroup>
          </TabsContent>

          {/* Section 4: Learning & Growth */}
          <TabsContent value="growth" className="data-card animate-fade-in">
            <SectionHeader icon={GraduationCap} title="Learning, Growth & Career Signal" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Training Spend" value={company.training_spend} />
              <FieldDisplay label="Onboarding Quality" value={company.onboarding_quality} />
              <FieldDisplay label="Learning Culture" value={company.learning_culture} />
              <FieldDisplay label="Exposure Quality" value={company.exposure_quality} />
              <FieldDisplay label="Mentorship Availability" value={company.mentorship_availability} />
              <FieldDisplay label="Internal Mobility" value={company.internal_mobility} />
              <FieldDisplay label="Promotion Clarity" value={company.promotion_clarity} />
              <FieldDisplay label="Tools Access" value={company.tools_access} />
              <FieldDisplay label="Role Clarity" value={company.role_clarity} />
              <FieldDisplay label="Early Ownership" value={company.early_ownership} />
              <FieldDisplay label="Work Impact" value={company.work_impact} />
              <FieldDisplay label="Execution/Thinking Balance" value={company.execution_thinking_balance} />
              <FieldDisplay label="Automation Level" value={company.automation_level} />
              <FieldDisplay label="Cross-functional Exposure" value={company.cross_functional_exposure} />
              <FieldDisplay label="Exit Opportunities" value={company.exit_opportunities} />
              <FieldDisplay label="Skill Relevance" value={company.skill_relevance} />
              <FieldDisplay label="Network Strength" value={company.network_strength} />
              <FieldDisplay label="Global Exposure" value={company.global_exposure} />
              <FieldDisplay label="External Recognition" value={company.external_recognition} />
            </FieldGroup>
          </TabsContent>

          {/* Section 5: Compensation */}
          <TabsContent value="compensation" className="data-card animate-fade-in">
            <SectionHeader icon={DollarSign} title="Compensation & Lifestyle" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Fixed vs Variable Pay" value={company.fixed_vs_variable_pay} />
              <FieldDisplay label="Bonus Predictability" value={company.bonus_predictability} />
              <FieldDisplay label="ESOPs/Incentives" value={company.esops_incentives} />
              <FieldDisplay label="Family Health Insurance" value={company.family_health_insurance} />
              <FieldDisplay label="Relocation Support" value={company.relocation_support} />
              <FieldDisplay label="Leave Policy" value={company.leave_policy} />
              <FieldDisplay label="Health Support" value={company.health_support} />
            </FieldGroup>
          </TabsContent>

          {/* Section 6: Logistics */}
          <TabsContent value="logistics" className="data-card animate-fade-in">
            <SectionHeader icon={MapPin} title="Work Logistics & Safety" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Remote Policy" value={company.remote_policy_details} />
              <FieldDisplay label="Typical Hours" value={company.typical_hours} />
              <FieldDisplay label="Overtime Expectations" value={company.overtime_expectations} />
              <FieldDisplay label="Weekend Work" value={company.weekend_work} />
              <FieldDisplay label="Flexibility Level" value={company.flexibility_level} />
              <FieldDisplay label="Location Centrality" value={company.location_centrality} />
              <FieldDisplay label="Public Transport Access" value={company.public_transport_access} />
              <FieldDisplay label="Cab Policy" value={company.cab_policy} />
              <FieldDisplay label="Airport Commute Time" value={company.airport_commute_time} />
              <FieldDisplay label="Office Zone Type" value={company.office_zone_type} />
              <FieldDisplay label="Area Safety" value={company.area_safety} />
              <FieldDisplay label="Safety Policies" value={company.safety_policies} />
              <FieldDisplay label="Infrastructure Safety" value={company.infrastructure_safety} />
              <FieldDisplay label="Emergency Preparedness" value={company.emergency_preparedness} />
            </FieldGroup>
          </TabsContent>

          {/* Section 7: Financials */}
          <TabsContent value="financials" className="data-card animate-fade-in">
            <SectionHeader icon={TrendingUp} title="Financials, Risk & Stability" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Annual Revenue" value={company.annual_revenue} />
              <FieldDisplay label="Annual Profit" value={company.annual_profit} />
              <FieldDisplay label="Revenue Mix" value={company.revenue_mix} />
              <FieldDisplay label="Valuation" value={company.valuation} />
              <FieldDisplay label="YoY Growth Rate" value={company.yoy_growth_rate} />
              <FieldDisplay label="Profitability Status" value={company.profitability_status} />
              <FieldDisplay label="Key Investors" value={company.key_investors} />
              <FieldDisplay label="Recent Funding Rounds" value={company.recent_funding_rounds} />
              <FieldDisplay label="Total Capital Raised" value={company.total_capital_raised} />
              <FieldDisplay label="Burn Rate" value={company.burn_rate} />
              <FieldDisplay label="Runway (Months)" value={company.runway_months} />
              <FieldDisplay label="Burn Multiplier" value={company.burn_multiplier} />
              <FieldDisplay label="ESG Ratings" value={company.esg_ratings} />
              <FieldDisplay label="Geopolitical Risks" value={company.geopolitical_risks} />
              <FieldDisplay label="Macro Risks" value={company.macro_risks} />
            </FieldGroup>
          </TabsContent>

          {/* Section 8: Technology */}
          <TabsContent value="technology" className="data-card animate-fade-in">
            <SectionHeader icon={Cpu} title="Technology & Innovation" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Tech Stack" value={company.tech_stack} type="list" />
              <FieldDisplay label="Technology Partners" value={company.technology_partners} />
              <FieldDisplay label="Intellectual Property" value={company.intellectual_property} />
              <FieldDisplay label="R&D Investment" value={company.r_and_d_investment} />
              <FieldDisplay label="AI/ML Adoption" value={company.ai_ml_adoption_posture} />
              <FieldDisplay label="Cybersecurity Posture" value={company.cybersecurity_posture} />
              <FieldDisplay label="Innovation Roadmap" value={company.innovation_roadmap} />
              <FieldDisplay label="Product Pipeline" value={company.product_pipeline} />
              <FieldDisplay label="Tech Adoption Rating" value={company.tech_adoption_rating} />
              <FieldDisplay label="Partnership Ecosystem" value={company.partnership_ecosystem} />
            </FieldGroup>
          </TabsContent>

          {/* Section 9: Leadership */}
          <TabsContent value="leadership" className="data-card animate-fade-in">
            <SectionHeader icon={UserCircle} title="Leadership & Contacts" />
            <FieldGroup columns={2}>
              <FieldDisplay label="CEO Name" value={company.ceo_name} />
              <FieldDisplay label="CEO LinkedIn" value={company.ceo_linkedin_url} type="link" />
              <FieldDisplay label="Key Leaders" value={company.key_leaders} />
              <FieldDisplay label="Board Members" value={company.board_members} />
              <FieldDisplay label="Warm Intro Pathways" value={company.warm_intro_pathways} />
              <FieldDisplay label="Decision Maker Access" value={company.decision_maker_access} />
              <FieldDisplay label="Contact Person" value={company.contact_person_name} />
              <FieldDisplay label="Contact Email" value={company.primary_contact_email} type="email" />
              <FieldDisplay label="Phone Number" value={company.primary_phone_number} type="phone" />
            </FieldGroup>
          </TabsContent>

          {/* Section 10: Brand */}
          <TabsContent value="brand" className="data-card animate-fade-in">
            <SectionHeader icon={Globe} title="Brand & Digital Presence" />
            <FieldGroup columns={2}>
              <FieldDisplay label="Website" value={company.website_url} type="link" />
              <FieldDisplay label="Website Quality" value={company.website_quality} />
              <FieldDisplay label="Website Rating" value={company.website_rating} type="rating" />
              <FieldDisplay label="Traffic Rank" value={company.website_traffic_rank} />
              <FieldDisplay label="Social Media Followers" value={company.social_media_followers} />
              <FieldDisplay label="Glassdoor Rating" value={company.glassdoor_rating} type="rating" />
              <FieldDisplay label="Indeed Rating" value={company.indeed_rating} type="rating" />
              <FieldDisplay label="Google Rating" value={company.google_rating} type="rating" />
              <FieldDisplay label="LinkedIn" value={company.linkedin_url} type="link" />
              <FieldDisplay label="Twitter" value={company.twitter_handle} />
              <FieldDisplay label="Facebook" value={company.facebook_url} type="link" />
              <FieldDisplay label="Instagram" value={company.instagram_url} type="link" />
              <FieldDisplay label="Marketing Video" value={company.marketing_video_url} type="link" />
              <FieldDisplay label="Customer Testimonials" value={company.customer_testimonials} />
              <FieldDisplay label="Awards & Recognitions" value={company.awards_recognitions} />
              <FieldDisplay label="Brand Sentiment Score" value={company.brand_sentiment_score} />
              <FieldDisplay label="Event Participation" value={company.event_participation} />
            </FieldGroup>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </AppLayout>
  );
}
