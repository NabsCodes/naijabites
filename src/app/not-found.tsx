import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="container-padding">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Grocery Image */}
            <div className="mb-8">
              <Image
                src="/images/grocery.webp"
                alt="Grocery items"
                width={300}
                height={200}
                className="h-auto w-full max-w-xs object-contain opacity-90"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              Oops!
            </h1>
            <h2 className="mb-4 text-xl font-medium text-gray-700 sm:text-2xl">
              Page not found
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-md text-gray-600">
              The page you're looking for doesn't exist. Let's get you back to
              shopping for your favorite Nigerian groceries.
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
                  Shop Now
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
