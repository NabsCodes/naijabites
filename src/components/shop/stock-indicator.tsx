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
  /** Additional CSS classes */
  className?: string;
}

export function StockIndicator({
  inventory,
  inStock,
  lowThreshold = 10,
  criticalThreshold = 5,
  showInStockBadge = true,
  className,
}: StockIndicatorProps) {
  const sizeClasses = "text-xs"; // Always sm size

  // Out of stock - prioritize inStock flag over inventory count
  if (!inStock || (inventory !== undefined && inventory <= 0)) {
    return (
      <Badge variant="destructive" className={cn(sizeClasses, className)}>
        Out of Stock
      </Badge>
    );
  }

  // No inventory data - just show in stock if enabled
  if (inventory === undefined) {
    return showInStockBadge ? (
      <Badge
        variant="default"
        className={cn(
          "bg-green-100 text-green-800 hover:bg-green-200",
          sizeClasses,
          className,
        )}
      >
        ✓ In Stock
      </Badge>
    ) : null;
  }

  // Critical stock (≤ criticalThreshold)
  if (inventory <= criticalThreshold) {
    return (
      <Badge
        variant="destructive"
        className={cn(
          "bg-red-100 text-red-800 hover:bg-red-200",
          sizeClasses,
          className,
        )}
      >
        Only {inventory} left!
      </Badge>
    );
  }

  // Low stock (≤ lowThreshold)
  if (inventory <= lowThreshold) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "bg-amber-100 text-amber-800 hover:bg-amber-200",
          sizeClasses,
          className,
        )}
      >
        Only {inventory} left in stock
      </Badge>
    );
  }

  // Normal stock - show in stock badge if enabled
  return showInStockBadge ? (
    <Badge
      variant="default"
      className={cn(
        "bg-green-100 text-green-800 hover:bg-green-200",
        sizeClasses,
        className,
      )}
    >
      ✓ In Stock
    </Badge>
  ) : null;
}
