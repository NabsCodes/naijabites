import { Suspense } from "react";
import {
  HeroSection,
  ProductListingSection,
  FeaturesSection,
  TestimonialSection,
  ProductListingSectionSkeleton,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col overflow-hidden">
        <HeroSection />

        <Suspense fallback={<ProductListingSectionSkeleton />}>
          <ProductListingSection />
        </Suspense>

        <FeaturesSection />
        <TestimonialSection />
      </main>
    </>
  );
}
