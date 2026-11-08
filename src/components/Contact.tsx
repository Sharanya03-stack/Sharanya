"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "Full-Stack Web Application",
    budget: "$2,500 - $5,000",
    timeline: "1 - 2 Months",
    description: "",
    hp_field: "", // honeypot for bots
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
    "API & Backend Infrastructure",
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
    "< 1 Month (Urgent)",
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
      setSuccessMessage(result.message || "Thank you! Your inquiry has been sent successfully.");
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
    <section id="contact" className="py-20 lg:py-28 relative bg-[#070a10] border-t border-white/[0.08]">
      {/* Background radial accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Context, Availability & Social Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Section 06 &bull; Initiate Project</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Have an idea? Let&apos;s build something meaningful.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Tell me about your project, your goals, and the challenges you&apos;re trying to solve. Let&apos;s turn your idea into a working product.
              </p>
            </div>

            {/* Availability Box */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Currently accepting freelance, contract, and high-impact build requests for Q1 / Q2. Response time is typically within 24 hours.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Typical kickoff turnaround: 3-5 business days</span>
              </div>
            </div>

            {/* Direct Channels & Social Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Direct Contact Channels
              </div>
              <div className="space-y-2">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-dusk/60 hover:bg-dusk border border-white/[0.08] hover:border-accent-cyan/40 transition-all text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-accent-cyan group-hover:shadow-cyan-glow">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px] font-mono">Email Address</div>
                      <div className="font-semibold text-white group-hover:text-accent-cyan transition-colors">
                        {siteConfig.contactEmail}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={siteConfig.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-dusk/60 hover:bg-dusk border border-white/[0.08] hover:border-accent-cyan/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-accent-cyan" />
                      <span className="font-semibold text-slate-200 group-hover:text-white">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-cyan" />
                  </a>

                  <a
                    href={siteConfig.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-dusk/60 hover:bg-dusk border border-white/[0.08] hover:border-accent-cyan/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-accent-cyan" />
                      <span className="font-semibold text-slate-200 group-hover:text-white">GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-cyan" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Conversion Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.1] shadow-2xl relative">
              {/* Top border glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden from real users to catch automated spam) */}
                <input
                  type="text"
                  name="hp_field"
                  value={formData.hp_field}
                  onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono font-medium text-slate-300"
                    >
                      Full Name <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-medium text-slate-300"
                    >
                      Work / Personal Email <span className="text-accent-cyan">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    />
                  </div>
                </div>

                {/* Company / Business */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono font-medium text-slate-300"
                  >
                    Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="e.g. Acme Innovations"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                  />
                </div>

                {/* Project Type Select */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-mono font-medium text-slate-300"
                  >
                    Project Type <span className="text-accent-cyan">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0e131f] text-slate-200">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget & Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="budget"
                      className="block text-xs font-mono font-medium text-slate-300"
                    >
                      Estimated Budget <span className="text-accent-cyan">*</span>
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier} value={tier} className="bg-[#0e131f] text-slate-200">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="timeline"
                      className="block text-xs font-mono font-medium text-slate-300"
                    >
                      Expected Timeline <span className="text-accent-cyan">*</span>
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0e131f] text-slate-200">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="description"
                    className="block text-xs font-mono font-medium text-slate-300"
                  >
                    Project Overview &amp; Goals <span className="text-accent-cyan">*</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    placeholder="Briefly describe the product you want to build, existing systems, target users, or key challenges to solve..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner */}
                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-sm text-emerald-200">Inquiry Transmitted</div>
                      <p className="mt-0.5 text-xs text-emerald-300/90">{successMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-accent-cyan hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan-glow hover:shadow-cyan-glow-lg active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confidentiality guaranteed &bull; Zero spam &bull; Direct developer review</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
