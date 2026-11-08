"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";
import { fadeDown, fadeUp, slideFromRight } from "@/lib/animations";

interface HeroProps {
  onOpenCallback: () => void;
}

export function Hero({ onOpenCallback }: HeroProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-transparent z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Progressive Text Reveal */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 1. Availability Indicator — Slides down gently */}
            <motion.div
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-text-secondary">
                  {siteConfig.availability}
                </span>
              </div>
            </motion.div>

            {/* 2 & 3. Designation & Headline — Slides upward */}
            <div className="space-y-3">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xs font-mono uppercase tracking-widest text-dusk font-medium"
              >
                {siteConfig.role}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.2]"
              >
                {siteConfig.headline}
              </motion.h1>
            </div>

            {/* 4. Supporting Description — Fades in */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              {siteConfig.supportingCopy}
            </motion.p>

            {/* 5. CTA Buttons — Slides upward */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenCallback}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-text-primary glass-card-subtle hover:border-dusk/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>View My Work</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 6. Portrait Slides in from Right with Glassmorphism */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            custom={2}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden glass-card aspect-[4/5] shadow-card hover:scale-[1.01] transition-transform duration-300">
                {!photoError && siteConfig.photo.src ? (
                  <Image
                    src={siteConfig.photo.src}
                    alt={siteConfig.photo.alt}
                    fill
                    className="object-cover object-center"
                    onError={() => setPhotoError(true)}
                    priority
                  />
                ) : (
                  <div className="w-full h-full p-8 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[rgba(20,34,62,0.4)] to-[rgba(16,29,53,0.6)]">
                    <div className="w-full flex justify-end">
                      <span className="text-[11px] text-text-muted font-mono tracking-wide">
                        PORTRAIT
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="w-20 h-20 rounded-full bg-[rgba(16,29,53,0.7)] border border-dusk/20 mx-auto flex items-center justify-center text-dusk">
                        <User className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-medium text-text-primary">
                          {siteConfig.name}
                        </div>
                        <p className="text-xs text-text-secondary">
                          {siteConfig.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted border-t border-[rgba(145,184,227,0.14)] w-full pt-4">
                      {siteConfig.location}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
