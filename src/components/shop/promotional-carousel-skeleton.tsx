import { Skeleton } from "@/components/ui/skeleton";

export function PromotionalCarouselSkeleton() {
  return (
    <div className="relative w-full">
      {/* Main Carousel Skeleton */}
      <div className="relative overflow-hidden rounded-3xl">
        <Skeleton className="aspect-[4/3] w-full md:aspect-[21/6]" />

        {/* Content overlay skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
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
                <div className="hidden justify-center md:flex">
                  <Skeleton className="h-32 w-32 rounded-xl md:h-72 md:w-72" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
