import { useState, useEffect, useRef } from "react";

export const useCounter = (target: string, trigger: boolean) => {
  const [count, setCount] = useState("0");

  // Ref to track if animation has already run (prevents re-animation)
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Don't animate if trigger is false or animation already completed
    if (!trigger || hasAnimated.current) return;

    // Extract numeric value from target string (e.g., "1000+" -> 1000)
    const num = parseInt(target.replace(/\D/g, ""));

    // If no number found, just set the target as-is
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    // Mark animation as started to prevent re-triggering
    hasAnimated.current = true;

    // Extract suffix from target (e.g., "1000+" -> "+", "5K" -> "K")
    const suffix = target.replace(/[\d,]/g, "");

    // Animation variables
    let current = 0;
    const increment = num / 50; // Divide by 50 for smooth 2.5s animation (50 * 50ms)

    // Start the counting animation
    const timer = setInterval(() => {
      current += increment;

      // Stop when we reach or exceed the target
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }

      // Update display with formatted number and suffix
      setCount(Math.floor(current).toLocaleString() + suffix);
    }, 50); // Update every 50ms for smooth animation

    // Cleanup timer on unmount or dependency change
    return () => clearInterval(timer);
  }, [target, trigger]);

  return count;
};
