import { mkdir, writeFile } from 'node:fs/promises';

function renderCards(data, theme) {
  const dark = theme === 'dark';
  const bg = dark ? '#161b22' : '#ffffff';
  const border = dark ? '#30363d' : '#d0d7de';
  const fg = dark ? '#e6edf3' : '#1f2328';
  const muted = dark ? '#8b949e' : '#656d76';
  const accent = dark ? '#58a6ff' : '#0969da';
  const purple = dark ? '#a97bff' : '#7f52ff';
  const track = dark ? '#21262d' : '#eaeef2';
  const pillBg = dark ? '#21262d' : '#f6f8fa';
  const font = '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';
  const mono = 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,monospace';

  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const number = (n) => Number(n).toLocaleString('en-US');

  const frame = (w, h, title, body) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="10" fill="${bg}" stroke="${border}"/><g font-family="${font}">${body}</g></svg>\n`;

  const t = (x, y, s, color = fg, size = 14, weight = 400, anchor = 'start', family = '') =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}"${family ? ` font-family="${family}"` : ''}>${esc(s)}</text>`;

  const repoIcon = `<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" fill="${muted}" transform="translate(22 19) scale(0.95)"/>`;
  const starIcon = `<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" fill="${muted}" transform="translate(106 157) scale(0.85)"/>`;
  const forkIcon = `<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" fill="${muted}" transform="translate(196 157) scale(0.85)"/>`;
  const prIcon = `<path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" fill="${muted}" transform="translate(22 19) scale(0.95)"/>`;

  const descriptionLines = [
    'Made for listening, not logging in. Levyra is an',
    'open-source music player for Android and Windows,',
    'bringing music discovery, synced lyrics, radio and',
    'beautiful artwork together. No ads, no tracking,',
    'just music \u266b',
  ];

  const licenseLabel = data.license && data.license !== 'NOASSERTION' ? data.license : '';

  const pin = frame(
    400,
    192,
    'LUC4N3X / Levyra-deepsound repository statistics',
    repoIcon +
      t(44, 32, 'Levyra-deepsound', accent, 15, 600) +
      `<rect x="330" y="17" width="48" height="20" rx="10" fill="${pillBg}" stroke="${border}"/>` +
      t(354, 31, 'Public', muted, 11, 500, 'middle') +
      descriptionLines.map((line, i) => t(22, 58 + i * 17, line, fg, 12, 400)).join('') +
      `<line x1="22" y1="144" x2="378" y2="144" stroke="${track}" stroke-width="1"/>` +
      `<circle cx="28" cy="164" r="5.5" fill="${purple}"/>` +
      t(40, 168, 'Kotlin', muted, 12.5, 500) +
      starIcon +
      t(124, 168, number(data.stars), fg, 12.5, 600, 'start', mono) +
      forkIcon +
      t(213, 168, number(data.forks), fg, 12.5, 600, 'start', mono) +
      (licenseLabel ? t(378, 168, licenseLabel, muted, 12, 400, 'end') : '')
  );

  const pct = data.prs ? (100 * data.merged) / data.prs : 0;
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (pct * circ) / 100;
  const rows = [
    ['Public PRs', number(data.prs)],
    ['Merged PRs', number(data.merged)],
    ['Public issues', number(data.issues)],
  ];

  const stats = frame(
    400,
    192,
    'LUC4N3X GitHub activity statistics',
    prIcon +
      t(44, 32, 'GitHub activity', accent, 15, 600) +
      t(378, 31, 'LUC4N3X', muted, 11.5, 500, 'end', mono) +
      rows
        .map(
          ([label, value], i) =>
            t(22, 68 + i * 28, label, muted, 13, 500) +
            t(236, 68 + i * 28, value, fg, 13.5, 600, 'end', mono)
        )
        .join('') +
      `<circle cx="322" cy="94" r="${r}" fill="none" stroke="${track}" stroke-width="6"/>` +
      `<circle cx="322" cy="94" r="${r}" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${dash.toFixed(2)} ${circ.toFixed(2)}" transform="rotate(-90 322 94)"/>` +
      t(322, 99, pct.toFixed(1) + '%', fg, 15, 600, 'middle', mono) +
      `<line x1="22" y1="144" x2="378" y2="144" stroke="${track}" stroke-width="1"/>` +
      t(22, 168, 'Updated ' + data.date, muted, 11.5, 400) +
      t(322, 168, 'PR merge rate', muted, 11.5, 400, 'middle')
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

const [project, prs, merged, issues] = await Promise.all([
  api('/repos/LUC4N3X/Levyra-deepsound'),
  count('author:LUC4N3X type:pr is:public'),
  count('author:LUC4N3X type:pr is:merged is:public'),
  count('author:LUC4N3X type:issue is:public'),
]);

if (
  merged > prs ||
  !Number.isSafeInteger(project.stargazers_count) ||
  !Number.isSafeInteger(project.forks_count)
) {
  throw new Error('Invalid GitHub statistics');
}

const data = {
  prs,
  merged,
  issues,
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
