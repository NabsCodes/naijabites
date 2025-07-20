"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { SearchSuggestions } from "./search-suggestions";
import { SearchSuggestion } from "@/types/search";
import { SearchNoResults } from "./search-no-results";

interface SearchAutocompleteProps {
  suggestions: SearchSuggestion[];
  onSuggestionSelect: (suggestion: SearchSuggestion) => void;
  onRemoveSuggestion?: (suggestionId: string) => void;
  query: string;
  className?: string;
  onClearHistory?: () => void;
}

// Search Autocomplete Component
const SearchAutocompleteComponent = ({
  suggestions,
  onSuggestionSelect,
  onRemoveSuggestion,
  query,
  className,
  onClearHistory,
}: SearchAutocompleteProps) => {
  // Don't render if no query or loading
  if (!query.trim() && !suggestions.length) {
    return null;
  }

  const hasResults = suggestions.length > 0;
  const showNoResults = query.trim() && !hasResults;

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-full z-50 mt-1",
        "rounded-lg border border-gray-200 bg-white shadow-lg",
        "max-h-96 overflow-hidden",
        "duration-100 animate-in fade-in-0 zoom-in-95",
        className,
      )}
    >
      {/* No Results */}
      {showNoResults && <SearchNoResults query={query} />}

      {/* Suggestions */}
      {hasResults && (
        <SearchSuggestions
          suggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
          onRemoveSuggestion={onRemoveSuggestion}
          query={query}
          onClearHistory={onClearHistory}
        />
      )}
    </div>
  );
};

// Memoize the component with a custom comparison function to optimize re-renders
export const SearchAutocomplete = memo(
  SearchAutocompleteComponent,
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    return (
      prevProps.query === nextProps.query &&
      prevProps.className === nextProps.className &&
      prevProps.suggestions.length === nextProps.suggestions.length &&
      prevProps.suggestions.every(
        (suggestion, index) =>
          suggestion.id === nextProps.suggestions[index]?.id,
      )
    );
  },
);
