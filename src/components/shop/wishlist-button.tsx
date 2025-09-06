"use client";

import { useState, useEffect } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { WishlistVariantModal } from "@/components/shop/wishlist-variant-modal";
import type { Product, ProductVariant } from "@/types";
import { useAuth } from "@/lib/stores/auth-store";

interface WishlistButtonProps {
  product: Product;
  variant?: ProductVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function WishlistButton({
  product,
  variant,
  size = "md",
  className,
  showText = false,
}: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Auth store to check if user is logged in
  const { isLoggedIn } = useAuth();

  // Simple hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if product has variants
  const hasVariants = product.variants && product.variants.length > 0;

  // For products with variants, check if ANY variant is wishlisted
  // For products without variants, check if the product itself is wishlisted
  const isWishlisted =
    mounted &&
    (hasVariants
      ? isInWishlist(product.id) // Check if product (any variant) is wishlisted
      : isInWishlist(product.id, variant?.id)); // Check specific variant

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return; // Prevent multiple clicks

    // If product has variants, show variant selector modal
    if (hasVariants) {
      setShowVariantModal(true);
      return;
    }

    // For products without variants, handle directly
    setIsLoading(true);
    setIsAnimating(true);

    try {
      // Small delay for better UX and to prevent rapid clicking
      await new Promise((resolve) => setTimeout(resolve, 300));

      toggleWishlist(product, variant);
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    } finally {
      setIsLoading(false);
      // Reset animation after a short delay
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const sizeClasses = {
    sm: "h-6 w-6 p-1",
    md: "h-8 w-8 p-1.5",
    lg: "h-10 w-10 p-2",
  };

  // Hide wishlist button for non-logged in users
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          showText
            ? "flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            : "absolute z-10 flex items-center justify-center rounded-full border border-green-dark bg-white transition-all duration-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
          // Only apply default size classes if no custom className is provided and not showing text
          !showText &&
            !className?.includes("h-") &&
            !className?.includes("w-") &&
            sizeClasses[size],
          className,
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {isWishlisted ? (
              <HeartIconSolid
                className={cn(
                  showText ? "h-4 w-4" : "h-full w-full text-green-dark",
                  "transition-all duration-200",
                  isAnimating && "scale-110",
                )}
              />
            ) : (
              <HeartIcon
                className={cn(
                  showText ? "h-4 w-4" : "h-full w-full text-gray-600",
                  "transition-all duration-200",
                  isAnimating && "scale-110",
                )}
              />
            )}
            {showText && (
              <span className="ml-2 text-sm">
                {isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              </span>
            )}
          </>
        )}
      </button>

      {/* Variant Selector Modal for products with variants */}
      {hasVariants && (
        <WishlistVariantModal
          product={product}
          isOpen={showVariantModal}
          onClose={() => setShowVariantModal(false)}
        />
      )}
    </>
  );
}
