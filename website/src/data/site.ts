const getSiteUrl = () => {
  if (typeof process !== "undefined" && process.env?.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SITE_URL) {
    return import.meta.env.PUBLIC_SITE_URL;
  }
  return "https://luc4n3x.pages.dev";
};

export const siteConfig = {
  name: "LUC4N3X",
  title: "LUC4N3X — Independent Developer & Open Source Creator",
  description: "Independent developer and creator of Levyra. Building software focused on user experience, performance, privacy, and open source.",
  url: getSiteUrl(),
  ogImage: "/assets/brand/luc4n3x-lockup-dark.png",
  author: "LUC4N3X",
  email: "luc4n3x@proton.me",
  github: "https://github.com/LUC4N3X",
  tagline: "Independent Developer · Open Source · Software & IT",
  secondaryTagline: "Software Developer · Creator of Levyra",
  motto: "I build software I want to use, and keep working on it until it feels right.",
  year: new Date().getFullYear()
};
