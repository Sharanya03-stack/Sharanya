"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { fadeDown, fadeUp } from "@/lib/animations";

interface HeroProps {
  onOpenCallback: () => void;
}

export function Hero({ onOpenCallback }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[84vh] flex items-center pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-transparent z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: High-contrast monochromatic typography */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 text-left">
            {/* 1. Professional eyebrow text */}
            <motion.div
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-lightgrey font-semibold">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* 2. Main high-contrast headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.85rem] font-bold tracking-tight text-white leading-[1.10] font-heading"
            >
              {siteConfig.headline}
            </motion.h1>

            {/* 3. Supporting description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base sm:text-lg lg:text-xl text-lightgrey leading-relaxed max-w-2xl font-body"
            >
              {siteConfig.supportingCopy}
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenCallback}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-medium text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-sunset/25"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-medium text-white glass-card hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore My Work</span>
                <Compass className="w-4 h-4 text-lightgrey group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Spatial canvas area for 3D Disintegrating Sphere */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5 xl:col-span-4 h-[420px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
