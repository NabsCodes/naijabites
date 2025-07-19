import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryNav, ShopBreadcrumbs } from "@/components/shop";
import { ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
            {/* Grocery Image */}
            <div className="mb-8">
              <Image
                src="/images/tomato-paste.webp"
                alt="Tomato paste"
                width={300}
                height={200}
                className="h-auto w-full max-w-xs object-contain opacity-90"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Product not found
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-md text-gray-600">
              This product is no longer available or has been moved. Check out
              our other great products.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-green-dark hover:bg-green-dark/90"
              >
                <Link href="/shop">
                  <ShoppingBagIcon className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/shop">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Shop
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
