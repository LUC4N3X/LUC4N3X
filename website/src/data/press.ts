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
    description: "Independent community-maintained repository of free and open source Android applications.",
    badge: "Verified FOSS",
    url: "https://f-droid.org"
  },
  {
    name: "XDA Developers",
    category: "Android Community",
    description: "Global mobile software development and Android power-user community ecosystem.",
    badge: "Developer Community",
    url: "https://xdaforums.com"
  },
  {
    name: "Weblate",
    category: "Localization",
    description: "Continuous community-driven localization spanning 36 languages and active global translators.",
    badge: "36 Locales",
    url: "https://hosted.weblate.org/engage/levyra/"
  },
  {
    name: "OSCHINA",
    category: "Open Source Platform",
    description: "Prominent open-source software community and technology discovery network.",
    badge: "Open Source Hub"
  },
  {
    name: "CSDN",
    category: "Developer Network",
    description: "Software engineering community platform and open source software knowledge base.",
    badge: "Tech Community"
  },
  {
    name: "SourceForge",
    category: "Repository & Mirror",
    description: "Trusted open-source software repository and worldwide distribution network.",
    badge: "Distribution Mirror"
  },
  {
    name: "OpenAPK",
    category: "Package Verification",
    description: "Independent Android package distribution and verifiable binary archive.",
    badge: "Binary Mirror"
  }
];
