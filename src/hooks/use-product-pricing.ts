import { useMemo } from "react";
import { Product } from "@/types";
import { formatPrice as formatPriceUtil } from "@/lib/utils";

interface UsePricingProps {
  product: Product;
}

interface PricingResult {
  currentPrice: number;
  originalPrice: number | null;
  formatPrice: (price: number) => string;
  hasDiscount: boolean;
  savingsAmount: number | null;
  isOnSale: boolean;
}

/**
 * Centralized hook for all product pricing logic
 * Handles sales, discounts, and formatting consistently
 */
export function useProductPricing({
  product,
}: UsePricingProps): PricingResult {
  const pricing = useMemo(() => {
    // Use product-level pricing
    let currentPrice: number;
    let originalPrice: number | null = null;

    if (product.isOnSale && product.salePrice) {
      currentPrice = product.salePrice;
      originalPrice = product.price;
    } else {
      currentPrice = product.price;
    }

    const hasDiscount = originalPrice !== null;
    const savingsAmount =
      hasDiscount && originalPrice ? originalPrice - currentPrice : null;

    return {
      currentPrice,
      originalPrice,
      formatPrice: formatPriceUtil,
      hasDiscount,
      savingsAmount,
      isOnSale: product.isOnSale && hasDiscount,
    };
  }, [product]);

  return pricing;
}

/**
 * Function for product card pricing display
 * Calculates pricing for card display
 */
export function getProductCardPricing(product: Product): {
  currentPrice: number;
  originalPrice: number | null;
  hasDiscount: boolean;
  isOnSale: boolean;
} {
  // Use product-level pricing
  if (product.isOnSale && product.salePrice) {
    return {
      currentPrice: product.salePrice,
      originalPrice: product.price,
      hasDiscount: true,
      isOnSale: true,
    };
  }

  return {
    currentPrice: product.price,
    originalPrice: null,
    hasDiscount: false,
    isOnSale: false,
  };
}

/**
 * Hook for cart item pricing calculations
 * Handles individual cart item price calculations
 */
export function useCartItemPricing(
  price: number,
  salePrice?: number,
  quantity: number = 1,
) {
  return useMemo(() => {
    const currentPrice = salePrice || price;
    const originalPrice = salePrice ? price : null;
    const lineTotal = currentPrice * quantity;
    const savings = originalPrice
      ? (originalPrice - currentPrice) * quantity
      : 0;

    return {
      currentPrice,
      originalPrice,
      lineTotal,
      savings,
      formatPrice: formatPriceUtil,
      hasDiscount: !!salePrice,
    };
  }, [price, salePrice, quantity]);
}
