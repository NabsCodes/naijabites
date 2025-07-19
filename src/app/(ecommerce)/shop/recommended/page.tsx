import { Metadata } from "next";
import {
  FilterDesktop,
  FilterMobile,
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
  ProductSection,
} from "@/components/shop";
import { products } from "@/lib/mock-data/products";
import {
  parseSearchParams,
  parseProductFilters,
  prepareRecommendedFilters,
} from "@/lib/product-filters";
import { Separator } from "@/components/ui/separator";

interface RecommendedPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Recommended for You",
  description:
    "Handpicked products based on your preferences and what other customers love",
};

export default async function RecommendedPage({
  searchParams,
}: RecommendedPageProps) {
  const resolvedSearchParams = await searchParams;

  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Parse search parameters and apply recommended-specific filtering
  const urlSearchParams = parseSearchParams(resolvedSearchParams);
  const filters = parseProductFilters(urlSearchParams);
  const { result, filterOptions } = prepareRecommendedFilters(
    products,
    filters,
  );

  const displayProducts = result.products.slice(0, 4);

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

          {/* Similar Products */}
          <Separator className="my-8" />
          <div className="pb-10 lg:pb-12">
            <ProductSection
              title="You might also like"
              description="Similar products from our store"
              products={displayProducts}
              viewAllLink="/shop/products"
              noContainer={true}
            />
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
