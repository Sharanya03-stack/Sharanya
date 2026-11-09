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
    { name: "About", href: "#about", id: "about" },
    { name: "Stack", href: "#stack", id: "stack" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Projects", href: "#projects", id: "projects" },
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
          ? "bg-[#101114]/90 backdrop-blur-[18px] border-b border-white/10 py-3 shadow-md"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand: Plain, Elegant Typography "Sharanya N" */}
          <Link
            href="#hero"
            className="text-white hover:text-lightgrey font-medium tracking-tight text-base sm:text-lg transition-colors font-heading"
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
                  className={`text-xs tracking-wider transition-colors relative py-1 uppercase font-mono ${
                    isActive
                      ? "text-white font-medium"
                      : "text-mediumgrey hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
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
              className="px-4 py-2 rounded-lg text-xs font-medium text-white glass-card-subtle hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={onOpenCallback}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-white glass-card-subtle"
            >
              Let&apos;s Talk
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-lightgrey hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#101114]/95 backdrop-blur-[20px] border-b border-white/15 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === link.id
                  ? "text-white font-medium bg-white/10"
                  : "text-mediumgrey hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallback();
              }}
              className="w-full py-2.5 rounded-lg text-center text-xs font-medium text-white bg-sunset hover:bg-sunset-hover"
            >
              Initiate Project Inquiry
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
