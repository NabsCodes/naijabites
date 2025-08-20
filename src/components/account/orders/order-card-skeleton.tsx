import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <Card className="transition-all">
      <CardHeader className="p-0">
        {/* Header strip skeleton */}
        <div className="rounded-t-xl bg-gray-50 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Ordered on skeleton */}
              <div>
                <Skeleton className="mb-2 h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
              {/* Ship to skeleton */}
              <div>
                <Skeleton className="mb-2 h-3 w-16" />
                <Skeleton className="h-5 w-28" />
              </div>
              {/* Total skeleton - hidden on mobile */}
              <div className="hidden sm:block">
                <Skeleton className="mb-2 h-3 w-12" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            {/* Order number and view details skeleton */}
            <div className="flex shrink-0 flex-col items-end justify-center gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Status line skeleton */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Product images skeleton */}
        <div className="hidden border-t border-gray-100 pt-4 sm:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-16" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-12" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
          <div className="mt-3">
            <Skeleton className="h-4 w-80" />
          </div>
        </div>
        {/* Mobile action buttons skeleton */}
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:hidden">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-16" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-12" />
                ))}
              </div>
            </div>
            <div className="mt-3">
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
