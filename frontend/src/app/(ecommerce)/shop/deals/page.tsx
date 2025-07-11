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

interface DealsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Hot Deals",
  description: "Special offers and discounts on Nigerian groceries",
};

export default async function DealsPage({ searchParams }: DealsPageProps) {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Parse search parameters into filters
  const urlSearchParams = parseSearchParams(searchParams);
  const filters = parseProductFilters(urlSearchParams);

  // Force onSale filter for deals page
  const dealFilters = { ...filters, onSale: true };

  // Apply server-side filtering and pagination
  const result = filterAndPaginateProducts(products, dealFilters);

  // Only show filter options for products that are actually on sale
  const saleProducts = products.filter((p) => p.isOnSale);
  const filterOptions = getFilterOptions(saleProducts, {
    hideCategoryFilter: false, // Show categories but only those with deals
    limitToAvailableOnly: true, // Only show categories/brands that have deals
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
            title="Hot Deals"
            description="Limited time offers you can't miss!"
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
