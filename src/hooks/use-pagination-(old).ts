"use client";

import { useState, useMemo } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialPerPage?: number;
}

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {},
) {
  const { initialPage = 1, initialPerPage = 16 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  // Calculate pagination values
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Get paginated items
  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  // Handle page change
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  // Handle items per page change
  const changeItemsPerPage = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page
  };

  return {
    // Current state
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,

    // Paginated data
    paginatedItems,

    // Derived values for display
    startItem: totalItems > 0 ? startIndex + 1 : 0,
    endItem: endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,

    // Actions
    goToPage,
    changeItemsPerPage,
  };
}
