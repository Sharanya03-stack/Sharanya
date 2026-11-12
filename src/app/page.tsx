import { PortfolioShell } from "@/components/PortfolioShell";
import { NetworkSphere } from "@/components/NetworkSphere";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { techCategories } from "@/data/technologies";
import { services } from "@/data/services";
import { projects, projectCategories } from "@/data/projects";
import { testimonials, verifiedMilestones } from "@/data/testimonials";

export default function Home() {
  return (
    <PortfolioShell>
      <main className="relative min-h-screen bg-background text-body">
        <NetworkSphere />
        <Navbar />
        <Hero />
        <About />
        <TechStack categories={techCategories} />
        <Services items={services} />
        <Projects items={projects} categories={projectCategories} />
        <Testimonials milestones={verifiedMilestones} items={testimonials} />
        <Contact />
        <Footer />
      </main>
    </PortfolioShell>
  );
}
