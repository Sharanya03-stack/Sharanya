"use client";

import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

interface ServicesProps {
  onOpenCallback: () => void;
}

export function Services({ onOpenCallback }: ServicesProps) {
  // Directional mapping as strictly specified:
  // 1: Left, 2: Right, 3: Bottom (fadeUp), 4: Left, 5: Right
  const getDirectionalVariant = (index: number) => {
    switch (index) {
      case 0:
        return slideFromLeft;
      case 1:
        return slideFromRight;
      case 2:
        return fadeUp;
      case 3:
        return slideFromLeft;
      case 4:
      default:
        return slideFromRight;
    }
  };

  return (
    <section id="services" className="py-14 lg:py-18 bg-transparent relative z-10">
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
            Freelance Services
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            How I Help Clients Build &amp; Scale
          </h2>
          <p className="text-sm text-lightgrey leading-relaxed font-body">
            I partner directly with founders and teams to solve technical bottlenecks, architect scalable systems, and ship polished digital products.
          </p>
        </motion.div>

        {/* Services Cards with Alternating Directional Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const variant = getDirectionalVariant(index);

            return (
              <motion.div
                key={service.id}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={index * 0.4}
                className="rounded-xl glass-card p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/25 transition-all duration-300 group"
              >
                <div>
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-lightgrey transition-colors font-heading">
                      {service.title}
                    </h3>
                    <p className="text-xs text-mediumgrey font-mono">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-lightgrey mb-5 leading-relaxed font-body">
                    {service.description}
                  </p>

                  {/* Problem Solved */}
                  <div className="p-3 rounded-lg glass-card-subtle mb-5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-mediumgrey mb-1">
                      Problem Solved
                    </div>
                    <p className="text-xs text-lightgrey leading-relaxed font-body">
                      {service.businessProblem}
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-mediumgrey mb-2">
                      Key Capabilities
                    </div>
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2 text-xs text-lightgrey">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={onOpenCallback}
                  className="w-full inline-flex items-center justify-between py-2.5 px-3.5 rounded-lg text-xs font-medium text-white glass-card-subtle hover:border-white/30 hover:bg-white/10 active:scale-[0.99] transition-all group/btn"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-mediumgrey group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
