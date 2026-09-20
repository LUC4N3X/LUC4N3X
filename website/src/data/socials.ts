export interface SocialLink {
  name: string;
  url: string;
  label: string;
  category: "code" | "contact" | "community";
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/LUC4N3X",
    label: "@LUC4N3X",
    category: "code"
  },
  {
    name: "Email",
    url: "mailto:luca.testing96@gmail.com",
    label: "luca.testing96@gmail.com",
    category: "contact"
  },
  {
    name: "Weblate",
    url: "https://hosted.weblate.org/engage/levyra/",
    label: "Weblate / Levyra",
    category: "community"
  },
  {
    name: "Repository",
    url: "https://github.com/LUC4N3X/LUC4N3X",
    label: "LUC4N3X / LUC4N3X",
    category: "code"
  }
];
