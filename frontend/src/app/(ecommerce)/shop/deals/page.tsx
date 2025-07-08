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
  title: "Hot Deals",
  description: "Discover amazing deals and discounts on Nigerian groceries",
};

export default async function DealsPage() {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Filter products to show only those on sale
  const dealProducts = products.filter((product) => product.isOnSale);

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
            totalProducts={dealProducts.length}
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
                <ProductsGrid products={dealProducts} />
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
