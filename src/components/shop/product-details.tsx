"use client";

import { useState, useMemo } from "react";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import { StockIndicator } from "@/components/shop/stock-indicator";
import { cn } from "@/lib/utils";
import { ProductIcon } from "@/components/icons/product-icon";
import { CartIcon } from "@/components/icons";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { useInventory } from "@/hooks/use-inventory";
import { useCart } from "@/contexts/cart-context";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  // State management
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [cartState, setCartState] = useState<
    "default" | "adding" | "added" | "quantity"
  >("default");

  // Cart context
  const { addItem, updateQuantity, items } = useCart();
  const { toast } = useToast();
  // Reset selected variant if it becomes unavailable or doesn't exist
  useMemo(() => {
    if (selectedVariant && product.variants) {
      const currentVariant = product.variants.find(
        (v) => v.id === selectedVariant.id,
      );
      if (!currentVariant || !product.inStock || !currentVariant.isAvailable) {
        // Find first available variant or reset to first variant
        const firstAvailable = product.variants.find(
          (v) => product.inStock && v.isAvailable,
        );
        setSelectedVariant(firstAvailable || product.variants[0] || null);
        setQuantity(1);
      }
    }
  }, [selectedVariant, product.variants, product.inStock]);

  // Use centralized pricing hook
  const { currentPrice, originalPrice, formatPrice } = useProductPricing({
    product,
    selectedVariant,
  });

  // Use centralized inventory hook - with inventory for zero stock check
  const { inventory, inStock, maxQuantity } = useInventory({
    product,
    selectedVariant,
  });

  // Stock status with inventory check
  const stockInfo = useMemo(() => {
    // Check if main product has zero inventory
    if (inventory === 0) {
      return {
        hasStock: false,
        isPartialStock: false,
      };
    }

    // If main product is out of stock, entire product is out of stock
    if (!product.inStock) {
      return {
        hasStock: false,
        isPartialStock: false,
      };
    }

    // If main product is in stock, check variants (if any)
    if (product.variants && product.variants.length > 0) {
      const hasAvailableVariants = product.variants.some((v) => v.isAvailable);
      const allVariantsOutOfStock = product.variants.every(
        (v) => !v.isAvailable,
      );

      return {
        hasStock: hasAvailableVariants && !allVariantsOutOfStock,
        isPartialStock: hasAvailableVariants && !allVariantsOutOfStock,
      };
    }

    // No variants, just check main product stock
    return {
      hasStock: product.inStock,
      isPartialStock: false,
    };
  }, [product.variants, product.inStock, inventory]);

  // Check if item is already at max quantity in cart
  const existingCartItem = useMemo(() => {
    return items.find(
      (item) =>
        item.productId === product.id &&
        (selectedVariant
          ? item.variantId === selectedVariant.id
          : !item.variantId),
    );
  }, [items, product.id, selectedVariant]);

  const isAtMaxQuantity =
    existingCartItem && existingCartItem.quantity >= maxQuantity;

  // Calculate available quantity (accounting for items already in cart)
  const availableQuantity = useMemo(() => {
    const currentInCart = existingCartItem?.quantity || 0;
    return Math.max(0, maxQuantity - currentInCart);
  }, [maxQuantity, existingCartItem]);

  // Can purchase - with inventory and variant availability checks
  const canPurchase = useMemo(() => {
    // If main product has zero inventory, can't purchase
    if (inventory === 0) {
      return false;
    }

    // If main product is out of stock, can't purchase regardless of variants
    if (!product.inStock) {
      return false;
    }

    // If already at max quantity, can't purchase more
    if (isAtMaxQuantity) {
      return false;
    }

    // If main product is in stock, check variant availability
    if (selectedVariant) {
      return selectedVariant.isAvailable;
    }
    if (product.variants && product.variants.length > 0) {
      return product.variants.some((v) => v.isAvailable);
    }
    return product.inStock;
  }, [
    selectedVariant,
    product.variants,
    product.inStock,
    isAtMaxQuantity,
    inventory,
  ]);

  // Event handlers
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
    setCartState("default"); // Reset cart state when variant changes
  };

  // Quantity change - Fixed to respect available quantity
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= availableQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart function - Fixed to use the same pattern as Product Card
  const handleAddToCart = () => {
    if (cartState === "default") {
      // Check if already at max quantity before showing quantity selector
      if (isAtMaxQuantity) {
        toast({
          title: "Maximum quantity reached",
          description: `You already have the maximum quantity (${maxQuantity}) of ${product.name}${selectedVariant ? ` (${selectedVariant.title})` : ""} in your cart.`,
          variant: "error",
        });
        return;
      }
      // First time clicking - show quantity selector
      setCartState("quantity");
      return;
    }

    if (cartState === "quantity") {
      // Adding to cart
      setCartState("adding");

      // Simulate API call
      setTimeout(() => {
        // Use the same pattern as Product Card - update existing or add new
        if (existingCartItem) {
          // Update existing item quantity
          const newTotalQuantity = existingCartItem.quantity + quantity;
          if (newTotalQuantity > maxQuantity) {
            const availableQuantity = maxQuantity - existingCartItem.quantity;

            if (availableQuantity <= 0) {
              toast({
                title: "Maximum quantity reached",
                description: `You already have the maximum quantity (${maxQuantity}) of ${product.name}${selectedVariant ? ` (${selectedVariant.title})` : ""} in your cart.`,
                variant: "error",
              });
            } else {
              toast({
                title: "Quantity exceeds limit",
                description: `You can only add ${availableQuantity} more of this item to your cart.`,
                variant: "error",
              });
            }
            setCartState("quantity");
            return;
          }

          // Update existing item
          updateQuantity(existingCartItem.id, newTotalQuantity);
          toast({
            title: "Updated cart",
            description: `${product.name} quantity updated in your cart.`,
            variant: "success",
          });
        } else {
          // Add new item
          addItem({
            productId: product.id,
            variantId: selectedVariant?.id,
            quantity,
            price: selectedVariant?.price || product.price,
            salePrice: selectedVariant?.salePrice || product.salePrice,
            product,
            variant: selectedVariant || undefined,
          });
          toast({
            title: "Added to cart",
            description: `${product.name} added to your cart.`,
            variant: "success",
          });
        }

        setCartState("added");

        // Auto-reset after 3 seconds
        setTimeout(() => {
          setCartState("default");
        }, 3000);
      }, 500);
    }
  };

  return (
    <div className="order-2 space-y-4">
      {/* Product Title & Description */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl lg:text-3xl xl:text-4xl">
          {product.name}
        </h1>
        <p className="text-base text-gray-600 sm:text-lg">
          {product.shortDescription}
        </p>
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <Rating rating={product.rating.average} variant="default" size={16} />
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <span>{product.rating.count} reviews</span>
            <span className="hidden sm:inline">•</span>
            <span>({product.rating.average} average)</span>
          </div>
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Main Price - Always Prominent */}
          <span className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            {formatPrice(currentPrice)}
          </span>
          {/* Original Price - When on Sale */}
          {originalPrice && (
            <span className="text-base text-gray-500 line-through sm:text-lg">
              {formatPrice(originalPrice)}
            </span>
          )}
          {/* Discount Badge */}
          {originalPrice && product.discountPercentage && (
            <Badge
              variant="destructive"
              className="text-xs font-semibold sm:text-sm"
            >
              -{product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <StockIndicator
        inventory={inventory}
        inStock={inStock}
        showInStockBadge={true}
      />

      {/* Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.variants.length === 1 ? "Size" : "Available Sizes"}
            </h3>
            <span className="text-base text-gray-500">
              {product.variants.length} option
              {product.variants.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.variants.map((variant) => {
              const isVariantDisabled =
                !product.inStock || !variant.isAvailable;
              const isVariantAvailable = product.inStock && variant.isAvailable;
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
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border p-1 sm:h-10 sm:w-10 sm:p-2",
                        isSelected && isVariantAvailable
                          ? "border-orange-500 bg-orange-100"
                          : isVariantAvailable
                            ? "border-gray-300 bg-gray-100"
                            : "border-gray-300 bg-gray-200",
                      )}
                    >
                      <ProductIcon
                        className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5",
                          isSelected && isVariantAvailable
                            ? "text-orange-600"
                            : isVariantAvailable
                              ? "text-gray-600"
                              : "text-gray-400",
                        )}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-gray-900">
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
                              ? "Unavailable"
                              : product.isOnSale && variant.salePrice
                                ? formatPrice(variant.salePrice)
                                : formatPrice(variant.price)}
                        </span>
                        {product.isOnSale &&
                          variant.salePrice &&
                          isVariantAvailable && (
                            <span className="text-sm text-gray-500 line-through">
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

      {/* Quantity Selector - Only show after Add to Cart is clicked */}
      {cartState === "quantity" && (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-900">
              Quantity
            </label>
            {maxQuantity && (
              <span className="text-base text-gray-500">
                Max: {availableQuantity} available
              </span>
            )}
          </div>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            min={1}
            max={availableQuantity}
            disabled={!canPurchase}
            size="lg"
            className="w-fit"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleAddToCart}
          className="h-12 w-full border border-green-dark bg-green-dark text-base font-semibold text-white transition-colors duration-300 hover:border-green-dark/90 hover:bg-green-dark/90 hover:text-white sm:h-14"
          disabled={!canPurchase || cartState === "adding"}
        >
          {cartState === "adding" ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Adding...</span>
            </div>
          ) : cartState === "added" ? (
            <>
              <Check size={24} />
              Added to Cart
            </>
          ) : cartState === "quantity" ? (
            <>
              <CartIcon size={24} />
              Add {quantity} to Cart
            </>
          ) : (
            <>
              <CartIcon size={24} />
              Add to Cart
            </>
          )}
        </Button>
        {!canPurchase && (
          <p className="mt-2 text-base text-gray-500">
            {isAtMaxQuantity
              ? `Maximum quantity (${maxQuantity}) already in cart`
              : stockInfo.hasStock
                ? "Please select an available variant"
                : "Currently out of stock"}
          </p>
        )}
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="space-y-2 border-t border-gray-200 pt-4 sm:space-y-3 sm:pt-6">
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            About this product
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {product.description}
          </p>
        </div>
      )}

      {/* Additional Product Info */}
      <div className="grid grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-2 sm:gap-4 sm:pt-4">
        {product.brand && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-gray-500">Brand:</span>
            <span className="font-medium text-gray-900">{product.brand}</span>
          </div>
        )}
        {product.category && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-gray-900">
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
