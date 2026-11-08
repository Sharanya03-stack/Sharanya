"use client";

import { useState } from "react";
import { techCategories } from "@/data/technologies";
import { motion, AnimatePresence } from "framer-motion";

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? techCategories
      : techCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="stack" className="py-20 lg:py-24 bg-[#0C172B]/90 backdrop-blur-sm border-t border-b border-[#1E335B] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-dusk text-navy-deep font-semibold"
                : "bg-[#14223E] text-text-secondary hover:text-text-primary border border-[#1E335B] hover:border-dusk/30"
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
                  : "bg-[#14223E] text-text-secondary hover:text-text-primary border border-[#1E335B] hover:border-dusk/30"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="rounded-xl bg-[#14223E]/90 backdrop-blur-sm border border-[#1E335B] p-6 hover:border-dusk/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E335B]">
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

                  {/* Technology Badges */}
                  <div className="space-y-2">
                    {category.items.map((tech) => (
                      <div
                        key={tech.name}
                        className="p-2.5 rounded-lg bg-[#101D35]/80 border border-[#1E335B]/70 hover:border-dusk/30 hover:bg-[#101D35] transition-all"
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
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
