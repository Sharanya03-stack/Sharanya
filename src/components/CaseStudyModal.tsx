"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ProjectCaseStudy } from "@/data/projects";
import { X, ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onOpenCallback: () => void;
}

export function CaseStudyModal({ project, onClose, onOpenCallback }: CaseStudyModalProps) {
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

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0B1426]/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Dialog with Scale/Fade & Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-[rgba(16,29,53,0.94)] backdrop-blur-[20px] border border-[rgba(145,184,227,0.22)] rounded-2xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(145,184,227,0.14)] bg-[rgba(20,34,62,0.8)] backdrop-blur-md sticky top-0 z-20">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-dusk font-medium">
                  {project.category}
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-text-primary">
                  {project.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md glass-card-subtle text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Screenshot */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[rgba(145,184,227,0.18)] bg-[#0C172B]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Links Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl glass-card">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded glass-card-subtle text-text-secondary"
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-sunset text-white hover:bg-sunset-hover hover:-translate-y-0.5 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md glass-card-subtle text-text-primary hover:border-dusk/40 hover:-translate-y-0.5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 11 Case Study Points */}
              <div className="space-y-6 text-sm">
                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    1. Project Overview
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {project.caseStudy.projectOverview}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    2. Problem Statement
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {project.caseStudy.problemStatement}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    3. Proposed Solution
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {project.caseStudy.proposedSolution}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    4. Role &amp; Contributions
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {project.caseStudy.myRole}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    5. Technical Architecture
                  </div>
                  <p className="text-text-secondary font-mono text-xs leading-relaxed p-3 rounded-lg glass-card-subtle">
                    {project.caseStudy.technicalArchitecture}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    6. Technology Stack
                  </div>
                  <ul className="space-y-1.5">
                    {project.caseStudy.technologyStack.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-dusk mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    7. Implementation Details
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.implementationDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-xs leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-dusk mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    8. Challenges &amp; Engineering Decisions
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.challengesAndDecisions.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-lg glass-card-subtle text-text-secondary text-xs leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl glass-card">
                  <div className="text-xs font-mono uppercase tracking-wider text-dusk font-medium">
                    9. Results &amp; Impact
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.resultsAndImpact.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-xs leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-dusk mt-1.5 shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl glass-card flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-0.5">
                    <div className="text-xs font-mono text-dusk">10 &bull; 11 Verification &amp; Delivery</div>
                    <div className="text-sm font-medium text-text-primary">Interested in a similar build?</div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCallback();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 transition-all"
                  >
                    <span>Discuss Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
