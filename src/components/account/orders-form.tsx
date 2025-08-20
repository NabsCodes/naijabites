"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchOrders } from "@/lib/api/orders";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { OrderCard } from "@/components/account/orders/order-card";
import { OrdersToolbar } from "@/components/account/orders/orders-toolbar";
import type { StatusFilter, RangeFilter } from "@/types/order";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrdersLoading from "@/app/(account)/account/orders/loading";

const PER_PAGE_OPTIONS = [5, 10, 20, 50];

export function OrdersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStatus = (searchParams.get("status") as StatusFilter) || "ALL";
  const initialRange = (searchParams.get("range") as RangeFilter) || "3m";
  const initialPage = Number(searchParams.get("page") || "1") || 1;
  const initialPerPage = Number(searchParams.get("perPage") || "5") || 5;

  const [status, setStatus] = useState<StatusFilter>(initialStatus);
  const [range, setRange] = useState<RangeFilter>(initialRange);
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  // React Query handles all the loading, and data states automatically
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["orders", status, range, page, perPage],
    queryFn: () => fetchOrders({ status, range, page, perPage }),
  });

  const orders = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages);

  function updateQuery(next: Partial<Record<string, string>>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleStatusChange(next: StatusFilter) {
    setStatus(next);
    setPage(1);
    updateQuery({ status: next, page: "1" });
  }

  function handleRangeChange(next: RangeFilter) {
    setRange(next);
    setPage(1);
    updateQuery({ range: next, page: "1" });
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    updateQuery({ page: String(nextPage) });
  }
  function handlePerPageChange(next: number) {
    setPerPage(next);
    setPage(1);
    updateQuery({ perPage: String(next), page: "1" });
  }

  function getEmptyStateContent() {
    const statusLabels: Record<StatusFilter, string> = {
      ALL: "all orders",
      FULFILLED: "shipped",
      PARTIALLY_FULFILLED: "partially shipped",
      UNFULFILLED: "processing",
      CANCELLED: "cancelled",
    };

    const rangeLabels: Record<RangeFilter, string> = {
      all: "all time",
      "30d": "past 30 days",
      "3m": "past 3 months",
      "6m": "past 6 months",
      "1y": "past year",
    };

    if (status !== "ALL") {
      const label = statusLabels[status as keyof typeof statusLabels];
      return {
        title: `No ${label} orders`,
        description: `You don't have any ${label} orders in the selected time period.`,
      };
    }

    if (range !== "all") {
      return {
        title: "No orders found",
        description: `You haven't placed any orders in the ${rangeLabels[range as keyof typeof rangeLabels]}.`,
      };
    }

    return {
      title: "No orders yet",
      description: "Start shopping to see your order history here",
    };
  }

  function pageItems(current: number, total: number): (number | "ellipsis")[] {
    const items: (number | "ellipsis")[] = [];
    const add = (n: number) => items.push(n);
    const addEllipsis = () => {
      if (items[items.length - 1] !== "ellipsis") items.push("ellipsis");
    };
    if (total <= 7) {
      for (let i = 1; i <= total; i += 1) add(i);
      return items;
    }
    add(1);
    if (current > 4) addEllipsis();
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i += 1) add(i);
    if (current < total - 3) addEllipsis();
    add(total);
    return items;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Your Orders</h1>
        <p className="mt-1 text-gray-600">
          View and track your recent purchases
        </p>
      </div>

      <div className="flex items-center justify-between">
        <OrdersToolbar
          value={status}
          onChange={handleStatusChange}
          range={range}
          onRangeChange={handleRangeChange}
        />
      </div>

      {isSuccess && orders.length === 0 ? (
        (() => {
          const emptyState = getEmptyStateContent();
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <ShoppingBagIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 font-medium">{emptyState.title}</h3>
                <p className="mb-4 text-sm text-gray-600">
                  {emptyState.description}
                </p>
                {status === "ALL" && range === "all" && (
                  <Link href="/shop">
                    <Button className="bg-green-dark hover:bg-green-dark/90">
                      Start Shopping
                    </Button>
                  </Link>
                )}
                {(status !== "ALL" || range !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatus("ALL");
                      setRange("all");
                      setPage(1);
                      updateQuery({ status: "ALL", range: "all", page: "1" });
                    }}
                  >
                    View All Orders
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })()
      ) : isLoading ? (
        <OrdersLoading />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Per-page and results count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          {isLoading ? (
            "Loading orders..."
          ) : (
            <>
              Showing {(currentPage - 1) * perPage + 1}–
              {Math.min(currentPage * perPage, total)} of {total} orders
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <div className="w-20 sm:w-[65px]">
            <Select
              value={String(perPage)}
              onValueChange={(v) => handlePerPageChange(Number(v))}
            >
              <SelectTrigger className="h-9 rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-green-dark">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PER_PAGE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            results per page
          </span>
        </div>
      </div>
      {total > 0 && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {pageItems(currentPage, totalPages).map((p, idx) => (
              <PaginationItem key={`${p}-${idx}`}>
                {p === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(p as number);
                    }}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
