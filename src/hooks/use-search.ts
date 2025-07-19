import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "./use-debounce";
import { useSearchHistory } from "./use-search-history";
import { getSearchSuggestions, getSearchUrl } from "@/lib/search/search-utils";
import {
  shouldTriggerSearch,
  prepareQueryForUrl,
} from "@/lib/search/search-validation";
import {
  SearchState,
  SearchSuggestion,
  UseSearchOptions,
} from "@/types/search";

// Default settings for search
const DEFAULT_SEARCH_CONFIG = {
  debounceMs: 300, // Wait 300ms after user stops typing
  maxSuggestions: 8, // Show max 8 suggestions
  maxHistory: 5, // Keep 5 recent searches
  enableHistory: true, // Save search history
};

/**
 * Main search hook - handles all search functionality
 * This is what components use to add search features
 */
export function useSearch(options: UseSearchOptions = {}) {
  const router = useRouter();
  const config = { ...DEFAULT_SEARCH_CONFIG, ...options };

  // Get search history functions
  const {
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
    hasInHistory,
  } = useSearchHistory();

  // Main search state - stores everything about current search
  const [searchState, setSearchState] = useState<SearchState>({
    query: "", // What user typed
    isOpen: false, // Is dropdown open?
    isLoading: false, // Are we loading suggestions?
    suggestions: [], // Current suggestions to show
    recentSearches: [], // Recent searches (not used directly)
    error: undefined, // Any error message
  });

  // Debounced query - only updates after user stops typing for 300ms
  const debouncedQuery = useDebounce(searchState.query, config.debounceMs);

  // Get suggestions based on what user typed (after debounce)
  const currentSuggestions = useMemo(() => {
    // If query is too short, show recent searches instead
    if (!shouldTriggerSearch(debouncedQuery)) {
      return getRecentSearches(config.maxHistory).map(
        (history): SearchSuggestion => ({
          id: history.id,
          type: "history",
          title: history.query,
          slug: history.query,
        }),
      );
    }

    // Get actual search suggestions
    return getSearchSuggestions(debouncedQuery, {
      maxProducts: 5, // Show 5 products
      maxCategories: 2, // Show 2 categories
      maxBrands: 2, // Show 2 brands
    });
  }, [debouncedQuery, config.maxHistory, getRecentSearches]);

  // Update suggestions when they change
  useEffect(() => {
    setSearchState((prev) => ({
      ...prev,
      suggestions: currentSuggestions,
      isLoading: false,
    }));
  }, [currentSuggestions]);

  // Show loading when user is typing (before debounce kicks in)
  useEffect(() => {
    const isUserTyping = searchState.query !== debouncedQuery;
    const hasQuery = searchState.query.trim();

    if (isUserTyping && hasQuery) {
      setSearchState((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [searchState.query, debouncedQuery]);

  // Update what user typed
  const updateQuery = useCallback((newQuery: string) => {
    setSearchState((prev) => ({
      ...prev,
      query: newQuery,
      isOpen: shouldTriggerSearch(newQuery),
      error: undefined,
    }));
  }, []);

  // Open/close the dropdown
  const setDropdownOpen = useCallback((isOpen: boolean) => {
    setSearchState((prev) => ({
      ...prev,
      isOpen,
    }));
  }, []);

  // Perform actual search (go to results page)
  const doSearch = useCallback(
    (searchQuery?: string) => {
      const queryToSearch = searchQuery || searchState.query;

      // Clean up the query for URL
      const cleanQuery = prepareQueryForUrl(queryToSearch);
      if (!cleanQuery) return;

      // Save to history
      if (config.enableHistory) {
        addToHistory(cleanQuery);
      }

      // Go to search results page
      const searchUrl = getSearchUrl(cleanQuery);
      router.push(searchUrl);

      // Close dropdown
      setDropdownOpen(false);
    },
    [
      searchState.query,
      config.enableHistory,
      addToHistory,
      router,
      setDropdownOpen,
    ],
  );

  // Handle when user clicks a suggestion
  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      const currentQuery = searchState.query.trim();

      // Check if this is a recent search from history
      const isRecentSearch = suggestion.type === "history";

      if (isRecentSearch) {
        // Search again with the historical query
        doSearch(suggestion.title);
        return;
      }

      // Save current query to history
      if (config.enableHistory && currentQuery) {
        addToHistory(currentQuery);
      }

      // Navigate based on suggestion type
      if (suggestion.type === "product") {
        router.push(`/shop/products/${suggestion.slug}`);
      } else if (suggestion.type === "category") {
        router.push(`/shop/categories/${suggestion.slug}`);
      } else if (suggestion.type === "brand") {
        router.push(
          `/shop/products?brand=${encodeURIComponent(suggestion.title)}`,
        );
      }

      // Close dropdown
      setDropdownOpen(false);
    },
    [
      searchState.query,
      config.enableHistory,
      addToHistory,
      router,
      doSearch,
      setDropdownOpen,
    ],
  );

  // Clear the search input
  const clearSearch = useCallback(() => {
    setSearchState((prev) => ({
      ...prev,
      query: "",
      isOpen: false,
    }));
  }, []);

  // Remove a suggestion from history
  const removeSuggestion = useCallback(
    (suggestionId: string) => {
      removeFromHistory(suggestionId);
    },
    [removeFromHistory],
  );

  // Return everything components need
  return {
    // Current state
    query: searchState.query,
    isOpen: searchState.isOpen,
    isLoading: searchState.isLoading,
    suggestions: searchState.suggestions,
    error: searchState.error,

    // Actions
    setQuery: updateQuery,
    setIsOpen: setDropdownOpen,
    performSearch: doSearch,
    clearSearch,
    handleSuggestionSelect: handleSuggestionClick,
    removeSuggestion,

    // History actions
    clearSearchHistory: clearHistory,
    hasInHistory,
  };
}
