import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="mb-6">
        <Skeleton className="mb-4 h-4 w-24" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="mt-2 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="mt-2 flex items-center gap-2 sm:hidden">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* Main Content Skeleton */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Items Skeleton */}
          <Card>
            <CardHeader className="mb-0">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex gap-4 pb-4 ${i !== 3 ? "border-b border-gray-100" : "pb-0"}`}
                  >
                    <Skeleton className="h-16 w-16 rounded-lg sm:h-20 sm:w-20" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-2 h-6 w-20 rounded-full" />
                      <div className="mt-2 flex items-center justify-between">
                        <Skeleton className="h-4 w-8" />
                        <div className="text-right">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="mt-1 h-3 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Order Summary Skeleton */}
          <Card>
            <CardHeader className="mb-0">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details Skeleton */}
          <Card className="hidden sm:block">
            <CardHeader className="mb-0">
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
