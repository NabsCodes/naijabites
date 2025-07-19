// Server-side filtering and pagination utilities for products
import { Product } from "@/types";
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";

// Interface definitions for filtering
export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  onSale?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

// Interface for filtered products result
export interface FilteredProductsResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  appliedFilters: ProductFilters;
}

// Simplified searchParams parsing
export function parseSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.set(key, value);
    } else if (Array.isArray(value)) {
      urlSearchParams.set(key, value[0]);
    }
  });
  return urlSearchParams;
}

// Parse searchParams into typed filters
export function parseProductFilters(
  searchParams: URLSearchParams,
): ProductFilters {
  return {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    rating: searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : undefined,
    onSale: searchParams.get("onSale") === "true" ? true : undefined,
    sort: searchParams.get("sort") || "name-asc",
    page: searchParams.get("page")
      ? Math.max(1, Number(searchParams.get("page")))
      : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 16,
  };
}

// Helper to build filter URLs
export function buildFilterUrl(
  pathname: string,
  filters: ProductFilters,
): string {
  const url = new URL(pathname, "http://localhost");

  // Only add non-empty filters to URL
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      key !== "page" &&
      key !== "limit"
    ) {
      url.searchParams.set(key, value.toString());
    }
  });

  // Always add page if not 1
  if (filters.page && filters.page > 1) {
    url.searchParams.set("page", filters.page.toString());
  }

  // Add limit if not default
  if (filters.limit && filters.limit !== 16) {
    url.searchParams.set("limit", filters.limit.toString());
  }

  return url.pathname + url.search;
}

// Get global price range across all products
function getGlobalPriceRange(products: Product[]) {
  const prices = products.map(
    (p) => p.variants?.[0]?.salePrice || p.variants?.[0]?.price || p.price,
  );
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

// Category-specific filtering utilities
export function prepareCategoryFilters(
  allProducts: Product[],
  filters: ProductFilters,
  categoryName: string,
) {
  // Force category filter for this page
  const categoryFilters = { ...filters, category: categoryName };

  // Apply filtering and pagination
  const result = filterAndPaginateProducts(allProducts, categoryFilters);

  // Get filter options for category products but with global price range
  const categoryProducts = allProducts.filter(
    (p) => p.category === categoryName,
  );
  const filterOptions = getFilterOptions(categoryProducts, {
    hideCategoryFilter: true,
    currentCategory: categoryName,
  });

  // Override with global price range for consistent slider behavior
  const globalPriceRange = getGlobalPriceRange(allProducts);
  const finalFilterOptions = {
    ...filterOptions,
    priceRange: globalPriceRange,
  };

  return { result, filterOptions: finalFilterOptions };
}

// Deals-specific filtering utilities
export function prepareDealsFilters(
  allProducts: Product[],
  filters: ProductFilters,
) {
  // Force onSale filter for deals page
  const dealFilters = { ...filters, onSale: true };

  // Apply filtering and pagination
  const result = filterAndPaginateProducts(allProducts, dealFilters);

  // Only show filter options for products that are actually on sale
  const saleProducts = allProducts.filter((p) => p.isOnSale);
  const filterOptions = getFilterOptions(saleProducts, {
    hideCategoryFilter: false, // Show categories but only those with deals
    limitToAvailableOnly: true, // Only show categories/brands that have deals
  });

  return { result, filterOptions };
}

// Recommended-specific filtering utilities
export function prepareRecommendedFilters(
  allProducts: Product[],
  filters: ProductFilters,
) {
  // Force rating filter for recommended page (4+ stars)
  const recommendedFilters = { ...filters, rating: 4 };

  // Apply filtering and pagination
  const result = filterAndPaginateProducts(allProducts, recommendedFilters);

  // Only show filter options for products that are highly rated (4+ stars)
  const highRatedProducts = allProducts.filter(
    (p) => p.rating && typeof p.rating === "object" && p.rating.average >= 4.0,
  );
  const filterOptions = getFilterOptions(highRatedProducts, {
    hideCategoryFilter: false, // Show categories but only those with highly rated products
    limitToAvailableOnly: true, // Only show categories/brands that have highly rated products
  });

  return { result, filterOptions };
}

// Individual filter functions
function applySearchFilter(products: Product[], search: string): Product[] {
  const searchLower = search.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.shortDescription?.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower),
  );
}

function applyCategoryFilter(products: Product[], category: string): Product[] {
  return products.filter((product) => product.category === category);
}

function applyBrandFilter(products: Product[], brand: string): Product[] {
  return products.filter((product) => product.brand === brand);
}

function applyPriceFilter(
  products: Product[],
  minPrice?: number,
  maxPrice?: number,
): Product[] {
  return products.filter((product) => {
    const price =
      product.variants?.[0]?.salePrice ||
      product.variants?.[0]?.price ||
      product.price;
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    return true;
  });
}

