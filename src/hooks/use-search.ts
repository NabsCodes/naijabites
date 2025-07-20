import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "./use-debounce";
import {
  SearchSuggestion,
  SearchHistory,
  UseSearchOptions,
} from "@/types/search";
import {
  shouldTriggerSearch,
  prepareQueryForUrl,
  getSearchSuggestions,
  getSearchUrl,
} from "@/utils/search";

// Constants
const STORAGE_KEY = "naijabites-search-history";
const MAX_HISTORY_ITEMS = 15;

// Default settings for search
const DEFAULT_SEARCH_CONFIG = {
  debounceMs: 300,
  maxHistory: 5,
  enableHistory: true,
};

// Search history hook
function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  // Load saved searches when component first loads
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem(STORAGE_KEY);
      if (savedSearches) {
        const parsedSearches = JSON.parse(savedSearches) as SearchHistory[];

        // Only keep valid search entries
        const validSearches = parsedSearches.filter((search) => {
          return (
            search &&
            typeof search.id === "string" &&
            typeof search.query === "string" &&
            typeof search.timestamp === "number" &&
            search.query.trim().length > 0
          );
        });

        setSearchHistory(validSearches);
      }
    } catch (error) {
      console.error("Could not load search history:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save searches to browser storage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error("Could not save search history:", error);
    }
  }, [searchHistory]);

  // Add a new search to the history
  const addToHistory = useCallback((searchQuery: string) => {
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) return;

    setSearchHistory((previousHistory) => {
      const historyWithoutDuplicate = previousHistory.filter(
        (search) => search.query.toLowerCase() !== cleanQuery.toLowerCase(),
      );

      const newSearch: SearchHistory = {
        id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        query: cleanQuery,
        timestamp: Date.now(),
      };

      return [newSearch, ...historyWithoutDuplicate].slice(
        0,
        MAX_HISTORY_ITEMS,
      );
    });
  }, []);

  // Remove one specific search from history
  const removeFromHistory = useCallback((searchId: string) => {
    setSearchHistory((previousHistory) =>
      previousHistory.filter((search) => search.id !== searchId),
    );
  }, []);

  // Clear all search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  // Get the most recent searches
  const getRecentSearches = useCallback(
    (maxNumber: number = 10): SearchHistory[] => {
      return searchHistory.slice(0, maxNumber);
    },
    [searchHistory],
  );

  return {
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
  };
}

// Main search hook - handles all search functionality
export function useSearch(options: UseSearchOptions = {}) {
  const router = useRouter();
  const config = { ...DEFAULT_SEARCH_CONFIG, ...options };

  // Get search history functions
  const { addToHistory, removeFromHistory, clearHistory, getRecentSearches } =
    useSearchHistory();

  // Main search state
  const [searchState, setSearchState] = useState<{
    query: string;
    isOpen: boolean;
  }>({
    query: "",
    isOpen: false,
  });

  // Debounced query
  const debouncedQuery = useDebounce(searchState.query, config.debounceMs);

  // Get suggestions based on what user typed
  const currentSuggestions = useMemo(() => {
    if (!shouldTriggerSearch(debouncedQuery)) {
      return getRecentSearches(config.maxHistory).map((history) => ({
        id: history.id,
        type: "history" as const,
        title: history.query,
        slug: history.query,
      }));
    }

    return getSearchSuggestions(debouncedQuery, {
      maxProducts: 5,
      maxCategories: 2,
      maxBrands: 2,
    });
  }, [debouncedQuery, config.maxHistory, getRecentSearches]);

  // Helper function to clear search state
  const clearSearchState = useCallback(() => {
    setSearchState({
      query: "",
      isOpen: false,
    });
  }, []);

  // Update what user typed
  const updateQuery = useCallback((newQuery: string) => {
    setSearchState((prev) => ({
      ...prev,
      query: newQuery,
      isOpen: shouldTriggerSearch(newQuery),
    }));
  }, []);

  // Open/close the dropdown
  const setDropdownOpen = useCallback((isOpen: boolean) => {
    setSearchState((prev) => ({ ...prev, isOpen }));
  }, []);

  // Perform actual search
  const doSearch = useCallback(
    (searchQuery?: string) => {
      const queryToSearch = searchQuery || searchState.query;
      const cleanQuery = prepareQueryForUrl(queryToSearch);

      if (!cleanQuery) return;

      if (config.enableHistory) {
        addToHistory(cleanQuery);
      }

      router.push(getSearchUrl(cleanQuery));
      clearSearchState();
    },
    [
      searchState.query,
      config.enableHistory,
      addToHistory,
      router,
      clearSearchState,
    ],
  );

  // Handle suggestion clicks
  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      if (suggestion.type === "history") {
        doSearch(suggestion.title);
        return;
      }

      if (config.enableHistory && searchState.query.trim()) {
        addToHistory(searchState.query.trim());
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

      clearSearchState();
    },
    [
      searchState.query,
      config.enableHistory,
      addToHistory,
      router,
      doSearch,
      clearSearchState,
    ],
  );

  return {
    // State
    query: searchState.query,
    isOpen: searchState.isOpen,
    suggestions: currentSuggestions,

    // Actions
    setQuery: updateQuery,
    setIsOpen: setDropdownOpen,
    performSearch: doSearch,
    clearSearch: clearSearchState,
    handleSuggestionSelect: handleSuggestionClick,
    removeSuggestion: removeFromHistory,
    clearSearchHistory: clearHistory,
  };
}
