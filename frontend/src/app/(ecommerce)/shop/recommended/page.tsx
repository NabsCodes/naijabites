import { Metadata } from "next";
import {
  FilterDesktop,
  FilterMobile,
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
} from "@/components/shop";
import { products } from "@/lib/mock-data/products";
import {
  parseSearchParams,
  parseProductFilters,
  filterAndPaginateProducts,
  getFilterOptions,
} from "@/lib/product-filters";

interface RecommendedPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Recommended for You",
  description:
    "Handpicked products based on your preferences and what other customers love",
};

export default async function RecommendedPage({
  searchParams,
}: RecommendedPageProps) {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Parse search parameters into filters
  const urlSearchParams = parseSearchParams(searchParams);
  const filters = parseProductFilters(urlSearchParams);

  // Force rating filter for recommended page (4+ stars)
  const recommendedFilters = { ...filters, rating: 4 };

  // Apply server-side filtering and pagination
  const result = filterAndPaginateProducts(products, recommendedFilters);

  // Only show filter options for products that are highly rated (4+ stars)
  const highRatedProducts = products.filter(
    (p) => p.rating && typeof p.rating === "object" && p.rating.average >= 4.0,
  );
  const filterOptions = getFilterOptions(highRatedProducts, {
    hideCategoryFilter: false, // Show categories but only those with highly rated products
    limitToAvailableOnly: true, // Only show categories/brands that have highly rated products
  });

  return (
    <main className="flex min-h-screen flex-col">
      {/* Category Navigation */}
      <CategoryNav />

      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      <div className="container-padding flex-1 bg-gray-50">
        <div className="section-container">
          {/* Page Header */}
          <ProductsHeader
            title="Recommended for You"
            description="Handpicked products based on your preferences and what other customers love"
            totalProducts={result.totalCount}
            currentPage={result.currentPage}
            totalPages={result.totalPages}
            appliedFilters={result.appliedFilters}
          />
          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <FilterDesktop
                filterOptions={filterOptions}
                appliedFilters={result.appliedFilters}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Products Grid with Server-side Data */}
                <ProductsGrid result={result} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      <FilterMobile
        filterOptions={filterOptions}
        appliedFilters={result.appliedFilters}
      />
    </main>
  );
}
