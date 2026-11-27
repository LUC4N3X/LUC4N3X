import { mkdir, writeFile } from 'node:fs/promises';

function renderCards(data, theme) {
  const dark = theme === 'dark';
  const bg = dark ? '#161b22' : '#ffffff';
  const border = dark ? '#30363d' : '#d0d7de';
  const fg = dark ? '#e6edf3' : '#1f2328';
  const muted = dark ? '#8b949e' : '#656d76';
  const accent = dark ? '#58a6ff' : '#0969da';
  const iconColor = dark ? '#79c0ff' : '#0969da';
  const purple = dark ? '#a97bff' : '#7f52ff';
  const track = dark ? '#21262d' : '#eaeef2';
  const font = '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';
  const mono = 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,monospace';

  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/[^\x20-\x7E]/g, (c) => `&#${c.codePointAt(0)};`);

  const number = (n) => Number(n).toLocaleString('en-US');

  const frame = (w, h, title, body) =>
    `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="6" fill="${bg}" stroke="${border}"/><g font-family="${font}">${body}</g></svg>\n`;

  const t = (x, y, s, color = fg, size = 13.5, weight = 400, anchor = 'start', family = '') =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}"${family ? ` font-family="${family}"` : ''}>${esc(s)}</text>`;

  const icon = (d, x, y, color = iconColor, scale = 0.85) =>
    `<path d="${d}" fill="${color}" transform="translate(${x} ${y}) scale(${scale})"/>`;

  const ICONS = {
    star: 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z',
    fork: 'M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z',
    pr: 'M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z',
    merge: 'M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z',
    check: 'M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z',
    issue: 'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z',
    download: 'M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14ZM7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z',
    repo: 'M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z',
  };

  const pct = data.prs ? (100 * data.merged) / data.prs : 0;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct * circ) / 100;

  const statRows = [
    [ICONS.star, 'Total Stars Earned:', number(data.totalStars)],
    [ICONS.fork, 'Total Forks Earned:', number(data.totalForks)],
    [ICONS.pr, 'Total PRs:', number(data.prs)],
    [ICONS.merge, 'Total PRs Merged:', number(data.merged)],
    [ICONS.check, 'Merged PRs Percentage:', pct.toFixed(1) + '%'],
    [ICONS.issue, 'Total Issues:', number(data.issues)],
    [ICONS.download, 'Levyra Downloads:', number(data.downloads)],
    [ICONS.repo, 'Public Repositories:', number(data.publicRepos)],
  ];

  const stats = frame(
    495,
    264,
    'LUC4N3X GitHub statistics',
    t(25, 34, 'LUC4N3X stats', accent, 17, 600) +
      statRows
        .map(
          ([d, label, value], i) =>
            icon(d, 25, 53 + i * 24, iconColor, 0.85) +
            t(47, 64 + i * 24, label, fg, 13, 500) +
            t(324, 64 + i * 24, value, fg, 13, 600, 'end', mono)
        )
        .join('') +
      `<circle cx="412" cy="136" r="${r}" fill="none" stroke="${track}" stroke-width="6"/>` +
      `<circle cx="412" cy="136" r="${r}" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${dash.toFixed(2)} ${circ.toFixed(2)}" transform="rotate(-90 412 136)"/>` +
      t(412, 141, pct.toFixed(1) + '%', fg, 16, 600, 'middle', mono) +
      t(412, 196, 'PRs merged', muted, 11.5, 400, 'middle') +
      t(470, 248, 'Updated ' + data.date, muted, 10.5, 400, 'end')
  );

  const descriptionLines = [
    'Made for listening, not logging in. Levyra is an open-source',
    'music player for Android and Windows, bringing music',
    'discovery, synced lyrics, radio and beautiful artwork',
    'together. No ads, no tracking, just music \u266b',
  ];

  const licenseLabel = data.license && data.license !== 'NOASSERTION' ? data.license : '';

  const pin = frame(
    440,
    170,
    'LUC4N3X / Levyra-deepsound repository card',
    icon(ICONS.repo, 22, 19, muted, 0.95) +
      t(44, 32, 'LUC4N3X/Levyra-deepsound', accent, 14.5, 600) +
      descriptionLines.map((line, i) => t(22, 58 + i * 17, line, fg, 12, 400)).join('') +
      `<line x1="22" y1="126" x2="418" y2="126" stroke="${track}" stroke-width="1"/>` +
      `<circle cx="28" cy="146" r="5.5" fill="${purple}"/>` +
      t(40, 150, 'Kotlin', muted, 12.5, 500) +
      icon(ICONS.star, 106, 139, muted, 0.85) +
      t(124, 150, number(data.stars), fg, 12.5, 600, 'start', mono) +
      icon(ICONS.fork, 196, 139, muted, 0.85) +
      t(213, 150, number(data.forks), fg, 12.5, 600, 'start', mono) +
      (licenseLabel ? t(418, 150, licenseLabel, muted, 12, 400, 'end') : '')
  );

  return { stats, pin };
}

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error('GITHUB_TOKEN is required');

async function api(path) {
  const response = await fetch('https://api.github.com' + path, {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error('GitHub API returned ' + response.status + ' for ' + path);
  return response.json();
}

async function count(query) {
  const result = await api('/search/issues?per_page=1&q=' + encodeURIComponent(query));
  if (result.incomplete_results || !Number.isSafeInteger(result.total_count)) {
    throw new Error('Incomplete search results: ' + query);
  }
  return result.total_count;
}

async function totalLevyraDownloads() {
  let page = 1;
  let total = 0;
  while (page <= 15) {
    const releases = await api(`/repos/LUC4N3X/Levyra-deepsound/releases?per_page=100&page=${page}`);
    if (!Array.isArray(releases) || releases.length === 0) break;
    for (const release of releases) {
      if (release.draft) continue;
      for (const asset of release.assets ?? []) {
        total += asset.download_count ?? 0;
      }
    }
    if (releases.length < 100) break;
    page += 1;
  }
  return total;
}

const [user, repos, project, prs, merged, issues, downloads] = await Promise.all([
  api('/users/LUC4N3X'),
  api('/users/LUC4N3X/repos?per_page=100&type=owner'),
  api('/repos/LUC4N3X/Levyra-deepsound'),
  count('author:LUC4N3X type:pr is:public'),
  count('author:LUC4N3X type:pr is:merged is:public'),
  count('author:LUC4N3X type:issue is:public'),
  totalLevyraDownloads(),
]);

const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0);

if (
  merged > prs ||
  !Number.isSafeInteger(project.stargazers_count) ||
  !Number.isSafeInteger(project.forks_count) ||
  !Number.isSafeInteger(user.public_repos)
) {
  throw new Error('Invalid GitHub statistics');
}

const data = {
  totalStars,
  totalForks,
  prs,
  merged,
  issues,
  downloads,
  publicRepos: user.public_repos,
  stars: project.stargazers_count,
  forks: project.forks_count,
  license: project.license?.spdx_id ?? '',
  date: new Date().toISOString().slice(0, 10),
};

await mkdir('assets/stats', { recursive: true });
for (const theme of ['dark', 'light']) {
  for (const [kind, svg] of Object.entries(renderCards(data, theme))) {
    await writeFile('assets/stats/' + kind + '-' + theme + '.svg', svg);
  }
}
