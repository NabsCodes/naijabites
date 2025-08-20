import { ProductCard } from "@/components/shop";
import { getFeaturedProducts } from "@/lib/mock-data/products";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
} from "@/components/common";

export async function ProductListingSection() {
  // Only in development - simulate slow API
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Fetch data server-side
  const products = getFeaturedProducts();
  // Shuffle products to make them random
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
  const displayProducts = shuffledProducts.slice(0, 8);

  return (
    <section className="rounded-t-[20px] bg-[#f9f9f9] md:rounded-t-[40px]">
      <div className="container-padding relative py-10 md:py-16 lg:py-20">
        <div className="section-container">
          {/* Section Header */}
          <AnimatedSection className="mb-8 sm:mb-10" delay={0.2}>
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
              Bringing the market close to you
            </h2>
            <p className="max-w-2xl text-center text-sm text-gray-600 sm:text-base md:text-left md:text-lg">
              Trusted brands like Nestle, Indomie, and more.
            </p>
          </AnimatedSection>

          {/* Product Grid  */}
          <AnimatedGrid className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <AnimatedGridItem key={product.id}>
                <ProductCard key={product.id} product={product} />
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </div>
      </div>
    </section>
  );
}
