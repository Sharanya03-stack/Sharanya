export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company?: string;
  avatarUrl?: string;
  content: string;
  projectAssociated?: string;
  rating?: number;
}

// EDITABLE: Add genuine client reviews here once received.
// We strictly adhere to our core policy: zero fabricated testimonials or fake client identities.
export const testimonials: TestimonialItem[] = [];

export interface VerifiedMilestone {
  label: string;
  numericValue: number;
  suffix: string;
  description: string;
  category: "Case Studies" | "Architecture" | "Code Quality" | "Execution";
}

export const verifiedMilestones: VerifiedMilestone[] = [
  {
    label: "End-to-End Systems Built",
    numericValue: 5,
    suffix: "",
    description:
      "Production web, AI triage, SaaS operations, quick-commerce, and real-estate platforms documented in this portfolio.",
    category: "Case Studies",
  },
  {
    label: "Production Stack Modules",
    numericValue: 19,
    suffix: "",
    description:
      "Verified technologies spanning Next.js, FastAPI, Supabase, Docker, LLM workflows, and cross-platform mobile.",
    category: "Architecture",
  },
  {
    label: "Strict TypeScript Coverage",
    numericValue: 100,
    suffix: "%",
    description:
      "Strict compiler mode enabled across frontend components, data models, and API validation routes.",
    category: "Code Quality",
  },
  {
    label: "Direct Response Window",
    numericValue: 24,
    suffix: "h",
    description:
      "Single-developer communication directly with Sharanya from discovery call through production deployment.",
    category: "Execution",
  },
];
