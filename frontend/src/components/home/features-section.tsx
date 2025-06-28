"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Package } from "lucide-react";
import { CartIcon, ContactIcon } from "@/components/icons";

const features = [
  {
    id: 0,
    icon: Truck,
    title: "Quick Delivery",
    description: "Free shipping with discount",
  },
  {
    id: 1,
    icon: ContactIcon,
    title: "Great Support 24/7",
    description: "Instant access to Contact",
  },
  {
    id: 2,
    icon: CartIcon,
    title: "100% Secure Payment",
    description: "We ensure your money is save",
  },
  {
    id: 3,
    icon: Package,
    title: "Money-Back Guarantee",
    description: "30 days money-back",
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container-padding">
        <div className="section-container">
          {/* Section Header */}
          <div className="mb-8 text-center sm:mb-10 lg:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Why Thousands of Nigerians Love Naijabites!
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-gray-600 sm:text-base md:text-lg">
              Bringing you closer to the flavours of home, with convenience,
              savings, and quality at the heart of every delivery
            </p>
          </div>

          {/* Features Container - Responsive Layout */}
          <div className="grid grid-cols-1 gap-6 bg-white sm:grid-cols-2 lg:flex lg:justify-between lg:gap-0">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  className="group relative flex flex-1 cursor-pointer flex-col items-center gap-3 px-4 py-6 sm:gap-4 sm:py-8 lg:gap-4 lg:px-2 lg:py-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: feature.id * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  {/* Icon Container with SVG Background */}
                  <motion.div
                    className="relative flex flex-col overflow-hidden rounded-full p-3 sm:p-4 lg:p-[18px]"
                    style={{
                      backgroundImage: isActive
                        ? `url('/icons/active-bg.svg')`
                        : `url('/icons/inactive-bg.svg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center">
                      <motion.div
                        animate={{
                          color: isActive ? "#ffffff" : "#1f4b2c",
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                      >
                        <IconComponent className="h-7 w-7 lg:h-8 lg:w-8" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex flex-col justify-center gap-1 sm:gap-2"
                    animate={{ y: isActive ? -2 : 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <motion.span
                      className="text-center text-base font-semibold leading-tight text-gray-900 lg:text-lg lg:leading-[22px]"
                      animate={{
                        scale: isActive ? 1.02 : 1,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {feature.title}
                    </motion.span>
                    <span className="text-center text-sm leading-tight text-gray-600 lg:text-base lg:leading-[20px]">
                      {feature.description}
                    </span>
                  </motion.div>

                  {/* Bottom Border - Responsive thickness */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 ${
                      isActive ? "bg-[#1f4b2c]" : "bg-gray-300"
                    }`}
                    animate={{
                      height: isActive ? 3 : 1.5,
                      backgroundColor: isActive ? "#1f4b2c" : "#d1d5db",
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
