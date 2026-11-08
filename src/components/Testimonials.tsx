"use client";

import { testimonials, verifiedMilestones } from "@/data/testimonials";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  FileCheck,
  Star,
  Quote,
  Lock,
} from "lucide-react";

export function Testimonials() {
  const hasRealTestimonials = testimonials.length > 0;

  return (
    <section id="results" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 05 &bull; Engineering Standards &amp; Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Verified Milestones &amp; Client Trust
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Reliability isn&apos;t claimed with vague marketing slogans—it is demonstrated through strict code standards, predictable milestone velocity, and transparent communication.
          </p>
        </div>

        {/* Verified Engineering Milestones Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {verifiedMilestones.map((milestone) => (
            <div
              key={milestone.label}
              className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] hover:border-accent-cyan/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/20">
                  {milestone.category}
                </span>
                <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-accent-cyan transition-colors" />
              </div>

              <div className="text-3xl font-extrabold font-mono text-white mb-1 group-hover:text-accent-cyan transition-colors">
                {milestone.value}
              </div>

              <h3 className="text-sm font-bold text-slate-200 mb-2">
                {milestone.label}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {/* Client Collaboration Principles Grid */}
        <div className="rounded-2xl bg-dusk/60 border border-white/[0.08] p-6 lg:p-8 mb-16">
          <div className="max-w-2xl mb-8 space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent-cyan" />
              <span>How I Work With Freelance Clients &amp; Teams</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Clear commitments that eliminate project ambiguity, budget surprises, and communication blackouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-cyan font-mono">
                <Clock className="w-4 h-4" />
                <span>Async &amp; Transparent</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Daily asynchronous standup summaries, public staging URLs, and real-time Slack/Discord communication.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-cyan font-mono">
                <FileCheck className="w-4 h-4" />
                <span>Scope Certainty</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clear milestone contracts, detailed architecture blueprints, and no unexpected hidden fee surprises.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-cyan font-mono">
                <Terminal className="w-4 h-4" />
                <span>Clean Handoffs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full documentation, setup walkthroughs, Docker configurations, and recorded deployment handoffs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-cyan font-mono">
                <Lock className="w-4 h-4" />
                <span>100% IP Ownership</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All source code, design assets, and deployment keys are strictly transferred to you upon milestone completion.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Showcase / High-Integrity Empty State */}
        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-accent-cyan/40" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{t.clientName}</div>
                    <div className="text-[11px] text-slate-400">{t.designation} {t.company && `at ${t.company}`}</div>
                  </div>
                  {t.projectAssociated && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-accent-cyan border border-white/10">
                      {t.projectAssociated}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-Integrity Empty State (Respects policy: Zero fabricated testimonials) */
          <div className="p-8 rounded-2xl bg-surface-card/60 border border-white/[0.08] text-center max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-dusk border border-white/10 mx-auto flex items-center justify-center text-accent-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Client References &amp; Endorsement Policy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In strict adherence to professional ethics, this portfolio features zero fabricated testimonials or invented customer reviews. Verified client references, private case study demonstrations, and previous collaborator introductions are available upon request during initial project scoping.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20">
                <span>Direct client references provided upon NDA &amp; discovery calls</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
