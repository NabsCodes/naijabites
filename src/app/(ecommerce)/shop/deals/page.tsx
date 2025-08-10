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
import { getShopifyAllProducts } from "@/lib/shopify-products";
import {
  parseSearchParams,
  parseProductFilters,
  filterAndPaginateProducts,
  getFilterOptions,
} from "@/lib/product-filters";
import { Separator } from "@/components/ui/separator";

interface DealsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Hot Deals",
  description: "Limited time offers you can't miss!",
};

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const resolvedSearchParams = await searchParams;

  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Fetch products from Shopify
  const allProducts = await getShopifyAllProducts(100);
  
  // Filter for deals only
  const dealsProducts = allProducts.filter(product => product.isOnSale);

  // Parse search parameters and apply deals-specific filtering
  const urlSearchParams = parseSearchParams(resolvedSearchParams);
  const filters = parseProductFilters(urlSearchParams);
  const result = filterAndPaginateProducts(dealsProducts, filters);
  const filterOptions = getFilterOptions(dealsProducts);

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
