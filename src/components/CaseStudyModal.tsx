"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ProjectCaseStudy } from "@/data/projects";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  Award,
  Sparkles,
} from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onOpenCallback: () => void;
}

export function CaseStudyModal({ project, onClose, onOpenCallback }: CaseStudyModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl bg-[#0c101a] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-accent-cyan/15 text-accent-cyan font-semibold border border-accent-cyan/30">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs font-mono hidden sm:inline">
              Technical Case Study
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-card border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          {/* Title & Short Overview */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.shortOverview}
            </p>
          </div>

          {/* Project Screenshot / Visual Banner */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-dusk">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent-cyan text-slate-950 hover:bg-accent-cyan-hover transition-colors shadow-sm"
                  >
                    <span>10. Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-card border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>11. Code Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-surface-card border border-white/[0.08]">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-accent-cyan">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* 11-Point Comprehensive Case Study Structure */}
          <div className="space-y-6 text-sm">
            {/* 1. Project Overview */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <Layers className="w-4 h-4" />
                <span>1. Project Overview</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {caseStudy.projectOverview}
              </p>
            </div>

            {/* 2. Problem Statement */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-accent-sunset font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>2. Problem Statement</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {caseStudy.problemStatement}
              </p>
            </div>

            {/* 3. Proposed Solution */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Lightbulb className="w-4 h-4" />
                <span>3. Proposed Solution</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {caseStudy.proposedSolution}
              </p>
            </div>

            {/* 4. My Role & Contributions */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4" />
                <span>4. My Role &amp; Contributions</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {caseStudy.myRole}
              </p>
            </div>

            {/* 5. Technical Architecture */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Cpu className="w-4 h-4" />
                <span>5. Technical Architecture</span>
              </div>
              <p className="text-slate-300 font-mono text-xs leading-relaxed p-3 rounded-lg bg-black/40 border border-white/5">
                {caseStudy.technicalArchitecture}
              </p>
            </div>

            {/* 6. Technology Stack */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <Layers className="w-4 h-4" />
                <span>6. Technology Stack</span>
              </div>
              <ul className="space-y-1.5">
                {caseStudy.technologyStack.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Implementation Details */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>7. Implementation Details</span>
              </div>
              <ul className="space-y-2">
                {caseStudy.implementationDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 8. Challenges & Engineering Decisions */}
            <div className="space-y-2 p-5 rounded-2xl bg-surface-card/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>8. Challenges &amp; Engineering Decisions</span>
              </div>
              <ul className="space-y-2">
                {caseStudy.challengesAndDecisions.map((item, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-black/30 border border-white/5 text-slate-300 text-xs leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 9. Results & Impact */}
            <div className="space-y-2 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4" />
                <span>9. Results &amp; Quantifiable Impact</span>
              </div>
              <ul className="space-y-2">
                {caseStudy.resultsAndImpact.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-emerald-200 text-xs leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 10 & 11. Links & Contact Trigger */}
            <div className="p-5 rounded-2xl bg-dusk/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <div className="text-xs font-mono text-slate-400">10 &bull; 11 External Verification</div>
                <div className="text-sm font-semibold text-white">Need a similar product built for your business?</div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCallback();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-accent-cyan-hover transition-colors shadow-cyan-glow"
                >
                  <span>Build With Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
