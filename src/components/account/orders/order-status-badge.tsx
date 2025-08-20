import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FulfillmentStatus } from "@/types/order";

function getLabel(status: FulfillmentStatus): string {
  switch (status) {
    case "FULFILLED":
      return "Delivered";
    case "PARTIALLY_FULFILLED":
      return "Partially shipped";
    case "UNFULFILLED":
      return "Processing";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

function getClassNames(status: FulfillmentStatus): string {
  switch (status) {
    case "FULFILLED":
      return "border border-green-dark/20 bg-green-dark/10 text-green-dark hover:bg-green-dark/20";
    case "PARTIALLY_FULFILLED":
      return "border border-lemon-dark/30 bg-lemon-dark/20 text-green-deep hover:bg-lemon-dark/30";
    case "UNFULFILLED":
      return "border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200";
    case "CANCELLED":
      return "border border-red-200 bg-red-100 text-red-700 hover:bg-red-200";
    default:
      return "border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
}

export function OrderStatusBadge({
  status,
  className,
}: {
  status: FulfillmentStatus;
  className?: string;
}) {
  return (
    <Badge className={cn(getClassNames(status), className)}>
      {getLabel(status)}
    </Badge>
  );
}
