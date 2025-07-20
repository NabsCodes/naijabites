import { SearchSuggestion } from "@/types/search";
import { products } from "@/lib/mock-data/products";
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";

// Constants
export const SEARCH_VALIDATION = {
  DEBOUNCE_MIN_LENGTH: 2,
} as const;

// Validation functions
export function shouldTriggerSearch(query: string): boolean {
  return query.trim().length >= SEARCH_VALIDATION.DEBOUNCE_MIN_LENGTH;
}

export function prepareQueryForUrl(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

// Search utility functions
const textMatches = (text: string, searchQuery: string): boolean =>
  text.toLowerCase().includes(searchQuery.toLowerCase());

export function searchProducts(
  query: string,
  limit: number = 5,
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const searchQuery = query.trim().toLowerCase();

  return products
    .filter((product) => {
      return (
        textMatches(product.name, searchQuery) ||
        textMatches(product.brand, searchQuery) ||
        textMatches(product.category, searchQuery)
      );
    })
    .slice(0, limit)
    .map(
      (product): SearchSuggestion => ({
        id: product.id,
        type: "product",
        title: product.name,
        subtitle: `${product.brand} • ${product.category}`,
        image: product.image || undefined,
        slug: product.slug,
        category: product.category,
      }),
    );
}

export function searchCategories(
  query: string,
  limit: number = 3,
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const searchQuery = query.trim().toLowerCase();

  return categories
    .filter((category) => textMatches(category.name, searchQuery))
    .slice(0, limit)
    .map(
      (category): SearchSuggestion => ({
        id: category.id,
        type: "category",
        title: category.name,
        subtitle: category.description || "Browse category",
        slug: category.slug,
      }),
    );
}

export function searchBrands(
  query: string,
  limit: number = 3,
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const searchQuery = query.trim().toLowerCase();

  return brands
    .filter((brand) => textMatches(brand.name, searchQuery))
    .slice(0, limit)
    .map(
      (brand): SearchSuggestion => ({
        id: brand.id,
        type: "brand",
        title: brand.name,
        subtitle: brand.description || "Browse brand",
        slug: brand.slug,
      }),
    );
}

export function getSearchSuggestions(
  query: string,
  options: {
    maxProducts?: number;
    maxCategories?: number;
    maxBrands?: number;
  } = {},
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const productResults = searchProducts(query, options.maxProducts);
  const categoryResults = searchCategories(query, options.maxCategories);
  const brandResults = searchBrands(query, options.maxBrands);

  return [...productResults, ...categoryResults, ...brandResults];
}

export function getSearchUrl(
  query: string,
  filters?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  },
): string {
  const params = new URLSearchParams();

  const searchQuery = filters?.search || query.trim();
  if (searchQuery) {
    params.set("search", searchQuery);
  }

  if (filters?.category) {
    params.set("category", filters.category);
  }
  if (filters?.minPrice) {
    params.set("minPrice", filters.minPrice.toString());
  }
  if (filters?.maxPrice) {
    params.set("maxPrice", filters.maxPrice.toString());
  }
  if (filters?.sortBy) {
    params.set("sort", filters.sortBy);
  }

  const queryString = params.toString();
  return `/shop/products${queryString ? `?${queryString}` : ""}`;
}
