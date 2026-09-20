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

  const fallback = {
    repository: {
      stars: 378,
      forks: 6,
      openIssues: 1
    },
    release: {
      version: "2.5.9",
      tag: "v2.5.9",
      publishedAt: "2026-09-18T20:40:27Z",
      url: "https://github.com/LUC4N3X/Levyra-deepsound/releases/latest"
    },
    downloads: {
      latestRelease: 0,
      total: 6000
    },
    localization: {
      label: "Community Translations"
    },
    updatedAt: new Date().toISOString()
  };

  try {
    const [repoRes, latestReleaseRes, allReleasesRes] = await Promise.all([
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound", { headers }),
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases/latest", { headers }),
      fetch("https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases?per_page=100", { headers })
    ]);

    if (!repoRes.ok || !latestReleaseRes.ok) {
      return new Response(JSON.stringify(fallback), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=300, s-maxage=600",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const repoData = (await repoRes.json()) as GitHubRepo;
    const latestRelease = (await latestReleaseRes.json()) as GitHubRelease;

    let latestDownloads = 0;
    if (Array.isArray(latestRelease.assets)) {
      for (const asset of latestRelease.assets) {
        latestDownloads += asset.download_count || 0;
      }
    }

    let totalDownloads = 0;
    if (allReleasesRes.ok) {
      const allReleases = (await allReleasesRes.json()) as GitHubRelease[];
      if (Array.isArray(allReleases)) {
        for (const rel of allReleases) {
          if (!rel.draft && Array.isArray(rel.assets)) {
            for (const asset of rel.assets) {
              totalDownloads += asset.download_count || 0;
            }
          }
        }
      }
    }

    const rawTag = latestRelease.tag_name || "v2.5.9";
    const cleanVersion = rawTag.replace(/^v/, "");

    const payload = {
      repository: {
        stars: typeof repoData.stargazers_count === "number" ? repoData.stargazers_count : fallback.repository.stars,
        forks: typeof repoData.forks_count === "number" ? repoData.forks_count : fallback.repository.forks,
        openIssues: typeof repoData.open_issues_count === "number" ? repoData.open_issues_count : fallback.repository.openIssues
      },
      release: {
        version: cleanVersion,
        tag: rawTag,
        publishedAt: latestRelease.published_at || fallback.release.publishedAt,
        url: latestRelease.html_url || fallback.release.url
      },
      downloads: {
        latestRelease: latestDownloads,
        total: totalDownloads > 0 ? totalDownloads : fallback.downloads.total
      },
      localization: {
        label: "Community Translations"
      },
      updatedAt: new Date().toISOString()
    };

    const response = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*"
      }
    });

    try {
      context.waitUntil(cache.put(cacheKey, response.clone()));
    } catch {}

    return response;
  } catch {
    return new Response(JSON.stringify(fallback), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
