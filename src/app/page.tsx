"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CallbackDrawer } from "@/components/CallbackDrawer";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { ProjectCaseStudy } from "@/data/projects";

export default function Home() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <main className="relative min-h-screen bg-background text-slate-100 selection:bg-accent-cyan/30 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Section 1: Hero */}
      <Hero onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Section 2: Trust & Technology Stack */}
      <TechStack />

      {/* Section 3: Services Offered */}
      <Services onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Section 4: Selected Projects & Case Studies */}
      <Projects
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenCallback={() => setIsCallbackOpen(true)}
      />

      {/* Section 5: Client Testimonials & Results */}
      <Testimonials />

      {/* Section 6: Contact / Hire Me */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Global Interactive Callback Drawer */}
      <CallbackDrawer
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />

      {/* Global Detailed Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCallback={() => {
          setSelectedProject(null);
          setIsCallbackOpen(true);
        }}
      />
    </main>
  );
}
