import { Skeleton } from "@/components/ui/skeleton";

export function PromotionalCarouselSkeleton() {
  return (
    <div className="relative w-full">
      {/* Main Carousel Skeleton */}
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="aspect-[16/6] w-full md:aspect-[21/6]" />

        {/* Content overlay skeleton */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-padding w-full">
            <div className="section-container">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                {/* Left side - Text content */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4 md:h-12" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-3 pt-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>

                {/* Right side - Product image */}
                <div className="flex justify-center">
                  <Skeleton className="h-32 w-32 rounded-xl md:h-40 md:w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots skeleton */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-8 rounded-full" />
        ))}
      </div>
    </div>
  );
}
