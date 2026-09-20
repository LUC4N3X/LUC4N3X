export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  platforms: string[];
  stack: string[];
  github: string;
  releaseUrl?: string;
  internalUrl?: string;
  status: "Active" | "Production" | "Maintained";
  highlights: string[];
  icon?: string;
  showcaseImage?: string;
}

export const projects: Project[] = [
  {
    id: "levyra",
    name: "Levyra",
    tagline: "High-Fidelity Open-Source Music Player",
    description: "An open-source music player for Android and Windows with zero tracking, no account requirement, low-latency playback via AndroidX Media3, offline downloads, synced lyrics through LRCLIB, and a fluid Jetpack Compose UI.",
    featured: true,
    platforms: ["Android", "Windows"],
    stack: ["Kotlin", "Jetpack Compose", "AndroidX Media3", "ExoPlayer", "Room", "SQLite", "LRCLIB", "libvlc"],
    github: "https://github.com/LUC4N3X/Levyra-deepsound",
    releaseUrl: "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest",
    internalUrl: "/projects/levyra",
    status: "Active",
    highlights: [
      "Low-latency playback engine with AndroidX Media3 and custom session handling",
      "Resumable background downloads and local audio tag embedding",
      "Real-time synchronized lyrics scoring and custom extraction pipeline",
      "Material You dynamic theming and desktop UI via Jetpack Compose",
      "Zero telemetry, no ads, and direct CDN connection without intermediary proxies"
    ],
    icon: "/assets/levyra/levyra-icon.svg",
    showcaseImage: "/assets/levyra/home_top50.webp"
  },
  {
    id: "thalarch",
    name: "Thalarch",
    tagline: "Autonomous Multi-Agent Reliability & Engineering Layer",
    description: "High-rigor multi-agent orchestration skill, visual-production system, and determinism framework for autonomous AI coding agents.",
    featured: false,
    platforms: ["Cross-Platform", "AI Agents"],
    stack: ["TypeScript", "Python", "Multi-Agent Systems", "Prompt Architecture"],
    github: "https://github.com/LUC4N3X/antigravity-thalarch",
    status: "Active",
    highlights: [
      "Staged planning and verifiable execution loops",
      "Cold-read verification and adversarial QA gates",
      "Deterministic tool-calling and context governance"
    ],
    icon: "/assets/thalarch/thalarch-icon.png"
  },
  {
    id: "instara-crew",
    name: "Instara-Crew",
    tagline: "Autonomous Operations Console Powered by Gemini",
    description: "Multi-account operations automation console with persistent sessions, semantic content generation, and background job queue orchestration.",
    featured: false,
    platforms: ["Server", "CLI"],
    stack: ["Python", "FastAPI", "Gemini API", "AsyncIO", "Docker"],
    github: "https://github.com/LUC4N3X/Instara-Crew",
    status: "Active",
    highlights: [
      "Persistent encrypted session management",
      "Gemini-powered contextual engagement synthesis",
      "Resilient task worker queue with automatic retry backoff"
    ]
  },
  {
    id: "kraken-proxy",
    name: "KrakenProxy",
    tagline: "Resilient HLS / MP4 Media Reverse Gateway",
    description: "High-throughput streaming proxy and media gateway with intelligent hoster extraction, dynamic fallback routing, and stream optimization.",
    featured: false,
    platforms: ["Linux", "Docker"],
    stack: ["Python", "FastAPI", "Docker", "HLS", "AsyncIO"],
    github: "https://github.com/LUC4N3X/KrakenProxy",
    status: "Active",
    highlights: [
      "Dynamic hoster stream extraction pipeline",
      "Resilient edge failover routing",
      "Low-overhead HLS segment buffering"
    ]
  },
  {
    id: "kraken-lightx",
    name: "KrakenLightX",
    tagline: "Ultra-Light Stream Gateway & Edge Proxy",
    description: "High-efficiency hybrid media extraction and forwarding gateway engineered for minimal footprint edge deployments.",
    featured: false,
    platforms: ["Linux", "Android"],
    stack: ["Rust", "Python", "Edge Proxy", "Media Streaming"],
    github: "https://github.com/LUC4N3X/KrakenLightX",
    status: "Active",
    highlights: [
      "Hybrid Rust core for near-zero memory footprint",
      "Zero-copy stream forwarding pipeline",
      "Embedded Android proxy companion support"
    ]
  },
  {
    id: "levyra-extractor",
    name: "LevyraExtractor",
    tagline: "Media Extraction & Resolution Engine",
    description: "Custom-tuned media resolution and metadata parsing engine optimized for high-reliability audio streaming.",
    featured: false,
    platforms: ["JVM", "Android"],
    stack: ["Java", "Kotlin", "Gradle"],
    github: "https://github.com/LUC4N3X/LevyraExtractor",
    status: "Active",
    highlights: [
      "Adaptive stream resolution failover",
      "Encrypted cipher and signature solving",
      "Deep integration with Levyra audio pipeline"
    ]
  }
];
