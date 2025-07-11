import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function EcommerceNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="container-padding">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-orange-100">
              <ExclamationTriangleIcon className="h-12 w-12 text-orange-600" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              404
            </h1>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-md text-base text-gray-600 sm:text-lg">
              Sorry, we couldn't find the page you're looking for. The page
              might have been moved or doesn't exist.
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
                  Shop Products
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-12 w-full max-w-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/shop/categories/rice-grains"
                  className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-dark"
                >
                  Rice & Grains
                </Link>
                <Link
                  href="/shop/categories/spices-seasonings"
                  className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-dark"
                >
                  Spices & Seasonings
                </Link>
                <Link
                  href="/shop/categories/cooking-oils"
                  className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-dark"
                >
                  Cooking Oils
                </Link>
                <Link
                  href="/shop/deals"
                  className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-dark"
                >
                  Hot Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
