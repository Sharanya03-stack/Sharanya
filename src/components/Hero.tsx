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
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-transparent z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Pure, focused editorial typography */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-7 text-left">
            {/* 1. Small professional eyebrow text */}
            <motion.div
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-skyblue font-semibold">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* 2. Main headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-text-primary leading-[1.12]"
            >
              {siteConfig.headline}
            </motion.h1>

            {/* 3. Supporting description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl"
            >
              {siteConfig.supportingCopy}
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <button
                onClick={onOpenCallback}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-medium text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-sunset/20"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-medium text-text-primary glass-card-subtle hover:border-skyblue/50 hover:text-skyblue hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore My Work</span>
                <Compass className="w-4 h-4 opacity-70 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Open spatial area dedicated to the 3D Network Sphere */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5 xl:col-span-4 h-[440px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
