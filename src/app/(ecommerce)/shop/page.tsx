import {
  PromotionalCarousel,
  ProductSection,
  CategoryNav,
} from "@/components/shop";
import { getActivePromotions } from "@/lib/mock-data/promotions";
import { getShopSections } from "@/lib/data/shop-sections";
import { Metadata } from "next";

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Shop",
  },
};

export default async function ShopPage() {
  // Only in development - simulate slow API
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  // Fetch data server-side
  const promotions = getActivePromotions();
  const sections = getShopSections();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* Category Navigation */}
      <CategoryNav />

      {/* Promotional Hero Section */}
      <section className="container-padding bg-gray-50 py-10">
        <div className="section-container">
          <PromotionalCarousel banners={promotions} autoplayDelay={8000} />
        </div>
      </section>

      {/* Product Sections */}
      {sections.map((section, index) => (
        <ProductSection
          key={section.id}
          title={section.title}
          description={section.description}
          products={section.getProducts()}
          viewAllLink={section.viewAllLink}
          className={index % 2 === 0 ? "bg-white py-12" : "bg-gray-50 py-12"}
        />
      ))}
    </main>
  );
}
