export interface SearchSuggestion {
  id: string;
  type: "product" | "category" | "brand" | "history";
  title: string;
  subtitle?: string;
  image?: string;
  slug: string;
  category?: string;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
}

export interface UseSearchOptions {
  debounceMs?: number;
  maxHistory?: number;
  enableHistory?: boolean;
}
