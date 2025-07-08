import { Metadata } from "next";
import {
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
  FilterMobile,
  FilterDesktop,
} from "@/components/shop";
import { products } from "@/lib/mock-data/products";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of Nigerian groceries and essentials",
};

export default async function ProductsPage() {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

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
            totalProducts={products.length}
          />

          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Desktop Sidebar - Hidden on Mobile */}
            <div className="hidden lg:block">
              <FilterDesktop />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Products Grid */}
                <ProductsGrid products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterMobile />
    </main>
  );
}
