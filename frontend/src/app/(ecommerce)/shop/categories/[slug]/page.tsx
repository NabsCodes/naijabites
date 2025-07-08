import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FilterDesktop,
  ProductsHeader,
  ProductsGrid,
  CategoryNav,
  ShopBreadcrumbs,
} from "@/components/shop";
import { getProductsByCategory } from "@/lib/mock-data/products";
import { categories, getCategoryBySlug } from "@/lib/mock-data/categories";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name}`,
    description:
      category.description ||
      `Browse our selection of ${category.name.toLowerCase()}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // Get products for this category
  const categoryProducts = getProductsByCategory(category.name);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Category Navigation */}
      <CategoryNav />

      {/* Breadcrumbs */}
      <ShopBreadcrumbs />

      <div className="container-padding flex-1 bg-gray-50">
        <div className="section-container">
          {/* Page Header with integrated mobile filter */}
          <ProductsHeader
            title={category.name}
            description={category.description}
            totalProducts={categoryProducts.length}
          />
          <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-4">
            {/* Desktop Sidebar - Hidden on Mobile */}
            <div className="hidden lg:block">
              <FilterDesktop />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Products Grid */}
                <ProductsGrid products={categoryProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
