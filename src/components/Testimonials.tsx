"use client";

import { testimonials, verifiedMilestones } from "@/data/testimonials";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

export function Testimonials() {
  const hasRealTestimonials = testimonials.length > 0;

  return (
    <section id="results" className="py-14 lg:py-18 bg-transparent relative z-10">
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
            Standards &amp; Reliability
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            Engineering Principles &amp; Delivery Standards
          </h2>
          <p className="text-sm text-lightgrey leading-relaxed font-body">
            I prioritize clarity of communication, strict code standards, and dependable project execution over unsupported marketing claims.
          </p>
        </motion.div>

        {/* Verified Milestones with Alternating Directional Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {verifiedMilestones.map((milestone, idx) => {
            const variant = idx % 2 === 0 ? slideFromLeft : slideFromRight;

            return (
              <motion.div
                key={milestone.label}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx * 0.35}
                className="p-5 rounded-xl glass-card flex flex-col justify-between hover:-translate-y-1 hover:border-white/25 transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-mediumgrey">
                    {milestone.category}
                  </span>
                  <div className="text-2xl font-bold text-white mt-2 mb-1 font-heading">
                    {milestone.value}
                  </div>
                  <div className="text-xs font-medium text-white mb-2">
                    {milestone.label}
                  </div>
                  <p className="text-xs text-lightgrey leading-relaxed font-body">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Working Approach & Collaboration Principles */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="rounded-2xl glass-card p-6 sm:p-8 mb-10"
        >
          <h3 className="text-base font-semibold text-white mb-6 font-heading">
            Client Collaboration Principles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-white font-mono">
                Async &amp; Transparent
              </div>
              <p className="text-xs text-lightgrey leading-relaxed font-body">
                Clear asynchronous progress updates, staging review environments, and direct Slack/Discord channels.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-white font-mono">
                Scope Certainty
              </div>
              <p className="text-xs text-lightgrey leading-relaxed font-body">
                Milestone-based delivery agreements, explicit technical blueprints, and zero surprise overhead.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-white font-mono">
                Documented Handoffs
              </div>
              <p className="text-xs text-lightgrey leading-relaxed font-body">
                Comprehensive setup walkthroughs, environment blueprints, and recorded architecture overviews.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-white font-mono">
                Full IP Ownership
              </div>
              <p className="text-xs text-lightgrey leading-relaxed font-body">
                100% of the repository source code, assets, and deployment keys are transferred to you upon milestone sign-off.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real Testimonials or Restrained Reference Notice */}
        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl glass-card space-y-4"
              >
                <p className="text-xs sm:text-sm text-lightgrey leading-relaxed italic font-body">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs font-medium text-white">{t.clientName}</div>
                  <div className="text-[11px] text-mediumgrey">{t.designation} {t.company && `at ${t.company}`}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl glass-card-subtle text-center max-w-xl mx-auto space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-medium">
              Client References &amp; Endorsements
            </h4>
            <p className="text-xs text-lightgrey leading-relaxed font-body">
              In adherence to strict professional ethics, no fake customer quotes or fabricated metrics are displayed. Verified client references and private technical demos are gladly shared upon mutual agreement during initial discovery calls.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
