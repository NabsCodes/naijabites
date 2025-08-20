import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
  selectedVariantId?: string; // For products with variants
  quantity: number;
}

// Wishlist Store State - might replace localStorage with Shopify customer metafields
interface WishlistState {
  // State
  items: WishlistItem[];
  isLoading: boolean;

  // Core Actions - add, remove, clear
  addItem: (item: Omit<WishlistItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;

  // Utilities - get total items, check if item exists
  getTotalItems: () => number;
  hasItem: (productId: string, variantId?: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,

      // Core Actions
      addItem: (itemData) => {
        const newItem: WishlistItem = {
          ...itemData,
          id: crypto.randomUUID(),
          addedAt: new Date().toISOString(),
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      // Utilities
      getTotalItems: () => {
        return get().items.length;
      },

      hasItem: (productId, variantId) => {
        return get().items.some(
          (item) =>
            item.product.id === productId &&
            (!variantId || item.selectedVariantId === variantId),
        );
      },
    }),
    {
      name: "naijabites-wishlist",
      version: 1,
      // Optional: migrate old data if needed
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          // Handle migration from localStorage if needed
          return persistedState;
        }
        return persistedState;
      },
    },
  ),
);
