import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "@/lib/mock-data/simple-products";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: SimpleProduct;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className={cn(
          "group rounded-2xl border-2 border-[#ededed] bg-white p-4 transition-all duration-300 hover:border-gray-300 hover:shadow-md",
          className,
        )}
      >
        <div className="flex flex-col justify-between gap-3">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-t-[20px] bg-[#f9f9f9]">
            <Image
              src={product.image || "/images/product-placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between gap-1">
            {/* Product Name */}
            <h3 className="line-clamp-1 text-lg font-medium text-black transition-colors group-hover:text-green-dark">
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-black">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-xs font-normal text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {product.isOnSale && product.discountPercentage && (
                <div className="flex items-center justify-center gap-2.5 rounded bg-[#ffe0e0] px-2 py-1 shadow-sm">
                  <span className="text-center text-sm font-semibold text-[#884545] drop-shadow-sm">
                    -{product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
