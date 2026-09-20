interface Env {
  GITHUB_TOKEN?: string;
}

interface ReleaseAsset {
  download_count: number;
}

interface GitHubRelease {
  draft: boolean;
  tag_name: string;
  html_url: string;
  published_at: string;
  assets?: ReleaseAsset[];
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
}

interface ApiResponse {
  repository: {
    stars: number | null;
    forks: number | null;
    openIssues: number | null;
  };
  release: {
    version: string | null;
    tag: string | null;
    publishedAt: string | null;
    url: string;
  };
  downloads: {
    latestRelease: number | null;
    total: number | null;
  };
  localization: {
    label: string;
  };
  updatedAt: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const cache = caches.default;
  const cacheKey = new Request(context.request.url, context.request);

  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch {}

  const headers: Record<string, string> = {
    "User-Agent": "LUC4N3X-Official-Website",
    "Accept": "application/vnd.github.v3+json"
  };

  if (context.env?.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${context.env.GITHUB_TOKEN}`;
  }

  const emptyFallback: ApiResponse = {
    repository: {
      stars: null,
      forks: null,
      openIssues: null
    },
    release: {
      version: null,
      tag: null,
      publishedAt: null,
      url: "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest"
    },
    downloads: {
      latestRelease: null,
      total: null
    },
    localization: {
      label: "Community Translations"
    },
    updatedAt: new Date().toISOString()
  };

  try {
    const [repoRes, latestReleaseRes] = await Promise.all([
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound", { headers }),
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases/latest", { headers })
    ]);

    let stars: number | null = null;
    let forks: number | null = null;
    let openIssues: number | null = null;

    if (repoRes.ok) {
      try {
        const repoData = (await repoRes.json()) as GitHubRepo;
        if (typeof repoData.stargazers_count === "number") {
          stars = repoData.stargazers_count;
        }
        if (typeof repoData.forks_count === "number") {
          forks = repoData.forks_count;
        }
        if (typeof repoData.open_issues_count === "number") {
          openIssues = repoData.open_issues_count;
        }
      } catch {}
    }

    let version: string | null = null;
    let tag: string | null = null;
    let publishedAt: string | null = null;
    let releaseUrl = "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest";
    let latestDownloads: number | null = null;

    if (latestReleaseRes.ok) {
      try {
        const latestRelease = (await latestReleaseRes.json()) as GitHubRelease;
        if (latestRelease && typeof latestRelease.tag_name === "string" && latestRelease.tag_name) {
          tag = latestRelease.tag_name;
          version = tag.replace(/^v/, "");
        }
        if (latestRelease && latestRelease.published_at) {
          publishedAt = latestRelease.published_at;
        }
        if (latestRelease && latestRelease.html_url) {
          releaseUrl = latestRelease.html_url;
        }
        if (latestRelease && Array.isArray(latestRelease.assets)) {
          let count = 0;
          for (const asset of latestRelease.assets) {
            count += asset.download_count || 0;
          }
          latestDownloads = count;
        }
      } catch {}
    }

    let totalDownloads: number | null = null;
    try {
      let accumulated = 0;
      let page = 1;
      const maxPages = 10;
      let completedSuccessfully = false;

      while (page <= maxPages) {
        const releasesRes = await fetch(
          `https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases?per_page=100&page=${page}`,
          { headers }
        );

        if (!releasesRes.ok) {
          completedSuccessfully = false;
          break;
        }

        const releases = (await releasesRes.json()) as GitHubRelease[];
        if (!Array.isArray(releases)) {
          completedSuccessfully = false;
          break;
        }

        if (releases.length === 0) {
          completedSuccessfully = true;
          break;
        }

        for (const rel of releases) {
          if (!rel.draft && Array.isArray(rel.assets)) {
            for (const asset of rel.assets) {
              accumulated += asset.download_count || 0;
            }
          }
        }

        if (releases.length < 100) {
          completedSuccessfully = true;
          break;
        }

        page += 1;
      }

      if (completedSuccessfully) {
        totalDownloads = accumulated;
      } else {
        totalDownloads = null;
      }
    } catch {
      totalDownloads = null;
    }

    const payload: ApiResponse = {
      repository: {
        stars,
        forks,
        openIssues
      },
      release: {
        version,
        tag,
        publishedAt,
        url: releaseUrl
      },
      downloads: {
        latestRelease: latestDownloads,
        total: totalDownloads
      },
      localization: {
        label: "Community Translations"
      },
      updatedAt: new Date().toISOString()
    };

    const hasAnyData = stars !== null || version !== null || totalDownloads !== null;

    const response = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": hasAnyData
          ? "public, max-age=60, s-maxage=300, stale-while-revalidate=3600"
          : "public, max-age=30, s-maxage=60",
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (hasAnyData) {
      try {
        context.waitUntil(cache.put(cacheKey, response.clone()));
      } catch {}
    }

    return response;
  } catch {
    return new Response(JSON.stringify(emptyFallback), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=120",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
