import Image from "next/image";

export const AboutHeroSection = () => {
  return (
    <section className="container-padding relative bg-green-deep py-10">
      <div className="section-container">
        {/* About Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-left md:text-5xl lg:text-6xl">
            Bringing <span className="text-lemon-light">Nigerian Flavors</span>{" "}
            to your doorstep
          </h1>
          <div className="flex md:items-end">
            <p className="text-sm text-white/90 sm:text-base md:text-left lg:text-lg">
              At Naijabites, we are passionate about connecting Nigerians in
              Canada with the tastes and comforts of home. Our mission is to
              make authentic Nigerian food products easily accessible,
              affordable, and delivered with care. From your pantry staples to
              your favorite snacks, we're here to keep the spirit of home alive.
            </p>
          </div>
        </div>

        {/* Responsive About Images */}
        <div className="mt-8 w-full lg:mt-10">
          <div className="relative h-[450px] w-full md:h-[360px]">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/about-us-mobile.webp"
              />
              <source
                media="(min-width: 769px)"
                srcSet="/images/about-us-hero.webp"
              />
              <Image
                src="/images/about-us-hero.webp"
                alt="About Naijabites - Authentic Nigerian ingredients and spices on mobile, diverse African food products on desktop"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="rounded-3xl object-cover"
                priority
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};
