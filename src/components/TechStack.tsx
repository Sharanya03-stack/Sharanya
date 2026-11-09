"use client";

import { useState } from "react";
import { techCategories } from "@/data/technologies";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight, wordReveal } from "@/lib/animations";

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? techCategories
      : techCategories.filter((cat) => cat.id === activeTab);

  const headlineWords = "Engineered for scalability, precision and high-throughput production.".split(" ");

  return (
    <section id="stack" className="py-16 lg:py-22 bg-charcoal/30 border-t border-b border-white/10 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Word-by-Word Reveal */}
        <div className="max-w-3xl mb-12 space-y-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-subtle"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-lightgrey font-medium">
              Core Technologies
            </span>
          </motion.div>

          {/* Progressive Word-by-Word Headline */}
          <div className="overflow-hidden">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading leading-[1.15] flex flex-wrap gap-x-2.5 gap-y-1">
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1">
                  <motion.span
                    variants={wordReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i}
                    className="inline-block text-white"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            className="text-base text-lightgrey leading-relaxed font-body max-w-2xl pt-1"
          >
            A disciplined technical toolkit selected for strict type-safety, resilience under concurrency, and zero-compromise runtime performance.
          </motion.p>
        </div>

        {/* Minimal Filter Pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={3}
          className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/5"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-white text-background font-semibold shadow-sm"
                : "glass-card-subtle text-lightgrey hover:text-white hover:border-white/25"
            }`}
          >
            All Disciplines
          </button>
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === category.id
                  ? "bg-white text-background font-semibold shadow-sm"
                  : "glass-card-subtle text-lightgrey hover:text-white hover:border-white/25"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Editorial Section Showcase with Directional Words & Alternating Lateral Slides */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              // Alternating directional reveals for category containers
              const categoryDirection = index % 2 === 0 ? slideFromLeft : slideFromRight;

              return (
                <motion.div
                  key={category.id}
                  layout
                  variants={categoryDirection}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={index * 0.4}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl glass-card p-6 sm:p-7 flex flex-col justify-between hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Category Title — Slides in from side */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                      <h3 className="text-base font-bold text-white tracking-tight font-heading">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-mediumgrey">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs text-lightgrey mb-6 leading-relaxed font-body">
                      {category.description}
                    </p>

                    {/* Individual Technology Names — Directional Reveal Sequences */}
                    <div className="space-y-3">
                      {category.items.map((tech, techIdx) => {
                        const itemDirection = techIdx % 2 === 0 ? slideFromLeft : slideFromRight;

                        return (
                          <motion.div
                            key={tech.name}
                            variants={itemDirection}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            custom={0.1 + techIdx * 0.1}
                            className="group/tech p-3 rounded-xl bg-charcoal/50 border border-white/8 hover:border-white/20 hover:bg-charcoal/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-white tracking-wide group-hover/tech:text-white transition-colors">
                                {tech.name}
                              </span>
                              {tech.highlight && (
                                <span className="text-[9px] font-mono uppercase tracking-wider text-lightgrey px-1.5 py-0.5 rounded bg-white/10 border border-white/15">
                                  Core
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-mediumgrey mt-1 leading-snug line-clamp-2">
                              {tech.description}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
