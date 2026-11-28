import { mkdir, writeFile } from 'node:fs/promises';

function renderCards(data, theme) {
  const dark = theme === 'dark';
  const bg = dark ? '#161b22' : '#ffffff';
  const border = dark ? '#30363d' : '#d0d7de';
  const divider = dark ? '#21262d' : '#eaeef2';
  const fg = dark ? '#e6edf3' : '#1f2328';
  const muted = dark ? '#8b949e' : '#656d76';
  const accent = dark ? '#58a6ff' : '#0969da';
  const iconColor = dark ? '#79c0ff' : '#0969da';
  const purple = dark ? '#a97bff' : '#7f52ff';
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

  const frame = (w, h, title, body, style = '') =>
    `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">${style ? `<style>${style}</style>` : ''}<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="8" fill="${bg}" stroke="${border}"/><g font-family="${font}">${body}</g></svg>\n`;

  const t = (x, y, s, color = fg, size = 13, weight = 400, anchor = 'start', family = '') =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}"${family ? ` font-family="${family}"` : ''}>${esc(s)}</text>`;

  const icon = (d, x, y, color = iconColor, scale = 0.85) =>
    `<path d="${d}" fill="${color}" transform="translate(${x} ${y}) scale(${scale})"/>`;

  const ICONS = {
    star: 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z',
    fork: 'M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z',
    pr: 'M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z',
    merge: 'M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z',
    issue: 'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z',
    download: 'M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14ZM7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z',
    flame: 'M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947-.67 1.928-1.564 1.337a2.502 2.502 0 0 1-.82-.982c-.578.836-.855 1.855-.855 2.816 0 2.52 2.168 4.5 3.898 4.5Z',
    repo: 'M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z',
  };

  const pct = data.prs ? (100 * data.merged) / data.prs : 0;
  const r = 36;
  const circ = (2 * Math.PI * r).toFixed(2);

  const statsStyle =
    `@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` +
    `@keyframes ringDraw{from{stroke-dashoffset:${circ}}to{stroke-dashoffset:0}}` +
    `@keyframes popIn{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}` +
    `@keyframes flameBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}` +
    `.stagger{opacity:0;animation:fadeUp .55s cubic-bezier(.16,1,.3,1) forwards}` +
    `.ring{stroke-dashoffset:${circ};animation:ringDraw 1.3s cubic-bezier(.16,1,.3,1) .3s forwards}` +
    `.pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:popIn .65s cubic-bezier(.16,1,.3,1) .45s forwards}` +
    `.flame{transform-box:fill-box;transform-origin:center;animation:popIn .5s ease-out 1.1s backwards,flameBeat 2.4s ease-in-out 1.7s infinite}` +
    `@media (prefers-reduced-motion:reduce){.stagger,.pop,.flame{opacity:1;animation:none}.ring{stroke-dashoffset:0;animation:none}}`;

  const leftMetrics = [
    [ICONS.star, 'Total Stars', number(data.totalStars)],
    [ICONS.pr, 'Pull Requests', number(data.prs)],
    [ICONS.issue, 'Total Issues', number(data.issues)],
  ];

  const rightMetrics = [
    [ICONS.download, 'Levyra Downloads', number(data.downloads)],
    [ICONS.merge, 'PRs Merged', pct.toFixed(1) + '%'],
    [ICONS.fork, 'Total Forks', number(data.totalForks)],
  ];

  const stats = frame(
    540,
    272,
    'LUC4N3X GitHub streak and statistics',
    `<line x1="180" y1="24" x2="180" y2="142" stroke="${divider}" stroke-width="1"/>` +
      `<line x1="360" y1="24" x2="360" y2="142" stroke="${divider}" stroke-width="1"/>` +
      `<g class="stagger" style="animation-delay:200ms">` +
      t(90, 74, number(data.totalContributions), fg, 25, 700, 'middle', mono) +
      t(90, 104, 'Total Contributions', fg, 12.5, 500, 'middle') +
      t(90, 124, data.contributionsRange, muted, 11, 400, 'middle') +
      `</g>` +
      `<circle cx="270" cy="66" r="${r}" fill="none" stroke="${divider}" stroke-width="5"/>` +
      `<circle class="ring" cx="270" cy="66" r="${r}" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${circ}" transform="rotate(-90 270 66)"/>` +
      `<circle cx="270" cy="30" r="11" fill="${bg}"/>` +
      `<g class="flame">` +
      icon(ICONS.flame, 262.5, 21.5, accent, 0.95) +
      `</g>` +
      `<g class="pop">` +
      t(270, 74, number(data.currentStreak), fg, 24, 700, 'middle', mono) +
      `</g>` +
      `<g class="stagger" style="animation-delay:350ms">` +
      t(270, 122, 'Current Streak', accent, 12.5, 600, 'middle') +
      t(270, 140, data.currentStreakRange, muted, 11, 400, 'middle') +
      `</g>` +
      `<g class="stagger" style="animation-delay:480ms">` +
      t(450, 74, number(data.longestStreak), fg, 25, 700, 'middle', mono) +
      t(450, 104, 'Longest Streak', fg, 12.5, 500, 'middle') +
      t(450, 124, data.longestStreakRange, muted, 11, 400, 'middle') +
      `</g>` +
      `<line x1="22" y1="160" x2="518" y2="160" stroke="${divider}" stroke-width="1"/>` +
      leftMetrics
        .map(
          ([d, label, value], i) =>
            `<g class="stagger" style="animation-delay:${600 + i * 100}ms">` +
            icon(d, 26, 177 + i * 25, iconColor, 0.85) +
            t(48, 188 + i * 25, label, muted, 12.5, 500) +
            t(252, 188 + i * 25, value, fg, 13, 600, 'end', mono) +
            `</g>`
        )
        .join('') +
      rightMetrics
        .map(
          ([d, label, value], i) =>
            `<g class="stagger" style="animation-delay:${650 + i * 100}ms">` +
            icon(d, 288, 177 + i * 25, iconColor, 0.85) +
            t(310, 188 + i * 25, label, muted, 12.5, 500) +
            t(514, 188 + i * 25, value, fg, 13, 600, 'end', mono) +
            `</g>`
        )
        .join('') +
      `<g class="stagger" style="animation-delay:950ms">` +
      t(514, 260, 'Updated ' + data.date, muted, 10, 400, 'end') +
      `</g>`,
    statsStyle
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
      `<line x1="22" y1="126" x2="418" y2="126" stroke="${divider}" stroke-width="1"/>` +
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso, withYear = false) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}${withYear ? ', ' + y : ''}`;
}

function formatRange(startIso, endIso) {
  if (!startIso || !endIso) return '';
  if (startIso === endIso) return formatDate(startIso, true);
  const sameYear = startIso.slice(0, 4) === endIso.slice(0, 4);
  return `${formatDate(startIso, !sameYear)} - ${formatDate(endIso, !sameYear)}`;
}

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

async function graphql(query, variables = {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error('GitHub GraphQL returned ' + response.status);
  const json = await response.json();
  if (json.errors?.length) throw new Error('GitHub GraphQL error: ' + json.errors[0].message);
  return json.data;
}

async function fetchStreakStats(login) {
  const yearsData = await graphql(
    `query($login: String!) {
      user(login: $login) {
        createdAt
        contributionsCollection {
          contributionYears
        }
      }
    }`,
    { login }
  );
  const years = yearsData.user.contributionsCollection.contributionYears;
  const calendars = await Promise.all(
    years.map((year) =>
      graphql(
        `query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
        { login, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` }
      )
    )
  );

  const byDate = new Map();
  for (const cal of calendars) {
    for (const week of cal.user.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        byDate.set(day.date, day.contributionCount);
      }
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const days = [...byDate.entries()]
    .filter(([date]) => date <= today)
    .sort(([a], [b]) => a.localeCompare(b));

  let totalContributions = 0;
  let firstActiveDate = null;
  let longest = { len: 0, start: null, end: null };
  let run = { len: 0, start: null, end: null };

  for (const [date, count] of days) {
    totalContributions += count;
    if (count > 0) {
      if (!firstActiveDate) firstActiveDate = date;
      if (run.len === 0) run.start = date;
      run.len += 1;
      run.end = date;
      if (run.len >= longest.len) {
        longest = { ...run };
      }
    } else {
      run = { len: 0, start: null, end: null };
    }
  }

  let current = { len: 0, start: null, end: null };
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const [date, count] = days[i];
    if (count > 0) {
      if (!current.end) current.end = date;
      current.start = date;
      current.len += 1;
    } else if (i === days.length - 1 && date === today) {
      continue;
    } else {
      break;
    }
  }

  const createdDate = yearsData.user.createdAt.slice(0, 10);
  const startLabel = formatDate(firstActiveDate ?? createdDate, true);

  return {
    totalContributions,
    contributionsRange: `${startLabel} - Present`,
    currentStreak: current.len,
    currentStreakRange: formatRange(current.start, current.end),
    longestStreak: longest.len,
    longestStreakRange: formatRange(longest.start, longest.end),
  };
}

async function count(query) {
  const result = await api('/search/issues?per_page=1&q=' + encodeURIComponent(query));
  if (result.incomplete_results || !Number.isSafeInteger(result.total_count)) {
    throw new Error('Incomplete search results: ' + query);
  }
  return result.total_count;
}

async function allOwnedRepos() {
  const all = [];
  let page = 1;
  while (page <= 20) {
    const batch = await api(`/users/LUC4N3X/repos?per_page=100&type=owner&page=${page}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return all;
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

const [user, repos, project, prs, merged, issues, downloads, streak] = await Promise.all([
  api('/users/LUC4N3X'),
  allOwnedRepos(),
  api('/repos/LUC4N3X/Levyra-deepsound'),
  count('author:LUC4N3X type:pr is:public'),
  count('author:LUC4N3X type:pr is:merged is:public'),
  count('user:LUC4N3X type:issue is:public'),
  totalLevyraDownloads(),
  fetchStreakStats('LUC4N3X'),
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
  ...streak,
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
