export interface LevyraMetrics {
  version: string;
  stars: number;
  downloads: number;
  forks: number;
}

const FALLBACK_METRICS: LevyraMetrics = {
  version: '2.6.2',
  stars: 280,
  downloads: 8500,
  forks: 18,
};

let cachedMetrics: LevyraMetrics | null = null;

export async function getLevyraMetrics(): Promise<LevyraMetrics> {
  if (cachedMetrics) {
    return cachedMetrics;
  }

  try {
    const [repoRes, releasesRes] = await Promise.all([
      fetch('https://api.github.com/repos/LUC4N3X/Levyra-deepsound', {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'LUC4N3X-Site-Builder' }
      }),
      fetch('https://api.github.com/repos/LUC4N3X/Levyra-deepsound/releases?per_page=100', {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'LUC4N3X-Site-Builder' }
      })
    ]);

    if (!repoRes.ok || !releasesRes.ok) {
      throw new Error(`GitHub API returned status ${repoRes.status} / ${releasesRes.status}`);
    }

    const repoData = await repoRes.json();
    const releasesData = await releasesRes.json();

    let totalDownloads = 0;
    let latestVersion = FALLBACK_METRICS.version;

    if (Array.isArray(releasesData) && releasesData.length > 0) {
      const latestRelease = releasesData.find((r: any) => !r.draft && !r.prerelease) || releasesData[0];
      if (latestRelease && latestRelease.tag_name) {
        latestVersion = latestRelease.tag_name.replace(/^v/i, '');
      }

      for (const release of releasesData) {
        if (Array.isArray(release.assets)) {
          for (const asset of release.assets) {
            totalDownloads += asset.download_count || 0;
          }
        }
      }
    }

    cachedMetrics = {
      version: latestVersion,
      stars: repoData.stargazers_count || FALLBACK_METRICS.stars,
      downloads: totalDownloads > 0 ? totalDownloads : FALLBACK_METRICS.downloads,
      forks: repoData.forks_count || FALLBACK_METRICS.forks,
    };

    return cachedMetrics;
  } catch (err) {
    console.warn('[getLevyraMetrics] Using fallback metrics due to API error:', err);
    return FALLBACK_METRICS;
  }
}

export function formatMetricNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
  }
  return num.toString();
}
