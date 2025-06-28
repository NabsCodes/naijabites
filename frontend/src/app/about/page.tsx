import {
  AboutHeroSection,
  OurStorySection,
  WhatWeOfferSection,
  JoinFamilySection,
} from "@/components/about";

const AboutPage = () => {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <AboutHeroSection />
      <OurStorySection />
      <WhatWeOfferSection />
      <JoinFamilySection />
    </main>
  );
};

export default AboutPage;
