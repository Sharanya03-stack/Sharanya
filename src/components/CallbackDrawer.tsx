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

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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
        throw new Error(
          data.error || "Submission failed. Please email directly."
        );
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: "var(--scrim)" }}
            className="fixed inset-0 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="w-screen max-w-md bg-surface border-l border-border shadow-noir flex flex-col justify-between overflow-y-auto"
            >
              <div className="px-6 py-4 border-b border-border bg-surface-subtle flex items-center justify-between sticky top-0 z-10 pt-[max(1rem,env(safe-area-inset-top))]">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-heading">
                    Initiate Project Inquiry
                  </h3>
                  <p className="text-[11px] font-mono text-muted">
                    Direct developer response within 24 hours
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md text-body hover:text-heading transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md noir-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md noir-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company name (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md noir-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-2.5 py-2 rounded-md noir-input text-xs"
                    >
                      <option
                        value="Full-Stack Web Application"
                        className="bg-surface text-ink"
                      >
                        Web Application
                      </option>
                      <option
                        value="AI Agent & RAG Pipeline"
                        className="bg-surface text-ink"
                      >
                        AI / Agent Workflow
                      </option>
                      <option
                        value="SaaS Platform / Dashboard"
                        className="bg-surface text-ink"
                      >
                        SaaS Platform
                      </option>
                      <option
                        value="Mobile App"
                        className="bg-surface text-ink"
                      >
                        Mobile App
                      </option>
                      <option value="Other" className="bg-surface text-ink">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Estimated Project Budget (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your estimated budget or write 'Let's discuss'"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md noir-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-body">
                      Brief Overview *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline your application goals or challenges..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md noir-input text-xs resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div
                      style={{
                        backgroundColor: "var(--status-error-bg)",
                        borderColor: "var(--status-error-border)",
                        color: "var(--status-error-fg)",
                      }}
                      className="p-2.5 rounded-md border text-xs"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {status === "success" && (
                    <div
                      style={{
                        backgroundColor: "var(--status-success-bg)",
                        borderColor: "var(--status-success-border)",
                        color: "var(--status-success-fg)",
                      }}
                      className="p-2.5 rounded-md border text-xs"
                    >
                      Inquiry received. I will reply within 24 hours.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-2.5 rounded-md font-medium text-xs text-accent-fg bg-accent hover:bg-accent-hover transition-colors disabled:opacity-50 cursor-pointer"
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
