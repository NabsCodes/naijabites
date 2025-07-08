import { Skeleton } from "@/components/ui/skeleton";

export function CategoryNavSkeleton() {
  return (
    <div className="mx-auto">
      {/* Desktop Navigation Skeleton */}
      <div className="hidden lg:block">
        <div className="container-padding">
          <div className="section-container">
            <div className="flex items-center gap-8 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Skeleton */}
      <div className="block w-full overflow-hidden lg:hidden">
        <div className="scrollbar-hide overflow-x-auto border-b border-gray-100">
          <div className="flex w-max min-w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 px-4 py-3">
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
