"use client";

import { useState, useMemo } from "react";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { StockIndicator } from "@/components/shop/stock-indicator";
import { cn } from "@/lib/utils";
import { ProductIcon } from "@/components/icons/product-icon";
import { CartIcon } from "@/components/icons";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { useInventory } from "@/hooks/use-inventory";
import { useCart } from "@/contexts/cart-context";
import { Check } from "lucide-react";

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
  const { addItem } = useCart();

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

  // Use centralized inventory hook
  const { inventory, inStock, maxQuantity } = useInventory({
    product,
    selectedVariant,
  });

  // Stock status
  const stockInfo = useMemo(() => {
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
  }, [product.variants, product.inStock]);

  // Can purchase
  const canPurchase = useMemo(() => {
    // If main product is out of stock, can't purchase regardless of variants
    if (!product.inStock) {
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
  }, [selectedVariant, product.variants, product.inStock]);

  // Event handlers
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
    setCartState("default"); // Reset cart state when variant changes
  };

  // Quantity change
  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = Math.max(selectedVariant?.inventory || 99, 1);
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart function
  const handleAddToCart = () => {
    if (cartState === "default") {
      // First time clicking - show quantity selector
      setCartState("quantity");
      return;
    }

    if (cartState === "quantity") {
      // Adding to cart
      setCartState("adding");

      // Simulate API call
      setTimeout(() => {
        // Add item to cart
        addItem({
          productId: product.id,
          variantId: selectedVariant?.id,
          quantity,
          price: selectedVariant?.price || product.price,
          salePrice: selectedVariant?.salePrice || product.salePrice,
          product,
          variant: selectedVariant || undefined,
        });

        console.log("Added to cart:", {
          product: product.name,
          variant: selectedVariant?.title,
          quantity,
          price: currentPrice,
          total: currentPrice * quantity,
        });

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
            <span className="text-lg text-gray-500 line-through sm:text-xl lg:text-2xl">
              {formatPrice(originalPrice)}
            </span>
          )}
          {/* Discount Badge */}
          {originalPrice && product.discountPercentage && (
            <Badge
              variant="destructive"
              className="text-sm font-semibold sm:text-base"
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
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            {product.variants.length === 1 ? "Available Size" : "Size/Pack"}
          </h3>
          <div
            className={cn(
              "grid gap-2 sm:gap-3",
              product.variants.length === 1
                ? "grid-cols-1"
                : "grid-cols-2 lg:grid-cols-3",
            )}
          >
            {product.variants.map((variant) => {
              // Variant is disabled if product is out of stock OR variant is unavailable
              const isVariantDisabled =
                !product.inStock || !variant.isAvailable;
              const isVariantAvailable = product.inStock && variant.isAvailable;

              return (
                <button
                  key={variant.id}
                  disabled={isVariantDisabled}
                  onClick={() => handleVariantSelect(variant)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 p-3 transition-all sm:gap-3",
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
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-full border-2 p-1.5 sm:p-2",
                      selectedVariant?.id === variant.id && isVariantAvailable
                        ? "border-white/20 bg-white/10"
                        : isVariantAvailable
                          ? "border-gray-300 bg-[#E5FFF5]"
                          : "border-gray-300 bg-gray-200",
                    )}
                  >
                    <ProductIcon
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        selectedVariant?.id === variant.id && isVariantAvailable
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

      {/* Quantity Selector - Only show after Add to Cart is clicked */}
      {cartState === "quantity" && (
        <div className="space-y-2 sm:space-y-3">
          <label className="text-base font-semibold text-gray-900 sm:text-lg">
            Quantity
          </label>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            min={1}
            max={Math.max(maxQuantity, 1)}
            disabled={!canPurchase}
            size="md"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 sm:pt-6">
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
          <p className="mt-2 text-sm text-gray-500">
            {stockInfo.hasStock
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
