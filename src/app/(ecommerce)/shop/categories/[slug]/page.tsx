import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FilterDesktop,
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
  FilterMobile,
} from "@/components/shop";
import { getShopifyAllProducts } from "@/lib/shopify-products";
import { getCategoryBySlug } from "@/lib/mock-data/categories";
import {
  parseSearchParams,
  parseProductFilters,
  filterAndPaginateProducts,
  getFilterOptions,
} from "@/lib/product-filters";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name}`,
    description:
      category.description ||
      `Browse our selection of ${category.name.toLowerCase()}`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  // Await params and searchParams for Next.js 15 compatibility
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // Fetch products from Shopify
  const allProducts = await getShopifyAllProducts(100);
  
  // Filter products by category
  const categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase() === category.name.toLowerCase()
  );

  // Parse search parameters and apply category-specific filtering
  const urlSearchParams = parseSearchParams(resolvedSearchParams);
  const filters = parseProductFilters(urlSearchParams);
  const result = filterAndPaginateProducts(categoryProducts, filters);
  const filterOptions = getFilterOptions(categoryProducts);

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
            title={category.name}
            description={
              category.description ||
              `Browse our selection of ${category.name.toLowerCase()}`
            }
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
