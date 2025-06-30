"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Lock,
  Truck,
  Heart,
} from "lucide-react";
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
import { products } from "@/lib/mock-data/products";
import { locations } from "@/lib/mock-data/locations";
import Image from "next/image";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    productId: "dangote-rice-50kg",
    variantId: undefined,
    quantity: 2,
    price: 65.99,
    salePrice: undefined,
    product: products.find((p) => p.slug === "dangote-rice-50kg")!,
    variant: undefined,
  },
  {
    id: "2",
    productId: "maggi-chicken-cubes-100-pieces",
    variantId: undefined,
    quantity: 1,
    price: 12.99,
    salePrice: 10.99,
    product: products.find((p) => p.slug === "maggi-chicken-cubes-100-pieces")!,
    variant: undefined,
  },
  {
    id: "3",
    productId: "pounded-yam-flour-2kg",
    variantId: undefined,
    quantity: 3,
    price: 18.99,
    salePrice: undefined,
    product: products.find((p) => p.slug === "pounded-yam-flour-2kg")!,
    variant: undefined,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item,
      ),
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const moveToWishlist = (itemId: string) => {
    removeItem(itemId);
    // In a real app, this would add to wishlist
  };

  const applyCoupon = async () => {
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      // Handle coupon application
    }, 1000);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.13; // 13% tax (HST in Canada)
  const selectedLocationData = locations.find(
    (loc) => loc.id === selectedLocation,
  );
  const shippingFee = selectedLocationData?.deliveryFee || 0;
  const freeShippingThreshold =
    selectedLocationData?.freeDeliveryThreshold || 75;
  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingFee;
  const total = subtotal + tax + shipping;

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="container-padding py-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4">
              <ShoppingBag className="h-8 w-8 text-green-dark" />
              <div>
                <h1 className="text-h1 font-bold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                  in your cart.
                </p>
                <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <section className="py-12">
          <div className="container-padding">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 text-6xl">🛒</div>
              <h2 className="text-h2 mb-4 font-bold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Looks like you haven't added any items to your cart yet. Start
                shopping to fill it up with delicious Nigerian groceries!
              </p>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-green-dark hover:bg-green-deep"
                  asChild
                >
                  <Link href="/categories">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Start Shopping
                  </Link>
                </Button>
                <div className="text-sm text-gray-500">
                  or{" "}
                  <Link
                    href="/products"
                    className="text-green-dark hover:text-green-deep"
                  >
                    browse all products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="container-padding">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Free Shipping Banner */}
                  {freeShippingRemaining > 0 && (
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-green-dark" />
                          <div className="text-sm text-green-dark">
                            <strong>Free shipping</strong> on orders over $
                            {freeShippingThreshold}! Add{" "}
                            <strong>${freeShippingRemaining.toFixed(2)}</strong>{" "}
                            more to qualify.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Cart Items List */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Cart Items</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCartItems([])}
                        >
                          Clear Cart
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0"
                        >
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Link href={`/products/${item.product.slug}`}>
                              <Image
                                src={
                                  item.product.images[0]?.url ||
                                  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                                }
                                alt={item.product.name}
                                className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                                width={100}
                                height={100}
                              />
                            </Link>
                            {item.salePrice && (
                              <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                                Sale
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <Link href={`/products/${item.product.slug}`}>
                                  <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-green-dark">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="mt-1 text-sm text-gray-600">
                                  Brand: {item.product.brand}
                                </p>
                                {item.product.inStock ? (
                                  <p className="mt-1 text-sm text-green-600">
                                    ✓ In Stock
                                  </p>
                                ) : (
                                  <p className="mt-1 text-sm text-red-600">
                                    ⚠ Out of Stock
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="ml-2 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center rounded-lg border">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-12 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveToWishlist(item.id)}
                                  className="text-gray-500 hover:text-green-dark"
                                >
                                  <Heart className="mr-1 h-4 w-4" />
                                  Save for Later
                                </Button>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-gray-900">
                                  $
                                  {(
                                    (item.salePrice || item.price) *
                                    item.quantity
                                  ).toFixed(2)}
                                </div>
                                {item.salePrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                )}
                                <div className="text-xs text-gray-500">
                                  ${(item.salePrice || item.price).toFixed(2)}{" "}
                                  each
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Continue Shopping */}
                  <div className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/categories">← Continue Shopping</Link>
                    </Button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Location Selector */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Delivery Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.city}, {location.province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedLocationData && (
                        <div className="mt-3 text-sm text-gray-600">
                          <p>
                            Delivery time:{" "}
                            {selectedLocationData.deliveryTimeMin}-
                            {selectedLocationData.deliveryTimeMax} hours
                          </p>
                          {selectedLocationData.freeDeliveryThreshold && (
                            <p>
                              Free delivery on orders over $
                              {selectedLocationData.freeDeliveryThreshold}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Coupon Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Promo Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={applyCoupon}
                          disabled={!couponCode || isApplyingCoupon}
                        >
                          {isApplyingCoupon ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Subtotal ({cartItems.length} items)
                        </span>
                        <span className="font-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (HST)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-xl font-bold text-green-dark">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-green-dark hover:bg-green-deep"
                        asChild
                      >
                        <Link href="/checkout">
                          <Lock className="mr-2 h-4 w-4" />
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          Secure checkout powered by Stripe
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security badges */}
                  <div className="flex items-center justify-center gap-4 text-gray-400">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs">SSL Secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
