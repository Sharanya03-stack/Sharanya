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
    <main className="relative min-h-screen bg-background text-text-primary selection:bg-dusk/20 selection:text-text-primary">
      {/* Sticky Navigation */}
      <Navbar onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Technology Stack */}
      <TechStack />

      {/* Services */}
      <Services onOpenCallback={() => setIsCallbackOpen(true)} />

      {/* Projects & Case Studies */}
      <Projects
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenCallback={() => setIsCallbackOpen(true)}
      />

      {/* Results & Principles */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Callback Drawer */}
      <CallbackDrawer
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />

      {/* Detailed Case Study Modal */}
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
