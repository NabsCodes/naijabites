import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/product";

interface ProductSectionSkeletonProps {
  className?: string;
}

export function ProductSectionSkeleton({
  className,
}: ProductSectionSkeletonProps) {
  return (
    <section className={className}>
      <div className="container-padding">
        <div className="section-container">
          {/* Section Header Skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 md:h-10 md:w-80" />
              <Skeleton className="mt-2 h-5 w-48" />
            </div>
            <Skeleton className="hidden h-10 w-32 sm:block" />
          </div>

          {/* Products Grid/Scroll Skeleton */}
          <div className="relative">
            {/* Desktop: Grid Layout */}
            <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[280px] flex-shrink-0">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View All Button Skeleton */}
          <div className="mt-6 sm:hidden">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
