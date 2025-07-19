import { useState, useEffect } from "react";

/**
 * Debounce hook that delays execution of a value update
 * Useful for search inputs to avoid excessive API calls or computations
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay completes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Alternative debounce hook that returns both current and debounced values
 * Useful when you need to show immediate feedback but process delayed
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number,
): {
  current: T;
  debounced: T;
  isDebouncing: boolean;
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (value !== debouncedValue) {
      setIsDebouncing(true);
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, debouncedValue]);

  return {
    current: value,
    debounced: debouncedValue,
    isDebouncing,
  };
}
