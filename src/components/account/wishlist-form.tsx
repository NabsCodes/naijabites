"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/hooks/use-wishlist";
import { useProductPricing } from "@/hooks/use-product-pricing";
import { useInventory } from "@/hooks/use-inventory";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  HeartIcon,
  TrashIcon,
  ArrowsUpDownIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ProductIcon } from "@/components/icons/product-icon";
import type { WishlistItem } from "@/lib/stores/wishlist-store";

export function WishlistForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { items: cartItems, addItem } = useCart();
  const {
    items: wishlist,
    removeFromWishlist,
    isLoading,
    clearWishlist,
  } = useWishlist();

  const [sortBy, setSortBy] = useState("date-added");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 items per page

  // Helpers
  const findSelectedVariant = (item: WishlistItem) => {
    if (!item.selectedVariantId || !item.product.variants) return null;
    return (
      item.product.variants.find((v) => v.id === item.selectedVariantId) || null
    );
  };

  const isInCart = (item: WishlistItem) => {
    const variant = findSelectedVariant(item);
    return cartItems.some(
      (ci) =>
        ci.productId === item.product.id &&
        ((variant && ci.variantId === variant.id) ||
          (!variant && !ci.variantId)),
    );
  };

  // Derive sorted view
  const viewItems = useMemo(() => {
    const items = wishlist.slice();

    switch (sortBy) {
      case "name":
        return items.sort((a: WishlistItem, b: WishlistItem) =>
          a.product.name.localeCompare(b.product.name),
        );
      case "price-low":
        return items.sort((a, b) => {
          const variantA = findSelectedVariant(a);
          const variantB = findSelectedVariant(b);
          const priceA =
            variantA?.salePrice ||
            variantA?.price ||
            a.product.salePrice ||
            a.product.price;
          const priceB =
            variantB?.salePrice ||
            variantB?.price ||
            b.product.salePrice ||
            b.product.price;
          return priceA - priceB;
        });
      case "price-high":
        return items.sort((a, b) => {
          const variantA = findSelectedVariant(a);
          const variantB = findSelectedVariant(b);
          const priceA =
            variantA?.salePrice ||
            variantA?.price ||
            a.product.salePrice ||
            a.product.price;
          const priceB =
            variantB?.salePrice ||
            variantB?.price ||
            b.product.salePrice ||
            b.product.price;
          return priceB - priceA;
        });
      case "date-added":
      default:
        return items.sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
        );
    }
  }, [wishlist, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(viewItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = viewItems.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // Actions
  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  // Clear wishlist
  const handleClearWishlist = () => {
    clearWishlist();
  };

  // Add to cart
  const handleAddToCart = async (item: WishlistItem) => {
    try {
      const variant = findSelectedVariant(item);
      if (variant) {
        addItem({
          productId: item.product.id,
          variantId: variant.id,
          quantity: 1,
          price: variant.price,
          salePrice: variant.salePrice,
          product: item.product,
          variant,
        });
      } else {
        addItem({
          productId: item.product.id,
          quantity: 1,
          price: item.product.price,
          salePrice: item.product.salePrice,
          product: item.product,
        });
      }

      // Check if item is now in cart and show appropriate message
      if (isInCart(item)) {
        const cartItem = cartItems.find(
          (ci) =>
            ci.productId === item.product.id &&
            ((variant && ci.variantId === variant.id) ||
              (!variant && !ci.variantId)),
        );

        if (cartItem && cartItem.quantity > 1) {
          toast({
            title: "Quantity updated",
            description: `${item.product.name} quantity increased to ${cartItem.quantity}`,
            variant: "success",
          });
        } else {
          toast({
            title: "Added to cart",
            description: `${item.product.name} has been added to your cart`,
            variant: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding to cart",
        description: "Please try again later.",
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Save items for later and never miss out on your favorites
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-800">
            {viewItems.length} {viewItems.length === 1 ? "item" : "items"}
          </div>
        </div>
      </div>

      {/* Clear Wishlist Button */}
      <Button
        variant="outline"
        onClick={handleClearWishlist}
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Clear Wishlist
      </Button>

      {/* Filters and Sorting */}
      <Card className="transition-all duration-200 hover:shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2">
              <ArrowsUpDownIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added">Date Added</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center sm:py-12 lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-dark"></div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Loading your wishlist...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch your saved items.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Wishlist Items - Row Layout */}
      {!isLoading && viewItems.length > 0 ? (
        <>
          <div className="space-y-3">
            {paginatedItems.map((item) => (
              <WishlistItemRow
                key={item.id}
                item={item}
                isInCart={isInCart(item)}
                cartQuantity={(() => {
                  const variant = findSelectedVariant(item);
                  const cartItem = cartItems.find(
                    (ci) =>
                      ci.productId === item.product.id &&
                      ((variant && ci.variantId === variant.id) ||
                        (!variant && !ci.variantId)),
                  );
                  return cartItem?.quantity || 0;
                })()}
                onRemove={() => handleRemove(item.id)}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              {/* Page Info */}
              <div className="mb-4 text-center text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, viewItems.length)}{" "}
                of {viewItems.length} items
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={cn(
                        "cursor-pointer",
                        currentPage === 1 && "pointer-events-none opacity-50",
                      )}
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={cn(
                        "cursor-pointer",
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50",
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : !isLoading ? (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center sm:py-12 lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <HeartIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Your wishlist is empty
            </h3>
            <p className="mb-6 max-w-sm text-gray-600">
              Start shopping and save items you love for later. Your wishlist
              helps you keep track of products you're interested in.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => router.push("/shop")}
                className="bg-green-dark text-white hover:bg-green-dark/90"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Start Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/shop/categories")}
              >
                Browse Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

interface WishlistItemRowProps {
  item: WishlistItem;
  isInCart: boolean;
  cartQuantity?: number;
  onRemove: () => void;
  onAddToCart: () => void;
}

const WishlistItemRow = memo(function WishlistItemRow({
  item,
  isInCart,
  cartQuantity,
  onRemove,
  onAddToCart,
}: WishlistItemRowProps) {
  // Get selected variant
  const selectedVariant = useMemo(() => {
    if (!item.selectedVariantId || !item.product.variants) return null;
    return (
      item.product.variants.find((v) => v.id === item.selectedVariantId) || null
    );
  }, [item]);

  const { items } = useCart();

  // Use centralized inventory hook for current availability
  const { currentPrice, originalPrice, formatPrice } = useProductPricing({
    product: item.product,
    selectedVariant,
  });

  const { inStock, inventory, maxQuantity } = useInventory({
    product: item.product,
    selectedVariant,
  });

  const existingCartItem = useMemo(() => {
    return items.find(
      (cartItem) =>
        cartItem.productId === item.product.id &&
        (selectedVariant
          ? cartItem.variantId === selectedVariant.id
          : !cartItem.variantId),
    );
  }, [items, item.product.id, selectedVariant]);

  const isAtMaxQuantity =
    existingCartItem && existingCartItem.quantity >= maxQuantity;

  // Calculate available quantity (accounting for items already in cart)
  const availableQuantity = useMemo(() => {
    const currentInCart = existingCartItem?.quantity || 0;
    return Math.max(0, maxQuantity - currentInCart);
  }, [maxQuantity, existingCartItem]);

  return (
    <Card className="group transition-all duration-300">
      <CardContent className="p-0">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="p-4">
            {/* Product Image and Basic Info */}
            <div className="flex gap-3">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Link href={`/shop/products/${item.product.slug}`}>
                  <Image
                    src={
                      item.product.image || "/images/product-placeholder.svg"
                    }
                    alt={item.product.name}
                    fill
                    className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                    sizes="80px"
                  />
                </Link>

                {/* Sale Badge */}
                {item.product.isOnSale && item.product.discountPercentage && (
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                    -{item.product.discountPercentage}%
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-xs font-medium text-white">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/products/${item.product.slug}`}
                  className="block text-gray-900 transition-colors hover:text-green-dark"
                >
                  <h3 className="line-clamp-2 font-medium">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">{item.product.brand}</p>

                {/* Variant Information */}
                {selectedVariant && (
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className="h-5 border-orange-200 bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
                    >
                      <ProductIcon size={12} className="mr-1" />
                      {selectedVariant.title}
                    </Badge>
                  </div>
                )}

                {/* Rating */}
                {item.product.rating && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                    <StarIconSolid className="h-3 w-3 text-yellow-400" />
                    {item.product.rating.average} ({item.product.rating.count})
                  </div>
                )}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-green-dark">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isInCart && (
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                    <CheckCircleIcon className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">
                      In Cart
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                onClick={onAddToCart}
                disabled={
                  !inStock ||
                  (inventory !== undefined &&
                    cartQuantity !== undefined &&
                    cartQuantity >= inventory)
                }
                className={cn(
                  "flex-1",
                  !inStock
                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                    : isInCart
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-green-dark text-white hover:bg-green-dark/90",
                )}
              >
                {!inStock
                  ? "Out of Stock"
                  : inventory !== undefined &&
                      cartQuantity !== undefined &&
                      cartQuantity >= inventory
                    ? `Max Quantity (${inventory})`
                    : isInCart
                      ? `In Cart (${cartQuantity})`
                      : "Add to Cart"}
              </Button>

              {/* Remove from Wishlist Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={onRemove}
                className="h-9 w-9 p-0 text-red-600 hover:bg-red-50"
                aria-label="Remove from wishlist"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-4 p-4">
            {/* Product Image */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Link href={`/shop/products/${item.product.slug}`}>
                <Image
                  src={item.product.image || "/images/product-placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                  sizes="80px"
                />
              </Link>

              {/* Sale Badge */}
              {item.product.isOnSale && item.product.discountPercentage && (
                <div className="absolute -right-4 top-1 z-10 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                  -{item.product.discountPercentage}%
                </div>
              )}

              {/* Out of Stock Overlay */}
              {!inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-xs font-medium text-white">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="min-w-0 flex-1">
              <div className="mb-2">
                <Link
                  href={`/shop/products/${item.product.slug}`}
                  className="block text-gray-900 transition-colors hover:text-green-dark"
                >
                  <h3 className="font-medium">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-gray-600">{item.product.brand}</p>
              </div>

              {/* Variant Information */}
              {selectedVariant && (
                <div className="mb-2">
                  <Badge
                    variant="outline"
                    className="h-5 border-orange-200 bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
                  >
                    <ProductIcon size={12} className="mr-1" />
                    {selectedVariant.title}
                  </Badge>
                </div>
              )}

              {/* Rating */}
              {item.product.rating && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <StarIconSolid className="h-3 w-3 text-yellow-400" />
                  {item.product.rating.average} ({item.product.rating.count})
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="font-semibold text-green-dark">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              {/* Simple Actions: Add to Cart + Remove from Wishlist */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={onAddToCart}
                  disabled={
                    !inStock ||
                    (inventory !== undefined &&
                      cartQuantity !== undefined &&
                      cartQuantity >= inventory)
                  }
                  className={cn(
                    "h-8 px-3 text-xs",
                    !inStock
                      ? "cursor-not-allowed bg-gray-200 text-gray-500"
                      : isInCart
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-green-dark text-white hover:bg-green-dark/90",
                  )}
                >
                  {!inStock
                    ? "Out of Stock"
                    : inventory !== undefined &&
                        cartQuantity !== undefined &&
                        cartQuantity >= inventory
                      ? `Max Quantity (${inventory})`
                      : isInCart
                        ? `In Cart (${cartQuantity})`
                        : "Add to Cart"}
                </Button>

                {/* Remove from Wishlist */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRemove}
                  className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                  aria-label="Remove from wishlist"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="rounded-b-xl border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
          Added{" "}
          {new Date(item.addedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
});
