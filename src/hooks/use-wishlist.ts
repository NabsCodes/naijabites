import { useCallback } from "react";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useToast } from "@/hooks/use-toast";
import type { Product, ProductVariant } from "@/types";

export const useWishlist = () => {
  const {
    items,
    isLoading: storeLoading,
    addItem,
    removeItem,
    clearWishlist,
    hasItem,
    getTotalItems,
  } = useWishlistStore();

  const { toast } = useToast();

  // Add item to wishlist
  const addToWishlist = useCallback(
    (product: Product, variant?: ProductVariant) => {
      try {
        addItem({
          product,
          selectedVariantId: variant?.id || undefined,
          quantity: 1,
        });

        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist`,
          variant: "success",
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to add item to wishlist",
          variant: "error",
        });
      }
    },
    [addItem, toast],
  );

  // Remove item from wishlist
  const removeFromWishlist = useCallback(
    (id: string) => {
      try {
        const item = items.find((i) => i.id === id);
        if (item) {
          removeItem(id);
          toast({
            title: "Removed from wishlist",
            description: `${item.product.name} has been removed from your wishlist`,
            variant: "success",
          });
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to remove item from wishlist",
          variant: "error",
        });
      }
    },
    [items, removeItem, toast],
  );

  // Clear entire wishlist
  const clearAll = useCallback(() => {
    try {
      clearWishlist();
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to clear wishlist",
        variant: "error",
      });
    }
  }, [clearWishlist, toast]);

  // Check if product is in wishlist
  const isInWishlist = useCallback(
    (productId: string, variantId?: string) => {
      return hasItem(productId, variantId);
    },
    [hasItem],
  );

  // Toggle wishlist status
  const toggleWishlist = useCallback(
    (product: Product, variant?: ProductVariant) => {
      const productId = product.id;
      const variantId = variant?.id;

      if (isInWishlist(productId, variantId)) {
        // Find and remove the item
        const item = items.find(
          (i) =>
            i.product.id === productId &&
            (!variantId || i.selectedVariantId === variantId),
        );
        if (item) {
          removeFromWishlist(item.id);
        }
      } else {
        // Add to wishlist
        addToWishlist(product, variant);
      }
    },
    [items, isInWishlist, addToWishlist, removeFromWishlist],
  );

  return {
    // State
    items,
    isLoading: storeLoading,
    totalItems: getTotalItems(),

    // Actions
    addToWishlist,
    removeFromWishlist,
    clearAll,
    toggleWishlist,

    // Queries
    isInWishlist,

    // Raw store actions (for advanced use cases)
    addItem,
    removeItem,
    clearWishlist,
  };
};
