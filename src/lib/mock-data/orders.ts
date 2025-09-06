import { products } from "@/lib/mock-data/products";
import type {
  Order,
  OrderAddress,
  OrderLineItem,
  OrderTotals,
} from "@/types/order";

function findProduct(productId: string) {
  return products.find((p) => p.id === productId);
}

function findProductVariant(productId: string, variantId: string) {
  const product = findProduct(productId);
  return product?.variants?.find((v) => v.id === variantId);
}

const shippingAddress: OrderAddress = {
  firstName: "Nabeel",
  lastName: "Hassan",
  address1: "123 Main Street",
  city: "Toronto",
  province: "ON",
  postalCode: "M5V 2H1",
  country: "Canada",
  phone: "+1 (555) 123-4567",
};

const billingAddress: OrderAddress = { ...shippingAddress };

// Helper function to create realistic line items from product data
function createLineItem(
  productId: string,
  variantId: string,
  quantity: number,
  lineItemId: string,
): OrderLineItem {
  const product = findProduct(productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  // Check if this is a simple product (no variants) or has variants
  if (!product.variants || product.variants.length === 0) {
    // Simple product - use product data directly
    const unitPrice = product.salePrice || product.price;
    const lineTotal = unitPrice * quantity;

    return {
      id: lineItemId,
      productId: product.id,
      productSlug: product.slug,
      title: product.name,
      variantId: product.id, // Use product ID as variant ID for simple products
      variantTitle: product.shortDescription, // Use short description as variant title
      image: product.image,
      quantity,
      unitPrice,
      lineTotal,
    };
  } else {
    // Product with variants - find the specific variant
    const variant = findProductVariant(productId, variantId);

    if (!variant) {
      throw new Error(`Variant not found: ${productId} - ${variantId}`);
    }

    const unitPrice = variant.salePrice || variant.price;
    const lineTotal = unitPrice * quantity;

    return {
      id: lineItemId,
      productId: product.id,
      productSlug: product.slug,
      title: product.name,
      variantId: variant.id,
      variantTitle: variant.title,
      image: product.image,
      quantity,
      unitPrice,
      lineTotal,
    };
  }
}

// Helper function to calculate order totals from line items
function calculateOrderTotals(lineItems: OrderLineItem[]): OrderTotals {
  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50 CAD
  const tax = Math.round(subtotal * 0.13 * 100) / 100; // 13% HST (Ontario)
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}

// Updated mock orders with proper variants and realistic scenarios
export const mockOrders: Order[] = (() => {
  return [
    {
      id: "gid://shopify/Order/1001",
      name: "#1001",
      processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "li-1001-1"),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-carton",
          1,
          "li-1001-2",
        ),
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          1,
          "li-1001-3",
        ),
        createLineItem(
          "gino-tomato-paste-400g",
          "gino-tomato-paste-400g",
          1,
          "li-1001-4",
        ),
        createLineItem(
          "olu-olu-plantain-chips-500g",
          "olu-olu-plantain-chips-500g",
          1,
          "li-1001-5",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "temp-1"),
        createLineItem("indomie-chicken-40pack", "indomie-carton", 1, "temp-2"),
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          1,
          "temp-3",
        ),
        createLineItem(
          "gino-tomato-paste-400g",
          "gino-tomato-paste-400g",
          1,
          "temp-4",
        ),
        createLineItem(
          "olu-olu-plantain-chips-500g",
          "olu-olu-plantain-chips-500g",
          1,
          "temp-5",
        ),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "Canada Post",
        identifier: "1Z999AA1234567890",
        status: "Delivered",
        estimatedWindow: "2:00 PM - 4:00 PM",
        deliveredAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 2,
        ).toISOString(),
      },
    },
    {
      id: "gid://shopify/Order/1002",
      name: "#1002",
      processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "PARTIALLY_FULFILLED",
      lineItems: [
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 3, "li-1002-1"),
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-50kg",
          1,
          "li-1002-2",
        ),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-5pack",
          2,
          "li-1002-3",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 3, "temp-1"),
        createLineItem("dangote-rice-50kg", "dangote-rice-50kg", 1, "temp-2"),
        createLineItem("indomie-chicken-40pack", "indomie-5pack", 2, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "UPS",
        identifier: "1Z999AA9876543210",
        status: "Partially shipped",
        estimatedWindow: "Today 1:00 PM - 3:00 PM",
        trackingUrl:
          "https://www.ups.com/track?loc=en_CA&tracknum=1Z999AA9876543210",
      },
    },
    // Recent order within 30 days
    {
      id: "gid://shopify/Order/1003",
      name: "#1003",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 10,
      ).toISOString(), // 10 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
      lineItems: [
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 2, "li-1003-1"),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-5pack",
          1,
          "li-1003-2",
        ),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 4, "li-1003-3"),
      ],
      totals: calculateOrderTotals([
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 2, "temp-1"),
        createLineItem("indomie-chicken-40pack", "indomie-5pack", 1, "temp-2"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 4, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "local-delivery",
        company: "Local Delivery Service",
        identifier: "John Smith",
        status: "Preparing order",
        estimatedWindow: "Tomorrow 2:00 PM - 4:00 PM",
      },
    },
    // 2 months ago
    {
      id: "gid://shopify/Order/1004",
      name: "#1004",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 60,
      ).toISOString(), // 60 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem(
          "premium-nigerian-yam",
          "yam-large-dozen",
          1,
          "li-1004-1",
        ),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "li-1004-2"),
      ],
      totals: calculateOrderTotals([
        createLineItem("premium-nigerian-yam", "yam-large-dozen", 1, "temp-1"),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "temp-2"),
      ]),
      shippingAddress,
      billingAddress,
    },
    // 5 months ago, partial
    {
      id: "gid://shopify/Order/1005",
      name: "#1005",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 150,
      ).toISOString(), // 150 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "PARTIALLY_FULFILLED",
      lineItems: [
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 1, "li-1005-1"),
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-100kg",
          1,
          "li-1005-2",
        ),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-single",
          3,
          "li-1005-3",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 1, "temp-1"),
        createLineItem("dangote-rice-50kg", "dangote-rice-100kg", 1, "temp-2"),
        createLineItem("indomie-chicken-40pack", "indomie-single", 3, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "FedEx",
        identifier: "123456789012",
        status: "Partially shipped",
        estimatedWindow: "Tomorrow 3:00 PM - 5:00 PM",
        trackingUrl: "https://www.fedex.com/fedextrack/?trknbr=123456789012",
      },
    },
    // 11 months ago, cancelled
    {
      id: "gid://shopify/Order/1006",
      name: "#1006",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 330,
      ).toISOString(), // 330 days ago
      financialStatus: "REFUNDED",
      fulfillmentStatus: "CANCELLED",
      lineItems: [
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-single",
          1,
          "li-1006-1",
        ),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "li-1006-2"),
      ],
      totals: calculateOrderTotals([
        createLineItem("indomie-chicken-40pack", "indomie-single", 1, "temp-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "temp-2"),
      ]),
      shippingAddress,
      billingAddress,
    },
    // 1 day ago
    {
      id: "gid://shopify/Order/1007",
      name: "#1007",
      processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      financialStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
      lineItems: [
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 4, "li-1007-1"),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "li-1007-2"),
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 1, "li-1007-3"),
      ],
      totals: calculateOrderTotals([
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 4, "temp-1"),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "temp-2"),
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 1, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "Canada Post",
        identifier: "1234567890123456",
        status: "Preparing order",
        estimatedWindow: "Tomorrow 10:00 AM - 2:00 PM",
        trackingUrl:
          "https://www.canadapost-postescanada.ca/track-reperage/en#/details/1234567890123456",
      },
    },
    // 3 weeks ago
    {
      id: "gid://shopify/Order/1008",
      name: "#1008",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 21,
      ).toISOString(), // 21 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-carton",
          2,
          "li-1008-1",
        ),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 1, "li-1008-2"),
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-50kg",
          1,
          "li-1008-3",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("indomie-chicken-40pack", "indomie-carton", 2, "temp-1"),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 1, "temp-2"),
        createLineItem("dangote-rice-50kg", "dangote-rice-50kg", 1, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "UPS",
        identifier: "1Z999AA9045123456",
        status: "Delivered",
        estimatedWindow: "2:00 PM - 4:00 PM",
        deliveredAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 17,
        ).toISOString(),
      },
    },
    // 6 hours ago - pending payment
    {
      id: "gid://shopify/Order/1009",
      name: "#1009",
      processedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      financialStatus: "PENDING",
      fulfillmentStatus: "UNFULFILLED",
      lineItems: [
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-50kg",
          1,
          "li-1009-1",
        ),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "li-1009-2"),
      ],
      totals: calculateOrderTotals([
        createLineItem("dangote-rice-50kg", "dangote-rice-50kg", 1, "temp-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "temp-2"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "pickup",
        company: "Naijabites Warehouse",
        identifier: "PK-1009",
        status: "Preparing order",
        estimatedWindow: "Today 10:00 AM - 8:00 PM",
      },
    },
    // 6 months ago
    {
      id: "gid://shopify/Order/1010",
      name: "#1010",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 180,
      ).toISOString(), // 180 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 3, "li-1010-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "li-1010-2"),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-5pack",
          1,
          "li-1010-3",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("premium-nigerian-yam", "yam-small-2kg", 3, "temp-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 2, "temp-2"),
        createLineItem("indomie-chicken-40pack", "indomie-5pack", 1, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
    },
    // 1 month ago
    {
      id: "gid://shopify/Order/1011",
      name: "#1011",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 30,
      ).toISOString(), // 30 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "PARTIALLY_FULFILLED",
      lineItems: [
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-5pack",
          1,
          "li-1011-1",
        ),
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-50kg",
          4,
          "li-1011-2",
        ),
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          2,
          "li-1011-3",
        ),
      ],
      totals: calculateOrderTotals([
        createLineItem("indomie-chicken-40pack", "indomie-5pack", 1, "temp-1"),
        createLineItem("dangote-rice-50kg", "dangote-rice-50kg", 4, "temp-2"),
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          2,
          "temp-3",
        ),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "UPS",
        identifier: "1Z999AA9045123456",
        status: "Partially shipped",
        estimatedWindow: "Today 1:00 PM - 3:00 PM",
        trackingUrl:
          "https://www.ups.com/track?loc=en_CA&tracknum=1Z999AA9045123456",
      },
    },
    // 8 months ago - cancelled
    {
      id: "gid://shopify/Order/1012",
      name: "#1012",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 240,
      ).toISOString(), // 240 days ago
      financialStatus: "VOIDED",
      fulfillmentStatus: "CANCELLED",
      lineItems: [
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "li-1012-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 1, "li-1012-2"),
      ],
      totals: calculateOrderTotals([
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "temp-1"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 1, "temp-2"),
      ]),
      shippingAddress,
      billingAddress,
    },
    // 4 days ago
    {
      id: "gid://shopify/Order/1013",
      name: "#1013",
      processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          1,
          "li-1013-1",
        ),
        createLineItem(
          "indomie-chicken-40pack",
          "indomie-carton",
          1,
          "li-1013-2",
        ),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "li-1013-3"),
      ],
      totals: calculateOrderTotals([
        createLineItem(
          "premium-nigerian-yam",
          "yam-medium-3tubes",
          1,
          "temp-1",
        ),
        createLineItem("indomie-chicken-40pack", "indomie-carton", 1, "temp-2"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "local-delivery",
        company: "Local Delivery Service",
        identifier: "Nabeel Hassan",
        status: "Delivered",
        estimatedWindow: "2:00 PM - 4:00 PM",
        deliveredAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 4,
        ).toISOString(),
      },
    },
    // 3 months ago
    {
      id: "gid://shopify/Order/1014",
      name: "#1014",
      processedAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 90,
      ).toISOString(), // 90 days ago
      financialStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      lineItems: [
        createLineItem(
          "dangote-rice-50kg",
          "dangote-rice-50kg",
          5,
          "li-1014-1",
        ),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "li-1014-2"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "li-1014-3"),
      ],
      totals: calculateOrderTotals([
        createLineItem("dangote-rice-50kg", "dangote-rice-50kg", 5, "temp-1"),
        createLineItem("golden-morn-1kg", "golden-morn-1kg", 2, "temp-2"),
        createLineItem("maggi-cubes-250g", "maggi-cubes-250g", 3, "temp-3"),
      ]),
      shippingAddress,
      billingAddress,
      delivery: {
        type: "shipping",
        company: "Purolator",
        identifier: "3291234567890123",
        status: "Delivered",
        estimatedWindow: "2:00 PM - 4:00 PM",
        deliveredAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 87,
        ).toISOString(),
      },
    },
  ];
})();
