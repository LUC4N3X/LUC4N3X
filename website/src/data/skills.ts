export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: string;
  skills: string[];
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Android & Multiplatform",
    subtitle: "Kotlin · Compose · Media3",
    icon: "smartphone",
    description: "Building native Android and Windows applications with Kotlin Multiplatform, Jetpack Compose, Media3/ExoPlayer, and custom audio DSP pipelines.",
    skills: ["Kotlin", "Kotlin Multiplatform", "Jetpack Compose", "Media3 / ExoPlayer", "libVLC / vlcj", "Material 3", "Coroutines & Flow", "Gradle"]
  },
  {
    title: "Linux & CLI Tooling",
    subtitle: "Arch Linux · Shell · Python",
    icon: "terminal",
    description: "Writing shell scripts, Python CLI tools, and reproducible system configurations for Arch Linux and headless servers.",
    skills: ["Arch Linux", "Bash / Zsh", "Python", "Git", "Systemd", "Dotfiles", "Linux Internals", "Device Qualification"]
  },
  {
    title: "Reverse Engineering & Diagnostics",
    subtitle: "Static Analysis · Network Inspection",
    icon: "cpu",
    description: "Inspecting APK packages, tracing media and network protocols, and auditing apps for hidden trackers or unnecessary permissions.",
    skills: ["APK Analysis", "Protocol Inspection", "JADX / Decompilation", "ADB & Perfetto", "FFmpeg / Audio Codecs", "Static Security Audits", "Zero-Telemetry Design"]
  }
];
