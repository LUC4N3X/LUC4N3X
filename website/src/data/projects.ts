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
    tagline: "Open-Source Music Player for Android & Windows",
    description: "An open-source music player built for Android and Windows with zero tracking, no account requirement, low-latency playback via AndroidX Media3, offline downloads, synced lyrics through LRCLIB, and a fluid Jetpack Compose UI.",
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
    icon: "/assets/levyra/levyra-icon.svg"
  },
  {
    id: "thalarch",
    name: "Thalarch",
    tagline: "Engineering Skill & Multi-Agent Reliability Layer",
    description: "Multi-agent orchestration skill, visual-production system, and determinism framework for autonomous AI coding agents.",
    featured: false,
    platforms: ["Cross-Platform", "AI Agents"],
    stack: ["TypeScript", "Python", "Multi-Agent Systems", "Prompt Architecture"],
    github: "https://github.com/LUC4N3X/antigravity-thalarch",
    status: "Active",
    highlights: [
      "Staged planning and verifiable execution loops",
      "Cold-read verification and adversarial review gates",
      "Deterministic tool-calling and context governance"
    ],
    icon: "/assets/thalarch/thalarch-icon.png"
  },
  {
    id: "instara-crew",
    name: "Instara-Crew",
    tagline: "Operations Console with Gemini",
    description: "Multi-account operations console with persistent sessions, semantic content generation, and background job queue orchestration.",
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
  }
];
