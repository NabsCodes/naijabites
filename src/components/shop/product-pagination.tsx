"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilteredProductsResult, buildFilterUrl } from "@/lib/product-filters";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PER_PAGE_OPTIONS = [8, 12, 16, 24, 32];

interface ProductPaginationProps {
  result: FilteredProductsResult;
  className?: string;
  showItemsPerPage?: boolean;
}

export function ProductPagination({
  result,
  className,
  showItemsPerPage = true,
}: ProductPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    currentPage,
    totalPages,
    totalCount,
    hasNextPage,
    hasPreviousPage,
    appliedFilters,
  } = result;

  // Get items per page from applied filters or default to 16
  const itemsPerPage = appliedFilters.limit || 16;
  const startItem = totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  // Navigate to a specific page
  const goToPage = (page: number) => {
    const newUrl = buildFilterUrl(pathname, {
      ...appliedFilters,
      page: page,
    });
    router.push(newUrl);
  };

  // Change items per page
  const changeItemsPerPage = (newLimit: number) => {
    const newUrl = buildFilterUrl(pathname, {
      ...appliedFilters,
      limit: newLimit,
      page: 1, // Reset to first page
    });
    router.push(newUrl);
  };

  // Don't render if there's only one page and no items per page selector
  if (totalPages <= 1 && !showItemsPerPage) {
    return null;
  }

  const getPageNumbers = (): (number | string)[] => {
    const maxVisiblePages = 5;

    // Show all pages if total is small
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    // Add ellipsis after first page if needed
    if (currentPage > 3) pages.push("...");

    // Add pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 2) pages.push("...");

    // Add last page if more than one page exists
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Results Info and Items Per Page */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Products Info */}
        <div className="text-sm text-gray-600">
          Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} of{" "}
          {totalCount.toLocaleString()} products
        </div>

        {showItemsPerPage && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Show:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => changeItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="h-9 w-20 border-input bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PER_PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">per page</span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={!hasPreviousPage}
            className={cn(
              "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              !hasPreviousPage
                ? "cursor-not-allowed text-gray-400"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-dark",
            )}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:block">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => (
              <div key={index}>
                {page === "..." ? (
                  <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => goToPage(page as number)}
                    className={cn(
                      "h-9 w-9 rounded-md text-sm font-medium transition-colors",
                      currentPage === page
                        ? "bg-green-dark text-white shadow-sm"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-dark",
                    )}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!hasNextPage}
            className={cn(
              "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              !hasNextPage
                ? "cursor-not-allowed text-gray-400"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-dark",
            )}
            aria-label="Go to next page"
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
