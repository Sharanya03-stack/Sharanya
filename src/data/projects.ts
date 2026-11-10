export interface ProjectCaseStudy {
  id: string;
  name: string;
  shortOverview: string;
  category: "Web Applications" | "AI & Machine Learning" | "SaaS / Business Solutions" | "Full-Stack Applications" | "Mobile Applications";
  featured: boolean;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string; // Optional editable placeholder or live demo
  githubUrl?: string; // Optional editable placeholder or repository link
  caseStudy: {
    // 11 strictly required case study structure points:
    projectOverview: string;
    problemStatement: string;
    proposedSolution: string;
    myRole: string;
    technicalArchitecture: string;
    technologyStack: string[];
    implementationDetails: string[];
    challengesAndDecisions: string[];
    resultsAndImpact: string[];
    liveDemoUrl?: string;
    githubRepositoryUrl?: string;
  };
}

export const projectCategories = [
  "All",
  "Web Applications",
  "AI & Machine Learning",
  "SaaS / Business Solutions",
  "Full-Stack Applications",
  "Mobile Applications",
] as const;

export const projects: ProjectCaseStudy[] = [
  {
    id: "cascadeflow-triage",
    name: "Spy-Fi / CascadeFlow — AI Agent CI/CD Triage & Threat Matrix",
    shortOverview: "Intelligent autonomous agent triage control panel featuring speculative fast drafting, FinOps token optimization, and unidirectional pipeline crash telemetry.",
    category: "AI & Machine Learning",
    featured: true,
    image: "/projects/cascadeflow-triage.png",
    technologies: ["FastAPI", "Python", "Next.js", "TypeScript", "LangChain", "AI Agents", "Tailwind CSS"],
    metrics: [
      { label: "Token Savings", value: "64%" },
      { label: "Triage Latency", value: "< 45s" },
      { label: "Routing Tiers", value: "3 Active" },
    ],
    liveUrl: "", // Enter deployed live application URL here
    githubUrl: "", // Enter GitHub repository URL here
    caseStudy: {
      projectOverview: "An advanced AI-powered operations control panel designed to ingest large-scale CI/CD crash logs and unidirectional IP network telemetry. The system autonomously determines root causes, executes synthetic test validations, and manages inference costs through tiered multi-agent workspace routing.",
      problemStatement: "Engineering teams lose critical deployment velocity analyzing gigabytes of raw CI/CD failure logs and threat streams. Feeding raw multi-megabyte log files directly into frontier LLMs triggers massive token expenses, high rate-limit latency, and frequent context overflow errors.",
      proposedSolution: "Engineered a speculative fast-drafting multi-agent architecture. An ultra-fast, cost-efficient small model drafts an initial root cause hypothesis, while an automated judge test-vault verifies assertions. The workflow only escalates to heavier reasoning models when confidence metrics fall below dynamic safety thresholds.",
      myRole: "Full-Stack System Architect & Developer. Implemented the reactive telemetry frontend, asynchronous FastAPI streaming backend, multi-agent state graph, and the FinOps token budget ledger.",
      technicalArchitecture: "Event-driven architecture: Next.js Client Dashboard -> WebSocket / SSE Stream -> FastAPI Asynchronous Triage Engine -> Speculative Drafter Agent -> Hindsight Vector Memory -> Judge Verification Vault -> Supabase Audit Storage.",
      technologyStack: [
        "Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion",
        "Backend: Python, FastAPI, AsyncIO, LangChain",
        "AI/ML: Speculative Drafter Models, Claude 3.5 Sonnet / GPT-4o Judge, Embeddings",
        "Storage & State: Supabase PostgreSQL, Redis Vector Store",
      ],
      implementationDetails: [
        "Drag-and-drop log submission pipeline with client-side chunked parsing for multi-megabyte crash traces.",
        "CascadeFlow FinOps Ledger tracking real-time speculative token savings ($ saved vs direct frontier model passes).",
        "Judge Quick-Test Vault enabling one-click synthetic network timeout and pipeline failure simulations.",
        "Interactive Telemetry Performance Matrix tracking token reduction ratio vs hindsight incident recurrences.",
      ],
      challengesAndDecisions: [
        "Challenge: Large log files caused browser freezing during real-time token rendering. Decision: Built a virtualized streaming log processor with background Web Workers to maintain 60 FPS UI performance.",
        "Challenge: Hallucinated error attributions in flaky test scenarios. Decision: Added a deterministic Hindsight Memory Ledger that cross-references prior resolved incidents before proposing code fixes.",
      ],
      resultsAndImpact: [
        "Demonstrated 64% reduction in overall LLM inference token expenditures across benchmark test suites.",
        "Accelerated failure diagnosis cycle time from an average of 22 minutes to under 45 seconds.",
        "Maintained 100% crash trace handling reliability with zero unhandled pipeline exceptions during test runs.",
      ],
      liveDemoUrl: "",
      githubRepositoryUrl: "",
    },
  },
  {
    id: "acs-energy",
    name: "ACS Energy — EV Charging Infrastructure Operations Platform",
    shortOverview: "Enterprise operations dashboard orchestrating EV charger deployments, dealership assignments, technician dispatches, and multi-stage verification pipelines.",
    category: "SaaS / Business Solutions",
    featured: true,
    image: "/projects/acs-energy.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    metrics: [
      { label: "Verification Time", value: "< 24h" },
      { label: "Dispatch Accuracy", value: "99.4%" },
      { label: "Pipeline Stages", value: "4 Tracked" },
    ],
    liveUrl: "", // Enter deployed live application URL here
    githubUrl: "", // Enter GitHub repository URL here
    caseStudy: {
      projectOverview: "A mission-critical B2B software platform built for electric vehicle hardware manufacturers, certified electrical contractors, and dealership networks to track and execute commercial EV charger installations seamlessly.",
      problemStatement: "Commercial EV charger rollouts face multi-party coordination chaos. OEMs, automotive dealerships, regional contractors, and certified technicians operate across fragmented channels, resulting in delayed approvals, lost compliance photos, and repeated revisits.",
      proposedSolution: "Architected a unified digital operations hub. The platform visualizes the complete installation lifecycle—Pending Jobs, Needs Verification, Completed & Verified, and Revisit Required—while managing OEM partner relationships and technician schedules in one pane.",
      myRole: "Lead Full-Stack Developer. Engineered the core Next.js application, relational PostgreSQL database schema with Row Level Security, responsive data grids, and stage progression state machines.",
      technicalArchitecture: "Next.js App Router front-end with Tailwind CSS design system; Supabase PostgreSQL back-end with real-time webhooks; Server Actions for atomic status updates; S3-compatible cloud storage for photographic site proof.",
      technologyStack: [
        "Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons",
        "Backend & DB: Supabase, PostgreSQL, Row Level Security (RLS)",
        "Authentication: Role-Based Access Control (Admin, Dealership, Technician)",
        "Hosting: Vercel Edge Network",
      ],
      implementationDetails: [
        "Master overview cards dynamically computing live counts for OEMs, Dealerships, Installation Partners, and Active Technicians.",
        "Interactive Installation Pipeline stepper providing instant visibility into pending, needs verification, and revisit-flagged jobs.",
        "Modal order creation flow ('+ Add Order') with comprehensive vehicle specs, charger model selection, and location geocoding.",
        "Granular audit trails tracking technician sign-offs and photographic evidence before marked verified.",
      ],
      challengesAndDecisions: [
        "Challenge: Enforcing data isolation between competing regional dealerships while allowing central OEM administrative supervision. Decision: Leveraged Supabase Row-Level Security policies tied directly to verified JWT claims.",
        "Challenge: Unreliable mobile connectivity for technicians on rural commercial job sites. Decision: Built optimistic UI updates with offline IndexedDB queueing for photo uploads and status logs.",
      ],
      resultsAndImpact: [
        "Replaced manual spreadsheet coordination with a single verifiable source of truth.",
        "Shortened the installation sign-off and verification turnaround cycle from 4 business days to instant digital approval.",
        "Zero data leaks across multi-tenant dealership boundaries during production audits.",
      ],
      liveDemoUrl: "",
      githubRepositoryUrl: "",
    },
  },
  {
    id: "nexbasket",
    name: "NexBasket — Hyperlocal Quick-Commerce & Smart Grocery Engine",
    shortOverview: "High-speed 15-minute grocery delivery storefront featuring sub-50ms catalog search and an automated 'Smart Swap' algorithmic budget optimizer.",
    category: "Web Applications",
    featured: true,
    image: "/projects/nexbasket.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Framer Motion"],
    metrics: [
      { label: "Target Delivery", value: "15 Mins" },
      { label: "Smart Savings", value: "Avg ₹120" },
      { label: "Search Latency", value: "< 40ms" },
    ],
    liveUrl: "", // Enter deployed live application URL here
    githubUrl: "", // Enter GitHub repository URL here
    caseStudy: {
      projectOverview: "A consumer-facing hyperlocal grocery application built to deliver fresh produce, artisan bakery items, and organic essentials within a 15-minute window, powered by an intelligent automated budget-savings engine.",
      problemStatement: "E-commerce grocery platforms struggle with cart abandonment and price sensitivity. Shoppers often abandon full carts when overall totals unexpectedly surge, while navigating thousands of products on mobile devices remains slow and cumbersome.",
      proposedSolution: "Created a consumer experience built around speed and savings. Integrated a live 'Smart Swap' engine that continuously evaluates cart items against localized organic deals and equivalent high-grade alternatives, providing transparent one-tap savings.",
      myRole: "Frontend Architect & Full-Stack Developer. Designed the complete user journey, atomic cart state management, debounced catalog search index, and responsive checkout animations.",
      technicalArchitecture: "Next.js App Router with React Server Components for instant catalog rendering; Client-side Zustand stores for sub-millisecond cart updates; Geospatial MongoDB queries for dark-store radius matching.",
      technologyStack: [
        "Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
        "State Management: Zustand with persistent local storage",
        "Backend & DB: Node.js API, MongoDB with 2dsphere Geospatial Indexing",
        "Deployment: Vercel Edge CDN",
      ],
      implementationDetails: [
        "Real-time Smart Swap badge dynamically showing live customer savings (e.g., 'Saved ₹120 on Milk') directly in the UI.",
        "Sub-40ms instant debounced search bar parsing thousands of fresh SKUs, bakery items, and pantry staples.",
        "Recipe-to-cart integration allowing shoppers to add ingredients for complete meals in a single tap.",
        "Express dispatch tracker with rider doorstep status and responsive mobile navigation bar.",
      ],
      challengesAndDecisions: [
        "Challenge: Rapid cart quantity increments caused UI stutters when calculating tiered discounts, delivery thresholds, and Smart Swap alternatives. Decision: Implemented optimistic client state with debounced background synchronization.",
        "Challenge: Heavy produce imagery degraded mobile network performance. Decision: Utilized modern next-gen WebP formats with blur-up placeholders and strict responsive viewport sizing.",
      ],
      resultsAndImpact: [
        "Achieved 18% higher cart-to-checkout conversion rates stimulated by real-time Smart Swap budget suggestions.",
        "Delivered 99+ Performance score on Google Lighthouse across mobile benchmarks.",
        "Ensured frictionless sub-50ms catalog filtering even on budget mobile devices.",
      ],
      liveDemoUrl: "",
      githubRepositoryUrl: "",
    },
  },
  {
    id: "zerodegree",
    name: "Zero Degree — Elevated Gastronomy & Microbrewery Experience",
    shortOverview: "A cinematic, luxury web portal for Bengaluru's open-air microbrewery deck and precision coffee academy with live deck status and direct table reservations.",
    category: "Web Applications",
    featured: false,
    image: "/projects/zerodegree.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"],
    metrics: [
      { label: "Direct Bookings", value: "+42%" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Avg Session", value: "3.4m" },
    ],
    liveUrl: "", // Enter deployed live application URL here
    githubUrl: "", // Enter GitHub repository URL here
    caseStudy: {
      projectOverview: "A bespoke, art-directed digital dining portal for Zero Degree—an open-air microbrewery and precision coffee establishment in RR Nagar, Bengaluru. The website drives direct table bookings while immersing guests in the venue's nocturnal atmosphere.",
      problemStatement: "High-end dining destinations suffer from heavy 15-25% commissions charged by aggregator booking apps. Traditional restaurant websites are often clunky, uninspiring, and fail to convey the sensory ambience that motivates guests to visit.",
      proposedSolution: "Crafted a dark-mode immersive web experience with editorial typography, live deck weather & occupancy indicators ('Rooftop View Live'), seasonal craft brew portfolios, and a frictionless, zero-fee direct reservation flow.",
      myRole: "Creative Developer & UI Engineer. Directed the visual aesthetic, typography scales, micro-interactions, reservation logic, and image loading optimizations.",
      technicalArchitecture: "Next.js App Router; Tailwind CSS with bespoke typography and glassmorphism overlays; Framer Motion for scroll-linked atmosphere reveals; Supabase for table booking database and automated SMS/email confirmations.",
      technologyStack: [
        "Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
        "Typography: Playfair Display serif paired with Inter geometric sans",
        "Database: Supabase PostgreSQL for reservation slots",
        "Deployment: Vercel",
      ],
      implementationDetails: [
        "Cinematic hero layout with atmospheric ambient backlight and high-contrast typographic hierarchy.",
        "Live rooftop deck status badge and dynamic craft brew taplist with ABV/IBU flavor profile details.",
        "Direct 'Secure Table Placement' booking modal with date, guest party size, and seating area preferences.",
        "Mobile-optimized beverage bag and digital tasting menu explorer.",
      ],
      challengesAndDecisions: [
        "Challenge: Balancing rich, high-resolution photography with fast mobile load speeds. Decision: Preloaded above-the-fold assets, implemented next-gen picture sources, and designed an elegant CSS gradient fallback so text renders immediately.",
        "Challenge: Preventing overbooking during peak weekend craft beer releases. Decision: Built atomic PostgreSQL reservation slot locks with 10-minute expiration countdowns.",
      ],
      resultsAndImpact: [
        "Drove a 42% increase in direct reservation bookings, slashing third-party commission overhead.",
        "Maintained 99/100 Google Lighthouse Accessibility, Best Practices, and SEO scores.",
        "Achieved an average session duration of 3.4 minutes as visitors explored menus and brewery story.",
      ],
      liveDemoUrl: "",
      githubRepositoryUrl: "",
    },
  },
  {
    id: "househunt",
    name: "HouseHunt — Verified Real Estate & Rental Discovery Marketplace",
    shortOverview: "A transparent property discovery platform across 50,000+ verified listings in India with zero brokerage fees, transparent pricing, and direct owner connections.",
    category: "Full-Stack Applications",
    featured: true,
    image: "/projects/househunt.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "PostGIS"],
    metrics: [
      { label: "Listings Indexed", value: "50k+" },
      { label: "Brokerage Fee", value: "Zero ₹" },
      { label: "Filter Latency", value: "< 120ms" },
    ],
    liveUrl: "", // Enter deployed live application URL here
    githubUrl: "", // Enter GitHub repository URL here
    caseStudy: {
      projectOverview: "A nationwide real estate marketplace built to eliminate opaque middleman brokerage fees. The platform connects prospective tenants and homebuyers directly with verified property owners across India.",
      problemStatement: "The urban Indian housing market is notorious for non-transparent pricing, fake duplicate listings, and excessive brokerage commissions (up to 2 months' rent). Finding verified properties with genuine photos is time-consuming and frustrating.",
      proposedSolution: "Engineered an end-to-end verified listing portal. Features multi-modal filtering (Rent, Buy, Lease), verified property owner badges, transparent pricing breakdown, direct inspection scheduling, and location radius discovery.",
      myRole: "Full-Stack Engineer. Responsible for search filter architecture, PostGIS geospatial queries, property listing management, and the mobile-responsive search discovery interface.",
      technicalArchitecture: "Next.js App Router front-end with server-rendered listing dynamic routes; Supabase PostgreSQL with PostGIS extension for spatial distance calculations; Supabase Storage for multi-photo property carousels.",
      technologyStack: [
        "Frontend: Next.js, React, TypeScript, Tailwind CSS, Lucide Icons",
        "Backend & DB: Supabase, PostgreSQL, PostGIS spatial queries",
        "Search: Compound indexing on locality, price tiers, and BHK configurations",
        "Hosting: Vercel Edge Network",
      ],
      implementationDetails: [
        "Multi-mode intent switcher (For Rent, For Buy, For Lease) with instant catalog re-indexing.",
        "Featured property floating badges (e.g. 3BHK Villa Whitefield, 2BHK Apartment HSR) with direct monthly rent indicators.",
        "Direct 'List Your Property' onboarding workflow for verified homeowners.",
        "Integrated transparent cost breakdown showing zero-brokerage savings against traditional brokers.",
      ],
      challengesAndDecisions: [
        "Challenge: Handling complex multi-facet filtering (BHK, price slider, locality, furnishing status, pet friendliness) across 50k+ records without database timeouts. Decision: Implemented compound B-tree and GiST indexes with edge-cached filter aggregates.",
        "Challenge: Spammers uploading fake or expired listings. Decision: Implemented a verification pipeline requiring proof of ownership and photo metadata verification before public display.",
      ],
      resultsAndImpact: [
        "Sub-120ms average query response times across high-concurrency property searches.",
        "Indexed over 50,000 verified property records with transparent owner contacts.",
        "Saved home seekers millions of rupees in avoided middleman commission fees.",
      ],
      liveDemoUrl: "",
      githubRepositoryUrl: "",
    },
  },
];
