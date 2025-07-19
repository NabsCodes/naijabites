import { Product, ProductVariant } from "@/types";

interface UseInventoryProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

interface InventoryInfo {
  /** Current available inventory */
  inventory?: number;
  /** Whether item is in stock - prioritizes product.inStock flag */
  inStock: boolean;
  /** Maximum quantity that can be ordered */
  maxQuantity: number;
}

/**
 * Hook to determine inventory information for a product/variant combination
 * Prioritizes product.inStock flag first, then variant availability, then inventory numbers
 * This aligns with the existing pricing logic and maintains button disable behavior
 */
export function useInventory({
  product,
  selectedVariant,
}: UseInventoryProps): InventoryInfo {
  // Determine which inventory to use (prefer variant over product)
  const inventory = selectedVariant?.inventory ?? product.inventory;

  // Stock status logic that aligns with existing codebase:
  // 1. First check product.inStock flag (used for graying out buttons)
  // 2. Then check variant availability if applicable
  // 3. Finally check inventory numbers as additional info
  const inStock =
    product.inStock &&
    (selectedVariant ? selectedVariant.isAvailable : true) &&
    (inventory !== undefined ? inventory > 0 : true);

  // Max quantity should respect inventory limits but allow ordering when inStock is true
  const maxQuantity =
    inventory !== undefined && inventory > 0
      ? Math.min(inventory, 99) // Cap at 99 for UX
      : inStock
        ? 99 // Default max when in stock but no inventory tracking
        : 0; // No ordering when out of stock

  return {
    inventory,
    inStock,
    maxQuantity,
  };
}
