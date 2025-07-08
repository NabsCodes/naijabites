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

export const metadata: Metadata = {
  title: "Recommended for You",
  description:
    "Handpicked products based on your preferences and popular choices",
};

export default async function RecommendedPage() {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // For now, we'll show products with high ratings as "recommended"
  // This would be algorithm-based recommendations in Production
  const recommendedProducts = products
    .filter((product) => product.rating && product.rating.average >= 4.0)
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

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
            totalProducts={recommendedProducts.length}
          />
          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <FilterDesktop />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Products Grid */}
                <ProductsGrid products={recommendedProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      <FilterMobile />
    </main>
  );
}
