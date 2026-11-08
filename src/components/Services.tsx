"use client";

import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

interface ServicesProps {
  onOpenCallback: () => void;
}

export function Services({ onOpenCallback }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-24 bg-[#101D35]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
            Freelance Services
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            How I Help Clients Build &amp; Scale
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            I partner directly with founders and teams to solve technical bottlenecks, architect scalable systems, and ship polished digital products.
          </p>
        </div>

        {/* Clean Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl bg-[#14223E] border border-[#1E335B] p-6 flex flex-col justify-between hover:border-dusk/40 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-text-primary mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-dusk font-mono">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Problem Solved */}
                <div className="p-3 rounded-lg bg-[#101D35] border border-[#1E335B]/70 mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1">
                    Problem Solved
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {service.businessProblem}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-2">
                    Key Capabilities
                  </div>
                  {service.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-1 h-1 rounded-full bg-dusk mt-1.5 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onOpenCallback}
                className="w-full inline-flex items-center justify-between py-2.5 px-3.5 rounded-lg text-xs font-medium text-text-primary bg-[#101D35] hover:bg-[#162646] border border-[#1E335B] hover:border-dusk/40 transition-colors group"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-dusk transition-colors" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
