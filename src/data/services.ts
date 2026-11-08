export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  businessProblem: string;
  iconName: string;
  capabilities: string[];
  deliverables: string[];
  badge?: string;
}

export const services: ServiceItem[] = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    tagline: "End-to-end production web applications",
    description: "Architecting and building responsive, secure web platforms, custom operational dashboards, and SaaS applications from the ground up.",
    businessProblem: "Solves fragmented toolsets, slow MVP time-to-market, and unscalable codebases by delivering robust, production-grade applications that scale seamlessly.",
    iconName: "Globe",
    capabilities: [
      "Modern, responsive web applications",
      "Real-time custom dashboards & telemetry",
      "Scalable multi-tenant SaaS platforms",
      "High-converting commercial web platforms",
    ],
    deliverables: [
      "Production-ready Next.js & React codebase",
      "Complete state management & API layer",
      "Automated CI/CD build configuration",
      "Performance-tuned responsive UI",
    ],
    badge: "Most Requested",
  },
  {
    id: "ai-development",
    title: "AI-Powered Application Development",
    tagline: "Intelligent systems with practical ROI",
    description: "Designing context-aware LLM applications, RAG pipelines, and autonomous AI triage agents that turn unstructured data into actionable outcomes.",
    businessProblem: "Eliminates repetitive manual workflows and information bottlenecks by augmenting your product with reliable, hallucination-resistant generative AI.",
    iconName: "Sparkles",
    capabilities: [
      "LLM integrations with OpenAI, Anthropic & Gemini",
      "Retrieval-Augmented Generation (RAG) pipelines",
      "Autonomous multi-agent triage & routing engines",
      "Intelligent text summarization & classification",
    ],
    deliverables: [
      "Vector search & embedding storage setup",
      "Structured output prompt engineering",
      "FinOps & token consumption telemetry",
      "End-to-end user evaluation & test suites",
    ],
    badge: "High Impact",
  },
  {
    id: "backend-api",
    title: "Backend & API Engineering",
    tagline: "Resilient server architecture & datastores",
    description: "Constructing high-throughput REST APIs, asynchronous worker pipelines, and rock-solid relational/document database architectures.",
    businessProblem: "Prevents downtime, concurrency bottlenecks, and security vulnerabilities with clean domain-driven backend design and strict schema validations.",
    iconName: "ServerCog",
    capabilities: [
      "High-performance FastAPI & Node.js backends",
      "Microservice & event-driven architecture",
      "Relational (PostgreSQL/Supabase) schema design",
      "Role-based authentication & JWT security",
    ],
    deliverables: [
      "Documented OpenAPI/Swagger specifications",
      "Database migration scripts & seed data",
      "Rate-limiting & caching strategies",
      "Secure secret management configuration",
    ],
  },
  {
    id: "ui-ux-frontend",
    title: "UI/UX & Frontend Architecture",
    tagline: "Pixel-perfect, conversion-driven interfaces",
    description: "Transforming design prototypes into lightning-fast, accessible, and delight-inducing web interfaces with modern design systems and smooth micro-interactions.",
    businessProblem: "Fixes poor client retention, sluggish load times, and accessibility flaws by delivering clean, intuitive experiences that keep users engaged.",
    iconName: "Layout",
    capabilities: [
      "Pixel-perfect Figma-to-code implementation",
      "Component-driven design systems & Tailwind CSS",
      "Smooth micro-interactions & Framer Motion transitions",
      "Core Web Vitals optimization (LCP, CLS, INP)",
    ],
    deliverables: [
      "Modular, reusable UI component library",
      "WCAG 2.1 AA compliant semantic HTML",
      "Lighthouse 95+ performance optimization",
      "Fluid responsive breakpoints for all devices",
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile Application Development",
    tagline: "Native performance across iOS & Android",
    description: "Building cross-platform mobile experiences that share backend business logic while offering silky smooth 60fps animations and offline capabilities.",
    businessProblem: "Drastically lowers development overhead and accelerates release cycles by deploying a single, unified codebase to both iOS and Android app stores.",
    iconName: "Smartphone",
    capabilities: [
      "Cross-platform React Native & Flutter development",
      "Hardware API & camera/location integration",
      "Local offline caching & real-time synchronization",
      "App store readiness & submission workflows",
    ],
    deliverables: [
      "Universal iOS & Android mobile codebase",
      "Push notification & device permissions integration",
      "Smooth gesture handling & reactive state",
      "Production-ready release builds",
    ],
  },
];
