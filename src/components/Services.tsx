"use client";

import { useRef, useState, useEffect } from "react";
import type { ServiceItem } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { fadeUp, lineReveal } from "@/lib/animations";
import { usePortfolioUI } from "@/components/PortfolioShell";
import { MagneticButton } from "@/components/MagneticButton";

interface ServicesProps {
  items: ServiceItem[];
}

interface ServiceChapterCardProps {
  service: ServiceItem;
  index: number;
  onDiscuss: () => void;
}

const SURFACE_CLASSES = [
  "bg-surface border-border",
  "bg-surface-subtle border-border",
  "bg-surface-elevated border-border-hover",
];

function ServiceChapterCard({
  service,
  index,
  onDiscuss,
}: ServiceChapterCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 0.97]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.58, 1, 1, 0.68]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [16, 0, -8]
  );

  const surfaceClass = SURFACE_CLASSES[index % SURFACE_CLASSES.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y }}
      className={`p-7 lg:p-8 rounded-2xl border shadow-noir transition-colors duration-300 hover:border-secondary ${surfaceClass}`}
    >
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
        <span className="text-xs font-mono tracking-[0.2em] text-secondary font-medium">
          CHAPTER {service.number}
        </span>
        <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
          {service.tagline}
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-serif font-normal text-heading mb-3 tracking-tight">
        {service.title}
      </h3>

      <p className="text-sm text-body leading-[1.7] font-sans mb-6">
        {service.value}
      </p>

      <div className="space-y-2.5 mb-7 pt-2">
        <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted">
          Key Capabilities
        </div>
        {service.capabilities.map((cap) => (
          <div key={cap} className="flex items-center gap-2.5 text-xs text-body">
            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
            <span>{cap}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <button
          onClick={onDiscuss}
          className="inline-flex items-center gap-2 min-h-[44px] text-xs font-medium text-heading hover:text-accent transition-colors group cursor-pointer"
        >
          <span>Discuss a Project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-[11px] font-mono text-muted">
          Scoped &amp; Production-Ready
        </span>
      </div>
    </motion.div>
  );
}

export function Services({ items }: ServicesProps) {
  const { openCallback } = usePortfolioUI();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nextIndex = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(latest * (items.length + 0.2)))
      );
      setActiveCardIndex(nextIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-transparent py-10 sm:py-12 lg:py-14 z-10"
    >
      <div className="editorial-container">
        {/* Desktop Sticky Chapter Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-start relative">
          <div className="lg:col-span-5 sticky top-28 space-y-5">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-xs font-mono uppercase tracking-[0.22em] text-secondary"
            >
              03 — Disciplines &amp; Services
            </motion.p>

            <motion.h2
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal tracking-tight text-heading leading-[1.1]"
            >
              Strategic execution for modern software products.
            </motion.h2>

            <p className="text-sm text-body leading-[1.7] font-sans max-w-md">
              I partner directly with founders and product teams to architect resilient systems, accelerate launch cycles, and solve engineering bottlenecks.
            </p>

            <div className="pt-4 space-y-2.5 border-t border-border">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
                Active Chapter
              </span>
              <div className="flex items-center gap-2">
                {items.map((service, idx) => (
                  <div
                    key={service.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? "w-8 bg-accent"
                        : "w-2 bg-border-hover"
                    }`}
                  />
                ))}
                <span className="text-xs font-mono text-heading pl-2">
                  0{activeCardIndex + 1} / 0{items.length}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton
                onClick={openCallback}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-xs font-medium text-accent-fg bg-accent hover:bg-accent-hover transition-colors shadow-accent cursor-pointer"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 pb-6">
            {items.map((service, index) => (
              <ServiceChapterCard
                key={service.id}
                service={service}
                index={index}
                onDiscuss={openCallback}
              />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden space-y-6">
          <div className="space-y-2.5 mb-6">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-secondary">
              03 — Disciplines &amp; Services
            </p>
            <h2 className="text-3xl font-serif font-normal tracking-tight text-heading">
              Strategic execution for modern software.
            </h2>
            <p className="text-sm text-body leading-relaxed font-sans">
              I partner directly with founders to architect scalable systems and ship polished digital products.
            </p>
          </div>

          <div className="space-y-5">
            {items.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={index * 0.25}
                className={`p-6 rounded-xl border shadow-noir ${
                  SURFACE_CLASSES[index % SURFACE_CLASSES.length]
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                  <span className="text-xs font-mono text-secondary font-medium">
                    {service.number}
                  </span>
                  <span className="text-[11px] font-mono text-muted uppercase">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-normal text-heading mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-body mb-4 leading-relaxed font-sans">
                  {service.value}
                </p>

                <div className="space-y-2 mb-5">
                  {service.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2 text-xs text-body"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={openCallback}
                  className="w-full py-2.5 px-3.5 rounded-md text-xs font-medium text-heading bg-surface-elevated border border-border hover:border-secondary text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
