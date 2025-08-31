import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { OrderStatusBadge } from "@/components/account/orders/order-status-badge";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types/order";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.lineItems.reduce((sum, li) => sum + li.quantity, 0);
  const distinctProducts = order.lineItems.length;
  const totalUnits = order.lineItems.reduce((sum, li) => sum + li.quantity, 0);
  const fullName = `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`;

  const orderedOn = new Date(order.processedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="transition-all hover:shadow-sm">
      <CardHeader className="p-0">
        <div className="rounded-t-xl bg-gray-50 px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-8">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Ordered on
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {orderedOn}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Ship to
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {fullName}
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Total
                </div>
                <div className="text-lg font-bold text-green-dark">
                  {formatPrice(order.totals.total)}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-center gap-4 sm:flex-row">
              <div className="order-2 text-right sm:hidden">
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Total
                </div>
                <div className="text-lg font-bold text-green-dark">
                  {formatPrice(order.totals.total)}
                </div>
              </div>
              <div className="text-right">
                <CardTitle className="text-sm text-gray-600">
                  Order {order.name}
                </CardTitle>
                <Link
                  href={`/account/orders/${order.name.replace("#", "")}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-dark transition-colors duration-300 hover:text-green-dark/80"
                >
                  View order details
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 sm:px-6">
        {/* Status and item count */}
        <div className="py-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Quantity
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                  <span className="hidden text-gray-500 sm:inline">
                    {distinctProducts !== totalUnits
                      ? ` • ${distinctProducts} product${distinctProducts === 1 ? "" : "s"}`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <OrderStatusBadge
              status={order.fulfillmentStatus}
              className="w-fit"
            />
          </div>
        </div>

        {/* Product images */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wide text-gray-500">
                  Products
                </span>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  {order.lineItems.slice(0, 4).map((li) => (
                    <div key={li.id} className="relative">
                      <Image
                        src={li.image || "/images/product-placeholder.svg"}
                        alt={li.title}
                        width={48}
                        height={48}
                        sizes="48px"
                        className="h-12 w-12 rounded-lg border border-gray-200 bg-white object-contain p-0.5 shadow-sm"
                      />
                      {/* Quantity badge */}
                      {li.quantity > 1 && (
                        <div
                          className="absolute -right-2 -top-2 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-green-dark px-1 py-0.5 text-xs font-bold leading-none text-white shadow-md"
                          aria-label={`Quantity: ${Math.min(li.quantity, 99)}${li.quantity > 99 ? "+" : ""}`}
                        >
                          {li.quantity > 99 ? "99+" : li.quantity}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Clean text indicator for additional items */}
                  {order.lineItems.length > 4 && (
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-semibold text-green-dark"
                      title={`${order.lineItems.length - 4} more items`}
                      aria-label={`${order.lineItems.length - 4} more items`}
                    >
                      +{order.lineItems.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick actions - shown on larger screens */}
              <div className="hidden sm:flex sm:items-center sm:gap-2">
                {/* Track order button for orders with tracking URL */}
                {order.delivery?.trackingUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-green-dark text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
                    asChild
                  >
                    <Link
                      href={order.delivery.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Track Order
                    </Link>
                  </Button>
                )}

                {/* Reorder button for completed orders */}
                {(order.fulfillmentStatus === "FULFILLED" ||
                  order.fulfillmentStatus === "CANCELLED") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-orange-dark text-orange-dark hover:bg-orange-dark/5 hover:text-orange-dark"
                  >
                    Reorder
                  </Button>
                )}
              </div>
            </div>

            {/* Show first few product names */}
            {order.lineItems.length > 0 && (
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Items:{" "}
                </span>
                <span className="text-sm text-gray-600">
                  {order.lineItems.slice(0, 2).map((li, index) => (
                    <span key={li.id} className="font-medium text-gray-700">
                      {li.title}
                      {index < Math.min(2, order.lineItems.length - 1) && " • "}
                    </span>
                  ))}
                  {order.lineItems.length > 2 && (
                    <span className="text-gray-500">
                      {" "}
                      and {order.lineItems.length - 2} more
                    </span>
                  )}
                </span>
              </div>
            )}

            {/* Quick actions - shown on mobile at the bottom */}
            <div className="flex flex-col gap-3 sm:hidden">
              {/* Track order button for orders with tracking URL */}
              {order.delivery?.trackingUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-full border-green-dark text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
                  asChild
                >
                  <Link
                    href={order.delivery.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Track Order
                  </Link>
                </Button>
              )}

              {/* Reorder button for completed orders */}
              {(order.fulfillmentStatus === "FULFILLED" ||
                order.fulfillmentStatus === "CANCELLED") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-full border-orange-dark text-orange-dark hover:bg-orange-dark/5 hover:text-orange-dark"
                >
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
