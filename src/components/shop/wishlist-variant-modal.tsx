"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { useProductPricing } from "@/hooks/use-product-pricing";
// import { useInventory } from "@/hooks/use-inventory";
import { ProductIcon } from "@/components/icons/product-icon";

interface WishlistVariantModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistVariantModal({
  product,
  isOpen,
  onClose,
}: WishlistVariantModalProps) {
  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Use centralized wishlist hook
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  // Use centralized pricing hook
  const { currentPrice, originalPrice, formatPrice } = useProductPricing({
    product,
    selectedVariant,
  });

  // Use centralized inventory hook
  // const { inStock } = useInventory({
  //   product,
  //   selectedVariant,
  // });

  // Check if the specific selected variant is in wishlist
  const isSelectedVariantWishlisted = selectedVariant
    ? isInWishlist(product.id, selectedVariant.id)
    : false;

  // Handle variant selection
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!selectedVariant) return;

    setIsLoading(true);
    try {
      // Small delay for better UX and to prevent rapid clicking
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Toggle wishlist with the selected variant
      toggleWishlist(product, selectedVariant);

      const variantText = selectedVariant ? ` (${selectedVariant.title})` : "";
      toast({
        title: isSelectedVariantWishlisted
          ? "Removed from wishlist"
          : "Added to wishlist",
        description: `${product.name}${variantText} has been ${
          isSelectedVariantWishlisted ? "removed from" : "added to"
        } your wishlist.`,
        variant: "success",
      });

      onClose();
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {isSelectedVariantWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <Image
                src={product.image || "/images/product-placeholder.svg"}
                alt={product.name}
                fill
                className="cursor-pointer object-contain p-1 transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold leading-tight text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {product.shortDescription}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {selectedVariant
                  ? isSelectedVariantWishlisted
                    ? `The ${selectedVariant.title} variant is in your wishlist. You can remove it or select a different variant.`
                    : `Choose a variant to add to your wishlist. Each variant is saved separately.`
                  : "Choose a variant to add to your wishlist."}
              </div>
            </div>
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-gray-900">
                  {product.variants.length === 1 ? "Size" : "Available Sizes"}
                </h4>
                <span className="text-sm text-gray-500">
                  {product.variants.length} option
                  {product.variants.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {product.variants.map((variant) => {
                  const isVariantAvailable =
                    product.inStock && variant.isAvailable;
                  const isSelected = selectedVariant?.id === variant.id;
                  const isThisVariantWishlisted = isInWishlist(
                    product.id,
                    variant.id,
                  );

                  return (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={cn(
                        "relative flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-all duration-200",
                        // Selected state
                        isSelected
                          ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                          : // In wishlist but not selected
                            isThisVariantWishlisted
                            ? "border-red-300 bg-red-50 hover:border-red-400"
                            : // Available but not selected
                              isVariantAvailable
                              ? "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50"
                              : // Out of stock but still selectable for wishlist
                                "border-gray-200 bg-gray-50 opacity-75 hover:border-gray-300",
                      )}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-500">
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                      )}

                      {/* Wishlist indicator */}
                      {isThisVariantWishlisted && !isSelected && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500">
                          <div className="flex h-full w-full items-center justify-center">
                            <HeartIconSolid className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Variant info */}
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                            isSelected
                              ? "border-green-500 bg-green-100"
                              : isThisVariantWishlisted
                                ? "border-red-400 bg-red-100"
                                : isVariantAvailable
                                  ? "border-gray-300 bg-gray-100"
                                  : "border-gray-300 bg-gray-200",
                          )}
                        >
                          {isThisVariantWishlisted && !isSelected ? (
                            <HeartIconSolid className="h-4 w-4 text-red-600" />
                          ) : (
                            <ProductIcon
                              className={cn(
                                "h-4 w-4",
                                isSelected
                                  ? "text-green-600"
                                  : isVariantAvailable
                                    ? "text-gray-600"
                                    : "text-gray-400",
                              )}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-gray-900">
                              {variant.title}
                            </div>
                            {isThisVariantWishlisted && (
                              <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                In Wishlist
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                !isVariantAvailable
                                  ? "text-gray-400"
                                  : isSelected
                                    ? "text-green-600"
                                    : isThisVariantWishlisted
                                      ? "text-red-600"
                                      : "text-gray-700",
                              )}
                            >
                              {!product.inStock
                                ? "Out of Stock"
                                : !variant.isAvailable
                                  ? "Unavailable"
                                  : product.isOnSale && variant.salePrice
                                    ? formatPrice(variant.salePrice)
                                    : formatPrice(variant.price)}
                            </span>
                            {product.isOnSale &&
                              variant.salePrice &&
                              isVariantAvailable && (
                                <span className="text-xs text-gray-500 line-through">
                                  {formatPrice(variant.price)}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Price</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleWishlistToggle}
              disabled={!selectedVariant || isLoading}
              className="flex-1 bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLoading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
              ) : isSelectedVariantWishlisted ? (
                <HeartIconSolid className="mr-2 h-4 w-4" />
              ) : (
                <HeartIcon className="mr-2 h-4 w-4" />
              )}
              {isLoading
                ? "Updating..."
                : isSelectedVariantWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
