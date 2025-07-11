import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryNav, ShopBreadcrumbs } from "@/components/shop";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Category Navigation */}
      <CategoryNav />

      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      <div className="container-padding flex-1 bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            {/* Icon */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Product Not Found
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-md text-base text-gray-600 sm:text-lg">
              Sorry, the product you're looking for doesn't exist or has been
              removed from our catalog.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-green-dark hover:bg-green-dark/90"
              >
                <Link href="/shop/products">
                  <ShoppingBagIcon className="mr-2 h-4 w-4" />
                  Browse All Products
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/shop/products?search=">
                  <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                  Search Products
                </Link>
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-12 w-full max-w-lg">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                You might also like
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  href="/shop/deals"
                  className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <h4 className="font-medium text-gray-900">Hot Deals</h4>
                  <p className="text-sm text-gray-600">
                    Special offers and discounts
                  </p>
                </Link>
                <Link
                  href="/shop/recommended"
                  className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <h4 className="font-medium text-gray-900">Recommended</h4>
                  <p className="text-sm text-gray-600">Top-rated products</p>
                </Link>
                <Link
                  href="/shop/categories/rice-grains"
                  className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <h4 className="font-medium text-gray-900">Rice & Grains</h4>
                  <p className="text-sm text-gray-600">Essential staples</p>
                </Link>
                <Link
                  href="/shop/categories/spices-seasonings"
                  className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <h4 className="font-medium text-gray-900">
                    Spices & Seasonings
                  </h4>
                  <p className="text-sm text-gray-600">Authentic flavors</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
