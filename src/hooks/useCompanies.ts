// React Query hooks for company data access

import { useQuery } from "@tanstack/react-query";
import {
  fetchCompanies,
  fetchCompanyById,
  fetchCompaniesByCategory,
  fetchCompaniesWithFilters,
  searchCompanies,
  getCompanyStats,
  getDistinctValues,
} from "@/services/companyService";
import { Company, CompanyFilters } from "@/types/company";

// Query keys
export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (filters: Partial<CompanyFilters>) => [...companyKeys.lists(), filters] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
  category: (category: string) => [...companyKeys.all, "category", category] as const,
  search: (query: string) => [...companyKeys.all, "search", query] as const,
  stats: () => [...companyKeys.all, "stats"] as const,
  distinctValues: (field: keyof Company) => [...companyKeys.all, "distinct", field] as const,
};

/**
 * Fetch all companies
 */
export function useCompanies() {
  return useQuery({
    queryKey: companyKeys.lists(),
    queryFn: fetchCompanies,
  });
}

/**
 * Fetch a single company by ID
 */
export function useCompany(id: string | undefined) {
  return useQuery({
    queryKey: companyKeys.detail(id!),
    queryFn: () => fetchCompanyById(id!),
    enabled: !!id,
  });
}

/**
 * Fetch companies by category
 */
export function useCompaniesByCategory(category: string | undefined) {
  return useQuery({
    queryKey: companyKeys.category(category!),
    queryFn: () => fetchCompaniesByCategory(category!),
    enabled: !!category,
  });
}

/**
 * Fetch companies with filters
 */
export function useFilteredCompanies(filters: Partial<CompanyFilters>) {
  return useQuery({
    queryKey: companyKeys.list(filters),
    queryFn: () => fetchCompaniesWithFilters(filters),
  });
}

/**
 * Search companies
 */
export function useSearchCompanies(query: string) {
  return useQuery({
    queryKey: companyKeys.search(query),
    queryFn: () => searchCompanies(query),
    enabled: query.length >= 2,
  });
}

/**
 * Get company statistics
 */
export function useCompanyStats() {
  return useQuery({
    queryKey: companyKeys.stats(),
    queryFn: getCompanyStats,
  });
}

/**
 * Get distinct values for filter options
 */
export function useDistinctValues(field: keyof Company) {
  return useQuery({
    queryKey: companyKeys.distinctValues(field),
    queryFn: () => getDistinctValues(field),
  });
}
