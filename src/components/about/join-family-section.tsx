"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/common";
import { Button } from "@/components/ui/button";

export const JoinFamilySection = () => {
  return (
    <section
      style={{ backgroundImage: "url('/images/testimonial-bg.webp')" }}
      className="container-padding relative overflow-hidden bg-cover bg-center bg-no-repeat py-10 lg:py-20"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 sm:p-8 md:grid-cols-2 md:gap-12">
          {/* Image Section */}
          <AnimatedSection delay={0.2}>
            <div className="relative h-[300px] w-full overflow-hidden rounded-3xl md:h-[370px]">
              <div className="absolute inset-0 animate-pulse bg-gray-800/50" />{" "}
              {/* Placeholder background */}
              <Image
                src="/images/testimonial-image.webp"
                alt="Happy customer shopping for groceries"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
                quality={95}
                className="rounded-3xl object-cover object-center"
              />
            </div>
          </AnimatedSection>

          {/* Content Section */}
          <div className="flex max-w-lg flex-col justify-center space-y-8">
            <div className="flex flex-col space-y-4">
              <AnimatedSection delay={0.6}>
                <h2 className="text-xl font-semibold leading-tight text-green-deep sm:text-2xl md:text-4xl">
                  Join the Naijabites Family !
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.8}>
                <p className="text-sm font-normal leading-relaxed text-gray-900 sm:text-base lg:text-lg">
                  Discover how easy and affordable it is to get authentic
                  Nigerian food brands delivered to your home in Canada. Shop
                  now and enjoy a seamless shopping experience with fast
                  delivery, trusted products, and unbeatable prices.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={1.0}>
                <Button
                  size="lg"
                  asChild
                  className="flex w-fit items-center gap-2 rounded-lg bg-green-deep px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-deep/90"
                >
                  <Link href="/categories">Start Shopping Today !</Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
