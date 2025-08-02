import { Skeleton } from "@/components/ui/skeleton";

export function CartLoadingSkeleton() {
  // Always show the full cart skeleton when loading
  // Don't check cart items length during loading state
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container-padding flex-1 py-6 sm:py-8">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items - Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-white p-4 sm:p-6">
                {/* Cart Items Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>

                {/* Cart Items Skeleton */}
                <div className="space-y-4 pt-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <CartItemSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary - Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // Cart Item Skeleton Component
  function CartItemSkeleton() {
    return (
      <div className="flex gap-3 border-b pb-4 last:border-b-0 last:pb-0 sm:gap-4">
        {/* Product Image */}
        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-gray-50 sm:h-24 sm:w-24">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-3/4 sm:h-5" />
              <Skeleton className="mt-1 h-3 w-1/2 sm:h-4" />
              <Skeleton className="mt-1 h-4 w-16" />
              <Skeleton className="mt-2 h-4 w-20" />
            </div>
            <Skeleton className="ml-2 h-8 w-8 rounded" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24 sm:w-28" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Order Summary Skeleton Component
  function OrderSummarySkeleton() {
    return (
      <div className="rounded-xl border bg-white p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Summary Items */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          {/* Checkout Button */}
          <Skeleton className="h-12 w-full" />

          {/* Continue Shopping */}
          <Skeleton className="h-10 w-full" />

          {/* Checkout Note */}
          <div className="text-center">
            <Skeleton className="mx-auto h-3 w-48" />
          </div>
        </div>
      </div>
    );
  }
}
