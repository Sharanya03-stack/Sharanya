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

export function CaseStudyModal({
  project,
  onClose,
  onOpenCallback,
}: CaseStudyModalProps) {
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

  const projectGithubUrl =
    project?.githubUrl?.trim() ||
    project?.caseStudy?.githubRepositoryUrl?.trim() ||
    "";
  const projectLiveUrl =
    project?.liveUrl?.trim() || project?.caseStudy?.liveDemoUrl?.trim() || "";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ backgroundColor: "var(--scrim)" }}
            className="fixed inset-0 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-card-${project.id}`}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl bg-surface border border-border rounded-2xl shadow-noir overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-subtle sticky top-0 z-20">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-medium">
                  {project.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-semibold text-heading">
                  {project.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md bg-surface border border-border text-body hover:text-heading hover:border-border-hover transition-colors cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="p-5 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto space-y-8"
            >
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-border bg-surface-subtle"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </motion.div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-subtle border border-border">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border-subtle text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(projectLiveUrl || projectGithubUrl) && (
                  <div className="flex items-center gap-4">
                    {projectGithubUrl && (
                      <a
                        href={projectGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-body hover:text-heading transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-secondary" />
                        <span>GitHub Repository</span>
                      </a>
                    )}
                    {projectLiveUrl && (
                      <a
                        href={projectLiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
                      >
                        <span>Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-5 text-sm">
                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    1. Project Overview
                  </div>
                  <p className="text-body leading-relaxed">
                    {project.caseStudy.projectOverview}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    2. Problem Statement
                  </div>
                  <p className="text-body leading-relaxed">
                    {project.caseStudy.problemStatement}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    3. Proposed Solution
                  </div>
                  <p className="text-body leading-relaxed">
                    {project.caseStudy.proposedSolution}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    4. Role &amp; Contributions
                  </div>
                  <p className="text-body leading-relaxed">
                    {project.caseStudy.myRole}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    5. Technical Architecture
                  </div>
                  <p className="text-body font-mono text-xs leading-relaxed p-3 rounded-lg bg-background border border-border-subtle">
                    {project.caseStudy.technicalArchitecture}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    6. Technology Stack
                  </div>
                  <ul className="space-y-1.5">
                    {project.caseStudy.technologyStack.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-body text-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    7. Implementation Details
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.implementationDetails.map(
                      (detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-body text-xs leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    8. Challenges &amp; Engineering Decisions
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.challengesAndDecisions.map(
                      (item, idx) => (
                        <li
                          key={idx}
                          className="p-3 rounded-lg bg-background border border-border-subtle text-body text-xs leading-relaxed"
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="space-y-2 p-5 rounded-xl bg-surface-subtle border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-secondary">
                    9. Results &amp; Impact
                  </div>
                  <ul className="space-y-2">
                    {project.caseStudy.resultsAndImpact.map((result, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-body text-xs leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-surface-subtle border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-0.5">
                    <div className="text-xs font-mono text-muted">
                      10 &bull; 11 Verification &amp; Delivery
                    </div>
                    <div className="text-sm font-medium text-heading">
                      Interested in a similar build?
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCallback();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-medium text-accent-fg bg-accent hover:bg-accent-hover transition-colors cursor-pointer"
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
