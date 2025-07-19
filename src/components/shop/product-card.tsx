import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { useProductCardPricing } from "@/hooks/use-product-pricing";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { currentPrice, originalPrice, formatPrice } =
    useProductCardPricing(product);

  return (
    <Link href={`/shop/products/${product.slug}`}>
      <div
        className={cn(
          "group rounded-2xl border-2 border-[#ededed] bg-white p-3 transition-all duration-300 hover:border-gray-300 hover:shadow-md",
          className,
        )}
      >
        <div className="flex flex-col justify-between gap-3">
          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F9F9F9]">
            <Image
              src={product.image || "/images/product-placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {product.isOnSale && product.discountPercentage && (
              <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                -{product.discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between gap-1">
            {/* Product Name */}
            <h3 className="line-clamp-1 text-base font-medium text-black transition-colors group-hover:text-green-dark">
              {product.name}
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
        </div>
      </div>
    </Link>
  );
}
