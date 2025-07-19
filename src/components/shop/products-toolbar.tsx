"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterDesktop } from "./filter-desktop";
import { cn } from "@/lib/utils";

interface ProductsToolbarProps {
  totalProducts: number;
  currentSort?: string;
  onSortChange?: (sort: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  // { value: "newest", label: "Newest First" },
  // { value: "rating", label: "Highest Rated" },
  // { value: "popular", label: "Most Popular" },
];

export function ProductsToolbar({
  totalProducts,
  currentSort = "relevance",
  onSortChange,
  className,
}: ProductsToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters] = useState(0); // This would be connected to actual filter state

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Products Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {totalProducts} product{totalProducts !== 1 ? "s" : ""}
          </div>

          {/* Desktop: Show active filters count if any */}
          {activeFilters > 0 && (
            <Badge variant="secondary" className="hidden lg:inline-flex">
              {activeFilters} filter{activeFilters !== 1 ? "s" : ""} applied
            </Badge>
          )}
        </div>

        {/* Unified Actions Bar */}
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-white p-3">
          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={currentSort} onValueChange={onSortChange}>
              <SelectTrigger className="h-9 w-[180px] border-gray-300 focus:border-green-dark focus:ring-green-dark">
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="focus:bg-green-50 focus:text-green-dark"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Button - Mobile Only */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            className="relative flex items-center gap-2 border-gray-300 hover:border-green-dark hover:text-green-dark lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            {activeFilters > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full p-0 sm:max-w-md">
          <SheetHeader className="border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">
                Filter Products
              </SheetTitle>
              {activeFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-dark hover:text-green-dark/80"
                >
                  Clear All
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <FilterDesktop className="border-0 bg-transparent" />
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsFilterOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-dark hover:bg-green-deep"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
