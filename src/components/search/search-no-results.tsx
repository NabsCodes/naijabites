"use client";

import React, { memo } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchNoResultsProps {
  query: string;
  className?: string;
}

// Search No Results Component
const SearchNoResultsComponent = ({
  query,
  className,
}: SearchNoResultsProps) => {
  return (
    <div className={cn("p-4 text-center", className)}>
      <div className="mb-3 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <SearchX size={24} className="text-gray-400" />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-1 text-sm font-medium text-gray-900">
          No results found
        </h3>
        <p className="text-xs text-gray-500">
          We couldn&apos;t find anything for{" "}
          <span className="font-medium text-gray-900">"{query}"</span>
        </p>
      </div>
    </div>
  );
};

// Memoize the component with a custom comparison function to optimize re-renders
export const SearchNoResults = memo(
  SearchNoResultsComponent,
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    return (
      prevProps.query === nextProps.query &&
      prevProps.className === nextProps.className
    );
  },
);
