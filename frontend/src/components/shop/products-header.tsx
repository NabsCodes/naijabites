"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters, buildFilterUrl } from "@/lib/product-filters";
import { useRouter, usePathname } from "next/navigation";

interface ProductsHeaderProps {
  title: string;
  description?: string;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  appliedFilters: ProductFilters;
  className?: string;
}

const sortOptions = [
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "discount-desc", label: "Biggest Discount" },
  { value: "newest", label: "Newest First" },
];

export function ProductsHeader({
  title,
  description,
  totalProducts,
  currentPage,
  totalPages,
  appliedFilters,
  className,
}: ProductsHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const sortValue = appliedFilters.sort || "name-asc";

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    const newUrl = buildFilterUrl(pathname, {
      ...appliedFilters,
      sort: newSort,
      page: 1, // Reset to first page when sorting
    });
    router.push(newUrl);
  };

  return (
    <div className={className}>
      <div className="space-y-4 pt-3">
        {/* Page Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-600 md:text-base">{description}</p>
          )}
        </div>

        {/* Results Count & Sorting */}
        <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between md:gap-0">
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            {totalProducts.toLocaleString()} product
            {totalProducts !== 1 ? "s " : ""}
            {/* Show page info */}
            {currentPage && totalPages && totalPages > 1 && (
              <span className="ml-2 text-gray-400">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortValue} onValueChange={handleSortChange}>
              <SelectTrigger className="h-9 w-[180px] border-gray-300 text-sm focus:border-green-dark focus:ring-green-dark">
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-sm focus:bg-green-50 focus:text-green-dark"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
