"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { useInventory } from "@/hooks/use-inventory";
import { ProductIcon } from "@/components/icons/product-icon";

interface VariantSelectorModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function VariantSelectorModal({
  product,
  isOpen,
  onClose,
}: VariantSelectorModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null,
  );
  const [quantity, setQuantity] = useState(1);

  const { addItem, updateQuantity, items } = useCart();
  const { toast } = useToast();

  // Use centralized pricing hook
  const { currentPrice, originalPrice, formatPrice } = useProductPricing({
    product,
    selectedVariant,
  });

  // Use centralized inventory hook
  const { inStock, maxQuantity } = useInventory({
    product,
    selectedVariant,
  });

  // Pre-fill modal with cart state for selected variant
  useEffect(() => {
    if (!product.variants) return;
    const cartItem = items.find(
      (item) =>
        item.productId === product.id &&
        item.variantId === (selectedVariant?.id || product.variants?.[0]?.id),
    );
    if (cartItem) {
      setSelectedVariant(
        product.variants.find((v) => v.id === cartItem.variantId) ||
          product.variants[0],
      );
      setQuantity(cartItem.quantity);
    } else {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, product.variants, items]);

  // Handle variant selection
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    // Check if adding this quantity would exceed max quantity
    const existingCartItem = items.find(
      (item) =>
        item.productId === product.id && item.variantId === selectedVariant.id,
    );

    if (existingCartItem) {
      // Update existing item quantity
      const newTotalQuantity = existingCartItem.quantity + quantity;
      if (newTotalQuantity > maxQuantity) {
        const availableQuantity = maxQuantity - existingCartItem.quantity;

        if (availableQuantity <= 0) {
          toast({
            title: "Maximum quantity reached",
            description: `You already have the maximum quantity (${maxQuantity}) of ${product.name} (${selectedVariant.title}) in your cart.`,
            variant: "error",
          });
        } else {
          toast({
            title: "Quantity exceeds limit",
            description: `You can only add ${availableQuantity} more of this item to your cart.`,
            variant: "error",
          });
        }
        return;
      }

      // Update existing item
      updateQuantity(existingCartItem.id, newTotalQuantity);
      toast({
        title: "Updated cart",
        description: `${product.name} (${selectedVariant.title}) quantity updated in your cart.`,
        variant: "success",
      });
    } else {
      // Add new item
      addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        quantity,
        price: selectedVariant.price,
        salePrice: selectedVariant.salePrice,
        product,
        variant: selectedVariant,
      });
      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedVariant.title}) added to your cart.`,
        variant: "success",
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Choose Your Option
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
                  // Variant availability with zero inventory check
                  const variantInventory =
                    variant.inventory ?? product.inventory;
                  const isVariantDisabled =
                    !product.inStock ||
                    !variant.isAvailable ||
                    variantInventory === 0;
                  const isVariantAvailable =
                    product.inStock &&
                    variant.isAvailable &&
                    variantInventory !== 0;
                  const isSelected = selectedVariant?.id === variant.id;

                  return (
                    <button
                      key={variant.id}
                      disabled={isVariantDisabled}
                      onClick={() => handleVariantSelect(variant)}
                      className={cn(
                        "relative flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-all duration-200",
                        // Selected state
                        isSelected && isVariantAvailable
                          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                          : // Available but not selected
                            isVariantAvailable
                            ? "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                            : // Disabled state
                              "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60",
                      )}
                    >
                      {/* Selection indicator */}
                      {isSelected && isVariantAvailable && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-orange-500">
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                      )}

                      {/* Variant info */}
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                            isSelected && isVariantAvailable
                              ? "border-orange-500 bg-orange-100"
                              : isVariantAvailable
                                ? "border-gray-300 bg-gray-100"
                                : "border-gray-300 bg-gray-200",
                          )}
                        >
                          <ProductIcon
                            className={cn(
                              "h-4 w-4",
                              isSelected && isVariantAvailable
                                ? "text-orange-600"
                                : isVariantAvailable
                                  ? "text-gray-600"
                                  : "text-gray-400",
                            )}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900">
                            {variant.title}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                isVariantDisabled
                                  ? "text-gray-400"
                                  : isSelected
                                    ? "text-orange-600"
                                    : "text-gray-700",
                              )}
                            >
                              {!product.inStock
                                ? "Out of Stock"
                                : !variant.isAvailable
                                  ? "Out of Stock"
                                  : variantInventory === 0
                                    ? "Out of Stock"
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

          {/* Quantity Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Quantity
              </label>
              {maxQuantity && (
                <span className="text-sm text-gray-500">
                  Max: {maxQuantity}
                </span>
              )}
            </div>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={maxQuantity}
              size="md"
              disabled={!inStock}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || !inStock}
              className="flex-1 bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90"
            >
              <CartIcon className="mr-2 h-4 w-4" />
              {!inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
