"use client";

import { useState } from "react";
import type { TechCategory } from "@/data/technologies";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerWords,
  wordReveal,
} from "@/lib/animations";

interface TechStackProps {
  categories: TechCategory[];
}

export function TechStack({ categories }: TechStackProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => cat.id === activeTab);

  const headlineWords =
    "Engineered for scalability, precision and high-throughput production.".split(
      " "
    );

  return (
    <section
      id="stack"
      className="py-10 sm:py-12 lg:py-14 bg-surface-subtle border-t border-b border-border relative z-10 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-10 space-y-3">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-xs font-mono uppercase tracking-[0.22em] text-secondary"
          >
            02 — Core Technologies
          </motion.p>

          <motion.h2
            variants={staggerWords}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-heading leading-[1.12] flex flex-wrap gap-x-3 gap-y-1"
          >
            {headlineWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1">
                <motion.span
                  variants={wordReveal}
                  custom={i}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            className="text-sm sm:text-base text-body leading-[1.7] font-sans max-w-2xl"
          >
            A disciplined technical toolkit selected for strict type-safety, resilience under concurrency, and zero-compromise runtime performance.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
          className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-border"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`min-h-[44px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-pill-bg text-pill-fg font-medium"
                : "bg-surface border border-border text-muted hover:text-heading hover:border-border-hover"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`min-h-[44px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === category.id
                  ? "bg-pill-bg text-pill-fg font-medium"
                  : "bg-surface border border-border text-muted hover:text-heading hover:border-border-hover"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              const headingSlide =
                index % 2 === 0 ? slideFromLeft : slideFromRight;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl noir-card p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <motion.div
                      variants={headingSlide}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.25 }}
                      custom={index * 0.2}
                      className="flex items-center justify-between pb-3.5 mb-4 border-b border-border"
                    >
                      <h3 className="text-xl font-serif text-heading tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-secondary">
                        0{index + 1}
                      </span>
                    </motion.div>

                    <p className="text-xs text-body mb-5 leading-relaxed font-sans">
                      {category.description}
                    </p>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      className="space-y-2.5"
                    >
                      {category.items.map((tech) => (
                        <motion.div
                          key={tech.name}
                          variants={fadeUp}
                          className="p-3 rounded-lg bg-surface-subtle border border-border-subtle hover:border-secondary transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-heading tracking-wide">
                              {tech.name}
                            </span>
                            {tech.highlight && (
                              <span className="text-[10px] font-mono uppercase tracking-wider text-secondary">
                                Core
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted mt-1 leading-snug line-clamp-2">
                            {tech.description}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
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
