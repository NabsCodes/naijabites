import ProductCard from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/mock-data/simple-products";

export function ProductListingSection() {
  return (
    <section className="rounded-t-[20px] bg-[#f9f9f9] md:rounded-t-[40px]">
      <div className="container-padding relative py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
              Bringing the market close to you
            </h2>
            <p className="max-w-2xl text-center text-sm text-gray-600 sm:text-base md:text-left md:text-lg">
              Trusted brands like Nestle, Indomie, and more.
            </p>
          </div>

          {/* Product Grid  */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {getFeaturedProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="h-fit w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
