export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "mobile" | "ai";
  description: string;
  iconName: string;
  highlight?: boolean;
}

export interface TechCategory {
  id: "frontend" | "backend" | "database" | "mobile" | "ai";
  title: string;
  description: string;
  items: TechItem[];
}

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Responsive, accessible, and high-performance user interfaces built for high conversion and seamless UX.",
    items: [
      { name: "Next.js", category: "frontend", description: "App Router, SSR, Server Actions & edge performance", iconName: "Layers", highlight: true },
      { name: "React", category: "frontend", description: "Modern functional architecture, custom hooks & state machines", iconName: "Atom", highlight: true },
      { name: "TypeScript", category: "frontend", description: "Strict type safety, robust interfaces & maintainability", iconName: "Code2", highlight: true },
      { name: "JavaScript", category: "frontend", description: "Modern ESNext, asynchronous patterns & DOM mastery", iconName: "FileCode" },
      { name: "Tailwind CSS", category: "frontend", description: "Design systems, utility-first styling & dark mode aesthetics", iconName: "Palette" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    description: "Scalable APIs, performant async services, and secure server architectures handling production workloads.",
    items: [
      { name: "Python", category: "backend", description: "High-performance scripting, data pipelines & AI tooling", iconName: "Terminal", highlight: true },
      { name: "FastAPI", category: "backend", description: "High-throughput asynchronous REST APIs & Pydantic validation", iconName: "Zap", highlight: true },
      { name: "Node.js", category: "backend", description: "Microservices, event-driven backends & serverless workers", iconName: "Server" },
    ],
  },
  {
    id: "database",
    title: "Database & Cloud Services",
    description: "Relational, document, and real-time cloud datastores designed with schema integrity and high throughput.",
    items: [
      { name: "Supabase", category: "database", description: "PostgreSQL, Row Level Security, Auth & real-time websockets", iconName: "Database", highlight: true },
      { name: "Firebase", category: "database", description: "Cloud Firestore, serverless rules & real-time sync", iconName: "Flame" },
      { name: "MongoDB", category: "database", description: "Flexible document stores, indexing & aggregation pipelines", iconName: "HardDrive" },
    ],
  },
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    description: "Cutting-edge language models, vector search, multi-agent frameworks, and autonomous tooling.",
    items: [
      { name: "LLM Integration", category: "ai", description: "GPT-4, Claude & Gemini API integration with structured schemas", iconName: "BrainCircuit", highlight: true },
      { name: "RAG Systems", category: "ai", description: "Contextual retrieval, vector embeddings & knowledge base grounding", iconName: "Cpu", highlight: true },
      { name: "AI Agents", category: "ai", description: "Autonomous workflow agents, tool-calling & reasoning loops", iconName: "Bot", highlight: true },
      { name: "API Integration", category: "ai", description: "Third-party webhook ecosystems, payment gateways & CRMs", iconName: "Workflow" },
    ],
  },
  {
    id: "mobile",
    title: "Cross-Platform Mobile",
    description: "Native-grade cross-platform apps with shared logic and optimized mobile device interactions.",
    items: [
      { name: "React Native", category: "mobile", description: "Cross-platform iOS and Android apps with native bridges", iconName: "Smartphone", highlight: true },
      { name: "Flutter", category: "mobile", description: "High-fps, expressive reactive mobile UIs with Dart", iconName: "TabletSmartphone" },
    ],
  },
];
