// Company data service - abstraction layer for Supabase integration
// All data access goes through this service

import { Company, CompanyFilters, SkillMatchResult } from "@/types/company";

// Placeholder for Supabase client - will be wired later
// import { supabase } from "@/lib/supabase";

/**
 * Fetch all companies from the database
 */
export async function fetchCompanies(): Promise<Company[]> {
  // TODO: Wire to Supabase
  // const { data, error } = await supabase.from("company").select("*");
  // if (error) throw error;
  // return data;
  
  return [];
}

/**
 * Fetch a single company by ID
 */
export async function fetchCompanyById(id: string): Promise<Company | null> {
  // TODO: Wire to Supabase
  // const { data, error } = await supabase
  //   .from("company")
  //   .select("*")
  //   .eq("id", id)
  //   .maybeSingle();
  // if (error) throw error;
  // return data;
  
  return null;
}

/**
 * Fetch companies by category
 */
export async function fetchCompaniesByCategory(category: string): Promise<Company[]> {
  // TODO: Wire to Supabase
  // const { data, error } = await supabase
  //   .from("company")
  //   .select("*")
  //   .eq("category", category);
  // if (error) throw error;
  // return data;
  
  return [];
}

/**
 * Fetch companies with filters
 */
export async function fetchCompaniesWithFilters(filters: Partial<CompanyFilters>): Promise<Company[]> {
  // TODO: Wire to Supabase with dynamic filter building
  // let query = supabase.from("company").select("*");
  // 
  // if (filters.category?.length) {
  //   query = query.in("category", filters.category);
  // }
  // if (filters.hiring_velocity?.length) {
  //   query = query.in("hiring_velocity", filters.hiring_velocity);
  // }
  // ... etc
  // 
  // const { data, error } = await query;
  // if (error) throw error;
  // return data;
  
  return [];
}

/**
 * Search companies by name, focus sectors, or tech stack
 */
export async function searchCompanies(query: string): Promise<Company[]> {
  // TODO: Wire to Supabase with full-text search
  // const { data, error } = await supabase
  //   .from("company")
  //   .select("*")
  //   .or(`name.ilike.%${query}%,focus_sectors.ilike.%${query}%,tech_stack.ilike.%${query}%`);
  // if (error) throw error;
  // return data;
  
  return [];
}

/**
 * Get distinct values for a field (for filter options)
 */
export async function getDistinctValues(field: keyof Company): Promise<string[]> {
  // TODO: Wire to Supabase
  // const { data, error } = await supabase
  //   .from("company")
  //   .select(field)
  //   .not(field, "is", null);
  // if (error) throw error;
  // return [...new Set(data.map(d => d[field]))];
  
  return [];
}

/**
 * Get company statistics for dashboard
 */
export async function getCompanyStats(): Promise<{
  total: number;
  byCategory: Record<string, number>;
  byHiringVelocity: Record<string, number>;
  byProfitability: Record<string, number>;
}> {
  // TODO: Wire to Supabase with aggregation
  return {
    total: 0,
    byCategory: {},
    byHiringVelocity: {},
    byProfitability: {},
  };
}

/**
 * Rule-based skill matching (no AI inference)
 */
export function matchSkillsToCompany(
  skills: string[],
  company: Company
): SkillMatchResult {
  const normalizedSkills = skills.map(s => s.toLowerCase().trim());
  
  // Extract searchable fields
  const companyTechStack = (company.tech_stack || "").toLowerCase();
  const companyAiMl = (company.ai_ml_adoption_posture || "").toLowerCase();
  const companyAutomation = (company.automation_level || "").toLowerCase();
  const companySkillRelevance = (company.skill_relevance || "").toLowerCase();
  
  const searchableText = `${companyTechStack} ${companyAiMl} ${companyAutomation} ${companySkillRelevance}`;
  
  const matchedSkills: string[] = [];
  const gapSkills: string[] = [];
  
  normalizedSkills.forEach(skill => {
    if (searchableText.includes(skill)) {
      matchedSkills.push(skill);
    } else {
      gapSkills.push(skill);
    }
  });
  
  // Calculate match level
  const matchRatio = matchedSkills.length / normalizedSkills.length;
  let matchLevel: "high" | "medium" | "low";
  
  if (matchRatio >= 0.7) {
    matchLevel = "high";
  } else if (matchRatio >= 0.4) {
    matchLevel = "medium";
  } else {
    matchLevel = "low";
  }
  
  // Generate preparation focus based on gaps
  const preparationFocus = gapSkills.slice(0, 5);
  
  return {
    company,
    matchLevel,
    matchedSkills,
    gapSkills,
    preparationFocus,
  };
}

/**
 * Compare two companies across all sections
 */
export function compareCompanies(
  company1: Company,
  company2: Company
): {
  strengths: { company1: string[]; company2: string[] };
  tradeoffs: string[];
  riskAreas: string[];
} {
  // Rule-based comparison logic
  const strengths = { company1: [] as string[], company2: [] as string[] };
  const tradeoffs: string[] = [];
  const riskAreas: string[] = [];
  
  // Compare hiring velocity
  if (company1.hiring_velocity === "High" && company2.hiring_velocity !== "High") {
    strengths.company1.push("Higher hiring velocity");
  } else if (company2.hiring_velocity === "High" && company1.hiring_velocity !== "High") {
    strengths.company2.push("Higher hiring velocity");
  }
  
  // Compare profitability
  if (company1.profitability_status === "Profitable" && company2.profitability_status !== "Profitable") {
    strengths.company1.push("Profitable");
  } else if (company2.profitability_status === "Profitable" && company1.profitability_status !== "Profitable") {
    strengths.company2.push("Profitable");
  }
  
  // Check layoff history risks
  if (company1.layoff_history && company1.layoff_history.toLowerCase().includes("yes")) {
    riskAreas.push(`${company1.name}: Layoff history noted`);
  }
  if (company2.layoff_history && company2.layoff_history.toLowerCase().includes("yes")) {
    riskAreas.push(`${company2.name}: Layoff history noted`);
  }
  
  // Trade-offs based on category
  if (company1.category !== company2.category) {
    tradeoffs.push(`Different company types: ${company1.category} vs ${company2.category}`);
  }
  
  return { strengths, tradeoffs, riskAreas };
}
