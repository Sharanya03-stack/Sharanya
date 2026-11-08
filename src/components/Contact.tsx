"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "Full-Stack Web Application",
    budget: "$2,500 - $5,000",
    timeline: "1 - 2 Months",
    description: "",
    hp_field: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  const budgetTiers = [
    "< $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
    "Flexible / Discussion",
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
        throw new Error(result.error || "Failed to submit inquiry. Please try again or email directly.");
      }

      setStatus("success");
      setSuccessMessage(result.message || "Thank you. Your message has been received.");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        projectType: "Full-Stack Web Application",
        budget: "$2,500 - $5,000",
        timeline: "1 - 2 Months",
        description: "",
        hp_field: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please contact via email directly.");
      }
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#0C172B] border-t border-[#1E335B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Context & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
                Initiate Project
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Have an idea? Let&apos;s build something meaningful.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Tell me about your product goals, timeline, and current challenges. I review every inquiry personally and respond within 24 hours.
              </p>
            </div>

            {/* Direct Email & Socials */}
            <div className="pt-4 border-t border-[#1E335B] space-y-3">
              <div>
                <span className="text-xs font-mono text-text-muted">Direct Email</span>
                <div className="mt-1">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm font-medium text-text-primary hover:text-dusk transition-colors"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs">
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#14223E] border border-[#1E335B]">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="hp_field"
                  value={formData.hp_field}
                  onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono text-text-secondary"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary placeholder-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-text-secondary"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary placeholder-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono text-text-secondary"
                  >
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary placeholder-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-mono text-text-secondary"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#101D35] text-text-primary">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="budget"
                      className="block text-xs font-mono text-text-secondary"
                    >
                      Budget Bracket
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier} value={tier} className="bg-[#101D35] text-text-primary">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="timeline"
                      className="block text-xs font-mono text-text-secondary"
                    >
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#101D35] text-text-primary">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="description"
                    className="block text-xs font-mono text-text-secondary"
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101D35] border border-[#1E335B] text-text-primary placeholder-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusk transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {status === "success" && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* Elegant Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 px-6 rounded-lg font-medium text-xs sm:text-sm text-white bg-sunset hover:bg-sunset-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Submit Project Inquiry</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
