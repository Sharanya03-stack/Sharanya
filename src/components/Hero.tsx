"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeDown,
  lineReveal,
  splitTextReveal,
  staggerContainer,
  staggerWords,
  fadeUp,
} from "@/lib/animations";
import { usePortfolioUI } from "@/components/PortfolioShell";
import { MagneticButton } from "@/components/MagneticButton";

export function Hero() {
  const { openCallback } = usePortfolioUI();
  const headlineWords = siteConfig.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-[78vh] lg:min-h-[84vh] flex items-center pt-24 pb-10 lg:pt-28 lg:pb-14 overflow-hidden bg-transparent z-10"
    >
      {/* Subtle radial depth tuned via theme variable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 22% 45%, var(--radial-glow), transparent 70%)",
        }}
      />

      <div className="editorial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 lg:space-y-6 text-left">
            <motion.div
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-3"
            >
              <span className="h-[1px] w-7 bg-secondary" aria-hidden="true" />
              <p className="text-xs sm:text-[0.8125rem] font-mono uppercase tracking-[0.2em] text-secondary font-medium">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* Split-text mask reveal with Plus Jakarta Sans responsive scale */}
            <motion.h1
              variants={staggerWords}
              initial="hidden"
              animate="visible"
              custom={1.2}
              className="text-[2.4rem] sm:text-[3.4rem] lg:text-[clamp(3.8rem,5.6vw,5.5rem)] font-heading font-bold tracking-[-0.025em] text-heading leading-[1.06] flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-1"
            >
              {headlineWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="inline-block overflow-hidden pb-1.5"
                >
                  <motion.span
                    variants={splitTextReveal}
                    custom={index}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              custom={4.5}
              className="text-base sm:text-[1.0625rem] lg:text-[1.1875rem] text-body leading-[1.7] max-w-2xl font-body font-normal"
            >
              {siteConfig.supportingCopy}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.div variants={fadeUp} custom={0}>
                <MagneticButton
                  onClick={openCallback}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md text-sm font-medium text-accent-fg bg-accent hover:bg-accent-hover transition-colors shadow-accent cursor-pointer"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                <MagneticButton>
                  <Link
                    href="#projects"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md text-sm font-medium text-heading bg-surface border border-border hover:border-secondary hover:bg-surface-hover transition-colors"
                  >
                    <span>Explore My Work</span>
                    <Compass className="w-4 h-4 text-secondary group-hover:rotate-45 transition-transform" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Spatial stage for 3D Network Sphere */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5 h-[440px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
