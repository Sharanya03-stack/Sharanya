"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Code2, Cpu, Trophy, Palette } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUp,
  lineReveal,
  slideFromLeft,
  slideFromRight,
  springReveal,
} from "@/lib/animations";

export function About() {
  const cards = siteConfig.aboutCards;

  const getCardIcon = (id: string) => {
    switch (id) {
      case "card-1":
        return <Code2 className="w-4 h-4 text-heading" />;
      case "card-2":
        return <Cpu className="w-4 h-4 text-secondary" />;
      case "card-3":
        return <Trophy className="w-4 h-4 text-accent" />;
      case "card-4":
      default:
        return <Palette className="w-4 h-4 text-heading" />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-10 sm:py-12 lg:py-14 overflow-hidden bg-transparent z-10"
    >
      <div className="editorial-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10 space-y-2.5">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="text-xs sm:text-[0.8125rem] font-mono uppercase tracking-[0.2em] text-secondary font-medium"
          >
            01 — Profile &amp; Expertise
          </motion.p>

          <motion.h2
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="text-[2rem] sm:text-[2.6rem] lg:text-[clamp(2.6rem,4vw,3.75rem)] font-heading font-bold tracking-[-0.02em] text-heading leading-[1.1]"
          >
            Architecting modern digital products with precision.
          </motion.h2>
        </div>

        {/* Desktop Composition: Wider balanced stage */}
        <div className="hidden lg:flex relative w-full h-[500px] items-center justify-center max-w-[1160px] mx-auto">
          {/* LAYER 1: Portrait Frame */}
          <motion.div
            variants={springReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            className="absolute z-10 w-[340px] h-[430px] rounded-2xl bg-surface border border-border shadow-noir overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, var(--radial-glow), transparent 65%)",
              }}
            />

            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-secondary/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-secondary/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-secondary/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-secondary/60 pointer-events-none" />

            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
                Sharanya N · Engineer
              </span>
            </div>
          </motion.div>

          {/* LAYER 2: Alternating Directional Info Cards */}
          {/* Card 1: Top Left */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            className="absolute z-20 top-5 left-0 xl:left-4 w-[310px] p-5 rounded-xl noir-card hover:-translate-y-1"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-surface-elevated border border-border shrink-0">
                {getCardIcon("card-1")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  {cards[0].category}
                </span>
                <h3 className="text-sm font-medium text-heading tracking-tight">
                  {cards[0].title}
                </h3>
                <p className="text-xs text-body leading-relaxed">
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
            className="absolute z-20 bottom-6 left-4 xl:left-8 w-[310px] p-5 rounded-xl noir-card hover:-translate-y-1"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-secondary-muted border border-secondary/35 shrink-0">
                {getCardIcon("card-2")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary">
                  {cards[1].category}
                </span>
                <h3 className="text-sm font-medium text-heading tracking-tight">
                  {cards[1].title}
                </h3>
                <p className="text-xs text-body leading-relaxed">
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
            className="absolute z-20 top-6 right-0 xl:right-4 w-[310px] p-5 rounded-xl noir-card hover:-translate-y-1"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-accent-muted border border-accent/35 shrink-0">
                {getCardIcon("card-3")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                  {cards[2].category}
                </span>
                <h3 className="text-sm font-medium text-heading tracking-tight">
                  {cards[2].title}
                </h3>
                <p className="text-xs text-body leading-relaxed">
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
            className="absolute z-20 bottom-5 right-4 xl:right-8 w-[310px] p-5 rounded-xl noir-card hover:-translate-y-1"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-surface-elevated border border-border shrink-0">
                {getCardIcon("card-4")}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  {cards[3].category}
                </span>
                <h3 className="text-sm font-medium text-heading tracking-tight">
                  {cards[3].title}
                </h3>
                <p className="text-xs text-body leading-relaxed">
                  {cards[3].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* LAYER 3: Portrait Cutout */}
          <motion.div
            variants={springReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1.2}
            className="relative z-30 w-[330px] flex items-end justify-center select-none pointer-events-none mt-2 [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
          >
            <Image
              src={siteConfig.photo.src}
              alt={siteConfig.photo.alt}
              width={601}
              height={666}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_22px_38px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </div>

        {/* Mobile & Tablet Composition */}
        <div className="lg:hidden space-y-6">
          <div className="relative w-[270px] sm:w-[310px] h-[380px] sm:h-[420px] mx-auto flex items-end justify-center">
            <div className="absolute inset-x-2 bottom-0 h-[82%] rounded-2xl bg-surface border border-border shadow-noir" />

            <motion.div
              variants={springReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative z-20 w-[95%] select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
            >
              <Image
                src={siteConfig.photo.src}
                alt={siteConfig.photo.alt}
                width={601}
                height={666}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                variants={idx % 2 === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx * 0.4}
                className="p-5 rounded-xl noir-card"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg shrink-0 border ${
                      card.id === "card-2"
                        ? "bg-secondary-muted border-secondary/35"
                        : card.id === "card-3"
                        ? "bg-accent-muted border-accent/35"
                        : "bg-surface-elevated border-border"
                    }`}
                  >
                    {getCardIcon(card.id)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                      {card.category}
                    </span>
                    <h3 className="text-sm font-medium text-heading">
                      {card.title}
                    </h3>
                    <p className="text-xs text-body leading-relaxed">
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
