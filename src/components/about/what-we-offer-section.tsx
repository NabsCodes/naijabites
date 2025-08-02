"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { offeringsCarousel } from "@/lib/data/features";
import { AnimatedSection } from "@/components/common";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export const WhatWeOfferSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Create autoplay plugin with ref to control it
  const autoplayRef = useRef(
    Autoplay({
      delay: 8000, // 8 seconds - gives users time to read content
      stopOnInteraction: true,
    }),
  );

  useEffect(() => {
    if (!api) return;

    // Set initial values and listen for changes
    const updateState = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateState();
    api.on("select", updateState);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        api.scrollPrev();
        autoplayRef.current.reset();
      }
      if (e.key === "ArrowRight") {
        api.scrollNext();
        autoplayRef.current.reset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      api.off("select", updateState);
    };
  }, [api]);

  const currentOffering = offeringsCarousel[current];

  return (
    <section
      className="container-padding relative w-full overflow-hidden py-10 transition-colors duration-700 ease-in-out lg:py-20"
      aria-labelledby="offerings-title"
    >
      {/* Background SVG - positioned in top-right */}
      <div className="absolute -right-32 top-20 z-0 hidden h-80 w-80 md:block md:h-96 md:w-96 lg:-right-36 lg:top-24 lg:h-[28rem] lg:w-[28rem] xl:-right-48 xl:top-28 xl:h-[30rem] xl:w-[30rem] 2xl:hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 535 561"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M455.546 503.633C274.52 670.713 182.488 426 72.1604 306.463C14.8546 244.374 -44.0253 151.022 50.0022 64.2381C154.131 -31.8685 275.422 -8.47184 338.884 60.2874C452.532 183.421 642.019 331.526 455.546 503.633Z"
            fill="#BFD634"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="section-container relative z-10">
        {/* Title */}
        <AnimatedSection className="mb-10" delay={0.2}>
          <h2
            id="offerings-title"
            className="text-2xl font-bold leading-tight text-green-dark md:text-4xl lg:text-5xl"
          >
            What We Offer
          </h2>
        </AnimatedSection>

        {/* Content Layout Container */}
        <motion.div
          className="relative flex h-auto flex-col gap-8 xl:h-[600px] xl:flex-row xl:items-center xl:gap-0"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Image - Hidden on mobile/tablet, positioned on desktop xl+ */}
          <div className="absolute right-0 hidden h-[600px] w-[900px] xl:block">
            <Image
              key={current} // Force re-render for smooth transitions
              src={currentOffering?.image}
              alt={currentOffering?.alt}
              width={900}
              height={600}
              sizes="900px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="h-full w-full rounded-3xl object-cover transition-opacity duration-500 ease-in-out"
            />
          </div>

          {/* Carousel Card - Full width on mobile/tablet, overlapping on desktop xl+ */}
          <div className="relative z-10 w-full xl:w-[550px]">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplayRef.current]}
              className="w-full"
              role="region"
              aria-label="Our offerings carousel"
            >
              <CarouselContent className="rounded-2xl">
                {offeringsCarousel.map((offering, _) => (
                  <CarouselItem key={offering.id}>
                    <Card className="hover:shadow-3xl rounded-2xl border-0 bg-green-deep pb-6 shadow-2xl transition-transform duration-300 xl:pb-0">
                      <CardContent className="flex h-auto flex-col justify-between gap-6 p-6 md:p-8 xl:h-[458px] xl:gap-40 xl:p-10">
                        {/* Content Section */}
                        <div className="flex flex-col gap-4 md:gap-6">
                          <h3 className="text-2xl font-semibold leading-tight text-gray-50 md:text-3xl">
                            {offering.title}
                          </h3>
                          <p className="text-sm font-normal leading-[1.4] text-gray-100 sm:text-base md:text-lg lg:text-xl">
                            {offering.description}
                          </p>
                        </div>

                        {/* Mobile/Tablet Image - Shown on mobile up to md, larger size */}
                        <div className="relative block h-[300px] w-full overflow-hidden rounded-xl md:h-[400px] lg:h-[500px] xl:hidden">
                          <Image
                            src={offering.image}
                            alt={offering.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        {/* Empty spacer for desktop layout xl+ */}
                        <div className="hidden xl:block"></div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Mobile Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-start gap-2 xl:hidden">
              <div
                className="flex items-center gap-1.5 sm:gap-2"
                role="tablist"
                aria-label="Offering indicators"
              >
                {offeringsCarousel.map((offering, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={current === index}
                    aria-label={`Go to ${offering.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                      current === index
                        ? "w-6 bg-lemon-light sm:w-8"
                        : "w-1.5 bg-gray-400 hover:bg-gray-300 sm:w-2"
                    }`}
                    onClick={() => {
                      api?.scrollTo(index);
                      autoplayRef.current.reset();
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Navigation - Only shown on xl+ screens */}
            <div className="absolute bottom-10 left-10 hidden items-center justify-start gap-2 xl:flex">
              {/* Left Arrow */}
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:scale-110 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-lemon-light sm:h-10 sm:w-10"
                disabled={!canScrollPrev}
                onClick={() => {
                  api?.scrollPrev();
                  autoplayRef.current.reset();
                }}
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-colors duration-200 sm:h-5 sm:w-5",
                    !canScrollPrev ? "text-gray-400" : "text-white",
                  )}
                />
              </button>

              {/* Dots */}
              <div
                className="flex items-center gap-1.5 sm:gap-2"
                role="tablist"
                aria-label="Offering indicators"
              >
                {offeringsCarousel.map((offering, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={current === index}
                    aria-label={`Go to ${offering.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                      current === index
                        ? "w-6 bg-lemon-light sm:w-8"
                        : "w-1.5 bg-gray-400 hover:bg-gray-300 sm:w-2"
                    }`}
                    onClick={() => {
                      api?.scrollTo(index);
                      autoplayRef.current.reset();
                    }}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:scale-110 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-lemon-light sm:h-10 sm:w-10"
                aria-label="Next offering"
                disabled={!canScrollNext}
                onClick={() => {
                  api?.scrollNext();
                  autoplayRef.current.reset();
                }}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-colors duration-200 sm:h-5 sm:w-5",
                    !canScrollNext ? "text-gray-400" : "text-white",
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
