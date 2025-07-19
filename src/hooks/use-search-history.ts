import { useState, useEffect, useCallback } from "react";
import { SearchHistory } from "@/types/search";

// Where we save search history in browser storage
const STORAGE_KEY = "naijabites-search-history";
// Maximum number of searches to remember
const MAX_HISTORY_ITEMS = 15;

/**
 * Hook to manage search history
 * Saves what users searched for and lets them search again quickly
 */
export function useSearchHistory() {
  // List of all saved searches
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
      // If data is corrupted, remove it
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
    if (!cleanQuery) return; // Don't save empty searches

    setSearchHistory((previousHistory) => {
      // Remove this search if it already exists (so we don't have duplicates)
      const historyWithoutDuplicate = previousHistory.filter(
        (search) => search.query.toLowerCase() !== cleanQuery.toLowerCase(),
      );

      // Create the new search entry
      const newSearch: SearchHistory = {
        id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        query: cleanQuery,
        timestamp: Date.now(),
      };

      // Add new search to the beginning, keep only the most recent ones
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

  // Get the most recent searches (for showing in dropdown)
  const getRecentSearches = useCallback(
    (maxNumber: number = 10): SearchHistory[] => {
      return searchHistory.slice(0, maxNumber);
    },
    [searchHistory],
  );

  // Check if we already have this search in history
  const hasInHistory = useCallback(
    (searchQuery: string): boolean => {
      const cleanQuery = searchQuery.trim().toLowerCase();
      return searchHistory.some(
        (search) => search.query.toLowerCase() === cleanQuery,
      );
    },
    [searchHistory],
  );

  // Return all the functions that components can use
  return {
    searchHistory, // All saved searches
    addToHistory, // Save a new search
    removeFromHistory, // Delete one search
    clearHistory, // Delete all searches
    getRecentSearches, // Get recent searches for dropdown
    hasInHistory, // Check if search already exists
  };
}
