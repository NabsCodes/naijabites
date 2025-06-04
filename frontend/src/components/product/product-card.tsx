import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
  showQuickAdd?: boolean;
  showCompare?: boolean;
  showWishlist?: boolean;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
}

export default function ProductCard({
  product,
  variant = "default",
  showQuickAdd = true,
  showCompare = false,
  showWishlist = true,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product.id);
  };

  if (variant === "compact") {
    return (
      <Card className="group transition-all duration-200 hover:shadow-md">
        <Link href={`/products/${product.slug}`}>
          <CardContent className="p-3">
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0">
                <img
                  src={
                    product.images[0]?.url ||
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                  }
                  alt={product.name}
                  className="h-full w-full rounded-md object-cover"
                />
                {product.isOnSale && product.discountPercentage && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-xs text-white">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-green-dark">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-1">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating.average)
                            ? "rating-star fill-current"
                            : "rating-star-empty"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.rating.count})
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-dark">
                      ${product.salePrice || product.basePrice}
                    </div>
                    {product.salePrice && (
                      <div className="text-xs text-gray-500 line-through">
                        ${product.basePrice}
                      </div>
                    )}
                  </div>
                  {showQuickAdd && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <Link href={`/products/${product.slug}`}>
          <div className="relative">
            <img
              src={
                product.images[0]?.url ||
                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
              }
              alt={product.name}
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.isOnSale && product.discountPercentage && (
              <div className="product-discount-badge absolute left-4 top-4">
                -{product.discountPercentage}%
              </div>
            )}
            {product.isFeatured && (
              <div className="absolute right-4 top-4 rounded-full bg-lemon-dark px-2 py-1 text-xs font-semibold text-green-deep">
                Featured
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            <div className="absolute right-4 top-4 space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {showWishlist && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-white/90 p-0 hover:bg-white"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              )}
              {onQuickView && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-white/90 p-0 hover:bg-white"
                  onClick={handleQuickView}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Link>
        <CardContent className="p-6">
          <div className="mb-3">
            <p className="mb-1 text-sm text-gray-500">
              {product.category.name}
            </p>
            <Link href={`/products/${product.slug}`}>
              <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-dark">
                {product.name}
              </h3>
            </Link>
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">
              {product.shortDescription}
            </p>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating.average)
                      ? "rating-star fill-current"
                      : "rating-star-empty"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.average.toFixed(1)} ({product.rating.count})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-gray-900">
                ${product.salePrice || product.basePrice}
              </div>
              {product.salePrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.basePrice}
                </div>
              )}
            </div>
            {showQuickAdd && (
              <Button
                className="bg-green-dark hover:bg-green-deep"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="product-card group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <img
            src={
              product.images[0]?.url ||
              "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
            }
            alt={product.name}
            className="product-card-image"
          />
          {product.isOnSale && product.discountPercentage && (
            <div className="product-discount-badge">
              -{product.discountPercentage}%
            </div>
          )}
          {product.isFeatured && (
            <div className="absolute left-3 top-3 rounded-full bg-lemon-dark px-2 py-1 text-xs font-semibold text-green-deep">
              Featured
            </div>
          )}
          <div className="absolute right-3 top-3 space-y-2 opacity-0 transition-opacity group-hover:opacity-100">
            {showWishlist && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 bg-white/80 p-0 hover:bg-white"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
            {onQuickView && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 bg-white/80 p-0 hover:bg-white"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-3">
          <p className="mb-1 text-xs text-gray-500">{product.category.name}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-green-dark">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm text-gray-600">
            {product.shortDescription}
          </p>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.average)
                    ? "rating-star fill-current"
                    : "rating-star-empty"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="product-price">
              ${product.salePrice || product.basePrice}
            </div>
            {product.salePrice && (
              <div className="product-price-sale">${product.basePrice}</div>
            )}
          </div>
          {showQuickAdd && (
            <Button
              size="sm"
              className="bg-green-dark hover:bg-green-deep"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              {product.inStock ? "Add" : "Out of Stock"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
