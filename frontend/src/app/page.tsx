import { HeroSection } from "@/components/home/hero-section";
import { ProductListingSection } from "@/components/home/product-listing-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialSection } from "@/components/home/testimonial-section";

export default function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col overflow-hidden bg-green-deep">
        <HeroSection />
        <ProductListingSection />
        <FeaturesSection />
        <TestimonialSection />
      </main>
    </>
  );
}
