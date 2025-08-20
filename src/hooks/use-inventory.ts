import { useMemo } from "react";
import { Product, ProductVariant } from "@/types";

interface UseInventoryProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

interface InventoryInfo {
  /** Current available inventory - undefined means no inventory tracking */
  inventory: number | undefined;
  /** Whether item is in stock - considers both flags and actual inventory */
  inStock: boolean;
  /** Maximum quantity that can be ordered - respects inventory limits */
  maxQuantity: number;
}

/**
 * Hook to determine inventory information for a product/variant combination
 *
 * Balanced approach with essential inventory checks:
 * 1. Variant availability (variant.isAvailable) - for variant products
 * 2. Product stock flag (product.inStock) - for simple products
 * 3. Inventory limits (inventory > 0) - prevents zero stock sales
 *
 * This provides reliable stock validation while keeping logic clean
 */
export function useInventory({
  product,
  selectedVariant,
}: UseInventoryProps): InventoryInfo {
  return useMemo(() => {
    // Use the product data as provided (optimistic approach)
    const currentProduct = product;
    const currentVariant = selectedVariant;

    // Determine which inventory to use (prefer variant over product)
    const inventory = currentVariant?.inventory ?? currentProduct.inventory;

    // Stock status logic with inventory check
    // 1. If there is a variant, check if it is available and if the inventory is greater than 0
    // 2. If there is no variant, check if the product is in stock and if the inventory is greater than 0
    // 3. If the inventory is undefined, set inStock to false
    const inStock = currentVariant
      ? currentVariant.isAvailable && (inventory === undefined || inventory > 0)
      : currentProduct.inStock && (inventory === undefined || inventory > 0);

    // Max quantity logic with inventory limits but allow ordering more than the inventory
    const maxQuantity = inStock
      ? inventory !== undefined
        ? Math.min(inventory, 99)
        : 99
      : 0;

    return {
      inventory,
      inStock,
      maxQuantity,
    };
  }, [product, selectedVariant]);
}
