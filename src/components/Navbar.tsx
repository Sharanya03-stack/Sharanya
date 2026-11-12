"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePortfolioUI } from "@/components/PortfolioShell";
import { useTheme } from "@/components/ThemeProvider";
import { MagneticButton } from "@/components/MagneticButton";

const navLinks = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "About", href: "#about", id: "about" },
  { name: "Stack", href: "#stack", id: "stack" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Results", href: "#results", id: "results" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const { openCallback } = usePortfolioUI();
  const { theme, mounted, isTransitioning, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);

    if (mobileMenuOpen) {
      setHidden(false);
      lastScrollY.current = latest;
      return;
    }

    const diff = latest - lastScrollY.current;
    if (latest <= 120) {
      setHidden(false);
    } else if (latest > 160 && diff > 6) {
      setHidden(true);
    } else if (diff < -6) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const handleSectionSpy = () => {
      if (window.scrollY <= 120) {
        setHidden(false);
      }
      const sections = navLinks.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleSectionSpy, { passive: true });
    handleSectionSpy();
    return () => window.removeEventListener("scroll", handleSectionSpy);
  }, []);

  const nextThemeLabel =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <motion.header
      initial={false}
      animate={{
        opacity: 1,
        y: hidden ? "-100%" : "0%",
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled ? "var(--header-bg)" : "transparent",
      }}
      className={`fixed top-0 left-0 right-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        scrolled
          ? "border-b border-border py-2.5 sm:py-3 shadow-noir"
          : "border-b border-transparent py-3 sm:py-4"
      }`}
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="#hero"
            className="text-heading hover:text-accent font-serif text-xl sm:text-2xl tracking-tight transition-colors shrink-0"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-[11px] tracking-[0.14em] transition-colors relative py-1.5 uppercase font-mono ${
                    isActive
                      ? "text-heading font-medium"
                      : "text-muted hover:text-heading"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Theme Toggle + Let's Talk */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={(e) => toggleTheme(e.currentTarget)}
              disabled={isTransitioning}
              aria-label={mounted ? nextThemeLabel : "Toggle color theme"}
              aria-pressed={theme === "dark"}
              title={mounted ? nextThemeLabel : "Toggle color theme"}
              className="p-2 rounded-md bg-surface border border-border text-body hover:text-heading hover:border-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer disabled:opacity-60"
            >
              {mounted && theme === "light" ? (
                <Moon className="w-4 h-4 text-heading transition-transform duration-300" />
              ) : (
                <Sun className="w-4 h-4 text-secondary transition-transform duration-300" />
              )}
            </button>

            <MagneticButton
              onClick={openCallback}
              className="px-4 py-2 rounded-md text-xs font-medium text-heading bg-surface border border-border hover:border-secondary hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
            >
              Let&apos;s Talk
            </MagneticButton>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => toggleTheme(e.currentTarget)}
              disabled={isTransitioning}
              aria-label={mounted ? nextThemeLabel : "Toggle color theme"}
              aria-pressed={theme === "dark"}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md bg-surface border border-border text-body hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {mounted && theme === "light" ? (
                <Moon className="w-4 h-4 text-heading" />
              ) : (
                <Sun className="w-4 h-4 text-secondary" />
              )}
            </button>
            <button
              onClick={openCallback}
              className="hidden min-[380px]:inline-flex items-center justify-center min-h-[44px] px-3 rounded-md text-xs font-medium text-heading bg-surface border border-border"
            >
              Let&apos;s Talk
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md text-body hover:text-heading"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="sm:hidden bg-surface border-b border-border px-5 pt-3 pb-6 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center min-h-[44px] px-3 text-sm rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-heading font-medium bg-surface-elevated border-l-2 border-accent"
                    : "text-muted hover:text-heading hover:bg-surface-subtle"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCallback();
                }}
                className="w-full min-h-[44px] py-2.5 rounded-md text-center text-xs font-medium text-accent-fg bg-accent hover:bg-accent-hover transition-colors"
              >
                Initiate Project Inquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
