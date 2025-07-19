import { useMemo } from "react";
import { Product, ProductVariant } from "@/types";
import { formatPrice as formatPriceUtil } from "@/lib/utils";

interface UsePricingProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

interface PricingResult {
  currentPrice: number;
  originalPrice: number | null;
  formatPrice: (price: number) => string;
  hasDiscount: boolean;
  savingsAmount: number | null;
  isOnSale: boolean;
}

interface ProductCardPricingResult {
  currentPrice: number;
  originalPrice: number | null;
  formatPrice: (price: number) => string;
  hasVariants: boolean;
  priceRange: boolean;
  hasDiscount: boolean;
}

/**
 * Centralized hook for all product pricing logic
 * Handles variants, sales, discounts, and formatting consistently
 */
export function useProductPricing({
  product,
  selectedVariant,
}: UsePricingProps): PricingResult {
  const pricing = useMemo(() => {
    // Determine current price based on variant and sale status
    let currentPrice: number;
    let originalPrice: number | null = null;

    if (selectedVariant) {
      // Use variant pricing
      if (product.isOnSale && selectedVariant.salePrice) {
        currentPrice = selectedVariant.salePrice;
        originalPrice = selectedVariant.price;
      } else {
        currentPrice = selectedVariant.price;
      }
    } else {
      // Use product-level pricing
      if (product.isOnSale && product.salePrice) {
        currentPrice = product.salePrice;
        originalPrice = product.price;
      } else {
        currentPrice = product.price;
      }
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
  }, [product, selectedVariant]);

  return pricing;
}

/**
 * Specialized hook for product card pricing display
 * Calculates lowest prices across variants for card display
 */
export function useProductCardPricing(
  product: Product,
): ProductCardPricingResult {
  const pricing = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      // No variants - use product-level pricing
      return {
        currentPrice:
          product.isOnSale && product.salePrice
            ? product.salePrice
            : product.price,
        originalPrice:
          product.isOnSale && product.salePrice ? product.price : null,
        formatPrice: formatPriceUtil,
        hasVariants: false,
        priceRange: false,
        hasDiscount: product.isOnSale && !!product.salePrice,
      };
    }

    // Has variants - calculate lowest prices
    const variantPrices = product.variants.map((variant) => {
      const currentPrice =
        product.isOnSale && variant.salePrice
          ? variant.salePrice
          : variant.price;
      const originalPrice =
        product.isOnSale && variant.salePrice ? variant.price : variant.price;
      return { currentPrice, originalPrice };
    });

    const lowestCurrentPrice = Math.min(
      ...variantPrices.map((p) => p.currentPrice),
    );
    const lowestOriginalPrice = Math.min(
      ...variantPrices.map((p) => p.originalPrice),
    );
    const hasVariantSales =
      product.isOnSale && product.variants.some((v) => v.salePrice);

    // Check if there's a price range (different prices across variants)
    const hasRange = new Set(variantPrices.map((p) => p.currentPrice)).size > 1;

    return {
      currentPrice: lowestCurrentPrice,
      originalPrice: hasVariantSales ? lowestOriginalPrice : null,
      formatPrice: formatPriceUtil,
      hasVariants: true,
      priceRange: hasRange,
      hasDiscount: hasVariantSales,
    };
  }, [product]);

  return pricing;
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
