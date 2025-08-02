import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockIndicatorProps {
  /** Current inventory count */
  inventory?: number;
  /** Whether the item is in stock */
  inStock: boolean;
  /** Low stock threshold (default: 10) */
  lowThreshold?: number;
  /** Critical stock threshold (default: 5) */
  criticalThreshold?: number;
  /** Show "In Stock" badge when stock is normal */
  showInStockBadge?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

export function StockIndicator({
  inventory,
  inStock,
  lowThreshold = 10,
  criticalThreshold = 5,
  showInStockBadge = true,
  size = "md",
  className,
}: StockIndicatorProps) {
  const sizeClasses = {
    sm: {
      container: "text-xs gap-1.5",
      icon: "h-3 w-3",
    },
    md: {
      container: "text-sm gap-2",
      icon: "h-4 w-4",
    },
    lg: {
      container: "text-base gap-2.5",
      icon: "h-5 w-5",
    },
  };

  const classes = sizeClasses[size];

  // Out of stock - prioritize inStock flag over inventory count
  if (!inStock || (inventory !== undefined && inventory <= 0)) {
    return (
      <Badge
        variant="destructive"
        className={cn(
          "border-red-200 bg-red-50 font-medium text-red-700 hover:bg-red-100",
          classes.container,
          className,
        )}
      >
        <XCircleIcon className={classes.icon} />
        <span>Out of Stock</span>
      </Badge>
    );
  }

  // No inventory data - just show in stock if enabled
  if (inventory === undefined) {
    return showInStockBadge ? (
      <Badge
        variant="default"
        className={cn(
          "border-green-200 bg-green-50 font-medium text-green-700 hover:bg-green-100",
          classes.container,
          className,
        )}
      >
        <CheckCircleIcon className={classes.icon} />
        <span>In Stock</span>
      </Badge>
    ) : null;
  }

  // Critical stock (≤ criticalThreshold)
  if (inventory <= criticalThreshold) {
    return (
      <Badge
        variant="destructive"
        className={cn(
          "border-red-200 bg-red-50 font-medium text-red-700 hover:bg-red-100",
          classes.container,
          className,
        )}
      >
        <ExclamationTriangleIcon
          className={cn("animate-pulse", classes.icon)}
        />
        <span>Only {inventory} left!</span>
      </Badge>
    );
  }

  // Low stock (≤ lowThreshold)
  if (inventory <= lowThreshold) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "border-amber-200 bg-amber-50 font-medium text-amber-700 hover:bg-amber-100",
          classes.container,
          className,
        )}
      >
        <ExclamationTriangleIcon className={classes.icon} />
        <span>Only {inventory} left</span>
      </Badge>
    );
  }

  // Normal stock - show in stock badge if enabled
  return showInStockBadge ? (
    <Badge
      variant="default"
      className={cn(
        "border-green-200 bg-green-50 font-medium text-green-700 hover:bg-green-100",
        classes.container,
        className,
      )}
    >
      <CheckCircleIcon className={classes.icon} />
      <span>In Stock</span>
    </Badge>
  ) : null;
}
