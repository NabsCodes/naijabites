"use client";

import { ProductCard, ProductPagination } from "@/components/shop";
import { EmptySection } from "./empty-section";
import { cn } from "@/lib/utils";
import { FilteredProductsResult } from "@/lib/product-filters";

interface ProductsGridProps {
  result: FilteredProductsResult;
  className?: string;
  showItemsPerPageSelector?: boolean;
}

export function ProductsGrid({
  result,
  className,
  showItemsPerPageSelector = true,
}: ProductsGridProps) {
  // Show empty state if no products
  if (result.products.length === 0) {
    return <EmptySection icon="search" />;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {result.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Server-side Pagination */}
      <ProductPagination
        result={result}
        showItemsPerPage={showItemsPerPageSelector}
        className="border-t pt-4"
      />
    </div>
  );
}
