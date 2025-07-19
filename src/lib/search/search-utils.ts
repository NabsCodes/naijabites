import { SearchSuggestion, SearchFilters } from "@/types/search";
import { products } from "@/lib/mock-data/products";
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";

// Simple text matching - case insensitive
const textMatches = (text: string, searchQuery: string): boolean =>
  text.toLowerCase().includes(searchQuery.toLowerCase());

// Search products - simplified scoring
export function searchProducts(
  query: string,
  limit: number = 5,
): SearchSuggestion[] {
  if (!query.trim()) return [];

  const searchQuery = query.trim().toLowerCase();

  // Simple filtering: check if query matches name, brand, or category
  const matchingProducts = products
    .filter((product) => {
      return (
        textMatches(product.name, searchQuery) ||
        textMatches(product.brand, searchQuery) ||
        textMatches(product.category, searchQuery)
      );
    })
    .slice(0, limit) // Take first X matches
    .map((product): SearchSuggestion => {
      return {
        id: product.id,
        type: "product",
        title: product.name,
        subtitle: `${product.brand} • ${product.category}`,
        image: product.image || undefined,
        slug: product.slug,
        category: product.category,
      };
    });

  return matchingProducts;
}

// Search categories - simple text matching
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

// Search brands - simple text matching
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

// Get all search suggestions - simplified
export function getSearchSuggestions(
  query: string,
  options: {
    maxProducts?: number;
    maxCategories?: number;
    maxBrands?: number;
  } = {},
): SearchSuggestion[] {
  // Default limits
  const maxProducts = options.maxProducts;
  const maxCategories = options.maxCategories;
  const maxBrands = options.maxBrands;

  if (!query.trim()) return [];

  // Get results from each type
  const productResults = searchProducts(query, maxProducts);
  const categoryResults = searchCategories(query, maxCategories);
  const brandResults = searchBrands(query, maxBrands);

  // Combine all results: products first, then categories, then brands
  const allResults = [...productResults, ...categoryResults, ...brandResults];

  return allResults;
}

// Create search URL for navigation
export function getSearchUrl(
  query: string,
  filters?: Partial<SearchFilters>,
): string {
  const params = new URLSearchParams();

  // Add search query
  const searchQuery = filters?.search || query.trim();
  if (searchQuery) {
    params.set("search", searchQuery);
  }

  // Add other filters if provided
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
