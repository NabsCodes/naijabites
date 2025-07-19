import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/shop";

export function ProductListingSectionSkeleton() {
  return (
    <section className="rounded-t-[20px] bg-[#f9f9f9] md:rounded-t-[40px]">
      <div className="container-padding relative py-10 md:py-16 lg:py-20">
        <div className="section-container">
          {/* Section Header Skeleton */}
          <div className="mb-8 sm:mb-10">
            <Skeleton className="mb-3 h-8 w-80 sm:mb-4 sm:h-10 sm:w-96 md:h-12 md:w-[500px] lg:h-14 lg:w-[600px]" />
            <Skeleton className="h-4 w-64 sm:h-5 sm:w-80 md:h-6 md:w-96" />
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} className="h-fit w-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
