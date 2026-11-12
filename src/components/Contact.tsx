"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { slideFromLeft, slideFromRight, lineReveal } from "@/lib/animations";
import { MagneticButton } from "@/components/MagneticButton";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "Full-Stack Web Application",
    budget: "",
    timeline: "1 - 2 Months",
    description: "",
    hp_field: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const projectTypes = [
    "Full-Stack Web Application",
    "AI Agent & RAG Pipeline",
    "SaaS Platform / Dashboard",
    "Frontend & UI/UX Architecture",
    "Cross-Platform Mobile App",
    "Backend & API Infrastructure",
    "Other / Advisory",
  ];

  const timelineOptions = [
    "< 1 Month",
    "1 - 2 Months",
    "3+ Months",
    "Flexible",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to submit inquiry. Please try again or email directly."
        );
      }

      setStatus("success");
      setSuccessMessage(
        result.message || "Thank you. Your message has been received."
      );
      setFormData({
        fullName: "",
        email: "",
        company: "",
        projectType: "Full-Stack Web Application",
        budget: "",
        timeline: "1 - 2 Months",
        description: "",
        hp_field: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please contact via email directly."
        );
      }
    }
  };

  return (
    <section
      id="contact"
      className="py-10 sm:py-12 lg:py-14 bg-surface-subtle border-t border-border relative z-10 overflow-hidden"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-secondary">
                06 — Initiate Project
              </p>
              <motion.h2
                variants={lineReveal}
                className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-heading leading-[1.12]"
              >
                Have an idea? Let&apos;s build something meaningful.
              </motion.h2>
              <p className="text-sm text-body leading-[1.7] font-sans">
                Tell me about your product goals, timeline, and current challenges. I review every inquiry personally and respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              {/* Preserved WhatsApp Action */}
              <div className="p-4 rounded-xl noir-card space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-secondary-muted text-secondary">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      Direct WhatsApp
                    </span>
                  </div>
                  <span
                    style={{ color: "var(--whatsapp-link)" }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Quick replies
                  </span>
                </div>
                <p className="text-xs text-body">
                  Prefer a rapid discussion? Reach out on WhatsApp directly for quotes, timeline checks, and technical questions.
                </p>
                <div className="pt-1">
                  <a
                    href={siteConfig.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md text-xs font-medium text-[#F8F2E8] bg-emerald-700 hover:bg-emerald-600 transition-colors group"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Direct Email */}
              <div className="p-4 rounded-xl noir-card space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-surface-elevated border border-border text-secondary">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">
                    Direct Email
                  </span>
                </div>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="block text-sm font-medium text-heading hover:text-accent transition-colors pt-0.5 font-mono"
                >
                  {siteConfig.contactEmail}
                </a>
                <p className="text-[11px] text-muted">
                  For formal RFPs, architecture reviews, and detailed briefs.
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-2 flex items-center gap-5 text-xs">
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body hover:text-heading inline-flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                </a>

                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body hover:text-heading inline-flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-xl noir-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="hp_field"
                  value={formData.hp_field}
                  onChange={(e) =>
                    setFormData({ ...formData, hp_field: e.target.value })
                  }
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono text-body"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-body"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono text-body"
                  >
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Company or startup name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-mono text-body"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                  >
                    {projectTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-surface text-ink"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="budget"
                      className="block text-xs font-mono text-body"
                    >
                      Estimated Project Budget (Optional)
                    </label>
                    <input
                      id="budget"
                      type="text"
                      placeholder="Enter your estimated budget or write 'Let's discuss'"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="timeline"
                      className="block text-xs font-mono text-body"
                    >
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm"
                    >
                      {timelineOptions.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-surface text-ink"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="description"
                    className="block text-xs font-mono text-body"
                  >
                    Project Scope &amp; Objectives *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    placeholder="Tell me about what you are building, the problem to solve, and your current stage..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md noir-input text-xs sm:text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <div
                    style={{
                      backgroundColor: "var(--status-error-bg)",
                      borderColor: "var(--status-error-border)",
                      color: "var(--status-error-fg)",
                    }}
                    className="p-3 rounded-md border text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div
                    style={{
                      backgroundColor: "var(--status-success-bg)",
                      borderColor: "var(--status-success-border)",
                      color: "var(--status-success-fg)",
                    }}
                    className="p-3.5 rounded-md border text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={status === "submitting"}
                  wrapperClassName="w-full block"
                  className="w-full py-3 px-6 rounded-md font-medium text-xs sm:text-sm text-accent-fg bg-accent hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-accent cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Submit Project Inquiry</span>
                  )}
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
