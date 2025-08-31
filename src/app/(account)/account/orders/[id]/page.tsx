import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockOrders } from "@/lib/mock-data/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/account/orders/order-status-badge";
import {
  ArrowLeftIcon,
  MapPinIcon,
  ReceiptRefundIcon,
  CreditCardIcon,
  ClockIcon,
  TruckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { CartIcon } from "@/components/icons";
import { CopyButton } from "@/components/common/copy-button";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const order = mockOrders.find((o) => o.name === `#${id}`);

  if (!order) {
    return {
      title: "Order Not Found",
      description: "The requested order could not be found",
    };
  }

  return {
    title: `Order ${order.name} - ${order.fulfillmentStatus}`,
    description: `Order #${order.name} placed on ${new Date(order.processedAt).toLocaleDateString()} - Status: ${order.fulfillmentStatus}`,
  };
}

export default async function OrderDetailsPage({ params }: Props) {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((r) => setTimeout(r, 1000));
  }

  const { id } = await params;
  const order = mockOrders.find((o) => o.name === `#${id}`);
  if (!order) return notFound();

  const orderDate = new Date(order.processedAt);
  const hasDelivery = Boolean(order.delivery);
  const delivery = order.delivery;
  const deliveredAt = delivery?.deliveredAt
    ? new Date(delivery.deliveredAt)
    : null;
  const estStart = new Date(orderDate.getTime() + 1000 * 60 * 60 * 24 * 3);
  const estEnd = new Date(orderDate.getTime() + 1000 * 60 * 60 * 24 * 7);

  // Grocery delivery display logic
  const getDeliveryLabel = () => {
    if (!delivery)
      return order.totals.shipping <= 1000
        ? "Standard Delivery"
        : "Express Delivery";

    switch (delivery.type) {
      case "local-delivery":
        return `${delivery.company} • ${delivery.identifier}`;
      case "pickup":
        return `${delivery.company}`;
      case "shipping":
        return `Shipping via ${delivery.company}`;
      default:
        return "Standard Delivery";
    }
  };

  const shippingLabel = getDeliveryLabel();

  // Note - some are mock placeholders for UI for now
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/account/orders"
          className="mb-4 inline-flex items-center gap-2 text-sm text-green-dark transition-colors duration-300 hover:text-green-dark/90"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Order {order.name}
                </h1>
                <CopyButton
                  value={order.name}
                  ariaLabel="Copy order number"
                  className="h-8 w-8 flex-shrink-0 rounded-full text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
                />
              </div>
              <OrderStatusBadge
                status={order.fulfillmentStatus}
                className="w-fit"
              />
            </div>
            <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-4">
              <span>
                Placed on{" "}
                {orderDate.toLocaleDateString("en-CA", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <Separator
                orientation="vertical"
                className="hidden h-4 sm:block"
              />
              <span className="hidden sm:inline">
                {order.lineItems.length} item
                {order.lineItems.length !== 1 ? "s" : ""}
              </span>
              <Separator
                orientation="vertical"
                className="hidden h-4 sm:block"
              />
              <span className="text-base font-semibold text-green-dark">
                {formatPrice(order.totals.total)}
              </span>
            </div>
            {/* Mobile compact order info */}
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 sm:hidden">
              <span>ID: {order.name}</span>
              <span>•</span>
              <span>Ref: {order.id.split("/").pop()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              variant="outline"
              className="border-green-dark text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
            >
              <CartIcon className="mr-2 h-4 w-4" />
              Buy Again
            </Button>
            {/* Single track button for orders with tracking URL */}
            {hasDelivery && delivery?.trackingUrl ? (
              <Button variant="outline" asChild>
                <Link
                  href={delivery.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Track Order
                </Link>
              </Button>
            ) : order.fulfillmentStatus === "UNFULFILLED" ? (
              <Button variant="outline" disabled>
                <ClockIcon className="mr-2 h-4 w-4" />
                Preparing Order
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* Main Content */}
        <div className="min-w-0 space-y-6 lg:col-span-2">
          {/* Order Items */}
          <Card>
            <CardHeader className="mb-0">
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                {order.lineItems.length} item
                {order.lineItems.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.lineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 pb-4 ${
                      index !== order.lineItems.length - 1
                        ? "border-b border-gray-100"
                        : "pb-0"
                    }`}
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20">
                      <Link
                        href={
                          item.productSlug
                            ? `/shop/products/${item.productSlug}`
                            : "#"
                        }
                        className="block h-full w-full"
                      >
                        <Image
                          src={item.image || "/images/product-placeholder.svg"}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-contain p-1 transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={
                          item.productSlug
                            ? `/shop/products/${item.productSlug}`
                            : "#"
                        }
                        className="line-clamp-1 text-sm font-medium text-gray-900 transition-colors duration-300 hover:text-green-dark sm:line-clamp-2 sm:text-base"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && (
                        <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                          {item.variantTitle}
                        </span>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          ×{item.quantity}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900 sm:text-base">
                            {formatPrice(item.lineTotal)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-gray-500">
                              {formatPrice(item.unitPrice)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery & Payment */}
          <div className="flex flex-col gap-6">
            {/* Delivery & Shipping */}
            <Card aria-labelledby="delivery-heading">
              <CardHeader className="mb-0">
                <CardTitle id="delivery-heading">Delivery & Shipping</CardTitle>
                <CardDescription>
                  Delivery status, method & shipping address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Delivery Status */}
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div
                      className={`hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full sm:flex ${
                        order.fulfillmentStatus === "FULFILLED"
                          ? "bg-green-dark/10"
                          : order.fulfillmentStatus === "PARTIALLY_FULFILLED"
                            ? "bg-lemon-dark/20"
                            : order.fulfillmentStatus === "CANCELLED"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                      }`}
                    >
                      {order.fulfillmentStatus === "FULFILLED" ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      ) : order.fulfillmentStatus === "PARTIALLY_FULFILLED" ? (
                        <TruckIcon className="h-4 w-4 text-orange-600" />
                      ) : order.fulfillmentStatus === "CANCELLED" ? (
                        <XCircleIcon className="h-4 w-4 text-red-600" />
                      ) : (
                        <ClockIcon className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {order.fulfillmentStatus === "FULFILLED"
                          ? "Delivered"
                          : order.fulfillmentStatus === "PARTIALLY_FULFILLED"
                            ? "Partially Shipped"
                            : order.fulfillmentStatus === "CANCELLED"
                              ? "Cancelled"
                              : "Preparing Order"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.fulfillmentStatus === "CANCELLED"
                          ? "This order has been cancelled"
                          : deliveredAt
                            ? `on ${deliveredAt.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`
                            : `Est. ${estStart.toLocaleDateString("en-CA", { month: "short", day: "numeric" })} - ${estEnd.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="rounded-lg border px-3 pt-3 sm:px-4 sm:pt-4">
                    <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                      <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 sm:flex">
                        {delivery?.type === "pickup" ? (
                          <MapPinIcon className="h-5 w-5 text-green-dark" />
                        ) : delivery?.type === "local-delivery" ? (
                          <TruckIcon className="h-5 w-5 text-green-dark" />
                        ) : (
                          <TruckIcon className="h-5 w-5 text-green-dark" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {shippingLabel}
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery?.status || "Processing"}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Details */}
                    {hasDelivery && delivery && (
                      <div className="flex flex-col gap-2 border-t border-gray-100 pb-3 pt-3 sm:gap-3 sm:pb-4 sm:pt-4">
                        {delivery.estimatedWindow && (
                          <div className="flex items-start gap-2 text-sm">
                            <ClockIcon className="mt-0.5 hidden h-4 w-4 flex-shrink-0 text-gray-400 sm:block" />
                            <div className="min-w-0 flex-1">
                              <span className="text-gray-600">Estimated:</span>
                              <span className="ml-2 break-words font-medium text-gray-900">
                                {delivery.estimatedWindow}
                              </span>
                            </div>
                          </div>
                        )}
                        {delivery.identifier && (
                          <div className="flex items-start gap-2 text-sm">
                            <DocumentTextIcon className="mt-0.5 hidden h-4 w-4 flex-shrink-0 text-gray-400 sm:block" />
                            <div className="min-w-0 flex-1">
                              <span className="text-gray-600">
                                {delivery.type === "pickup"
                                  ? "Pickup Code:"
                                  : delivery.type === "local-delivery"
                                    ? "Delivered by:"
                                    : "Tracking:"}
                              </span>
                              <span className="ml-2 break-all font-medium text-gray-900">
                                {delivery.identifier}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-green-dark" />
                      <span className="text-sm font-medium text-gray-900">
                        Shipping to
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </div>
                      <div>
                        {order.shippingAddress.address1}
                        {order.shippingAddress.address2
                          ? `, ${order.shippingAddress.address2}`
                          : ""}
                      </div>
                      <div>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.province}{" "}
                        {order.shippingAddress.postalCode}
                      </div>
                      <div>{order.shippingAddress.country}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Billing */}
            <Card aria-labelledby="payment-heading">
              <CardHeader className="mb-0">
                <CardTitle id="payment-heading">Payment & Billing</CardTitle>
                <CardDescription>
                  Payment status, method & billing address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Payment Status */}
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div
                      className={`hidden h-8 w-8 items-center justify-center rounded-full sm:flex ${
                        order.financialStatus === "PAID"
                          ? "bg-green-dark/10"
                          : order.financialStatus === "PENDING"
                            ? "bg-yellow-100"
                            : order.financialStatus === "REFUNDED"
                              ? "bg-blue-100"
                              : "bg-red-100"
                      }`}
                    >
                      {order.financialStatus === "PAID" ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      ) : order.financialStatus === "PENDING" ? (
                        <ClockIcon className="h-4 w-4 text-yellow-600" />
                      ) : order.financialStatus === "REFUNDED" ? (
                        <ReceiptRefundIcon className="h-4 w-4 text-blue-600" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {order.financialStatus === "PAID"
                          ? "Payment Successful"
                          : order.financialStatus === "PENDING"
                            ? "Payment Pending"
                            : order.financialStatus === "REFUNDED"
                              ? "Payment Refunded"
                              : "Payment Failed"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(order.totals.total)} on{" "}
                        {orderDate.toLocaleDateString("en-CA", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="rounded-lg border px-3 pt-3 sm:px-4 sm:pt-4">
                    <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                      <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 sm:flex">
                        <CreditCardIcon className="h-5 w-5 text-green-dark" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {order.financialStatus === "PENDING"
                            ? "Processing..."
                            : "Visa •••• 4242"}
                        </div>
                        <div className="text-sm text-gray-500">
                          TXN-{order.name.replace("#", "")}-001
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <ReceiptRefundIcon className="h-4 w-4 text-green-dark" />
                      <span className="text-sm font-medium text-gray-900">
                        Billing address
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium">
                        {order.billingAddress.firstName}{" "}
                        {order.billingAddress.lastName}
                      </div>
                      <div>
                        {order.billingAddress.address1}
                        {order.billingAddress.address2
                          ? `, ${order.billingAddress.address2}`
                          : ""}
                      </div>
                      <div>
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.province}{" "}
                        {order.billingAddress.postalCode}
                      </div>
                      <div>{order.billingAddress.country}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-40">
          {/* Order Summary */}
          <Card>
            <CardHeader className="mb-0">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(order.totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.totals.shipping > 0
                      ? formatPrice(order.totals.shipping)
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    {formatPrice(order.totals.tax)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(order.totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="hidden sm:block">
            <CardHeader className="mb-0">
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium text-gray-900">
                    {orderDate.toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-600">Order ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {order.name}
                    </span>
                    <CopyButton
                      value={order.name}
                      ariaLabel="Copy order number"
                      className="h-7 w-7 rounded-full text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference</span>
                  <span className="font-mono text-xs font-medium text-gray-900">
                    {order.id.split("/").pop()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono text-xs font-medium text-gray-900">
                    TXN-{order.name.replace("#", "")}-001
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="mb-0">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-green-dark text-green-dark hover:bg-green-dark/5"
                >
                  <DocumentTextIcon className="h-4 w-4" />
                  Download Invoice
                </Button>
                {order.fulfillmentStatus === "FULFILLED" && (
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ReceiptRefundIcon className="h-4 w-4" />
                    Request Return
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="bg-gray-50">
            <CardHeader className="mb-0">
              <CardTitle className="text-base">Need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-gray-600">
                Have questions about your order or need assistance?
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Contact support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
