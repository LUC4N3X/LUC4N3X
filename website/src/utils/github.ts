export interface LevyraMetrics {
  stars: number;
  downloads: number;
  version: string;
  forks?: number;
}

export async function getLevyraMetrics(): Promise<LevyraMetrics> {
  const fallback: LevyraMetrics = {
    stars: 393,
    downloads: 6192,
    version: "2.5.9",
    forks: 7
  };

  try {
    const headers: Record<string, string> = {
      "User-Agent": "LUC4N3X-Official-Website",
      "Accept": "application/vnd.github.v3+json"
    };

    if (typeof process !== "undefined" && process.env?.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [repoRes, releasesRes] = await Promise.all([
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound", { headers }),
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases?per_page=100", { headers })
    ]);

    let stars = fallback.stars;
    let forks = fallback.forks;
    let version = fallback.version;
    let downloads = fallback.downloads;

    if (repoRes.ok) {
      const repo = await repoRes.json();
      if (typeof repo.stargazers_count === "number") {
        stars = repo.stargazers_count;
      }
      if (typeof repo.forks_count === "number") {
        forks = repo.forks_count;
      }
    }

    if (releasesRes.ok) {
      const releases = await releasesRes.json();
      if (Array.isArray(releases) && releases.length > 0) {
        if (releases[0]?.tag_name) {
          version = String(releases[0].tag_name).replace(/^v/, "");
        }
        let total = 0;
        for (const rel of releases) {
          if (!rel.draft && Array.isArray(rel.assets)) {
            for (const asset of rel.assets) {
              total += asset.download_count || 0;
            }
          }
        }
        if (total > 0) {
          downloads = total;
        }
      }
    }

    return { stars, downloads, version, forks };
  } catch {
    return fallback;
  }
}
