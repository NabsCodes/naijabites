"use client";

import Image from "next/image";
import React from "react";
import { TestimonialCard } from "@/components/common/testimonial-card";
import { testimonials } from "@/lib/data/testimonials";
import { Marquee } from "@/components/ui/marquee";

export const TestimonialSection = () => {
  return (
    <section
      style={{ backgroundImage: "url('/images/testimonial-bg.webp')" }}
      className="bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
    >
      <div className="container-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 sm:p-8 md:grid-cols-2 md:gap-8">
            {/* Left Side - Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-2 md:gap-4">
                <h2 className="text-2xl font-semibold leading-tight text-gray-900 lg:text-3xl">
                  See How Naijabites Makes Shopping Easier for Nigerians
                </h2>
              </div>
              <p className="text-sm text-gray-500 md:hidden">
                "Real stories from our satisfied customers"
              </p>

              <div className="hidden h-full w-full overflow-hidden rounded-3xl md:block">
                <Image
                  className="h-full w-full object-cover object-center"
                  src="/images/testimonial-image.webp"
                  alt="Happy customer shopping for groceries"
                  width={610}
                  height={400}
                  priority
                />
              </div>
            </div>

            {/* Right Side - Testimonials Marquee */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Mobile Horizontal Marquee */}
              <div className="block md:hidden">
                <div className="relative w-full overflow-hidden rounded-2xl">
                  {/* Horizontal gradient overlays */}
                  <div className="pointer-events-none absolute inset-y-0 -left-2 z-10 w-14 bg-gradient-to-r from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 -right-2 z-10 w-14 bg-gradient-to-l from-white to-transparent" />

                  <Marquee
                    pauseOnHover
                    className="py-4 [--duration:40s] [--gap:1rem]"
                  >
                    {testimonials.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        className="w-80 flex-shrink-0"
                      />
                    ))}
                  </Marquee>
                </div>
              </div>

              {/* Desktop Vertical Marquee */}
              <div className="hidden md:block">
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                  {/* Vertical gradient overlays */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

                  <Marquee
                    vertical
                    pauseOnHover
                    className="h-full [--duration:30s] [--gap:1rem]"
                  >
                    {testimonials.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                      />
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
