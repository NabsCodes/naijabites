/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
  variant?: "default" | "compact" | "interactive" | "gray";
  onRatingChange?: (rating: number) => void;
  allowHalf?: boolean;
}

// Memoized star component for performance
const StarComponent = React.memo<{
  type: "full" | "partial" | "empty";
  size: number;
  fillPercentage?: number;
  interactive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: "default" | "compact" | "interactive" | "gray";
}>(
  ({
    type,
    size,
    fillPercentage = 100,
    interactive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    variant = "default",
  }) => {
    const baseClasses = "transition-all duration-200";
    const interactiveClasses = interactive
      ? "cursor-pointer hover:scale-110 transform"
      : "";

    // Color configuration based on variant
    const colorConfig =
      variant === "gray"
        ? {
            filled: "fill-gray-900 text-gray-900",
            empty: "fill-gray-200 text-gray-300",
          }
        : {
            filled: "fill-orange-400 text-orange-400",
            empty: "fill-gray-200 text-gray-300",
          };

    const starContent = () => {
      if (type === "full") {
        return (
          <Star
            size={size}
            className={cn(baseClasses, interactiveClasses, colorConfig.filled)}
          />
        );
      }

      if (type === "empty") {
        return (
          <Star
            size={size}
            className={cn(baseClasses, interactiveClasses, colorConfig.empty)}
          />
        );
      }

      // Partial star with precise percentage fill
      return (
        <div className="relative inline-flex items-center">
          <Star
            size={size}
            className={cn(baseClasses, interactiveClasses, colorConfig.empty)}
          />
          <div
            className="absolute left-0 top-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <Star
              size={size}
              className={cn(
                baseClasses,
                interactiveClasses,
                colorConfig.filled,
              )}
            />
          </div>
        </div>
      );
    };

    if (interactive) {
      return (
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="rounded-sm p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1"
        >
          {starContent()}
        </button>
      );
    }

    return starContent();
  },
);

StarComponent.displayName = "StarComponent";

export const Rating = React.memo<RatingProps>(
  ({
    rating,
    count,
    size,
    className,
    showCount,
    variant = "default",
    onRatingChange,
    allowHalf = false,
  }) => {
    const [hoverRating, setHoverRating] = React.useState<number | null>(null);

    // Determine if this is an interactive variant
    const isInteractive = variant === "interactive";

    // Variant-specific defaults
    const variantConfig = React.useMemo(() => {
      switch (variant) {
        case "compact":
          return {
            size: size ?? 14,
            showCount: showCount ?? true,
            gap: "gap-1",
            textSize: "text-xs",
          };
        case "interactive":
          return {
            size: size ?? 20,
            showCount: showCount ?? false,
            gap: "gap-2",
            textSize: "text-sm",
          };
        case "gray":
          return {
            size: size ?? 16,
            showCount: showCount ?? false,
            gap: "gap-1",
            textSize: "text-sm",
          };
        case "default":
        default:
          return {
            size: size ?? 16,
            showCount: showCount ?? true,
            gap: "gap-2",
            textSize: "text-sm",
          };
      }
    }, [variant, size, showCount]);

    // Clamp and validate rating
    const clampedRating = React.useMemo(
      () => Math.max(0, Math.min(5, rating || 0)),
      [rating],
    );

    // Use hover rating when hovering, otherwise use actual rating
    const displayRating =
      isInteractive && hoverRating !== null ? hoverRating : clampedRating;

    // Generate stars configuration (memoized for performance)
    const starsConfig = React.useMemo(() => {
      const stars = [];

      for (let i = 1; i <= 5; i++) {
        const starRating = displayRating - (i - 1);

        if (starRating >= 1) {
          // Full star
          stars.push({
            type: "full" as const,
            key: i,
            value: i,
            fillPercentage: 100,
          });
        } else if (starRating > 0) {
          // Partial star - fixed calculation
          const percentage = Math.max(0, Math.min(100, starRating * 100));
          stars.push({
            type: "partial" as const,
            key: i,
            fillPercentage: percentage,
            value: allowHalf ? i - 0.5 : i,
          });
        } else {
          // Empty star
          stars.push({
            type: "empty" as const,
            key: i,
            value: i,
            fillPercentage: 0,
          });
        }
      }

      return stars;
    }, [displayRating, allowHalf]);

    // Event handlers
    const handleStarClick = (value: number) => {
      if (isInteractive && onRatingChange) {
        onRatingChange(value);
      }
    };

    const handleStarHover = (value: number) => {
      if (isInteractive) {
        setHoverRating(value);
      }
    };

    const handleStarHalfHover = (index: number, event: React.MouseEvent) => {
      if (isInteractive && allowHalf) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;
        const isLeftHalf = x < width / 2;
        setHoverRating(isLeftHalf ? index - 0.5 : index);
      }
    };

    const handleMouseLeave = () => {
      if (isInteractive) {
        setHoverRating(null);
      }
    };

    // Container classes
    const containerClasses = cn(
      "flex items-center",
      variantConfig.gap,
      className,
    );

    return (
      <div className={containerClasses} onMouseLeave={handleMouseLeave}>
        <div
          className="flex items-center"
          role={isInteractive ? "radiogroup" : "img"}
          aria-label={`Rating: ${clampedRating} out of 5 stars`}
        >
          {starsConfig.map(({ type, key, fillPercentage, value }) => (
            <div
              key={key}
              className="flex items-center"
              onMouseMove={(e) =>
                allowHalf ? handleStarHalfHover(key, e) : handleStarHover(value)
              }
              onMouseEnter={() => !allowHalf && handleStarHover(value)}
            >
              <StarComponent
                type={type}
                size={variantConfig.size}
                fillPercentage={fillPercentage}
                interactive={isInteractive}
                variant={variant}
                onClick={() => handleStarClick(hoverRating || value)}
              />
            </div>
          ))}
        </div>

        {variantConfig.showCount && count && (
          <span
            className={cn("font-medium text-gray-500", variantConfig.textSize)}
          >
            ({count.toLocaleString()})
          </span>
        )}
      </div>
    );
  },
);

Rating.displayName = "Rating";
