import { Skeleton } from "@/components/ui/skeleton";

export function CategoryNavSkeleton() {
  return (
    <div className="mx-auto">
      {/* Desktop Navigation Skeleton */}
      <div className="hidden lg:block">
        <div className="container-padding">
          <div className="section-container">
            <div className="flex items-center gap-8 pt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Skeleton */}
      <div className="block lg:hidden">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-4 px-4 pt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-24 flex-shrink-0 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
