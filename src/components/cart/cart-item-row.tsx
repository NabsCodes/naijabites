"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import { StockIndicator } from "@/components/shop/stock-indicator";
import { useInventory } from "@/hooks/use-inventory";
import { useWishlist } from "@/hooks/use-wishlist";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/contexts/cart-context";
import { TrashIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ProductIcon } from "@/components/icons/product-icon";
import { useAuth } from "@/lib/stores/auth-store";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemoveClick: (item: CartItem) => void;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemoveClick,
}: CartItemRowProps) {
  const { inventory, inStock, maxQuantity } = useInventory({
    product: item.product,
    selectedVariant: item.variant,
  });

  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const isWishlisted = isInWishlist(item.product.id, item.variant?.id);

  const handleSaveForLater = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlistLoading) return;

    setIsWishlistLoading(true);
    try {
      // Small delay for better UX and to prevent rapid clicking
      await new Promise((resolve) => setTimeout(resolve, 300));
      toggleWishlist(item.product, item.variant);
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div
      key={item.id}
      className={`flex gap-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0 sm:gap-6 ${
        !inStock ? "opacity-60" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg bg-gray-50 sm:h-24 sm:w-24">
        <Link href={`/shop/products/${item.product.slug}`}>
          <Image
            src={item.product.image || "/images/product-placeholder.svg"}
            alt={item.product.name}
            className={`h-full w-full rounded-lg object-contain p-1 transition-transform hover:scale-105 ${
              !inStock ? "grayscale" : ""
            }`}
            width={100}
            height={100}
            priority
          />
        </Link>
        {item.product.isOnSale &&
          item.salePrice &&
          item.product.discountPercentage && (
            <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
              -{item.product.discountPercentage}%
            </div>
          )}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <Link href={`/shop/products/${item.product.slug}`}>
              <h3 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-green-dark sm:text-lg">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600">
              Brand: <span className="font-semibold">{item.product.brand}</span>
            </p>

            {/* Mobile Price Display */}
            <div className="mt-2 flex items-center justify-end gap-2 sm:hidden">
              <div className="text-lg font-semibold text-gray-900">
                {formatPrice(
                  (item.product.isOnSale && item.salePrice
                    ? item.salePrice
                    : item.price) * item.quantity,
                )}
              </div>
              {item.product.isOnSale && item.salePrice && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(item.price * item.quantity)}
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {/* Show variant information if available */}
              {item.variant && (
                <Badge
                  key={item.variant.id}
                  title={item.variant.title}
                  variant="outline"
                  className="w-fit border-orange-400 bg-orange-50 text-xs font-medium text-gray-900 hover:bg-orange-100"
                >
                  <ProductIcon size={14} className="mr-1" />
                  {item.variant.title}
                </Badge>
              )}
              <StockIndicator
                inventory={inventory}
                inStock={inStock}
                showInStockBadge={false}
                size="sm"
                className="w-fit"
              />
            </div>
          </div>

          {/* Desktop Price Display */}
          <div className="hidden text-right sm:block">
            <div className="text-base font-semibold text-gray-900 sm:text-xl">
              {formatPrice(
                (item.product.isOnSale && item.salePrice
                  ? item.salePrice
                  : item.price) * item.quantity,
              )}
            </div>
            {item.product.isOnSale && item.salePrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(item.price * item.quantity)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={(newQuantity) =>
                onQuantityChange(item.id, newQuantity)
              }
              min={1}
              max={maxQuantity}
              size="sm"
              disabled={!inStock}
            />
            {isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveForLater}
                disabled={isWishlistLoading}
                className={`transition-all duration-200 ${
                  isWishlisted
                    ? "text-green-dark hover:text-green-700"
                    : "text-gray-500 hover:text-green-dark"
                }`}
              >
                {isWishlistLoading ? (
                  <div className="mr-1 h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
                ) : isWishlisted ? (
                  <HeartIconSolid className="mr-1 h-4 w-4" />
                ) : (
                  <HeartIcon className="mr-1 h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isWishlisted ? "Saved for Later" : "Save for Later"}
                </span>
              </Button>
            )}
            <div className="block sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveClick(item)}
                className="text-gray-500 hover:text-red-500"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Remove</span>
              </Button>
            </div>
          </div>
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveClick(item)}
              className="text-gray-500 hover:text-red-500"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
