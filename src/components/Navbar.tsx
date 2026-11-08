"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  onOpenCallback: () => void;
}

export function Navbar({ onOpenCallback }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Stack", href: "#stack", id: "stack" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Case Studies", href: "#projects", id: "projects" },
    { name: "Results", href: "#results", id: "results" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(16,29,53,0.88)] backdrop-blur-[16px] border-b border-[rgba(145,184,227,0.14)] py-3.5 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand: Plain, Elegant Typography "Sharanya N" */}
          <Link
            href="#hero"
            className="text-text-primary hover:text-dusk font-medium tracking-tight text-base sm:text-lg transition-colors"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-xs tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-dusk font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-dusk"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Understated "Let's Talk" Button with subtle glass styling */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onOpenCallback}
              className="px-4 py-2 rounded-lg text-xs font-medium text-text-primary glass-card-subtle hover:border-dusk/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={onOpenCallback}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-text-primary glass-card-subtle"
            >
              Let&apos;s Talk
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-text-secondary hover:text-text-primary"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[rgba(16,29,53,0.96)] backdrop-blur-[20px] border-b border-[rgba(145,184,227,0.16)] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === link.id
                  ? "text-dusk font-medium bg-[rgba(20,34,62,0.8)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-[rgba(20,34,62,0.4)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[rgba(145,184,227,0.14)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full py-2.5 rounded-lg text-center text-xs font-medium text-text-primary glass-card hover:border-dusk/40"
            >
              Initiate Project Inquiry
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
