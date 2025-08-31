import { Skeleton } from "@/components/ui/skeleton";

interface AuthSkeletonProps {
  variant?: "desktop" | "mobile";
}

export function AuthSkeleton({ variant = "desktop" }: AuthSkeletonProps) {
  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-center rounded-lg p-2">
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Cart skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="hidden h-4 w-8 lg:block" />
      </div>

      {/* Profile skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full lg:h-10 lg:w-10" />
        <Skeleton className="hidden h-4 w-20 lg:block" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
}
