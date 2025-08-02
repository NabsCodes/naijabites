import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <section className="py-12">
      <div className="container-padding">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-6xl">
            <ShoppingCartIcon className="mx-auto h-12 w-12 text-green-dark" />
          </div>
          <h2 className="text-h2 mb-4 font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up with delicious Nigerian groceries!
          </p>
          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-green-dark transition-all duration-300 hover:bg-green-dark/90"
              asChild
            >
              <Link href="/shop">
                <ShoppingBagIcon className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <div className="text-sm text-gray-500">
              or{" "}
              <Link
                href="/shop/products"
                className="text-green-dark transition-all duration-300 hover:text-green-dark/90"
              >
                browse all products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
