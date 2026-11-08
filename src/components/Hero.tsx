"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";

interface HeroProps {
  onOpenCallback: () => void;
}

export function Hero({ onOpenCallback }: HeroProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Background Radial Glow & Sub-grid */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-accent-sunset/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dusk/70 border border-border-subtle backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                {siteConfig.availability}
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent-cyan/15 text-accent-cyan font-semibold border border-accent-cyan/30">
                Q1 / Q2 Intake
              </span>
            </div>

            {/* Developer Identity & Designation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-accent-cyan font-semibold">
                  Engineering & Product Delivery
                </span>
                <span className="w-8 h-[1px] bg-accent-cyan/40" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                I build digital products that turn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-teal-300 to-sky-400">
                  complex business ideas
                </span>{" "}
                into scalable solutions.
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {siteConfig.supportingCopy}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-1">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                <span>Production-Ready Code</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                <span>Modern AI & RAG Systems</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                <span>On-Time Milestone Delivery</span>
              </div>
            </div>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenCallback}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-accent-cyan hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan-glow hover:shadow-cyan-glow-lg active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-surface-card hover:bg-surface-card-hover border border-white/10 hover:border-accent-cyan/30 transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-accent-cyan" />
                <span>Explore My Work</span>
              </Link>
            </div>

            {/* Trust Indicator / Stat Badges */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 sm:gap-8">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  TypeScript Rigor
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-accent-cyan">Sub-45s</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  AI Triage Latency
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">99+</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Core Web Vitals
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configurable Portrait & Architectural Bento Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-accent-cyan/20 via-transparent to-accent-sunset/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Main Card Container */}
              <div className="relative rounded-3xl bg-surface-card border border-white/[0.12] p-5 backdrop-blur-xl shadow-2xl">
                {/* Visual Header / Terminal Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>sharanya@runtime:~</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>LIVE</span>
                  </div>
                </div>

                {/* Portrait Visual Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-dusk/90 border border-white/[0.08] flex items-center justify-center">
                  {!photoError && siteConfig.photo.src ? (
                    <Image
                      src={siteConfig.photo.src}
                      alt={siteConfig.photo.alt}
                      fill
                      className="object-cover object-center filter contrast-105"
                      onError={() => setPhotoError(true)}
                      priority
                    />
                  ) : (
                    /* Configurable Architectural Avatar / Visual Identity fallback */
                    <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-surface-card to-midnight">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-dusk border border-accent-cyan/30 flex items-center justify-center text-accent-cyan shadow-cyan-glow">
                          <Code2 className="w-7 h-7" />
                        </div>
                        <span className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                          Senior Freelance
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                          {siteConfig.name}
                          <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <p className="text-xs font-mono text-slate-400">
                          {siteConfig.role}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Ready for Deployment
                        </span>
                        <span>{siteConfig.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Configurable photo hint pill for user */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
                    <span className="flex items-center gap-1.5 text-accent-cyan">
                      <Zap className="w-3 h-3" />
                      <span>Full-Stack &amp; AI Engineer</span>
                    </span>
                    <span className="text-slate-400">Bengaluru &bull; Global</span>
                  </div>
                </div>

                {/* Floating Architectural Telemetry Badges */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-dusk/60 border border-white/[0.08] space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">Core Architecture</div>
                    <div className="font-semibold text-slate-200">Next.js &bull; FastAPI &bull; Supabase</div>
                  </div>
                  <div className="p-3 rounded-xl bg-dusk/60 border border-white/[0.08] space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">Specialization</div>
                    <div className="font-semibold text-accent-cyan">AI Agents &bull; B2B SaaS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
