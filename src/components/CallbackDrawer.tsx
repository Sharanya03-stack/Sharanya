"use client";

import { useEffect, useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface CallbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackDrawer({ isOpen, onClose }: CallbackDrawerProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "Full-Stack Web Application",
    budget: "$2,500 - $5,000",
    timeline: "1 - 2 Months",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please email directly.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        projectType: "Full-Stack Web Application",
        budget: "$2,500 - $5,000",
        timeline: "1 - 2 Months",
        description: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0e17] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-surface-card/60 sticky top-0 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-dusk border border-accent-cyan/30 flex items-center justify-center text-accent-cyan shadow-cyan-glow">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Initiate Project Inquiry</h3>
                <p className="text-[11px] font-mono text-slate-400">Response within 24 hours</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-card border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 flex-1 space-y-5">
            <div className="p-3.5 rounded-xl bg-dusk/70 border border-white/[0.06] text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Quick Discovery Callback</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Briefly outline your goals below. I will personally review your project specifications and reach out with scope estimates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Company Name (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg bg-dusk border border-white/10 text-white text-xs focus:outline-none focus:border-accent-cyan"
                  >
                    <option value="Full-Stack Web Application">Web App</option>
                    <option value="AI Agent & RAG Pipeline">AI / Agent</option>
                    <option value="SaaS Platform / Dashboard">SaaS Platform</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg bg-dusk border border-white/10 text-white text-xs focus:outline-none focus:border-accent-cyan"
                  >
                    <option value="< $2,500">&lt; $2,500</option>
                    <option value="$2,500 - $5,000">$2.5k - $5k</option>
                    <option value="$5,000 - $10,000">$5k - $10k</option>
                    <option value="$10,000+">$10k+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">
                  Brief Project Overview *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="What are you building and what is your desired launch timeline?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-dusk border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-accent-cyan resize-none"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Inquiry received! I will reply to you within 24 hours.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-accent-cyan hover:bg-accent-cyan-hover transition-colors shadow-cyan-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Project Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-white/[0.06] bg-black/40 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Encrypted transmission &bull; Direct developer response</span>
          </div>
        </div>
      </div>
    </div>
  );
}
