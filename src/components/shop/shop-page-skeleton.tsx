import { Skeleton } from "@/components/ui/skeleton";
import { CategoryNavSkeleton, ProductCardSkeleton } from "@/components/shop";

interface ShopPageSkeletonProps {
  showBreadcrumbs?: boolean;
  showFilters?: boolean;
  className?: string;
}

export function ShopPageSkeleton({
  showBreadcrumbs = true,
  showFilters = true,
  className,
}: ShopPageSkeletonProps) {
  return (
    <main className={`flex min-h-screen flex-col ${className || ""}`}>
      {/* Category Navigation Skeleton */}
      <CategoryNavSkeleton />

      {/* Breadcrumbs Skeleton */}
      {showBreadcrumbs && (
        <nav className="pt-4">
          <div className="container-padding">
            <div className="section-container">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-1" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="container-padding flex-1 bg-gray-50">
        <div className="section-container">
          {/* Page Header Skeleton */}
          <div className="space-y-4 pt-3">
            {/* Page Title & Description */}
            <div>
              <Skeleton className="h-8 w-64 md:h-10 md:w-80" />
              <Skeleton className="mt-2 h-4 w-96" />
            </div>

            {/* Products Count & Sort Controls */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <div className="hidden lg:inline-flex">
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Desktop Sidebar Skeleton */}
            {showFilters && (
              <div className="hidden lg:block">
                <FilterDesktopSkeleton />
              </div>
            )}

            {/* Main Content */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <div className="space-y-6">
                {/* Products Grid Skeleton */}
                <ProductsGridSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Floating Button Skeleton */}
      {showFilters && (
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
      )}
    </main>
  );
}

// Filter Desktop Skeleton Component
function FilterDesktopSkeleton() {
  return (
    <div className="w-full rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>

      {/* Filter Sections */}
      <div className="space-y-4 p-4">
        {/* Categories Section */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-20" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className="space-y-3 border-t pt-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-full rounded-md" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Price Range Section */}
        <div className="space-y-3 border-t pt-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>

        {/* Additional Filter Sections */}
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3 border-t pt-4">
            <Skeleton className="h-5 w-24" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Products Grid Skeleton Component
function ProductsGridSkeleton() {
  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="border-t pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
            </div>
            <Skeleton className="h-8 w-16" />
          </div>

          {/* Results info */}
          <div className="text-center sm:text-right">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
