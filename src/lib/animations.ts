import { Variants } from "framer-motion";

export const easeEditorial = [0.22, 1, 0.36, 1] as const;
export const easeOutQuad = easeEditorial;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: easeEditorial,
    },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.1,
      ease: easeEditorial,
    },
  }),
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: easeEditorial,
    },
  }),
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: easeEditorial,
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
      ease: easeEditorial,
    },
  }),
};

export const springReveal: Variants = {
  hidden: { opacity: 0, scale: 0.86, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
      mass: 0.85,
      delay: custom * 0.1,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: custom * 0.1,
    },
  }),
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "90%" },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.55,
      delay: custom * 0.04,
      ease: easeEditorial,
    },
  }),
};

export const staggerWords: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: custom * 0.1,
    },
  }),
};

export const splitTextReveal: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: (custom: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.72,
      delay: custom * 0.06,
      ease: easeEditorial,
    },
  }),
};

export const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    clipPath: "inset(0% 0% 100% 0%)",
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.68,
      delay: custom * 0.1,
      ease: easeEditorial,
    },
  }),
};

export const imageClipReveal: Variants = {
  hidden: {
    clipPath: "inset(14% 0% 14% 0%)",
    scale: 1.06,
    opacity: 0.4,
  },
  visible: (custom: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      delay: custom * 0.08,
      ease: easeEditorial,
    },
  }),
};
