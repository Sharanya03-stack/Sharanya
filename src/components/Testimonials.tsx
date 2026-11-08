"use client";

import { testimonials, verifiedMilestones } from "@/data/testimonials";
import { CheckCircle2, ShieldCheck, Clock, FileCheck, Terminal, Lock } from "lucide-react";

export function Testimonials() {
  const hasRealTestimonials = testimonials.length > 0;

  return (
    <section id="results" className="py-20 lg:py-24 bg-[#101D35]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
            Standards &amp; Reliability
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Engineering Principles &amp; Delivery Standards
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            I prioritize clarity of communication, strict code standards, and dependable project execution over unsupported marketing claims.
          </p>
        </div>

        {/* Verified Milestones / Standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {verifiedMilestones.map((milestone) => (
            <div
              key={milestone.label}
              className="p-5 rounded-xl bg-[#14223E] border border-[#1E335B] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-dusk">
                  {milestone.category}
                </span>
                <div className="text-2xl font-semibold text-text-primary mt-2 mb-1">
                  {milestone.value}
                </div>
                <div className="text-xs font-medium text-text-primary mb-2">
                  {milestone.label}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Working Approach & Collaboration Principles */}
        <div className="rounded-2xl bg-[#14223E] border border-[#1E335B] p-6 sm:p-8 mb-12">
          <h3 className="text-base font-semibold text-text-primary mb-6">
            Client Collaboration Principles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-dusk font-mono">
                Async &amp; Transparent
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Clear asynchronous progress updates, staging review environments, and direct Slack/Discord channels.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-dusk font-mono">
                Scope Certainty
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Milestone-based delivery agreements, explicit technical blueprints, and zero surprise overhead.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-dusk font-mono">
                Documented Handoffs
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Comprehensive setup walkthroughs, environment blueprints, and recorded architecture overviews.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-dusk font-mono">
                Full IP Ownership
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                100% of the repository source code, assets, and deployment keys are transferred to you upon milestone sign-off.
              </p>
            </div>
          </div>
        </div>

        {/* Real Testimonials or Restrained Reference Notice */}
        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl bg-[#14223E] border border-[#1E335B] space-y-4"
              >
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#1E335B]">
                  <div className="text-xs font-medium text-text-primary">{t.clientName}</div>
                  <div className="text-[11px] text-text-muted">{t.designation} {t.company && `at ${t.company}`}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-[#121F38] border border-[#1E335B] text-center max-w-xl mx-auto space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
              Client References &amp; Endorsements
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              In adherence to strict professional ethics, no fake customer quotes or fabricated metrics are displayed. Verified client references and private technical demos are gladly shared upon mutual agreement during initial discovery calls.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
