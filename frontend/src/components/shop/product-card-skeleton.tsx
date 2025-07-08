import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border-2 border-[#ededed] bg-white p-4",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-3">
        {/* Product Image Skeleton */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f9f9f9]">
          <Skeleton className="h-full w-full" />
          <Skeleton className="absolute left-2 top-2 h-5 w-10 rounded-full" />
        </div>

        {/* Product Details Skeleton */}
        <div className="flex flex-col justify-between gap-1">
          {/* Product Name Skeleton */}
          <Skeleton className="h-6 w-full" />

          {/* Short Description Skeleton */}
          <Skeleton className="h-4 w-3/4" />

          {/* Rating Section Skeleton */}
          <div className="flex min-h-[22px] items-center gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>

          {/* Price Section Skeleton */}
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
