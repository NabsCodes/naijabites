// What shows up in search suggestions dropdown
export interface SearchSuggestion {
  id: string; // Unique ID
  type: "product" | "category" | "brand" | "history"; // What type of result this is
  title: string; // Main text to show
  subtitle?: string; // Secondary text (like brand name)
  image?: string; // Product image URL
  slug: string; // URL slug for navigation
  category?: string; // Product category
}

// A saved search from history
export interface SearchHistory {
  id: string; // Unique ID
  query: string; // What the user searched for
  timestamp: number; // When they searched (milliseconds)
}

// Internal state of the search system
export interface SearchState {
  query: string; // What user typed
  isOpen: boolean; // Is dropdown open?
  isLoading: boolean; // Are we loading suggestions?
  suggestions: SearchSuggestion[]; // Current suggestions to show
  recentSearches: SearchHistory[]; // Recent searches (not used directly)
  error?: string; // Any error message
}

// Options for configuring search behavior
export interface UseSearchOptions {
  debounceMs?: number; // How long to wait after typing (300ms default)
  maxSuggestions?: number; // Max suggestions to show (8 default)
  maxHistory?: number; // Max history items to keep (5 default)
  enableHistory?: boolean; // Save search history? (true default)
}

// Filters for search results page
export interface SearchFilters {
  search: string; // Search query
  category?: string; // Filter by category
  minPrice?: number; // Minimum price
  maxPrice?: number; // Maximum price
  sortBy?: string; // Sort order
}
