import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProducts } from "@/lib/mock-data/products";
import { Rating } from "@/components/ui/rating";

export function FeaturedProductsSection() {
  return (
    <section className="py-10">
      <div className="container-padding">
        <div className="section-container">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-4 text-h2 font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked premium Nigerian groceries loved by our customers
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <Card key={product.id} className="group">
                <div className="relative">
                  <Image
                    src={
                      product.images[0]?.url ||
                      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                    }
                    alt={product.name}
                    className="product-card-image"
                    width={400}
                    height={300}
                  />
                  {product.isOnSale && product.discountPercentage && (
                    <div className="product-discount-badge">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {product.shortDescription}
                  </p>

                  {product.rating && (
                    <Rating
                      rating={product.rating.average}
                      showCount={true}
                      variant="compact"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="product-price">
                        ${product.salePrice || product.basePrice}
                      </div>
                      {product.salePrice && (
                        <div className="product-price-sale">
                          ${product.basePrice}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-dark hover:bg-green-deep"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
