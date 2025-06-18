import HeroCarousel from "./hero-carousel";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-green-deep text-white">
      <div className="container-padding relative py-10">
        <div className="mx-auto max-w-7xl">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
