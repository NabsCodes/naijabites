export type OrderStatus =
  | "ALL"
  | "FULFILLED"
  | "PARTIALLY_FULFILLED"
  | "UNFULFILLED"
  | "CANCELLED";

export type StatusFilter = OrderStatus;

export type RangeFilter = "30d" | "3m" | "6m" | "1y" | "all";

// Financial status of the order
export type FinancialStatus = "PAID" | "PENDING" | "REFUNDED" | "VOIDED";

// Fulfillment status of the order
export type FulfillmentStatus =
  | "UNFULFILLED"
  | "PARTIALLY_FULFILLED"
  | "FULFILLED"
  | "CANCELLED";

export interface OrderLineItem {
  id: string;
  productId: string;
  productSlug: string;
  title: string;
  variantId?: string;
  variantTitle?: string;
  image?: string;
  quantity: number;
  unitPrice: number; // in minor currency units of project convention
  lineTotal: number; // quantity * unitPrice
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Order {
  id: string; // internal/shopify id
  name: string; // human readable e.g. #1001
  processedAt: string; // ISO date
  financialStatus: FinancialStatus;
  fulfillmentStatus: FulfillmentStatus;
  lineItems: OrderLineItem[];
  totals: OrderTotals;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  // Grocery delivery tracking - flexible for different delivery types
  delivery?: {
    type: "local-delivery" | "pickup" | "shipping";
    company?: string; // "Local Delivery Service" or "FedEx"
    identifier?: string; // Driver name, tracking number, or pickup code
    status?: string; // "Out for delivery", "Driver nearby", "Ready for pickup"
    estimatedWindow?: string; // "2:00 PM - 4:00 PM today"
    deliveredAt?: string;
    trackingUrl?: string; // For shipping orders only
  };
}
