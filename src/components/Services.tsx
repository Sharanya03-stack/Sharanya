"use client";

import { useRef, useState, useEffect } from "react";
import { services } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface ServicesProps {
  onOpenCallback: () => void;
}

export function Services({ onOpenCallback }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map 0 -> 1 into active card 0 -> 4
      const nextIndex = Math.min(4, Math.floor(latest * 5.2));
      setActiveCardIndex(nextIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Subtle background variations between cards: Charcoal, Soft Black, Graphite
  const getCardSurfaceClass = (index: number) => {
    switch (index % 3) {
      case 0:
        return "bg-[#191A1E]/85 border-white/12";
      case 1:
        return "bg-[#141518]/90 border-white/10";
      case 2:
      default:
        return "bg-[#22242B]/80 border-white/15";
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-transparent py-16 lg:py-24 z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout: Muse Group-inspired Sticky Chapter Rhythm */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start relative min-h-[220vh]">
          {/* Pinned Left Editorial Column */}
          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-subtle"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-lightgrey font-medium">
                Disciplines &amp; Services
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading leading-tight">
              Strategic execution for modern software products.
            </h2>

            <p className="text-sm text-lightgrey leading-relaxed font-body max-w-sm">
              I partner directly with founders and product teams to architect resilient systems, accelerate launch cycles, and solve engineering bottlenecks.
            </p>

            {/* Chapter Stepper Indicator */}
            <div className="pt-4 space-y-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-mediumgrey">
                Active Chapter
              </span>
              <div className="flex items-center gap-2">
                {services.map((service, idx) => (
                  <div
                    key={service.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? "w-8 bg-white"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
                <span className="text-xs font-mono text-lightgrey pl-2">
                  0{activeCardIndex + 1} / 0{services.length}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenCallback}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-sunset/20"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sequential Right Cards Stack */}
          <div className="lg:col-span-7 space-y-12 pb-24">
            {services.map((service, index) => {
              const isActive = activeCardIndex === index;

              return (
                <div
                  key={service.id}
                  className={`p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 shadow-2xl ${getCardSurfaceClass(
                    index
                  )} ${
                    isActive
                      ? "ring-1 ring-white/30 scale-[1.01]"
                      : "opacity-80 scale-[0.99]"
                  }`}
                >
                  {/* Service Number & Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <span className="text-sm font-mono tracking-widest text-white/50 font-medium">
                      CHAPTER {service.number}
                    </span>
                    <span className="text-xs font-mono text-mediumgrey uppercase tracking-wider">
                      {service.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-heading">
                    {service.title}
                  </h3>

                  {/* 1 Concise Sentence Explaining Value */}
                  <p className="text-sm text-lightgrey leading-relaxed font-body mb-6">
                    {service.value}
                  </p>

                  {/* 3 Short Capabilities */}
                  <div className="space-y-2.5 mb-8 pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-mediumgrey">
                      Key Capabilities
                    </div>
                    {service.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-2.5 text-xs text-lightgrey"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="pt-2 border-t border-white/8 flex items-center justify-between">
                    <button
                      onClick={onOpenCallback}
                      className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-lightgrey transition-colors group"
                    >
                      <span>Discuss a Project</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[11px] font-mono text-mediumgrey">
                      Ready to build
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Layout: Natural Sequential Vertical Scroll */}
        <div className="lg:hidden space-y-8">
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-lightgrey font-medium">
                Disciplines &amp; Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
              Strategic execution for modern software.
            </h2>
            <p className="text-sm text-lightgrey leading-relaxed font-body">
              I partner directly with founders to architect scalable systems and ship polished digital products.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`p-6 rounded-2xl glass-card ${getCardSurfaceClass(index)}`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-mediumgrey font-medium">
                    {service.number}
                  </span>
                  <span className="text-[11px] font-mono text-mediumgrey uppercase">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-heading">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-lightgrey mb-4 leading-relaxed font-body">
                  {service.value}
                </p>

                <div className="space-y-2 mb-6">
                  {service.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-lightgrey">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/70 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onOpenCallback}
                  className="w-full py-2.5 px-3.5 rounded-lg text-xs font-medium text-white glass-card-subtle hover:border-white/30 text-center flex items-center justify-center gap-1.5"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
