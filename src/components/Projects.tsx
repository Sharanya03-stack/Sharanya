"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, projectCategories, ProjectCaseStudy } from "@/data/projects";
import {
  ExternalLink,
  Github,
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";

interface ProjectsProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
  onOpenCallback: () => void;
}

export function Projects({ onSelectProject, onOpenCallback }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#090c14]/40 border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 04 &bull; Selected Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Proven Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Real production architectures delivering real business impact. Explore the problem statements, architectural tradeoffs, and verified engineering metrics behind each engagement.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {projectCategories.map((category) => {
            const count =
              category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent-cyan text-slate-950 font-semibold shadow-cyan-glow"
                    : "bg-surface-card border border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    selectedCategory === category
                      ? "bg-slate-950/30 text-slate-900 font-bold"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-surface-card border border-white/[0.08] hover:border-accent-cyan/40 hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Showcase */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-dusk cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131a29] via-transparent to-transparent opacity-80" />

                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-accent-cyan">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover "Read Case Study" overlay cue */}
                  <div className="absolute inset-0 bg-accent-cyan/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-semibold border border-white/20 shadow-lg">
                      <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>View Full Case Study</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {project.name}
                  </h3>

                  {/* Short Overview */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {project.shortOverview}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-dusk/60 border border-white/[0.06] text-center">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xs font-bold font-mono text-accent-cyan">
                          {m.value}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tight mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:text-accent-cyan-hover transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner below projects */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-surface-card via-dusk to-surface-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Layers className="w-5 h-5 text-accent-cyan" />
              <span>Looking for a tailored engineering architecture?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Whether you need an AI agent workflow, an enterprise SaaS dashboard, or a high-converting web storefront, let&apos;s map out your specifications.
            </p>
          </div>
          <button
            onClick={onOpenCallback}
            className="shrink-0 px-5 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan-glow flex items-center gap-2"
          >
            <span>Request Project Scoping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
