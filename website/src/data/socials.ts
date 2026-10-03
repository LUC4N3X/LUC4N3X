export interface SocialLink {
  name: string;
  label: string;
  href: string;
  icon: string;
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    label: "@LUC4N3X",
    href: "https://github.com/LUC4N3X",
    icon: "github",
    description: "Source code, issue trackers, and signed release binaries."
  },
  {
    name: "Email",
    label: "lucadrog0@outlook.it",
    href: "mailto:lucadrog0@outlook.it",
    icon: "mail",
    description: "Direct email for bug reports, security notes, or questions."
  },
  {
    name: "Levyra Repository",
    label: "LUC4N3X/Levyra-deepsound",
    href: "https://github.com/LUC4N3X/Levyra-deepsound",
    icon: "code",
    description: "Main repository for the Levyra Android and Windows music player."
  },
  {
    name: "Weblate Localization",
    label: "hosted.weblate.org/engage/levyra",
    href: "https://hosted.weblate.org/engage/levyra/",
    icon: "globe",
    description: "Community translation portal covering 37 languages."
  }
];
