"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { Search, Package, Tag, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestion } from "@/types/search";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSuggestionSelect: (suggestion: SearchSuggestion) => void;
  onRemoveSuggestion?: (suggestionId: string) => void;
  query: string;
  onClearHistory?: () => void;
}

// Search Suggestions Component
const SearchSuggestionsComponent = ({
  suggestions,
  onSuggestionSelect,
  onRemoveSuggestion,
  query,
  onClearHistory,
}: SearchSuggestionsProps) => {
  // Memoized icon getter for suggestion type
  const getSuggestionIcon = useCallback((type: SearchSuggestion["type"]) => {
    switch (type) {
      case "product":
        return Package;
      case "category":
        return Tag;
      case "brand":
        return Search;
      default:
        return Search;
    }
  }, []);

  // Memoized history suggestion checker
  const isHistorySuggestion = useCallback(
    (suggestion: SearchSuggestion) => suggestion.type === "history",
    [],
  );

  // Memoized text highlighting with regex compilation optimization
  const highlightText = useMemo(() => {
    if (!query.trim()) return (text: string) => text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    return (text: string) => {
      const parts = text.split(regex);
      return parts.map((part, index) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <mark
              key={index}
              className="bg-yellow-200 font-medium text-gray-900"
            >
              {part}
            </mark>
          );
        }
        return part;
      });
    };
  }, [query]);

  if (!suggestions.length) {
    return null;
  }

  // Check if we're showing recent searches (history suggestions)
  const hasHistorySuggestions = suggestions.some((suggestion) =>
    isHistorySuggestion(suggestion),
  );

  return (
    <div className="max-h-80 overflow-y-auto">
      {/* Clear Recent Searches Header */}
      {hasHistorySuggestions && onClearHistory && (
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
          <span className="text-sm font-medium text-gray-700">
            Recent Searches
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearHistory();
            }}
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Group suggestions by type for better organization */}
      {suggestions.map((suggestion) => {
        const Icon = getSuggestionIcon(suggestion.type);
        const isHistory = isHistorySuggestion(suggestion);

        return (
          <button
            key={suggestion.id}
            type="button"
            onClick={() => onSuggestionSelect(suggestion)}
            className={cn(
              "flex w-full items-center space-x-3 px-4 py-3",
              "text-left transition-colors duration-150 hover:bg-gray-50",
              "border-b border-gray-100 last:border-b-0",
              "focus:bg-gray-50 focus:outline-none",
            )}
          >
            {/* Icon or Product Image */}
            <div className="flex-shrink-0">
              {suggestion.image && !isHistory ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.title}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    isHistory ? "bg-blue-100" : "bg-gray-100",
                  )}
                >
                  {isHistory ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : (
                    <Icon
                      size={16}
                      className={cn(
                        suggestion.type === "product"
                          ? "text-green-600"
                          : suggestion.type === "category"
                            ? "text-blue-600"
                            : "text-purple-600",
                      )}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Suggestion Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <p className="truncate text-sm font-medium text-gray-900">
                    {isHistory
                      ? suggestion.title
                      : highlightText(suggestion.title)}
                  </p>

                  {/* Subtitle */}
                  {suggestion.subtitle && (
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {highlightText(suggestion.subtitle)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Remove Button or Type Badge */}
            <div className="flex-shrink-0">
              {isHistory && onRemoveSuggestion ? (
                <span
                  role="button"
                  onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                    e.stopPropagation();
                    onRemoveSuggestion(suggestion.id);
                  }}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
                  title="Remove from history"
                >
                  <X className="h-4 w-4" />
                </span>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    suggestion.type === "product"
                      ? "bg-green-100 text-green-800"
                      : suggestion.type === "category"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800",
                  )}
                >
                  {isHistory ? "Recent" : suggestion.type}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Memoize the component with a custom comparison function to optimize re-renders
export const SearchSuggestions = React.memo(
  SearchSuggestionsComponent,
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    return (
      prevProps.query === nextProps.query &&
      prevProps.suggestions.length === nextProps.suggestions.length &&
      prevProps.suggestions.every(
        (suggestion, index) =>
          suggestion.id === nextProps.suggestions[index]?.id,
      )
    );
  },
);