function applyRatingFilter(products: Product[], rating: number): Product[] {
  return products.filter((product) => {
    if (!product.rating || typeof product.rating !== "object") return false;
    return product.rating.average >= rating;
  });
}

function applySaleFilter(products: Product[], onSale: boolean): Product[] {
  return products.filter((product) => product.isOnSale === onSale);
}

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort((a, b) => {
        const priceA =
          a.variants?.[0]?.salePrice || a.variants?.[0]?.price || a.price;
        const priceB =
          b.variants?.[0]?.salePrice || b.variants?.[0]?.price || b.price;
        return priceA - priceB;
      });
    case "price-desc":
      return sorted.sort((a, b) => {
        const priceA =
          a.variants?.[0]?.salePrice || a.variants?.[0]?.price || a.price;
        const priceB =
          b.variants?.[0]?.salePrice || b.variants?.[0]?.price || b.price;
        return priceB - priceA;
      });
    case "rating-desc":
      return sorted.sort((a, b) => {
        const ratingA =
          a.rating && typeof a.rating === "object" ? a.rating.average : 0;
        const ratingB =
          b.rating && typeof b.rating === "object" ? b.rating.average : 0;
        return ratingB - ratingA;
      });
    case "rating-asc":
      return sorted.sort((a, b) => {
        const ratingA =
          a.rating && typeof a.rating === "object" ? a.rating.average : 0;
        const ratingB =
          b.rating && typeof b.rating === "object" ? b.rating.average : 0;
        return ratingA - ratingB;
      });
    case "discount-desc":
      return sorted.sort((a, b) => {
        const discountA = a.discountPercentage || 0;
        const discountB = b.discountPercentage || 0;
        return discountB - discountA;
      });
    case "newest":
      return sorted; // For now, just return as is
    default:
      return sorted;
  }
}

// Main filtering function
export function filterAndPaginateProducts(
  allProducts: Product[],
  filters: ProductFilters,
): FilteredProductsResult {
  let filteredProducts = [...allProducts];

  // Apply filters in sequence
  if (filters.search) {
    filteredProducts = applySearchFilter(filteredProducts, filters.search);
  }
  if (filters.category) {
    filteredProducts = applyCategoryFilter(filteredProducts, filters.category);
  }
  if (filters.brand) {
    filteredProducts = applyBrandFilter(filteredProducts, filters.brand);
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    filteredProducts = applyPriceFilter(
      filteredProducts,
      filters.minPrice,
      filters.maxPrice,
    );
  }
  if (filters.rating) {
    filteredProducts = applyRatingFilter(filteredProducts, filters.rating);
  }
  if (filters.onSale) {
    filteredProducts = applySaleFilter(filteredProducts, filters.onSale);
  }

  // Apply sorting
  if (filters.sort) {
    filteredProducts = sortProducts(filteredProducts, filters.sort);
  }

  // Pagination
  const totalCount = filteredProducts.length;
  const limit = filters.limit || 16;
  const page = Math.max(1, filters.page || 1);
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    appliedFilters: filters,
  };
}

// Get available filter options from products
export function getFilterOptions(
  products: Product[],
  context?: {
    hideCategoryFilter?: boolean;
    currentCategory?: string;
    limitToAvailableOnly?: boolean;
  },
) {
  const { hideCategoryFilter = false, limitToAvailableOnly = false } =
    context || {};

  // Get all categories and brands from metadata for comprehensive options
  let availableCategories = categories.map((cat) => cat.name);
  let availableBrands = brands.map((brand) => brand.name);

  // If limitToAvailableOnly is true (for specialized pages), only show options with products
  if (limitToAvailableOnly) {
    const productCategories = [...new Set(products.map((p) => p.category))];
    const productBrands = [...new Set(products.map((p) => p.brand))];

    availableCategories = availableCategories.filter((cat) =>
      productCategories.includes(cat),
    );
    availableBrands = availableBrands.filter((brand) =>
      productBrands.includes(brand),
    );
  }

  // Hide categories on category pages
  if (hideCategoryFilter) {
    availableCategories = [];
  }

  // Calculate price range from provided products
  const prices = products.map(
    (p) => p.variants?.[0]?.salePrice || p.variants?.[0]?.price || p.price,
  );
  const priceRange = {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 1000,
  };

  return {
    categories: availableCategories,
    brands: availableBrands,
    priceRange,
    ratings: [5, 4, 3, 2, 1],
    sortOptions: [
      { value: "name-asc", label: "Name: A to Z" },
      { value: "name-desc", label: "Name: Z to A" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "rating-desc", label: "Highest Rated" },
      { value: "discount-desc", label: "Biggest Discount" },
      { value: "newest", label: "Newest First" },
    ],
  };
}
