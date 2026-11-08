"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenCallback: () => void;
}

export function Hero({ onOpenCallback }: HeroProps) {
  const [photoError, setPhotoError] = useState(false);

  // Staggered motion container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut" as const,
      },
    },
  };

  const portraitVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.25,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Progressive Text Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* 1. Availability Indicator */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162646]/80 backdrop-blur-sm border border-[#1E335B]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-text-secondary">
                  {siteConfig.availability}
                </span>
              </div>
            </motion.div>

            {/* 2 & 3. Designation & Headline */}
            <div className="space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-xs font-mono uppercase tracking-widest text-dusk font-medium"
              >
                {siteConfig.role}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.2]"
              >
                {siteConfig.headline}
              </motion.h1>
            </div>

            {/* 4. Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              {siteConfig.supportingCopy}
            </motion.p>

            {/* 5. CTAs */}
            <motion.div
              variants={itemVariants}
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-text-primary bg-[#162646]/80 hover:bg-[#1C3159] border border-[#1E335B] hover:border-dusk/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>View My Work</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 6. Portrait Image Reveal */}
          <motion.div
            variants={portraitVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden bg-[#162646]/90 border border-[#1E335B] aspect-[4/5] shadow-card backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01]">
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
                  <div className="w-full h-full p-8 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#162646] to-[#121F38]">
                    <div className="w-full flex justify-end">
                      <span className="text-[11px] text-text-muted font-mono tracking-wide">
                        PORTRAIT
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="w-20 h-20 rounded-full bg-[#101D35] border border-[#1E335B] mx-auto flex items-center justify-center text-dusk">
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

                    <div className="text-[11px] text-text-muted border-t border-[#1E335B] w-full pt-4">
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
