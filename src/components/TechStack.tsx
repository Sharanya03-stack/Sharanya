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
    <section id="stack" className="py-14 lg:py-18 bg-charcoal/40 border-t border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-10 space-y-2"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-lightgrey font-medium">
            Core Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            Engineering Stack &amp; Tools
          </h2>
          <p className="text-sm text-lightgrey leading-relaxed font-body">
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
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-white text-background font-semibold"
                : "glass-card-subtle text-lightgrey hover:text-white hover:border-white/20"
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
                  ? "bg-white text-background font-semibold"
                  : "glass-card-subtle text-lightgrey hover:text-white hover:border-white/20"
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
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                      <h3 className="text-sm font-semibold text-white">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-mediumgrey">
                        {category.items.length} tools
                      </span>
                    </div>

                    <p className="text-xs text-lightgrey mb-5 leading-relaxed">
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
                          className="p-2.5 rounded-lg glass-card-subtle hover:border-white/20 hover:-translate-y-0.5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-white">
                              {tech.name}
                            </span>
                            {tech.highlight && (
                              <span className="text-[10px] font-mono text-lightgrey border border-white/15 px-1.5 py-0.2 rounded">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-mediumgrey mt-0.5 truncate">
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
