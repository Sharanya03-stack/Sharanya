"use client";

import { useState } from "react";
import { techCategories } from "@/data/technologies";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? techCategories
      : techCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="stack" className="py-20 lg:py-24 bg-[rgba(12,23,43,0.35)] border-t border-b border-[rgba(145,184,227,0.12)] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
            Core Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Engineering Stack &amp; Tools
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            A focused toolkit selected for reliability, type safety, throughput, and long-term maintainability.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-dusk text-navy-deep font-semibold"
                : "glass-card-subtle text-text-secondary hover:text-text-primary hover:border-dusk/30"
            }`}
          >
            All
          </button>
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === category.id
                  ? "bg-dusk text-navy-deep font-semibold"
                  : "glass-card-subtle text-text-secondary hover:text-text-primary hover:border-dusk/30"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Alternating Directional Reveal for Category Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              // Alternating directional reveals: Left / Right
              const directionalVariant = index % 2 === 0 ? slideFromLeft : slideFromRight;

              return (
                <motion.div
                  key={category.id}
                  layout
                  variants={directionalVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={index * 0.5}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl glass-card p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(145,184,227,0.12)]">
                      <h3 className="text-sm font-semibold text-text-primary">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-text-muted">
                        {category.items.length} tools
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary mb-5 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Staggered Technology Badges */}
                    <div className="space-y-2">
                      {category.items.map((tech, techIdx) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.2 + techIdx * 0.05,
                            ease: "easeOut",
                          }}
                          className="p-2.5 rounded-lg glass-card-subtle hover:border-dusk/40 hover:-translate-y-0.5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-text-primary">
                              {tech.name}
                            </span>
                            {tech.highlight && (
                              <span className="text-[10px] font-mono text-dusk">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-muted mt-0.5 truncate">
                            {tech.description}
                          </p>
                        </motion.div>
                      ))}
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
