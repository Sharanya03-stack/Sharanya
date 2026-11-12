"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ProjectCaseStudy } from "@/data/projects";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CallbackDrawer } from "@/components/CallbackDrawer";
import { CaseStudyModal } from "@/components/CaseStudyModal";

interface PortfolioUIContextValue {
  openCallback: () => void;
  closeCallback: () => void;
  selectProject: (project: ProjectCaseStudy) => void;
  closeProject: () => void;
  selectedProject: ProjectCaseStudy | null;
}

const PortfolioUIContext = createContext<PortfolioUIContextValue | null>(null);

export function usePortfolioUI() {
  const ctx = useContext(PortfolioUIContext);
  if (!ctx) {
    throw new Error("usePortfolioUI must be used within PortfolioShell");
  }
  return ctx;
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const openCallback = useCallback(() => setIsCallbackOpen(true), []);
  const closeCallback = useCallback(() => setIsCallbackOpen(false), []);
  const selectProject = useCallback((project: ProjectCaseStudy) => setSelectedProject(project), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  const isOverlayOpen = isCallbackOpen || selectedProject !== null;

  return (
    <ThemeProvider>
      <PortfolioUIContext.Provider
        value={{
          openCallback,
          closeCallback,
          selectProject,
          closeProject,
          selectedProject,
        }}
      >
        <SmoothScrollProvider isModalOpen={isOverlayOpen}>
          <ScrollProgress />
          {children}
          <CallbackDrawer isOpen={isCallbackOpen} onClose={closeCallback} />
          <CaseStudyModal
            project={selectedProject}
            onClose={closeProject}
            onOpenCallback={openCallback}
          />
        </SmoothScrollProvider>
      </PortfolioUIContext.Provider>
    </ThemeProvider>
  );
}
