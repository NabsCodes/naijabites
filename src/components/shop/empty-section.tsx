import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search } from "lucide-react";

interface EmptySectionProps {
  icon?: "bag" | "search";
}

export function EmptySection({ icon = "bag" }: EmptySectionProps) {
  const IconComponent = icon === "search" ? Search : ShoppingBag;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <IconComponent className="h-12 w-12 text-green-dark" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        No products available
      </h3>
      <p className="mb-6 max-w-md text-base text-gray-600">
        No products are currently available in this section. Check back soon for
        amazing deals in this section!
      </p>

      <Button
        asChild
        variant="outline"
        className="bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90 hover:text-white"
      >
        <Link href="/shop/products">Browse All Products</Link>
      </Button>
    </div>
  );
}
