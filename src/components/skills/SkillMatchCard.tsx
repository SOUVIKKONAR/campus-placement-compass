import { SkillMatchResult } from "@/types/company";
import { Building2, CheckCircle2, XCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SkillMatchCardProps {
  result: SkillMatchResult;
}

export function SkillMatchCard({ result }: SkillMatchCardProps) {
  const { company, matchLevel, matchedSkills, gapSkills, preparationFocus } = result;

  const matchConfig = {
    high: {
      label: "High Match",
      class: "match-high",
      icon: CheckCircle2,
    },
    medium: {
      label: "Medium Match",
      class: "match-medium",
      icon: Target,
    },
    low: {
      label: "Low Match",
      class: "match-low",
      icon: XCircle,
    },
  };

  const config = matchConfig[matchLevel];
  const MatchIcon = config.icon;

  return (
    <div className="data-card">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary shrink-0">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.name}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <Building2 className="h-6 w-6 text-muted-foreground" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link 
                to={`/company/${company.id || encodeURIComponent(company.name)}`}
                className="font-semibold text-foreground hover:text-accent transition-colors"
              >
                {company.name}
              </Link>
              <p className="text-xs text-muted-foreground">{company.category}</p>
            </div>
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
              config.class
            )}>
              <MatchIcon className="h-3 w-3" />
              {config.label}
            </span>
          </div>

          {/* Matched Skills */}
          {matchedSkills.length > 0 && (
            <div className="mt-3">
              <span className="text-xs font-medium text-muted-foreground">Matched Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-0.5 bg-success/10 text-success text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gap Skills */}
          {gapSkills.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-medium text-muted-foreground">Skill Gaps:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {gapSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Focus */}
          {preparationFocus.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-xs font-medium text-muted-foreground">Focus Areas:</span>
              <p className="text-sm mt-1">{preparationFocus.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
