import { ProductCard } from "@/components/shop";
import { getShopifyHomePageProducts } from "@/lib/shopify-products";
import { Product } from "@/types";

export async function ProductListingSection() {
  let products: Product[] = [];
  try {
    products = await getShopifyHomePageProducts(8);
    
    // If no Shopify products, fallback to mock data
    if (products.length === 0) {
      console.log('No Shopify products found, using mock data');
    }
  } catch (error) {
    console.error('Error fetching Shopify products, using mock data:', error);
  }

  return (
    <section className="rounded-t-[20px] bg-[#f9f9f9] md:rounded-t-[40px]">
      <div className="container-padding relative py-10 md:py-16 lg:py-20">
        <div className="section-container">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
              Bringing the market close to you
            </h2>
            <p className="max-w-2xl text-center text-sm text-gray-600 sm:text-base md:text-left md:text-lg">
              Trusted brands like Nestle, Indomie, and more.
            </p>
          </div>

          {/* Product Grid  TODO: investigate error on*/}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
