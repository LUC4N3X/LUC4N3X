export interface PressItem {
  name: string;
  category: string;
  description: string;
  url: string;
  date?: string;
}

export const pressMentions: PressItem[] = [
  {
    name: "Kotlin Weekly #530",
    category: "Developer Digest",
    description: "Listed in Issue #530 of the Kotlin Weekly newsletter for its Kotlin Multiplatform and Jetpack Media3 architecture.",
    url: "https://mailchi.mp/kotlinweekly/kotlin-weekly-530",
  },
  {
    name: "Techno360",
    category: "Software Review",
    description: "Hands-on review of Levyra on Android and Windows covering audio playback, offline downloads, and zero-account setup.",
    url: "https://techno360.in/levyra-review/",
  },
  {
    name: "Australia By Aussie",
    category: "Tech News",
    description: "Article covering Levyra's Kotlin Multiplatform stack and its inclusion in the Kotlin developer spotlight.",
    url: "https://australiabyaussie.com/levyra-open-source-music-player-gains-kotlin-spotlight/",
  },
  {
    name: "OSCHINA 开源中国",
    category: "Open Source News",
    description: "Featured on China's largest open-source developer portal with an overview of the cross-platform player and local storage design.",
    url: "https://www.oschina.net/news/502584",
  },
  {
    name: "CSDN",
    category: "Engineering Feature",
    description: "Technical breakdown of Levyra's multiplatform playback pipeline, synced lyrics engine, and offline caching.",
    url: "https://blog.csdn.net/techforward/article/details/165886477",
  },
  {
    name: "SecurityLab.ru",
    category: "Security & Privacy",
    description: "Analysis of the zero-telemetry network policy, clean manifest permissions, and local encrypted data handling.",
    url: "https://www.securitylab.ru/blog/personal/SimlpeHacker/362601.php",
  },
  {
    name: "GeekParadize",
    category: "French Tech Media",
    description: "French-language review examining the Android and Windows desktop builds, equalizer controls, and ad-free listening flow.",
    url: "https://www.geekparadize.fr/articles/levyra-lecteur-musical-open-source-android-windows",
  },
  {
    name: "OpenSalerno",
    category: "Italian Open Source",
    description: "Italian article on free music playback without mandatory accounts, advertising SDKs, or background tracking.",
    url: "https://www.opensalerno.it/levyra-musica-libera-da-account-pubblicita-e-tracciamento-un-nuovo-player-open-source-android-e",
  },
  {
    name: "Techolay",
    category: "Turkish Tech Media",
    description: "Coverage of Levyra as an open-source music client for Android and Windows with Material 3 Expressive styling.",
    url: "https://techolay.net/levyra-android-ve-windows-icin-acik-kaynak-muzik-oynaticisi/",
  },
  {
    name: "Hysen Labs",
    category: "Project Analysis",
    description: "Repository profile and architecture summary of the Levyra-deepsound codebase and release cadence.",
    url: "https://hysenlabs.com/en/projects/luc4n3x-levyra-deepsound",
  },
  {
    name: "PitchHut",
    category: "Product Showcase",
    description: "Community showcase entry highlighting the desktop and mobile player interface and open-source distribution.",
    url: "https://www.pitchhut.com/project/levyra-music-player",
  },
];

export const ecosystemPlatforms: PressItem[] = [
  {
    name: "Apptizo Privacy Audit",
    category: "Independent Audit",
    description: "Static APK inspection verifying 0 trackers, 0 ad SDKs, and 5 minimal Android permissions.",
    url: "https://apptizo.com/app/levyra/",
  },
  {
    name: "F-Droid Official",
    category: "Reproducible Builds",
    description: "Built from source and cryptographically verified by the F-Droid build servers.",
    url: "https://f-droid.org/packages/com.luc4n3x.levyra/",
  },
  {
    name: "IzzyOnDroid",
    category: "Curated Repository",
    description: "Distributed through the IzzyOnDroid repository with automated scanner checks.",
    url: "https://apt.izzysoft.de/fdroid/index/apk/com.luc4n3x.levyra",
  },
  {
    name: "OpenSSF Best Practices",
    category: "Security Badge",
    description: "Passing Open Source Security Foundation Best Practices criteria for repository hygiene and release verification.",
    url: "https://www.bestpractices.dev/projects/14606",
  },
  {
    name: "Trendshift",
    category: "Trending Kotlin",
    description: "Ranked #4 Daily and #16 Weekly among trending Kotlin repositories on GitHub.",
    url: "https://trendshift.io/repositories/204798",
  },
  {
    name: "OpenAPK",
    category: "FOSS Directory",
    description: "Listed as a verified open-source Android application with direct GitHub APK tracking.",
    url: "https://www.openapk.net/levyra/com.luc4n3x.levyra/",
  },
  {
    name: "SourceForge Mirror",
    category: "Release Mirror",
    description: "Synchronized release mirror hosting signed Android APKs and Windows MSI/EXE installers.",
    url: "https://sourceforge.net/projects/levyra.mirror/",
  },
  {
    name: "Hosted Weblate",
    category: "Localization",
    description: "Community translation portal maintaining 37 languages with 100% Android string coverage.",
    url: "https://hosted.weblate.org/engage/levyra/",
  },
];
