"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ProjectCaseStudy } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { fadeUp, imageClipReveal, lineReveal } from "@/lib/animations";
import { usePortfolioUI } from "@/components/PortfolioShell";

interface ProjectsProps {
  items: ProjectCaseStudy[];
  categories: readonly string[];
}

interface ProjectCardProps {
  project: ProjectCaseStudy;
  index: number;
  onSelect: (project: ProjectCaseStudy) => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, active: false });

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const enableTilt = canHover && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rawRotateX.set((0.5 - py) * 3.2);
    rawRotateY.set((px - 0.5) * 3.2);
    setGlarePos({ x: px * 100, y: py * 100, active: true });
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setGlarePos((prev) => ({ ...prev, active: false }));
  };

  const projectGithubUrl =
    project.githubUrl?.trim() ||
    project.caseStudy?.githubRepositoryUrl?.trim() ||
    "";
  const projectLiveUrl =
    project.liveUrl?.trim() || project.caseStudy?.liveDemoUrl?.trim() || "";

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl noir-card overflow-hidden hover:border-secondary hover:-translate-y-1 flex flex-col justify-between group"
    >
      {enableTilt && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glarePos.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${glarePos.x}% ${glarePos.y}%, color-mix(in srgb, var(--secondary) 12%, transparent), transparent 65%)`,
          }}
        />
      )}

      <div>
        <motion.div
          layoutId={`project-image-${project.id}`}
          variants={imageClipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index * 0.4}
          onClick={() => onSelect(project)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle border-b border-border cursor-pointer"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />

          <div className="absolute top-3 left-3 z-10">
            <span
              style={{ backgroundColor: "var(--badge-bg)" }}
              className="text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded border border-border text-secondary"
            >
              {project.category}
            </span>
          </div>

          <div className="hidden md:flex absolute bottom-3 right-3 z-10 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <span
              style={{ backgroundColor: "var(--badge-bg)" }}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-border text-heading"
            >
              Inspect Architecture
            </span>
          </div>
        </motion.div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              custom={0.1}
              onClick={() => onSelect(project)}
              role="button"
              tabIndex={0}
              aria-label={`Read ${project.name} case study`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(project);
                }
              }}
              className="text-xl sm:text-2xl font-serif font-normal text-heading group-hover:text-accent transition-colors cursor-pointer leading-snug"
            >
              {project.name}
            </motion.h3>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              custom={0.2}
              className="text-xs sm:text-sm text-body leading-[1.65] font-sans"
            >
              {project.shortOverview}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border-subtle text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Preserved Footer: Strictly GitHub Repository & Live Project side by side */}
      {Boolean(projectGithubUrl || projectLiveUrl) && (
        <div className="px-6 py-2.5 sm:py-3.5 border-t border-border bg-surface-subtle flex flex-wrap items-center gap-x-6 gap-y-1 mt-auto relative z-30">
          {projectGithubUrl ? (
            <a
              href={projectGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-body hover:text-heading transition-colors duration-200 group/link min-h-[44px] sm:min-h-0 py-2 sm:py-1"
            >
              <Github className="w-3.5 h-3.5 text-muted group-hover/link:text-secondary transition-colors" />
              <span>GitHub Repository</span>
            </a>
          ) : null}

          {projectLiveUrl ? (
            <a
              href={projectLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-body hover:text-heading transition-colors duration-200 group/link min-h-[44px] sm:min-h-0 py-2 sm:py-1"
            >
              <span>Live Project</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted group-hover/link:text-accent transition-colors" />
            </a>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}

export function Projects({ items, categories }: ProjectsProps) {
  const { selectProject } = usePortfolioUI();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? items
      : items.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-10 sm:py-12 lg:py-14 bg-surface-subtle border-t border-b border-border relative z-10"
    >
      <div className="editorial-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-8 lg:mb-10 space-y-2.5"
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-secondary">
            04 — Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-heading">
            Featured Case Studies
          </h2>
          <p className="text-sm sm:text-base text-body leading-relaxed font-sans">
            Real production systems, applications, and web platforms built for real-world operations and user adoption.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-border"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === "All"
                ? items.length
                : items.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 min-h-[44px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-pill-bg text-pill-fg font-medium"
                    : "bg-surface border border-border text-muted hover:text-heading hover:border-border-hover"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-pill-fg/75" : "text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={selectProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
