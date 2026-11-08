"use client";

import { useState } from "react";
import { techCategories } from "@/data/technologies";
import {
  Layers,
  Atom,
  Code2,
  FileCode,
  Palette,
  Terminal,
  Zap,
  Server,
  Database,
  Flame,
  HardDrive,
  BrainCircuit,
  Cpu,
  Bot,
  Workflow,
  Smartphone,
  TabletSmartphone,
  Sparkles,
  CheckCircle,
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  Layers,
  Atom,
  Code2,
  FileCode,
  Palette,
  Terminal,
  Zap,
  Server,
  Database,
  Flame,
  HardDrive,
  BrainCircuit,
  Cpu,
  Bot,
  Workflow,
  Smartphone,
  TabletSmartphone,
};

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? techCategories
      : techCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="stack" className="py-20 lg:py-28 relative bg-[#090d15]/50 border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 02 &bull; Engineering Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Battle-Tested Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I don&apos;t chase fleeting framework fads. I select high-leverage, production-tested tools engineered for performance, strict type safety, scalable throughput, and low operational friction.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-accent-cyan text-slate-950 font-semibold shadow-cyan-glow"
                : "bg-surface-card border border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            All Disciplines
          </button>
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === category.id
                  ? "bg-accent-cyan text-slate-950 font-semibold shadow-cyan-glow"
                : "bg-surface-card border border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`rounded-2xl bg-surface-card/80 border border-white/[0.08] p-6 hover:border-accent-cyan/40 hover:shadow-card transition-all duration-300 flex flex-col justify-between group ${
                category.id === "ai" || category.id === "frontend"
                  ? "md:col-span-1 lg:col-span-1"
                  : ""
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <h3 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {category.items.length} tools
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Tech Badges List */}
                <div className="space-y-2.5">
                  {category.items.map((tech) => {
                    const IconComponent = iconMap[tech.iconName] || Code2;
                    return (
                      <div
                        key={tech.name}
                        className="p-2.5 rounded-xl bg-dusk/50 hover:bg-dusk/90 border border-white/[0.06] hover:border-accent-cyan/30 transition-all flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center shrink-0 text-accent-cyan">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-200">
                              {tech.name}
                            </span>
                            {tech.highlight && (
                              <span className="text-[10px] font-mono text-accent-cyan bg-accent-cyan/10 px-1.5 py-0.5 rounded border border-accent-cyan/20">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom engineering assurance */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                <span>Production proven in active applications</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
