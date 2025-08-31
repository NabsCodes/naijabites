import { Metadata } from "next";
import {
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
  FilterMobile,
  FilterDesktop,
} from "@/components/shop";
import { getShopifyAllProducts } from "@/lib/shopify-products";
import {
  parseSearchParams,
  parseProductFilters,
  filterAndPaginateProducts,
  getFilterOptions,
} from "@/lib/product-filters";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of Nigerian groceries",
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Fetch products from Shopify
  const products = await getShopifyAllProducts(100);

  // Parse search parameters into filters
  const urlSearchParams = parseSearchParams(resolvedSearchParams);
  const filters = parseProductFilters(urlSearchParams);

  // Apply server-side filtering and pagination
  const result = filterAndPaginateProducts(products, filters);
  const filterOptions = getFilterOptions(products);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Category Navigation */}
      <CategoryNav />

      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      <div className="container-padding flex-1 bg-gray-50">
        <div className="section-container">
          {/* Page Header with integrated mobile filter */}
          <ProductsHeader
            title="All Products"
            description="Browse our complete collection of Nigerian groceries"
            totalProducts={result.totalCount}
            currentPage={result.currentPage}
            totalPages={result.totalPages}
            appliedFilters={result.appliedFilters}
          />

          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Desktop Sidebar - Hidden on Mobile */}
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

      {/* Mobile Filter - Fixed at bottom */}
      <FilterMobile
        filterOptions={filterOptions}
        appliedFilters={result.appliedFilters}
      />
    </main>
  );
}
