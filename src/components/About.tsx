"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Code2, Cpu, Trophy, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

export function About() {
  const cards = siteConfig.aboutCards;

  const getCardIcon = (id: string) => {
    switch (id) {
      case "card-1":
        return <Code2 className="w-4 h-4 text-white" />;
      case "card-2":
        return <Cpu className="w-4 h-4 text-electric" />;
      case "card-3":
        return <Trophy className="w-4 h-4 text-sunset" />;
      case "card-4":
        return <Palette className="w-4 h-4 text-white" />;
      default:
        return <Code2 className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-14 lg:py-20 overflow-hidden bg-transparent z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-subtle mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-lightgrey font-medium">
              Profile &amp; Expertise
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading"
          >
            Architecting modern digital products with precision.
          </motion.h2>
        </div>

        {/* Desktop Composition: Layered Stage with Subject in Foreground Overlapping Frame & Floating Cards Behind */}
        <div className="hidden lg:flex relative w-full h-[540px] items-center justify-center">
          {/* LAYER 1: Background Rectangular Portrait Frame (z-10) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.90 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 w-[350px] h-[450px] rounded-3xl bg-gradient-to-b from-charcoal/90 via-surface/95 to-background border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Subtle inner grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Subtle technical corner markers */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/20 pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/20 pointer-events-none" />

            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="text-[11px] font-mono tracking-widest text-mediumgrey uppercase">
                Sharanya N · Engineer
              </span>
            </div>
          </motion.div>

          {/* LAYER 2: Floating Glass Information Cards Behind the Subject (z-20) */}
          {/* Card 1: Top Left */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            className="absolute z-20 top-6 left-0 xl:left-8 w-[290px] p-5 rounded-2xl glass-card shadow-2xl hover:border-white/30 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 shrink-0">
                {getCardIcon("card-1")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-mediumgrey">
                  {cards[0].category}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {cards[0].title}
                </h3>
                <p className="text-xs text-lightgrey leading-relaxed">
                  {cards[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Bottom Left */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            className="absolute z-20 bottom-8 left-4 xl:left-12 w-[290px] p-5 rounded-2xl glass-card shadow-2xl hover:border-white/30 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-electric/15 border border-electric/30 shrink-0">
                {getCardIcon("card-2")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-electric">
                  {cards[1].category}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {cards[1].title}
                </h3>
                <p className="text-xs text-lightgrey leading-relaxed">
                  {cards[1].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Top Right */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            className="absolute z-20 top-8 right-0 xl:right-8 w-[290px] p-5 rounded-2xl glass-card shadow-2xl hover:border-white/30 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-sunset/15 border border-sunset/30 shrink-0">
                {getCardIcon("card-3")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sunset">
                  {cards[2].category}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {cards[2].title}
                </h3>
                <p className="text-xs text-lightgrey leading-relaxed">
                  {cards[2].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Bottom Right */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            className="absolute z-20 bottom-6 right-4 xl:right-12 w-[290px] p-5 rounded-2xl glass-card shadow-2xl hover:border-white/30 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 shrink-0">
                {getCardIcon("card-4")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-mediumgrey">
                  {cards[3].category}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {cards[3].title}
                </h3>
                <p className="text-xs text-lightgrey leading-relaxed">
                  {cards[3].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* LAYER 3: Foreground Portrait Subject (z-30) Extending Outside Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 14,
              mass: 0.85,
              delay: 0.15,
            }}
            className="relative z-30 w-[340px] flex items-end justify-center select-none pointer-events-none mt-2 [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
          >
            <Image
              src={siteConfig.photo.src}
              alt={siteConfig.photo.alt}
              width={601}
              height={666}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>

        {/* Mobile & Tablet Composition: Portrait Frame + Responsive Stacked Cards */}
        <div className="lg:hidden space-y-8">
          {/* Centered Portrait with Frame */}
          <div className="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[440px] mx-auto flex items-end justify-center">
            {/* Background Frame */}
            <div className="absolute inset-x-2 bottom-0 h-[82%] rounded-2xl bg-gradient-to-b from-charcoal/90 to-background border border-white/15 shadow-xl" />

            {/* Cutout Portrait overlapping frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 w-[95%] select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
            >
              <Image
                src={siteConfig.photo.src}
                alt={siteConfig.photo.alt}
                width={601}
                height={666}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </div>

          {/* Clean 2-column or stacked cards on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                variants={idx % 2 === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                className="p-5 rounded-xl glass-card"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 border ${
                    card.id === "card-2"
                      ? "bg-electric/15 border-electric/30 text-electric"
                      : card.id === "card-3"
                      ? "bg-sunset/15 border-sunset/30 text-sunset"
                      : "bg-white/10 border-white/15 text-white"
                  }`}>
                    {getCardIcon(card.id)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-mediumgrey">
                      {card.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-lightgrey leading-relaxed">
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
