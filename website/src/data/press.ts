export interface PressItem {
  name: string;
  category: string;
  description: string;
  badge: string;
  url?: string;
}

export const pressItems: PressItem[] = [
  {
    name: "F-Droid",
    category: "FOSS Distribution",
    description: "Independent community repository of verified free and open-source Android packages.",
    badge: "Verified Package",
    url: "https://f-droid.org/packages/com.luc4n3x.levyra/"
  },
  {
    name: "Weblate",
    category: "Localization",
    description: "Continuous community translation portal powering multilingual support across global contributors.",
    badge: "Community L10n",
    url: "https://hosted.weblate.org/engage/levyra/"
  },
  {
    name: "SourceForge",
    category: "Distribution Mirror",
    description: "Verified open-source repository and worldwide release distribution mirror.",
    badge: "Official Mirror",
    url: "https://sourceforge.net/projects/levyra.mirror/"
  },
  {
    name: "OpenAPK",
    category: "Package Verification",
    description: "Android package verification and independent APK distribution archive.",
    badge: "Package Mirror",
    url: "https://www.openapk.net/levyra/com.luc4n3x.levyra/"
  },
  {
    name: "OSCHINA",
    category: "Open Source Hub",
    description: "Open-source software platform highlighting notable independent community projects.",
    badge: "Community Coverage",
    url: "https://www.oschina.net/news/502584"
  },
  {
    name: "CSDN",
    category: "Tech Publication",
    description: "Technical review covering architecture, low-latency playback, and privacy-first design.",
    badge: "Technical Review",
    url: "https://blog.csdn.net/techforward/article/details/165886477"
  },
  {
    name: "XDA Developers",
    category: "Android Community",
    description: "Global mobile software development and Android power-user community ecosystem.",
    badge: "Developer Community"
  }
];
