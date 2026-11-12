"use client";

import { useEffect, useRef, useState } from "react";
import type { TestimonialItem, VerifiedMilestone } from "@/data/testimonials";
import {
  motion,
  useInView,
  animate,
  useReducedMotion,
} from "framer-motion";
import {
  fadeUp,
  lineReveal,
  slideFromLeft,
  slideFromRight,
} from "@/lib/animations";

interface TestimonialsProps {
  milestones: VerifiedMilestone[];
  items: TestimonialItem[];
}

function CountUpMetric({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? target : 0
  );

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, target, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function Testimonials({ milestones, items }: TestimonialsProps) {
  const hasRealTestimonials = items.length > 0;

  return (
    <section
      id="results"
      className="py-10 sm:py-12 lg:py-14 bg-transparent relative z-10"
    >
      <div className="editorial-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-8 lg:mb-10 space-y-2.5"
        >
          <p className="text-xs sm:text-[0.8125rem] font-mono uppercase tracking-[0.2em] text-secondary font-medium">
            05 — Standards &amp; Reliability
          </p>
          <motion.h2
            variants={lineReveal}
            className="text-[2rem] sm:text-[2.6rem] lg:text-[clamp(2.6rem,4vw,3.75rem)] font-heading font-bold tracking-[-0.02em] text-heading leading-[1.1]"
          >
            Engineering Principles &amp; Delivery Standards
          </motion.h2>
          <p className="text-base sm:text-[1.0625rem] lg:text-[1.125rem] text-body leading-[1.7] font-body">
            I prioritize clarity of communication, strict code standards, and verifiable execution over unsupported marketing claims.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {milestones.map((milestone, idx) => {
            const variant = idx % 2 === 0 ? slideFromLeft : slideFromRight;

            return (
              <motion.div
                key={milestone.label}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx * 0.25}
                className="p-6 rounded-xl noir-card flex flex-col justify-between hover:-translate-y-1 hover:border-secondary"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-secondary">
                    {milestone.category}
                  </span>
                  <div className="text-4xl font-heading font-bold text-heading mt-3 mb-1.5 tabular-nums">
                    <CountUpMetric
                      target={milestone.numericValue}
                      suffix={milestone.suffix}
                    />
                  </div>
                  <div className="text-sm font-heading font-semibold text-heading mb-2">
                    {milestone.label}
                  </div>
                  <p className="text-sm text-body leading-relaxed font-body">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="rounded-xl noir-card p-6 sm:p-8 mb-8"
        >
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-heading mb-6">
            Client Collaboration Principles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-secondary font-mono">
                Async &amp; Transparent
              </div>
              <p className="text-xs text-body leading-relaxed font-sans">
                Clear asynchronous progress updates, staging review environments, and direct Slack/Discord channels.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-secondary font-mono">
                Scope Certainty
              </div>
              <p className="text-xs text-body leading-relaxed font-sans">
                Milestone-based delivery agreements, explicit technical blueprints, and zero surprise overhead.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-secondary font-mono">
                Documented Handoffs
              </div>
              <p className="text-xs text-body leading-relaxed font-sans">
                Comprehensive setup walkthroughs, environment blueprints, and recorded architecture overviews.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-medium text-secondary font-mono">
                Full IP Ownership
              </div>
              <p className="text-xs text-body leading-relaxed font-sans">
                100% of the repository source code, assets, and deployment keys are transferred to you upon milestone sign-off.
              </p>
            </div>
          </div>
        </motion.div>

        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((t) => (
              <div key={t.id} className="p-6 rounded-xl noir-card space-y-4">
                <p className="text-xs sm:text-sm text-body leading-relaxed italic font-sans">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="pt-3 border-t border-border">
                  <div className="text-xs font-medium text-heading">
                    {t.clientName}
                  </div>
                  <div className="text-[11px] text-muted">
                    {t.designation} {t.company && `at ${t.company}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl noir-card-subtle text-center max-w-2xl mx-auto space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-secondary font-medium">
              Client References &amp; Endorsements
            </h4>
            <p className="text-xs text-body leading-relaxed font-sans">
              In adherence to strict professional ethics, no fake customer quotes or fabricated metrics are displayed. Verified client references and private technical demos are gladly shared upon mutual agreement during initial discovery calls.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
