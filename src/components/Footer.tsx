"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05070c] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/[0.06]">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-card border border-white/10 flex items-center justify-center">
                <span className="font-mono text-accent-cyan font-bold text-sm">S</span>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {siteConfig.name}
                <span className="font-mono text-accent-cyan text-xs ml-1 font-semibold px-1.5 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/20">
                  .dev
                </span>
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {siteConfig.headline}
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{siteConfig.availability}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="hover:text-accent-cyan transition-colors">
                  Overview &bull; Introduction
                </Link>
              </li>
              <li>
                <Link href="#stack" className="hover:text-accent-cyan transition-colors">
                  Technology Stack &bull; Architecture
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-accent-cyan transition-colors">
                  Client Services &bull; Solutions
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-accent-cyan transition-colors">
                  Selected Case Studies
                </Link>
              </li>
              <li>
                <Link href="#results" className="hover:text-accent-cyan transition-colors">
                  Verified Milestones &bull; Trust
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent-cyan transition-colors">
                  Initiate Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Direct Channels
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Open to contract engagements, technical architecture advisory, and end-to-end full-stack software delivery.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="w-9 h-9 rounded-xl bg-surface-card border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan flex items-center justify-center transition-all"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface-card border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan flex items-center justify-center transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface-card border border-white/10 hover:border-accent-cyan/40 hover:text-accent-cyan flex items-center justify-center transition-all"
                title="GitHub Repositories"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-[11px] text-slate-400 font-mono">
            &copy; {currentYear} {siteConfig.name} &bull; All engineering specifications, designs &amp; client rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10 hover:border-accent-cyan/40 text-slate-300 hover:text-white text-xs transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
