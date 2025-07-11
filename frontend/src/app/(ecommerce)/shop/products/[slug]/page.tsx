import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ShopBreadcrumbs,
  ProductSection,
  ProductDetails,
  ProductImageGallery,
} from "@/components/shop";
import { getProductBySlug } from "@/lib/mock-data/products";
import { getSimilarProductsSection } from "@/lib/data/shop-sections";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

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
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Use existing shop-sections logic for consistency
  const similarProductsSection = getSimilarProductsSection(
    product.id,
    product.category,
  );

  // Use product's images array if available, fallback to main image
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/images/product-placeholder.svg"];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      <div className="container-padding flex-1 py-10">
        <div className="section-container">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Images - Left Side */}
            <div className="order-1 lg:order-1">
              <ProductImageGallery
                images={productImages}
                productName={product.name}
              />
            </div>

            {/* Product Details - Right Side */}
            <ProductDetails product={product} />
          </div>

          {/* Similar Products Section */}
          {similarProductsSection.hasProducts && (
            <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24">
              <ProductSection
                title={similarProductsSection.title}
                description={similarProductsSection.description}
                products={similarProductsSection.products}
                viewAllLink={similarProductsSection.viewAllLink}
                noContainer={true}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
