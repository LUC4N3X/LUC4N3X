export interface TechDomain {
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

export const techDomains: TechDomain[] = [
  {
    title: "Android & Audio Core",
    category: "Mobile",
    description: "Modern Android development without legacy XML overhead. Low-latency playback pipelines and foreground services that never drop playback.",
    technologies: ["Kotlin", "Jetpack Compose", "AndroidX Media3", "ExoPlayer", "Material You", "Coroutines & Flow"]
  },
  {
    title: "Async, APIs & Gateways",
    category: "Backend",
    description: "High-throughput asynchronous services, resilient proxy gateways, and automated workers engineered for reliability.",
    technologies: ["Python", "FastAPI", "AsyncIO", "Rust", "Node.js", "HLS / Streaming", "REST APIs"]
  },
  {
    title: "Local-First & Offline Vault",
    category: "Data",
    description: "Offline-first architecture where data belongs to the user and never vanishes on restart. Fast caching and structured storage.",
    technologies: ["SQLite", "Room", "Redis", "Encrypted Preferences", "LRCLIB API"]
  },
  {
    title: "Infrastructure & Systems",
    category: "DevOps",
    description: "Lean Linux environments, reproducible container builds, edge proxies, and continuous integration workflows.",
    technologies: ["Docker", "Linux (Debian/Arch)", "Cloudflare Pages", "GitHub Actions", "Git"]
  }
];
