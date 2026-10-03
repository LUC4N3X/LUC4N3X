export interface PressItem {
  name: string;
  category: string;
  description: string;
  badge: string;
  url?: string;
}

export const pressItems: PressItem[] = [
  {
    name: "Kotlin Weekly #530",
    category: "Developer Newsletter",
    description: "Featured in Issue #530 of Kotlin Weekly for its Kotlin Multiplatform and AndroidX Media3 playback architecture.",
    badge: "Featured Spotlight",
    url: "https://mailchi.mp/kotlinweekly/kotlin-weekly-530"
  },
  {
    name: "Techno360",
    category: "Software Review",
    description: "Hands-on review of Levyra on Android and Windows covering audio playback, offline downloads, and zero-account setup.",
    badge: "Press Review",
    url: "https://techno360.in/levyra-review/"
  },
  {
    name: "Australia By Aussie",
    category: "Tech News",
    description: "Article covering Levyra's open-source music player architecture and its Kotlin developer spotlight.",
    badge: "Press Article",
    url: "https://australiabyaussie.com/levyra-open-source-music-player-gains-kotlin-spotlight/"
  },
  {
    name: "OSCHINA 开源中国",
    category: "Open Source Hub",
    description: "Featured on OSCHINA with an overview of the cross-platform player, synced lyrics, and local storage design.",
    badge: "Community Coverage",
    url: "https://www.oschina.net/news/502584"
  },
  {
    name: "CSDN",
    category: "Tech Publication",
    description: "Technical review covering Levyra's playback pipeline, synced lyrics engine, and local-first design.",
    badge: "Technical Review",
    url: "https://blog.csdn.net/techforward/article/details/165886477"
  },
  {
    name: "SecurityLab.ru",
    category: "Security & Privacy",
    description: "Analysis of the zero-telemetry network policy, minimal Android permissions, and local data handling.",
    badge: "Security Coverage",
    url: "https://www.securitylab.ru/blog/personal/SimlpeHacker/362601.php"
  },
  {
    name: "GeekParadize",
    category: "French Tech Media",
    description: "In-depth French review examining the Android and Windows builds, equalizer controls, and ad-free listening flow.",
    badge: "Press Review",
    url: "https://www.geekparadize.fr/articles/levyra-lecteur-musical-open-source-android-windows"
  },
  {
    name: "OpenSalerno",
    category: "Italian Open Source",
    description: "Italian article on free music playback without mandatory accounts, advertising SDKs, or background tracking.",
    badge: "Press Article",
    url: "https://www.opensalerno.it/levyra-musica-libera-da-account-pubblicita-e-tracciamento-un-nuovo-player-open-source-android-e"
  },
  {
    name: "Techolay",
    category: "Turkish Tech Media",
    description: "Coverage of Levyra as an open-source music player for Android and Windows with Material 3 Expressive styling.",
    badge: "Press Article",
    url: "https://techolay.net/levyra-android-ve-windows-icin-acik-kaynak-muzik-oynaticisi/"
  },
  {
    name: "Hysen Labs",
    category: "Project Analysis",
    description: "Repository profile and architecture summary of the Levyra-deepsound codebase and release cadence.",
    badge: "Project Spotlight",
    url: "https://hysenlabs.com/en/projects/luc4n3x-levyra-deepsound"
  },
  {
    name: "PitchHut",
    category: "Product Showcase",
    description: "Community showcase entry highlighting the desktop and mobile player interface and open-source distribution.",
    badge: "Featured Project",
    url: "https://www.pitchhut.com/project/levyra-music-player"
  },
  {
    name: "Apptizo Privacy Audit",
    category: "Independent Audit",
    description: "Static APK inspection verifying 0 trackers, 0 advertising SDKs, and 5 minimal Android permissions.",
    badge: "0 Trackers Verified",
    url: "https://apptizo.com/app/levyra/"
  },
  {
    name: "F-Droid",
    category: "FOSS Distribution",
    description: "Independent community repository of reproducible free and open-source Android packages.",
    badge: "Verified Package",
    url: "https://f-droid.org/packages/com.luc4n3x.levyra/"
  },
  {
    name: "IzzyOnDroid",
    category: "FOSS Repository",
    description: "Fast F-Droid repository hosting verified Levyra builds with automated scanner checks.",
    badge: "Verified Repo",
    url: "https://apt.izzysoft.de/fdroid/index/apk/com.luc4n3x.levyra"
  },
  {
    name: "Weblate",
    category: "Localization",
    description: "Community translation portal maintaining 37 languages with 100% Android translation coverage.",
    badge: "37 Languages",
    url: "https://hosted.weblate.org/engage/levyra/"
  },
  {
    name: "SourceForge",
    category: "Distribution Mirror",
    description: "Verified open-source repository and worldwide release mirror for Android and Windows builds.",
    badge: "Official Mirror",
    url: "https://sourceforge.net/projects/levyra.mirror/"
  },
  {
    name: "OpenAPK",
    category: "Package Verification",
    description: "Android package verification and independent open-source APK distribution directory.",
    badge: "Package Mirror",
    url: "https://www.openapk.net/levyra/com.luc4n3x.levyra/"
  }
];
