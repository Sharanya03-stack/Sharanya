"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Code2, Sparkles, Trophy, Layout, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

export function About() {
  const cards = siteConfig.aboutCards;

  // Icon mapping for information cards
  const getCardIcon = (id: string) => {
    switch (id) {
      case "card-1":
        return <Code2 className="w-5 h-5 text-skyblue" />;
      case "card-2":
        return <Sparkles className="w-5 h-5 text-skyblue" />;
      case "card-3":
        return <Trophy className="w-5 h-5 text-sunset" />;
      case "card-4":
        return <Layout className="w-5 h-5 text-skyblue" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-skyblue" />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden bg-transparent z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card-subtle mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sunset" />
            <span className="text-xs font-mono uppercase tracking-widest text-skyblue font-medium">
              About &amp; Specialization
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary"
          >
            Engineering scalable solutions with precision.
          </motion.h2>
        </div>

        {/* Cinematic Composition: Central Portrait Overlapping Frame with 4 Floating Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Floating Cards (Cards 1 & 2) — Slide in from left */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1">
            {cards.slice(0, 2).map((card, idx) => (
              <motion.div
                key={card.id}
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={idx + 1}
                className="group relative p-6 rounded-2xl glass-card hover:-translate-y-1 hover:border-skyblue/40 transition-all shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-skyblue/10 border border-skyblue/20 text-skyblue shrink-0 group-hover:bg-skyblue/15 transition-colors">
                    {getCardIcon(card.id)}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-skyblue/80">
                      {card.category}
                    </span>
                    <h3 className="text-lg font-semibold text-text-primary tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Portrait Standing In Front & Extending Beyond Frame */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[460px] sm:h-[500px] flex items-end justify-center">
              {/* 1. Rectangular Frame (Remains behind subject) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-3 bottom-0 h-[80%] sm:h-[82%] rounded-3xl glass-card overflow-hidden z-10 border border-skyblue/25 shadow-2xl"
              >
                {/* Frame backdrop gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-surface/80 to-navy-deep/95 pointer-events-none" />
                
                {/* Subtle technical corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-skyblue/30 rounded-tl pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-skyblue/30 rounded-tr pointer-events-none" />
                
                {/* Subtle signature badge inside frame */}
                <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-10">
                  <span className="text-[11px] font-mono tracking-widest text-skyblue/70 uppercase">
                    Sharanya N · Engineer
                  </span>
                </div>
              </motion.div>

              {/* 2. Central Portrait Subject (Overlaps and extends beyond rectangular frame) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.80, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 14,
                  mass: 0.85,
                  delay: 0.15,
                }}
                className="relative z-20 w-[94%] sm:w-[98%] -mb-1 select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
              >
                <Image
                  src={siteConfig.photo.src}
                  alt={siteConfig.photo.alt}
                  width={601}
                  height={666}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Floating Cards (Cards 3 & 4) — Slide in from right */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-3">
            {cards.slice(2, 4).map((card, idx) => (
              <motion.div
                key={card.id}
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={idx + 1}
                className="group relative p-6 rounded-2xl glass-card hover:-translate-y-1 hover:border-skyblue/40 transition-all shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                    card.id === "card-3" 
                      ? "bg-sunset/10 border-sunset/30 text-sunset group-hover:bg-sunset/15" 
                      : "bg-skyblue/10 border-skyblue/20 text-skyblue group-hover:bg-skyblue/15"
                  }`}>
                    {getCardIcon(card.id)}
                  </div>
                  <div className="space-y-1.5">
                    <span className={`text-[11px] font-mono uppercase tracking-wider ${
                      card.id === "card-3" ? "text-sunset" : "text-skyblue/80"
                    }`}>
                      {card.category}
                    </span>
                    <h3 className="text-lg font-semibold text-text-primary tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
