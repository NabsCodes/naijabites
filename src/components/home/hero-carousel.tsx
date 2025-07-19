"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { CartIcon } from "../icons";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Create autoplay plugin with ref to control it
  const autoplayRef = useRef(
    Autoplay({
      delay: 8000, // 8 seconds
      stopOnInteraction: true,
    }),
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  const slides = ["slide1", "slide2"];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Carousel Container with proper rounded overflow */}
        <div className="w-full overflow-hidden rounded-3xl">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
          >
            <CarouselContent>
              {/* Slide 1 */}
              <CarouselItem>
                <Card className="border-0 shadow-none">
                  <div
                    style={{
                      backgroundImage: "url('/images/hero-bg-first.webp')",
                    }}
                    className="relative h-[400px] w-full bg-lemon-light bg-cover bg-center sm:h-[500px] lg:h-[640px]"
                  >
                    {/* Content - Centered */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-12 lg:px-8">
                      <div className="flex flex-col items-center gap-4">
                        <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:max-w-4xl lg:text-5xl xl:text-6xl">
                          Groceries You Love, Delivered to Your{" "}
                          <span className="text-green-dark">Door</span>.
                        </h1>
                        <p className="max-w-2xl text-center text-sm leading-relaxed text-gray-900 sm:text-base md:text-lg lg:text-xl">
                          Shop your favourite Nigerian food items at unbeatable
                          prices. Skip the stress, enjoy the convenience.
                        </p>
                      </div>

                      <Link
                        href="/shop"
                        className="flex items-center justify-center gap-2.5 rounded-lg bg-green-dark p-3 transition-all duration-300 hover:bg-green-dark/90 sm:p-4"
                      >
                        <CartIcon color="white" />
                        <span className="text-sm font-semibold leading-tight text-white sm:text-base">
                          Start Shopping
                        </span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              {/* Slide 2 */}
              <CarouselItem>
                <Card className="border-0 shadow-none">
                  <div
                    style={{
                      backgroundImage: "url('/images/hero-bg-second.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="relative h-[400px] w-full bg-[#EDF2EE] sm:h-[500px] lg:h-[640px]"
                  >
                    {/* Unified Responsive Layout */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-4 md:px-8 lg:gap-8 lg:px-12">
                      {/* Left Side - Grocery Image (Hidden on Mobile) */}
                      <div className="hidden items-center justify-center md:flex">
                        <div className="relative w-full">
                          <Image
                            src="/images/grocery.webp"
                            alt="Grocery Image"
                            width={800}
                            height={600}
                            className="h-auto w-full max-w-none object-contain drop-shadow-2xl"
                            priority
                          />
                        </div>
                      </div>

                      {/* Content - Responsive */}
                      <div className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:gap-8 md:text-left">
                        <div className="space-y-4">
                          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-4xl md:leading-relaxed xl:text-5xl">
                            Fresh & Healthy{" "}
                            <span className="block text-green-dark md:inline">
                              Organic Food
                            </span>
                          </h1>
                          <p className="text-sm text-gray-700 sm:text-base md:text-lg">
                            Affordable pricing, Quick delivery, Convenient
                            shopping.
                          </p>
                        </div>

                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-2 rounded-lg bg-green-dark px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-dark/90 md:w-fit"
                        >
                          <CartIcon color="white" />
                          Start Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
        {/* Left Arrow */}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:bg-gray-600/20 sm:h-10 sm:w-10"
          aria-label="Previous slide"
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-200 sm:h-2 ${
                current === index + 1
                  ? "w-6 bg-lemon-light sm:w-8"
                  : "w-1.5 bg-gray-400 hover:bg-gray-300 sm:w-2"
              }`}
              onClick={() => {
                api?.scrollTo(index);
                autoplayRef.current.reset();
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow  */}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:bg-gray-600/20 sm:h-10 sm:w-10"
          aria-label="Next slide"
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
    </>
  );
}
