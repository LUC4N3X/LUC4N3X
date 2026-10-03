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
    description: "An open-source music player for Android and Windows built with Kotlin, Jetpack Compose, AndroidX Media3, and libVLC. Streaming and local library playback with synced lyrics, offline downloads, and zero telemetry.",
    featured: true,
    platforms: ["Android", "Windows"],
    stack: ["Kotlin", "Jetpack Compose", "AndroidX Media3", "ExoPlayer", "Room", "SQLite", "LRCLIB", "libvlc"],
    github: "https://github.com/LUC4N3X/Levyra-deepsound",
    releaseUrl: "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest",
    internalUrl: "/projects/levyra",
    status: "Active",
    highlights: [
      "Verified 320 kbps AAC streaming and local library playback via AndroidX Media3 and libVLC",
      "Levyra Enhanced Audio DSP with 2048-point FFT cutoff detection and spectral band replication",
      "Time-synced LRC and word-by-word lyrics with offline downloads and encrypted backups",
      "Material 3 Expressive UI across Android and Windows via Compose Multiplatform",
      "Zero telemetry, no ads, and no accounts (0 trackers verified by Apptizo)"
    ],
    icon: "/assets/levyra/levyra-icon.svg"
  },
  {
    id: "thalarch",
    name: "Thalarch Layer",
    tagline: "Personal Arch Linux Setup & System Scripts",
    description: "Personal Arch Linux setup, dotfiles, and shell scripts for keeping a fast, reproducible daily workstation.",
    featured: false,
    platforms: ["Arch Linux", "Linux CLI"],
    stack: ["Shell", "Bash", "Arch Linux", "Dotfiles"],
    github: "https://github.com/LUC4N3X/thalarch-layer",
    status: "Active",
    highlights: [
      "Reproducible package lists and system configuration scripts",
      "Minimal background services and clean shell startup",
      "Keyboard-first terminal and window workflow"
    ],
    icon: "/assets/thalarch/thalarch-icon.png"
  },
  {
    id: "instara-crew",
    name: "Instara-Crew",
    tagline: "Python CLI Utility for Account Analysis",
    description: "Small Python command-line utility for inspecting account metadata and follower changes directly from the terminal.",
    featured: false,
    platforms: ["Server", "CLI"],
    stack: ["Python", "CLI", "AsyncIO"],
    github: "https://github.com/LUC4N3X/Instara-Crew",
    status: "Active",
    highlights: [
      "Direct terminal output with low memory usage",
      "Structured JSON and table diffs for account snapshots",
      "Simple configuration with automatic retry backoff"
    ]
  }
];
