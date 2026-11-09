"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    budget: "",
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
        budget: "",
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0B1426]/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            {/* Drawer with Slide-in from right & Glassmorphism */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-screen max-w-md bg-[#101114]/95 backdrop-blur-[20px] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 bg-charcoal/85 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Initiate Project Inquiry</h3>
                  <p className="text-[11px] text-text-muted">Direct developer response within 24 hours</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 flex-1 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-text-secondary">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-text-primary placeholder-text-muted text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-text-secondary">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-text-primary placeholder-text-muted text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-text-secondary">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company name (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-text-primary placeholder-text-muted text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-lightgrey">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg glass-input text-white text-xs bg-charcoal"
                    >
                      <option value="Full-Stack Web Application" className="bg-[#191A1E]">Web Application</option>
                      <option value="AI Agent & RAG Pipeline" className="bg-[#191A1E]">AI / Agent Workflow</option>
                      <option value="SaaS Platform / Dashboard" className="bg-[#191A1E]">SaaS Platform</option>
                      <option value="Mobile App" className="bg-[#191A1E]">Mobile App</option>
                      <option value="Other" className="bg-[#191A1E]">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-lightgrey">
                      Estimated Project Budget (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your estimated budget or write 'Let's discuss'"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-white placeholder-mediumgrey text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-text-secondary">
                      Brief Overview *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline your application goals or challenges..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-text-primary placeholder-text-muted text-xs resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                      Inquiry received. I will reply within 24 hours.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-2.5 rounded-lg font-medium text-xs text-white bg-sunset hover:bg-sunset-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
