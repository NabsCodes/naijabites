import {
  HeroSection,
  ProductListingSection,
  FeaturesSection,
  TestimonialSection,
} from "@/components/home";

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
