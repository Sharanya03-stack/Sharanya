import { Variants } from "framer-motion";

export const easeOutQuad = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: easeOutQuad,
    },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -25 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.1,
      ease: easeOutQuad,
    },
  }),
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.12,
      ease: easeOutQuad,
    },
  }),
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.12,
      ease: easeOutQuad,
    },
  }),
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: easeOutQuad,
    },
  }),
};

export const springReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
      mass: 0.85,
      delay: custom * 0.12,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "80%", filter: "blur(4px)" },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: custom * 0.04,
      ease: easeOutQuad,
    },
  }),
};

export const wordContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};
