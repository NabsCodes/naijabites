"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedGridItem,
} from "@/components/common";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounter } from "@/hooks/use-counter";

interface StatCard {
  value: string;
  label: string;
}

const stats: StatCard[] = [
  { value: "10,000+", label: "Products Delivered" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "13", label: "Provinces Served" },
  { value: "2+", label: "Years of Excellence" },
];

const StatCard = ({
  stat,
  isTriggered,
  delay,
}: {
  stat: StatCard;
  isTriggered: boolean;
  delay: number;
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      const timer = setTimeout(() => setShouldAnimate(true), delay * 1000); // Convert seconds to milliseconds
      return () => clearTimeout(timer);
    }
  }, [isTriggered, delay]);

  const animatedValue = useCounter(stat.value, shouldAnimate);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-solid border-gray-200 bg-gray-100 p-6 shadow-sm">
      <div className="text-2xl font-semibold leading-tight text-green-deep lg:text-3xl">
        {animatedValue}
      </div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  );
};

export const OurStorySection = () => {
  const { ref: statsRef, hasTriggered } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.3,
    });

  return (
    <section className="container-padding relative overflow-hidden py-10 lg:py-20">
      {/* Background SVG - positioned in top-left */}
      <div className="absolute -left-4 top-6 z-0 hidden h-80 w-80 md:block md:h-96 md:w-96 lg:-left-8 lg:top-8 lg:h-[28rem] lg:w-[28rem] xl:-left-4 xl:top-8 xl:h-[30rem] xl:w-[30rem] 2xl:hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 424 561"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M344.726 503.853C163.699 670.933 71.6681 426.22 -38.6599 306.683C-95.9657 244.594 -154.846 151.242 -60.8181 64.4583C43.3105 -31.6483 164.602 -8.25162 228.064 60.5076C341.711 183.641 531.199 331.746 344.726 503.853Z"
            fill="#BBD137"
          />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Content Column - First on mobile, second on desktop */}
          <div className="order-1 flex flex-col justify-center space-y-4 md:order-2">
            <AnimatedSection delay={0.4}>
              <h2 className="text-2xl font-bold leading-tight text-green-dark md:text-4xl lg:text-5xl">
                Our Story
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <p className="text-sm text-gray-700 sm:text-base lg:text-lg">
                Naijabites was born from a deep understanding of how challenging
                it can be to find authentic Nigerian products abroad. As
                Nigerians living in Canada, we wanted a platform where we could
                easily shop for trusted brands we grew up with—Golden Morn,
                Indomie, and Yam, to name a few—without compromising on quality
                or price. Today, Naijabites serves as a bridge between home and
                diaspora, making life easier for thousands of Nigerians.
              </p>
            </AnimatedSection>

            {/* Stats Grid */}
            <div ref={statsRef}>
              <AnimatedGrid className="grid grid-cols-2 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <AnimatedGridItem key={index}>
                    <StatCard
                      stat={stat}
                      isTriggered={hasTriggered}
                      delay={0.2 + index * 0.1}
                    />
                  </AnimatedGridItem>
                ))}
              </AnimatedGrid>
            </div>
          </div>

          {/* Image Column - Second on mobile, first on desktop */}
          <AnimatedSection delay={0.6}>
            <div className="relative order-2 h-[450px] overflow-hidden rounded-3xl md:order-1 md:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 animate-pulse bg-gray-800/50" />{" "}
              {/* Placeholder background */}
              <Image
                src="/images/our-story.webp"
                alt="Our story - Woman smiling in a Nigerian grocery store"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-3xl object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
