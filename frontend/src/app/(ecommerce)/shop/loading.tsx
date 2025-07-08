import {
  PromotionalCarouselSkeleton,
  ProductSectionSkeleton,
  CategoryNavSkeleton,
} from "@/components/shop";

export default function ShopLoading() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* Category Navigation Skeleton */}
      <CategoryNavSkeleton />

      {/* Promotional Hero Section Skeleton */}
      <section className="container-padding bg-gray-50 py-10">
        <div className="section-container">
          <PromotionalCarouselSkeleton />
        </div>
      </section>

      {/* Product Sections Skeletons */}
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductSectionSkeleton
          key={index}
          className={index % 2 === 0 ? "bg-white py-12" : "bg-gray-50 py-12"}
        />
      ))}
    </main>
  );
}
