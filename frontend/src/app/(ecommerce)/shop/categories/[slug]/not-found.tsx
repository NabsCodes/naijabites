import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryNav, ShopBreadcrumbs } from "@/components/shop";
import {
  TagIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function CategoryNotFound() {
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
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100">
              <ExclamationTriangleIcon className="h-12 w-12 text-blue-600" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Category Not Found
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-md text-base text-gray-600 sm:text-lg">
              Sorry, the category you're looking for doesn't exist or has been
              removed from our store.
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
                <Link href="/shop">
                  <TagIcon className="mr-2 h-4 w-4" />
                  View Categories
                </Link>
              </Button>
            </div>

            {/* Available Categories */}
            <div className="mt-12 w-full max-w-2xl">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Browse Available Categories
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Link
                  href="/shop/categories/rice-grains"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Rice & Grains
                </Link>
                <Link
                  href="/shop/categories/spices-seasonings"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Spices & Seasonings
                </Link>
                <Link
                  href="/shop/categories/cooking-oils"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Cooking Oils
                </Link>
                <Link
                  href="/shop/categories/beans-legumes"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Beans & Legumes
                </Link>
                <Link
                  href="/shop/categories/canned-goods"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Canned Goods
                </Link>
                <Link
                  href="/shop/categories/snacks"
                  className="rounded-lg border border-gray-200 bg-white p-3 text-center text-sm text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-dark"
                >
                  Snacks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
