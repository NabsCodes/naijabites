"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface AnimatedGridProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGrid({ children, className = "" }: AnimatedGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedGridItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGridItem({
  children,
  className = "",
}: AnimatedGridItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
