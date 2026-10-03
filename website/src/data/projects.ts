export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: string;
  platforms: string[];
  stack: string[];
  highlights: string[];
  github: string;
  internalUrl?: string;
  releasesUrl?: string;
  fdroidUrl?: string;
  izzyUrl?: string;
  sourceforgeUrl?: string;
  weblateUrl?: string;
  featured: boolean;
  icon?: string;
}

export const projects: Project[] = [
  {
    id: "levyra",
    name: "Levyra",
    tagline: "Native Android & Windows music player",
    description: "An open-source music player for Android and Windows built with Kotlin Multiplatform, Jetpack Compose, Media3, and libVLC. It plays verified 320 kbps streams and local libraries with synced lyrics, offline downloads, and zero telemetry.",
    longDescription: "Levyra is a native music player for Android and Windows. It pairs Jetpack Media3 on Android and libVLC on Windows with a shared Kotlin Multiplatform core, a 10-band parametric EQ, real-time spectral restoration for low-bitrate streams, word-synced lyrics, and local encrypted storage. No accounts, no ads, and no analytics SDKs.",
    status: "Flagship · Active",
    platforms: ["Android 8.0+", "Windows 10/11 (x64)"],
    stack: ["Kotlin", "Compose Multiplatform", "Media3 / ExoPlayer", "libVLC", "Coroutines", "Material 3"],
    highlights: [
      "Verified 320 kbps AAC streaming alongside local FLAC, ALAC, WAV, OGG, and MP3 files",
      "Levyra Enhanced Audio DSP with 2048-point FFT cutoff detection and band replication",
      "Time-synced LRC and word-by-word lyrics with translation and romanization",
      "Encrypted local backups, offline library downloads, and 37 community translations",
      "0 trackers and 0 ad SDKs verified by independent static APK audit (Apptizo)"
    ],
    github: "https://github.com/LUC4N3X/Levyra-deepsound",
    internalUrl: "/projects/levyra",
    releasesUrl: "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest",
    fdroidUrl: "https://f-droid.org/packages/com.luc4n3x.levyra/",
    izzyUrl: "https://apt.izzysoft.de/fdroid/index/apk/com.luc4n3x.levyra",
    sourceforgeUrl: "https://sourceforge.net/projects/levyra.mirror/",
    weblateUrl: "https://hosted.weblate.org/engage/levyra/",
    featured: true,
    icon: "/assets/levyra/levyra-icon.svg"
  },
  {
    id: "thalarch-layer",
    name: "Thalarch Layer",
    tagline: "Arch Linux environment & system scripts",
    description: "Personal Arch Linux setup, dotfiles, and shell scripts for keeping a fast, reproducible daily workstation.",
    longDescription: "A collection of Arch Linux configuration files, window manager bindings, and shell scripts built to set up or restore a clean Linux environment without extra background services.",
    status: "Active",
    platforms: ["Arch Linux", "Linux CLI"],
    stack: ["Shell", "Bash", "Arch Linux", "Dotfiles", "Systemd"],
    highlights: [
      "Reproducible package lists and system configuration scripts",
      "Minimal background services and clean shell startup",
      "Keyboard-first terminal and window workflow"
    ],
    github: "https://github.com/LUC4N3X/thalarch-layer",
    featured: false
  },
  {
    id: "instara-crew",
    name: "Instara-Crew",
    tagline: "Python CLI utility for account inspection",
    description: "A command-line Python script for inspecting public profile metadata and follower changes from the terminal.",
    longDescription: "A small Python CLI utility that queries and compares account metadata directly in the terminal, outputting clean structured tables without needing a browser.",
    status: "Maintained",
    platforms: ["Cross-Platform CLI", "Linux / macOS / Windows"],
    stack: ["Python", "CLI", "HTTP / JSON"],
    highlights: [
      "Direct terminal output with low memory usage",
      "Structured JSON and table diffs for follower snapshots",
      "Simple configuration with rate-limit backoff"
    ],
    github: "https://github.com/LUC4N3X/Instara-Crew",
    featured: false
  }
];
