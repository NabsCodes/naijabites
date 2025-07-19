// Constants for validation
export const SEARCH_VALIDATION = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 100,
  DEBOUNCE_MIN_LENGTH: 2,
} as const;

// Simplified validation - only check length
export function validateSearchQuery(query: string): {
  isValid: boolean;
  error?: string;
} {
  if (!query || typeof query !== "string") {
    return {
      isValid: false,
      error: "Search query must be a valid string",
    };
  }

  const trimmed = query.trim();

  // Check minimum length
  if (trimmed.length < SEARCH_VALIDATION.MIN_LENGTH) {
    return {
      isValid: false,
      error: `Search query must be at least ${SEARCH_VALIDATION.MIN_LENGTH} character(s)`,
    };
  }

  // Check maximum length
  if (trimmed.length > SEARCH_VALIDATION.MAX_LENGTH) {
    return {
      isValid: false,
      error: `Search query must be less than ${SEARCH_VALIDATION.MAX_LENGTH} characters`,
    };
  }

  return {
    isValid: true,
  };
}

// Check if query should trigger search suggestions
export function shouldTriggerSearch(query: string): boolean {
  return query.trim().length >= SEARCH_VALIDATION.DEBOUNCE_MIN_LENGTH;
}

// Clean up query for URL encoding - just normalize whitespace
export function prepareQueryForUrl(query: string): string {
  return query.trim().replace(/\s+/g, " "); // Just normalize whitespace
}
