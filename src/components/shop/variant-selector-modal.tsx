"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
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

  const { addItem, items } = useCart();
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
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Choose Your Option
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Image and Basic Info */}
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image || "/images/product-placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product.shortDescription}
              </p>
            </div>
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">
                {product.variants.length === 1 ? "Available Size" : "Size/Pack"}
              </h4>
              <div
                className={cn(
                  "grid gap-2",
                  product.variants.length === 1 ? "grid-cols-1" : "grid-cols-2",
                )}
              >
                {product.variants.map((variant) => {
                  const isVariantDisabled =
                    !product.inStock || !variant.isAvailable;
                  const isVariantAvailable =
                    product.inStock && variant.isAvailable;

                  return (
                    <button
                      key={variant.id}
                      disabled={isVariantDisabled}
                      onClick={() => handleVariantSelect(variant)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border-2 p-3 transition-all",
                        // Available and selected
                        selectedVariant?.id === variant.id && isVariantAvailable
                          ? "border-orange-500 bg-orange-dark text-white shadow-sm"
                          : // Available but not selected
                            isVariantAvailable
                            ? "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
                            : // Not available (disabled state)
                              "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60",
                      )}
                    >
                      {/* Product Icon */}
                      <div
                        className={cn(
                          "flex shrink-0 items-center justify-center rounded-full border-2 p-1.5 sm:p-2",
                          selectedVariant?.id === variant.id &&
                            isVariantAvailable
                            ? "border-white/20 bg-white/10"
                            : isVariantAvailable
                              ? "border-gray-300 bg-[#E5FFF5]"
                              : "border-gray-300 bg-gray-200",
                        )}
                      >
                        <ProductIcon
                          className={cn(
                            "h-4 w-4 sm:h-5 sm:w-5",
                            selectedVariant?.id === variant.id &&
                              isVariantAvailable
                              ? "text-white"
                              : isVariantAvailable
                                ? "text-orange-dark"
                                : "text-gray-400",
                          )}
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                        <span className="truncate text-xs font-medium sm:text-sm">
                          {variant.title}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-bold sm:text-sm",
                            isVariantDisabled && "text-gray-400",
                          )}
                        >
                          {!product.inStock
                            ? "Out of Stock"
                            : !variant.isAvailable
                              ? "Out of Stock"
                              : product.isOnSale && variant.salePrice
                                ? formatPrice(variant.salePrice)
                                : formatPrice(variant.price)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Display */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-black">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={maxQuantity}
              size="sm"
              className="w-fit"
              disabled={!inStock}
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant || !inStock}
            className="w-full border-green-dark bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90"
          >
            <CartIcon className="mr-2 h-4 w-4" />
            {!inStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
