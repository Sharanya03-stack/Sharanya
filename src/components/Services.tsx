"use client";

import { services } from "@/data/services";
import {
  Globe,
  Sparkles,
  ServerCog,
  Layout,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Sparkles,
  ServerCog,
  Layout,
  Smartphone,
};

interface ServicesProps {
  onOpenCallback: () => void;
}

export function Services({ onOpenCallback }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 03 &bull; Client Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            High-Impact Freelance Engineering Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I partner directly with founders, growing businesses, and engineering leaders to design, build, and deploy reliable digital products that drive quantifiable commercial outcomes.
          </p>
        </div>

        {/* Bento Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            const isFeatured = index === 0 || index === 1;

            return (
              <div
                key={service.id}
                className={`rounded-2xl bg-surface-card border border-white/[0.08] p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300 hover:border-accent-cyan/40 hover:-translate-y-1 hover:shadow-card relative overflow-hidden ${
                  isFeatured ? "md:col-span-1 lg:col-span-1" : ""
                }`}
              >
                {/* Subtle top border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-dusk border border-white/10 flex items-center justify-center text-accent-cyan group-hover:shadow-cyan-glow group-hover:border-accent-cyan/50 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-accent-cyan/80">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Business Problem Solved Banner */}
                  <div className="p-3 rounded-xl bg-dusk/60 border border-white/[0.06] mb-5 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-accent-sunset shrink-0" />
                      <span>Business Problem Solved</span>
                    </div>
                    <p className="text-slate-400 leading-snug">
                      {service.businessProblem}
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Key Capabilities
                    </div>
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan mt-0.5 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables snippet */}
                  <div className="pt-4 border-t border-white/[0.06] mb-6 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <PackageCheck className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>Standard Deliverables:</span>
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                      {service.deliverables.slice(0, 2).map((del) => (
                        <li key={del} className="truncate">{del}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action CTA */}
                <button
                  onClick={onOpenCallback}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-dusk hover:bg-accent-cyan hover:text-slate-950 border border-white/10 hover:border-accent-cyan transition-all duration-200 group/btn"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
