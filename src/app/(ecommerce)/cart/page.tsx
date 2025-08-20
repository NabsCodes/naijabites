"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/lib/mock-data/locations";
import { formatPrice } from "@/lib/utils";
import { useCart, type CartItem } from "@/contexts/cart-context";
import { ProductSection } from "@/components/shop";
import { products } from "@/lib/mock-data/products";
import {
  CartItemRow,
  EmptyCart,
  RemoveItemDialog,
  ClearCartDialog,
  CartLoadingSkeleton,
} from "@/components/cart";

export default function CartPage() {
  const { items: cartItems, updateQuantity, totalItems, isLoading } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [removeItemDialog, setRemoveItemDialog] = useState<{
    isOpen: boolean;
    item: CartItem | null;
  } | null>(null);
  const [clearCartDialog, setClearCartDialog] = useState(false);

  const handleRemoveItemClick = (item: CartItem) => {
    setRemoveItemDialog({ isOpen: true, item });
  };

  // Show loading skeleton while cart is loading
  if (isLoading) {
    return <CartLoadingSkeleton />;
  }

  const applyCoupon = async () => {
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      // Handle coupon application
    }, 1000);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      item.product.isOnSale && item.salePrice ? item.salePrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  // const tax = subtotal * 0.075; // 7.5% VAT (Nigeria)
  // const selectedLocationData = locations.find(
  //   (loc) => loc.id === selectedLocation,
  // );
  // const shippingFee = selectedLocationData?.deliveryFee || 0;
  // const shipping = shippingFee;
  // const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="container-padding">
            <div className="section-container">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {/* Cart Items */}
                <div className="space-y-4 lg:col-span-2 lg:space-y-6">
                  {/* Cart Items List */}
                  <Card>
                    <CardHeader className="border-b p-4 sm:p-6">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <CardTitle className="text-base font-semibold sm:text-lg">
                            Cart Items{" "}
                            <span className="text-sm text-gray-500">
                              ({totalItems}{" "}
                              {totalItems === 1 ? "item" : "items"})
                            </span>
                          </CardTitle>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setClearCartDialog(true)}
                        >
                          Clear Cart
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
                      {cartItems.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          onQuantityChange={updateQuantity}
                          onRemoveClick={handleRemoveItemClick}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Combined Order Summary */}
                  <Card>
                    <CardHeader className="border-b p-4 sm:p-6">
                      <CardTitle className="text-base font-semibold sm:text-lg">
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4 sm:p-6">
                      {/* Subtotal */}
                      <div className="flex justify-between text-base sm:text-lg">
                        <span className="text-gray-900">Subtotal</span>
                        <span className="font-semibold">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      {/* Location & Tax Info */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Select
                              value={selectedLocation}
                              onValueChange={setSelectedLocation}
                            >
                              <SelectTrigger className="w-auto border-none bg-transparent p-0 text-sm font-normal text-gray-600 hover:text-gray-900">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem
                                    key={location.id}
                                    value={location.id}
                                  >
                                    {location.city}, {location.province}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="text-sm text-gray-600">
                              - GST 7.5%
                            </span>
                            <Button
                              variant="link"
                              className="h-auto p-0 text-sm font-normal text-gray-600 underline"
                            >
                              Change
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Estimated Delivery Fee
                          </span>
                          <span className="font-medium">{formatPrice(0)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium">{formatPrice(0)}</span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between text-xl">
                          <span className="font-semibold text-gray-900">
                            Estimated Total
                          </span>
                          <span className="font-bold">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                      </div>

                      {/* Promo Code Section */}
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Have Promo Code?
                        </p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={applyCoupon}
                            disabled={!couponCode || isApplyingCoupon}
                          >
                            {isApplyingCoupon ? "Applying..." : "Apply"}
                          </Button>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        size="lg"
                        className="w-full bg-green-dark transition-all duration-300 hover:bg-green-dark/90"
                        asChild
                      >
                        <Link href="/checkout">
                          <LockClosedIcon className="mr-2 h-4 w-4" />
                          Proceed to Checkout
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      {/* Continue Shopping */}
                      <Button
                        variant="link"
                        className="w-full text-green-dark transition-all duration-300 hover:text-green-dark/90"
                        asChild
                      >
                        <Link href="/shop">Continue Shopping</Link>
                      </Button>

                      {/* Checkout Note */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          Shipping and taxes calculated at checkout
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recommended Products Section */}
              <div className="mt-8 sm:mt-12 lg:mt-16">
                <ProductSection
                  title="You might also like"
                  description="Complete your shopping with these popular Nigerian groceries"
                  products={products
                    .slice(0, 4)
                    .sort(() => 0.5 - Math.random())} // Might need to change this to a more sophisticated algorithm for production
                  viewAllLink="/shop"
                  noContainer={true}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Remove Item Dialog */}
      <RemoveItemDialog
        removeItemDialog={removeItemDialog}
        setRemoveItemDialog={setRemoveItemDialog}
      />

      {/* Clear Cart Dialog */}
      <ClearCartDialog
        clearCartDialog={clearCartDialog}
        setClearCartDialog={setClearCartDialog}
      />
    </div>
  );
}
