"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[rgba(11,26,46,0.85)] backdrop-blur-md border-t border-[rgba(79,195,247,0.16)] text-text-secondary text-xs relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[rgba(79,195,247,0.12)]">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-base font-semibold text-text-primary tracking-tight">
              {siteConfig.name}
            </div>

            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-sm">
              {siteConfig.headline}
            </p>

            <div className="flex items-center gap-2 text-skyblue text-xs font-mono pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{siteConfig.availability}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-text-primary font-medium">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="hover:text-skyblue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-skyblue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#stack" className="hover:text-skyblue transition-colors">
                  Stack
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-skyblue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-skyblue transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#results" className="hover:text-skyblue transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-skyblue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-text-primary font-medium">
              Direct Inquiries
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Available for full-stack contracts, technical product architecture, and AI-enabled software development.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="hover:text-dusk transition-colors"
              >
                Email
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dusk transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dusk transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-[11px] text-text-muted font-mono">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md glass-card-subtle text-text-secondary hover:text-text-primary text-xs hover:-translate-y-0.5 transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
