"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { StockIndicator } from "@/components/shop/stock-indicator";
import { useInventory } from "@/hooks/use-inventory";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/contexts/cart-context";
import { TrashIcon, HeartIcon } from "@heroicons/react/24/outline";

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
  // Use centralized inventory hook
  const { inventory, inStock, maxQuantity } = useInventory({
    product: item.product,
  });

  return (
    <div
      key={item.id}
      className={`flex gap-3 border-b pb-4 last:border-b-0 last:pb-0 sm:gap-4 ${
        !inStock ? "opacity-50" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-gray-50 sm:h-24 sm:w-24">
        <Link href={`/shop/products/${item.product.slug}`}>
          <Image
            src={item.product.image || "/images/placeholder.png"}
            alt={item.product.name}
            className={`h-full w-full rounded-lg object-contain p-1 transition-transform hover:scale-105 ${
              !inStock ? "grayscale" : ""
            }`}
            width={100}
            height={100}
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
        <div className="mb-2 flex items-start justify-between">
          {/* Product Info */}
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {item.product.name}
            </h3>
            <p className="text-xs text-gray-500">
              {item.product.shortDescription}
            </p>
            {/* Remove variant information display */}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveClick(item)}
            className="ml-2 text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
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
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-green-dark"
            >
              <HeartIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Save for Later</span>
            </Button>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900 sm:text-lg">
              {formatPrice(
                (item.product.isOnSale && item.salePrice
                  ? item.salePrice
                  : item.price) * item.quantity,
              )}
            </div>
            {item.product.isOnSale && item.salePrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(item.price * item.quantity)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
