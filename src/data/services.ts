export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  value: string;
  capabilities: [string, string, string];
  iconName: string;
}

export const services: ServiceItem[] = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Web Development",
    tagline: "End-to-end web applications",
    value: "Building modern, responsive web platforms and SaaS applications that convert visitors into active users.",
    capabilities: [
      "Custom responsive web applications & dashboards",
      "Next.js App Router, SSR & performance optimization",
      "Scalable multi-tenant SaaS application architecture",
    ],
    iconName: "Globe",
  },
  {
    id: "ai-development",
    number: "02",
    title: "AI-Powered Application Development",
    tagline: "Intelligent systems with practical ROI",
    value: "Transforming unstructured data into actionable outcomes with reliable, hallucination-resistant generative AI workflows.",
    capabilities: [
      "LLM integration with Claude, OpenAI & Gemini APIs",
      "Production-grade Retrieval-Augmented Generation (RAG)",
      "Autonomous multi-agent triage & task automation systems",
    ],
    iconName: "Sparkles",
  },
  {
    id: "backend-api",
    number: "03",
    title: "Backend & API Engineering",
    tagline: "Resilient server architecture & datastores",
    value: "Constructing high-throughput REST APIs, asynchronous worker pipelines, and secure database architectures.",
    capabilities: [
      "High-performance asynchronous Python & Node.js backends",
      "Relational (PostgreSQL/Supabase) schema design & security",
      "Role-based authentication, rate-limiting & webhook infrastructure",
    ],
    iconName: "ServerCog",
  },
  {
    id: "ui-ux-frontend",
    number: "04",
    title: "UI/UX & Frontend Development",
    tagline: "Pixel-perfect, conversion-driven interfaces",
    value: "Crafting intuitive, accessible, and high-performance digital experiences that elevate your brand's presence.",
    capabilities: [
      "Pixel-perfect translation from Figma prototypes to code",
      "Design systems with reusable components in Tailwind CSS",
      "Smooth micro-interactions & fluid scroll-driven animations",
    ],
    iconName: "Layout",
  },
  {
    id: "mobile-development",
    number: "05",
    title: "Mobile Application Development",
    tagline: "Native performance across iOS & Android",
    value: "Delivering cross-platform mobile experiences that share backend logic with silky-smooth 60fps interaction.",
    capabilities: [
      "Cross-platform iOS and Android mobile development",
      "Offline-first local caching and real-time data sync",
      "Native device integration and app store release readiness",
    ],
    iconName: "Smartphone",
  },
];
