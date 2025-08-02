import { Variants } from "framer-motion";

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

// Stagger animations for lists/grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.2, ease: "easeOut" },
};

// Transition configurations
export const smoothTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
};

export const quickTransition = {
  duration: 0.2,
  ease: "easeOut",
};

// Animation delays for staggered effects
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) =>
  baseDelay * index;
