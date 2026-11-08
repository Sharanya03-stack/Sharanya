"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, projectCategories, ProjectCaseStudy } from "@/data/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section id="projects" className="py-20 lg:py-24 bg-[#0C172B]/90 backdrop-blur-sm border-t border-b border-[#1E335B] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
            Selected Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Featured Case Studies
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Real production systems, applications, and web platforms built for real-world operations and user adoption.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {projectCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-dusk text-navy-deep font-semibold"
                    : "bg-[#14223E] text-text-secondary hover:text-text-primary border border-[#1E335B] hover:border-dusk/30"
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] font-mono ${isSelected ? "text-navy-deep/80" : "text-text-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Balanced Editorial Projects Grid with Layout Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                className="rounded-2xl bg-[#14223E]/90 backdrop-blur-sm border border-[#1E335B] overflow-hidden hover:border-dusk/40 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Large, High-Quality Project Screenshot */}
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#101D35] cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-[#101D35]/90 border border-[#1E335B] text-dusk backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-semibold text-text-primary group-hover:text-dusk transition-colors cursor-pointer leading-snug"
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                        {project.shortOverview}
                      </p>
                    </div>

                    {/* Clean text-based technology labels */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101D35] border border-[#1E335B] text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="px-6 py-4 border-t border-[#1E335B] bg-[#121F38]/90 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-dusk hover:text-dusk-hover transition-colors group/btn"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-secondary hover:text-text-primary inline-flex items-center gap-1 transition-colors hover:-translate-y-0.5"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-secondary hover:text-text-primary inline-flex items-center gap-1 transition-colors hover:-translate-y-0.5"
                      >
                        <span>Code</span>
                        <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
