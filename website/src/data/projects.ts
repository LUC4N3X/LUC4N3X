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
  }
];
