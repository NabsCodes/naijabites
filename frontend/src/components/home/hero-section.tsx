import { HeroCarousel } from ".";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-green-deep text-white">
      <div className="container-padding relative py-10">
        <div className="section-container">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
