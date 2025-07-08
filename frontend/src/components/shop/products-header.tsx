"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsHeaderProps {
  title: string;
  description?: string;
  totalProducts: number;
  currentSort?: string;
  onSortChange?: (sort: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Customer Rating" },
  { value: "popular", label: "Most Popular" },
  { value: "name-az", label: "Name: A to Z" },
  { value: "name-za", label: "Name: Z to A" },
];

export function ProductsHeader({
  title,
  description,
  totalProducts,
  currentSort = "relevance",
  onSortChange,
  className,
}: ProductsHeaderProps) {
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
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            {totalProducts.toLocaleString()} product
            {totalProducts !== 1 ? "s" : ""}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={currentSort} onValueChange={onSortChange}>
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
