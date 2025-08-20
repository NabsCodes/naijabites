import { mockOrders } from "@/lib/mock-data/orders";
import type { Order, StatusFilter } from "@/types/order";
import type { RangeFilter } from "@/types/order";
import { isWithinRange } from "@/lib/utils/orders";

export interface FetchOrdersParams {
  status: StatusFilter;
  range: RangeFilter;
  page: number;
  perPage: number;
}

export interface FetchOrdersResult {
  items: Order[];
  total: number;
}

export async function fetchOrders(
  params: FetchOrdersParams,
): Promise<FetchOrdersResult> {
  const { status, range, page, perPage } = params;

  // Simulate network latency for loader testing - development
  if (process.env.NODE_ENV === "development") {
    await new Promise((r) => setTimeout(r, 1000));
  }

  const filtered = mockOrders
    .filter((o) =>
      status === "ALL"
        ? true
        : status === "PARTIALLY_FULFILLED"
          ? o.fulfillmentStatus === "PARTIALLY_FULFILLED"
          : o.fulfillmentStatus === status,
    )
    .filter((o) => isWithinRange(o.processedAt, range));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const items = filtered.slice(startIndex, startIndex + perPage);

  return { items, total };
}
