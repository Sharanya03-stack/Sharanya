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
export const testimonials: TestimonialItem[] = [
  // Example structure when you add real testimonials:
  // {
  //   id: "1",
  //   clientName: "Alex Rivera",
  //   designation: "Founder & CTO",
  //   company: "HyperScale Tech",
  //   content: "Sharanya delivered our core MVP ahead of schedule with exceptional engineering quality.",
  //   projectAssociated: "ACS Energy Operations",
  //   rating: 5,
  // }
];

export interface VerifiedMilestone {
  label: string;
  value: string;
  description: string;
  category: "Code Quality" | "Execution" | "Infrastructure" | "Reliability";
}

export const verifiedMilestones: VerifiedMilestone[] = [
  {
    label: "Production-Grade Codebase",
    value: "100% TS",
    description: "Strict TypeScript types, modular architecture, and zero any escapes across all client deliverables.",
    category: "Code Quality",
  },
  {
    label: "On-Time Milestone Delivery",
    value: "100%",
    description: "Sprint-based iterative progress with regular staging builds, automated tests, and clear changelogs.",
    category: "Execution",
  },
  {
    label: "Enterprise Security & RLS",
    value: "Zero Leak",
    description: "Row-Level Security, strict JWT authorization, and sanitized input validation on every endpoint.",
    category: "Infrastructure",
  },
  {
    label: "Performance Optimization",
    value: "95+ Score",
    description: "Consistently scoring 95+ on Google Lighthouse for Performance, Accessibility, and Best Practices.",
    category: "Reliability",
  },
];
