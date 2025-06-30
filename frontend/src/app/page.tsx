"use client";

import { useState, useEffect } from "react";
import {
  HeroSection,
  ProductListingSection,
  FeaturesSection,
  TestimonialSection,
  ProductListingSectionSkeleton,
} from "@/components/home";

export default function HomePage() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Simulate loading for mock data (remove when using real API)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingProducts(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col overflow-hidden">
        <HeroSection />

        {isLoadingProducts ? (
          <ProductListingSectionSkeleton />
        ) : (
          <ProductListingSection />
        )}

        <FeaturesSection />
        <TestimonialSection />
      </main>
    </>
  );
}
