"use client";

import Link from "next/link";
import { ProductCard } from "@/components/shop";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { EmptySection } from "@/components/common/empty-section";

interface ProductSectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink: string;
  className?: string;
  noContainer?: boolean;
}

export function ProductSection({
  title,
  description,
  products,
  viewAllLink,
  className,
  noContainer = false,
}: ProductSectionProps) {
  // Show max 8 products in section preview
  const displayProducts = products.slice(0, 8);

  // Early return for empty state
  if (products.length) {
    return (
      <section className={className}>
        <div className={noContainer ? "" : "container-padding"}>
          <div className="section-container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
            <EmptySection />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className={noContainer ? "" : "container-padding"}>
        <div className="section-container">
          {/* Section Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href={viewAllLink} className="flex items-center gap-2">
                View All Items
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Products Grid/Scroll */}
          <div className="relative">
            {/* Desktop: Grid Layout */}
            <div className="hidden grid-cols-2 gap-3 sm:grid sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile: Simple Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden">
              {displayProducts.map((product) => (
                <div key={product.id} className="w-[280px] flex-shrink-0">
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View All Button */}
          <div className="mt-6 sm:hidden">
            <Button
              asChild
              className="w-full bg-green-dark transition-all duration-300 hover:bg-green-dark/90"
            >
              <Link href={viewAllLink}>View All Items</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
