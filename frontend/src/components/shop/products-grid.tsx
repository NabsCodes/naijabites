"use client";

import { ProductCard, ProductPagination } from "@/components/shop";
import { Product } from "@/types";
import { EmptySection } from "./empty-section";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/use-pagination";

interface ProductsGridProps {
  products: Product[];
  className?: string;
  itemsPerPage?: number;
  showItemsPerPageSelector?: boolean;
}

export function ProductsGrid({
  products,
  className,
  itemsPerPage = 16,
  showItemsPerPageSelector = true,
}: ProductsGridProps) {
  const pagination = usePagination(products, {
    initialPerPage: itemsPerPage,
  });

  // Show empty state if no products
  if (products.length === 0) {
    return <EmptySection icon="search" />;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {pagination.paginatedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <ProductPagination
        pagination={pagination}
        showItemsPerPage={showItemsPerPageSelector}
        className="border-t pt-4"
      />
    </div>
  );
}
