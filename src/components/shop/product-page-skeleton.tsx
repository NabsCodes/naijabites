import { Skeleton } from "@/components/ui/skeleton";
import { ProductSectionSkeleton } from "@/components/shop";

interface ProductPageSkeletonProps {
  showSimilarProducts?: boolean;
  className?: string;
}

export function ProductPageSkeleton({
  showSimilarProducts = true,
  className,
}: ProductPageSkeletonProps) {
  return (
    <main className={`flex min-h-screen flex-col ${className || ""}`}>
      {/* Breadcrumbs Skeleton */}
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

      <div className="container-padding flex-1 py-10">
        <div className="section-container">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Images - Left Side */}
            <div className="order-1 lg:order-1">
              <ProductImageGallerySkeleton />
            </div>

            {/* Product Details - Right Side */}
            <div className="order-2">
              <ProductDetailsSkeleton />
            </div>
          </div>

          {/* Similar Products Section */}
          {showSimilarProducts && (
            <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24">
              <ProductSectionSkeleton noContainer />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Product Image Gallery Skeleton Component
function ProductImageGallerySkeleton() {
  return (
    <div className="sticky top-6">
      {/* Main Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-[#F9F9F9]">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg bg-[#F9F9F9]"
          >
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Product Details Skeleton Component
function ProductDetailsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Product Title & Description */}
      <div className="space-y-2 sm:space-y-3">
        <Skeleton className="h-8 w-full sm:h-10 lg:h-12" />
        <Skeleton className="h-6 w-3/4 sm:h-7" />
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Skeleton className="h-10 w-32 sm:h-12 lg:h-16" />
          <Skeleton className="h-6 w-24 sm:h-8" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Stock Status */}
      <Skeleton className="h-6 w-20" />

      {/* Variant Selector */}
      {/* <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="pt-4 sm:pt-6">
        <Skeleton className="h-12 w-full sm:h-14" />
      </div>

      {/* Product Description */}
      <div className="space-y-2 border-t border-gray-200 pt-4 sm:space-y-3 sm:pt-6">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Additional Product Info */}
      <div className="grid grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-2 sm:gap-4 sm:pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
