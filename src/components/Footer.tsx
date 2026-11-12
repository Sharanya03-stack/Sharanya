import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border text-body text-xs relative z-10">
      <div className="editorial-container py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-border">
          <div className="md:col-span-5 space-y-3">
            <div className="text-2xl font-serif font-normal text-heading tracking-tight">
              {siteConfig.name}
            </div>

            <p className="text-body text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              {siteConfig.headline}
            </p>

            <div className="flex items-center gap-2 text-heading text-xs font-mono pt-1">
              <span
                style={{ color: "var(--whatsapp-link)" }}
                className="w-1.5 h-1.5 rounded-full bg-current"
              />
              <span>{siteConfig.availability}</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-secondary font-medium">
              Navigation
            </div>
            <ul className="space-y-2 text-muted">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-heading transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-heading transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#stack"
                  className="hover:text-heading transition-colors"
                >
                  Stack
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-heading transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-heading transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#results"
                  className="hover:text-heading transition-colors"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-heading transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-secondary font-medium">
              Direct Inquiries
            </div>
            <p className="text-xs text-body leading-relaxed">
              Available for full-stack contracts, technical product architecture, and AI-enabled software development.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--whatsapp-link)" }}
                className="font-medium hover:opacity-80 transition-opacity min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-muted hover:text-heading transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                Email
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors min-h-[44px] sm:min-h-0 inline-flex items-center"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-[env(safe-area-inset-bottom)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-[11px] text-muted font-mono">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </div>

          <Link
            href="#hero"
            className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 rounded-md bg-surface border border-border text-body hover:text-heading hover:border-secondary text-xs transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-secondary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
