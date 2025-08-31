import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShopBreadcrumbs,
  ProductSection,
  ProductDetails,
  ProductImageGallery,
} from "@/components/shop";
import { getShopifyProductBySlug } from "@/lib/shopify-products";
import { getProductBySlug } from "@/lib/mock-data/products";
import { getSimilarProductsSection } from "@/lib/data/shop-sections";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;

  // Try Shopify first, then fallback to mock data
  const shopifyProduct = await getShopifyProductBySlug(resolvedParams.slug);
  const product = shopifyProduct || getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name}`,
    description: product.description || product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.description || product.shortDescription,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Get product from Shopify or fallback to mock data for testing
  const shopifyProduct = await getShopifyProductBySlug(resolvedParams.slug);
  const product = shopifyProduct || getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Use existing shop-sections logic for consistency
  const similarProductsSection = await getSimilarProductsSection(
    product.id,
    product.category,
  );

  // Use product's images array if available, fallback to main image
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/images/product-placeholder.svg"];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      {/* Main Product Section */}
      <div className="container-padding pb-12 pt-4">
        <div className="section-container">
          {/* Product Layout */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Sticky Image Gallery */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <ProductImageGallery
                images={productImages}
                productName={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="lg:min-h-screen">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProductsSection.products.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="container-padding py-12">
            <div className="section-container">
              <ProductSection
                title="You might also like"
                description="Similar products from our store"
                products={similarProductsSection.products}
                viewAllLink={`/shop?category=${encodeURIComponent(
                  product.category,
                )}`}
                noContainer={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
