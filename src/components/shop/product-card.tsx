"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { useProductCardPricing } from "@/hooks/use-product-pricing";
import { useInventory } from "@/hooks/use-inventory";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/icons";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { VariantSelectorModal } from "@/components/shop/variant-selector-modal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { currentPrice, originalPrice, formatPrice } =
    useProductCardPricing(product);

  // Use centralized inventory hook
  const { inStock, maxQuantity } = useInventory({ product });

  // State for quantity selection
  const [isSelectingQuantity, setIsSelectingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showVariantModal, setShowVariantModal] = useState(false);

  // Cart context and toast
  const { addItem, updateQuantity, removeItem, items } = useCart();
  const { toast } = useToast();

  // Mock Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Router for navigation
  const router = useRouter();

  // Check if product has variants
  const hasVariants = product.variants && product.variants.length > 0;

  // Sync UI with cart state (only for products without variants)
  useEffect(() => {
    if (hasVariants) {
      // For variant products, always show "Add to Cart" button
      setIsSelectingQuantity(false);
      setQuantity(1);
      return;
    }

    const existingItem = items.find((item) => item.productId === product.id);
    if (existingItem) {
      setIsSelectingQuantity(true);
      setQuantity(existingItem.quantity);
    } else {
      setIsSelectingQuantity(false);
      setQuantity(1);
    }
  }, [items, product.id, hasVariants]);

  // Handle quantity change and add to cart (only for products without variants)
  const handleQuantityChange = (newQuantity: number) => {
    if (hasVariants) return; // Don't handle quantity changes for variant products

    setQuantity(newQuantity);
    const existingItem = items.find((item) => item.productId === product.id);
    if (newQuantity === 0 && existingItem) {
      removeItem(existingItem.id);
      setIsSelectingQuantity(false); // Show Add to Cart button again
      toast({
        title: "Removed from cart",
        description: `${product.name} removed from your cart.`,
      });
      return;
    }
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      if (existingItem) {
        updateQuantity(existingItem.id, newQuantity);
      } else {
        addItem({
          productId: product.id,
          quantity: newQuantity,
          price: product.price,
          salePrice: product.salePrice,
          product,
        });
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart.`,
        });
      }
    }
  };

  // Handle add to cart button click
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasVariants) {
      // Show variant selector modal for products with variants
      // setShowVariantModal(true);
      // Navigate to product page for products with variants using Next.js router
      router.push(`/shop/products/${product.slug}`);
    } else {
      // Direct add to cart for products without variants
      setIsSelectingQuantity(true);
      setQuantity(1);
      addItem({
        productId: product.id,
        quantity: 1,
        price: product.price,
        salePrice: product.salePrice,
        product,
      });
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart.`,
      });
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log("Wishlist clicked");
    // Add wishlist toggle logic here
  };

  return (
    <div
      className={cn(
        "group rounded-2xl border-2 border-[#ededed] bg-white p-3 transition-all duration-300 hover:border-gray-300 hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-3">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl bg-[#F9F9F9]">
          <Link href={`/shop/products/${product.slug}`}>
            <div className="relative aspect-square h-full w-full">
              <Image
                src={product.image || "/images/product-placeholder.svg"}
                alt={product.name}
                fill
                priority
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </Link>

          {/* Sale Badge */}
          {product.isOnSale && product.discountPercentage && (
            <div className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
              -{product.discountPercentage}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute bottom-2 right-2 z-10 rounded-full border border-green-dark bg-white p-1.5 transition-all duration-300 hover:bg-gray-50"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="h-4 w-4 text-green-dark" />
            ) : (
              <HeartIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between gap-1">
          {/* Product Name */}
          <h3 className="line-clamp-1 text-base font-medium text-black transition-colors group-hover:text-green-dark">
            <Link href={`/shop/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Short Description */}
          <p className="line-clamp-1 text-xs text-gray-600">
            {product.shortDescription}
          </p>

          {/* Rating (always reserve space) */}
          <div className="flex min-h-[22px] items-center">
            {product.rating ? (
              <Rating
                rating={product.rating.average}
                count={product.rating.count}
                variant="compact"
                size={13}
              />
            ) : null}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-black">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-xs font-normal text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Show Add to Cart button or quantity selector */}
        {!isSelectingQuantity || hasVariants ? (
          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCartClick}
            // disabled={!inStock}
            aria-disabled={!inStock}
            aria-label={
              !inStock
                ? "Out of Stock"
                : hasVariants
                  ? "See Details"
                  : "Add to Cart"
            }
            className={cn(
              "w-full transition-all duration-300",
              hasVariants
                ? "border border-green-dark bg-gray-50 text-green-dark hover:bg-green-dark/10" // Border for details
                : "border-green-dark bg-green-dark text-white hover:bg-green-dark/90", // Green for add to cart
              !inStock &&
                "cursor-not-allowed border border-gray-300 bg-gray-50 text-gray-500 opacity-60 hover:bg-gray-50/90",
            )}
          >
            <CartIcon className={cn("mr-2 h-4 w-4", hasVariants && "hidden")} />
            {!inStock
              ? "Out of Stock"
              : hasVariants
                ? "See Details"
                : "Add to Cart"}
          </Button>
        ) : (
          <div className="flex w-full items-center gap-2">
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              min={0}
              max={maxQuantity}
              size="sm"
              className="w-fit"
              disabled={!inStock}
            />
          </div>
        )}

        {/* Variant Selector Modal */}
        {hasVariants && (
          <VariantSelectorModal
            product={product}
            isOpen={showVariantModal}
            onClose={() => setShowVariantModal(false)}
          />
        )}
      </div>
    </div>
  );
}
