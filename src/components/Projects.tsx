"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, projectCategories, ProjectCaseStudy } from "@/data/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

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

  const getProjectDirectionVariant = (index: number) => {
    switch (index % 4) {
      case 0:
        return slideFromLeft;
      case 1:
        return slideFromRight;
      case 2:
        return fadeUp;
      case 3:
      default:
        return slideFromLeft;
    }
  };

  return (
    <section id="projects" className="py-14 lg:py-18 bg-charcoal/30 border-t border-b border-white/10 relative z-10">
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
            Selected Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            Featured Case Studies
          </h2>
          <p className="text-sm text-lightgrey leading-relaxed font-body">
            Real production systems, applications, and web platforms built for real-world operations and user adoption.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="flex flex-wrap items-center gap-2 mb-8"
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
                    ? "bg-white text-background font-semibold"
                    : "glass-card-subtle text-lightgrey hover:text-white hover:border-white/20"
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] font-mono ${isSelected ? "text-background/80" : "text-mediumgrey"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Balanced Editorial Projects Grid with Alternating Directional Reveals */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const directionalVariant = getProjectDirectionVariant(index);

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={directionalVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={index * 0.4}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-2xl glass-card overflow-hidden hover:-translate-y-1.5 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Large, High-Quality Project Screenshot */}
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal/80 cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-medium px-2 py-0.5 rounded glass-card-subtle text-lightgrey">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3
                          onClick={() => onSelectProject(project)}
                          className="text-lg font-semibold text-white group-hover:text-lightgrey transition-colors cursor-pointer leading-snug font-heading"
                        >
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-lightgrey mt-2 leading-relaxed font-body">
                          {project.shortOverview}
                        </p>
                      </div>

                      {/* Clean text-based technology labels */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded glass-card-subtle text-lightgrey"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-6 py-4 border-t border-white/10 bg-charcoal/40 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-lightgrey transition-colors group/btn"
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
                          className="text-xs text-lightgrey hover:text-white inline-flex items-center gap-1 transition-colors hover:-translate-y-0.5"
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
                          className="text-xs text-lightgrey hover:text-white inline-flex items-center gap-1 transition-colors hover:-translate-y-0.5"
                        >
                          <span>Code</span>
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
