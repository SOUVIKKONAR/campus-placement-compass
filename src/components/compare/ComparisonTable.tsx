import { Company } from "@/types/company";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  companies: [Company, Company];
  sections: ComparisonSection[];
}

interface ComparisonSection {
  title: string;
  fields: {
    label: string;
    key: keyof Company;
    highlight?: "higher-better" | "lower-better";
  }[];
}

export function ComparisonTable({ companies, sections }: ComparisonTableProps) {
  const [company1, company2] = companies;

  const getValue = (company: Company, key: keyof Company) => {
    const value = company[key];
    if (value === null || value === undefined || value === "") {
      return "—";
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 sticky top-0 bg-background z-10 py-4 border-b border-border">
        <div className="font-medium text-muted-foreground text-sm">Field</div>
        {companies.map((company, idx) => (
          <div key={idx} className="flex items-center gap-3">
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
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{company.name}</p>
              <p className="text-xs text-muted-foreground">{company.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="space-y-2">
          <h4 className="font-semibold text-sm text-accent border-b border-border pb-2">
            {section.title}
          </h4>
          
          {section.fields.map((field, fieldIdx) => {
            const val1 = getValue(company1, field.key);
            const val2 = getValue(company2, field.key);

            return (
              <div
                key={fieldIdx}
                className={cn(
                  "grid grid-cols-[1fr,1fr,1fr] gap-4 py-2 text-sm",
                  fieldIdx % 2 === 0 && "bg-secondary/30 -mx-4 px-4 rounded"
                )}
              >
                <div className="text-muted-foreground">{field.label}</div>
                <div className="font-medium">{val1}</div>
                <div className="font-medium">{val2}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Default comparison sections
export const defaultComparisonSections: ComparisonSection[] = [
  {
    title: "Culture & Work Environment",
    fields: [
      { label: "Work Culture", key: "work_culture_summary" },
      { label: "Hiring Velocity", key: "hiring_velocity" },
      { label: "Employee Turnover", key: "employee_turnover" },
      { label: "Avg Retention", key: "avg_retention_tenure" },
      { label: "Psychological Safety", key: "psychological_safety" },
      { label: "Burnout Risk", key: "burnout_risk" },
    ],
  },
  {
    title: "Compensation & Benefits",
    fields: [
      { label: "Pay Structure", key: "fixed_vs_variable_pay" },
      { label: "Bonus Predictability", key: "bonus_predictability" },
      { label: "ESOPs/Incentives", key: "esops_incentives" },
      { label: "Health Insurance", key: "family_health_insurance" },
      { label: "Leave Policy", key: "leave_policy" },
    ],
  },
  {
    title: "Learning & Growth",
    fields: [
      { label: "Training Investment", key: "training_spend" },
      { label: "Learning Culture", key: "learning_culture" },
      { label: "Mentorship", key: "mentorship_availability" },
      { label: "Internal Mobility", key: "internal_mobility" },
      { label: "Exit Opportunities", key: "exit_opportunities" },
      { label: "Skill Relevance", key: "skill_relevance" },
    ],
  },
  {
    title: "Financials & Stability",
    fields: [
      { label: "Revenue", key: "annual_revenue" },
      { label: "Profitability", key: "profitability_status" },
      { label: "YoY Growth", key: "yoy_growth_rate" },
      { label: "Runway", key: "runway_months" },
      { label: "Key Investors", key: "key_investors" },
    ],
  },
  {
    title: "Technology",
    fields: [
      { label: "Tech Stack", key: "tech_stack" },
      { label: "AI/ML Adoption", key: "ai_ml_adoption_posture" },
      { label: "Automation Level", key: "automation_level" },
      { label: "R&D Investment", key: "r_and_d_investment" },
    ],
  },
  {
    title: "Career Signaling",
    fields: [
      { label: "Brand Value", key: "brand_sentiment_score" },
      { label: "Network Strength", key: "network_strength" },
      { label: "Global Exposure", key: "global_exposure" },
      { label: "External Recognition", key: "external_recognition" },
    ],
  },
];
