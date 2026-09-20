export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'zero-telemetry-architecture-android',
    title: 'Zero-Telemetry Architecture: Building Private Android Apps in 2026',
    description: 'How to design production-grade Android applications without third-party analytics SDKs, relying entirely on on-device Room SQLite storage and direct TLS streams.',
    date: '2026-09-12',
    readingTime: '7 min read',
    tags: ['Android', 'Architecture', 'Privacy', 'SQLite'],
    featured: true,
    content: [
      'The prevailing assumption in modern mobile development is that every user tap, playback event, and session duration must be collected, aggregated, and beamed to a remote data lake. While telemetry offers developers easy diagnostics, it introduces substantial latency, battery drain, and privacy vulnerabilities.',
      'In building software like Levyra, the objective was inverted: can we achieve total diagnostic observability and rich user features without sending a single byte of telemetry off the device?',
      'The foundation begins at the database layer. Instead of synchronizing state with cloud backends, the application relies on an on-device Room SQLite database. Playback history, playlists, search caching, and user preferences never traverse a network interface. When indices are optimized and write transactions are dispatched on IO coroutine dispatchers, local SQLite operations execute in sub-millisecond windows.',
      'For network requests, direct TLS 1.3 handshakes connect directly to content endpoints. There are no intermediary analytics proxies, no device fingerprinting headers, and no third-party tracker SDKs compiled into the APK binary.',
      'Designing for zero telemetry forces developers to write defensive, deterministic code. When you cannot monitor crashes via an external dashboard, your error handling must be exhaustive, and your local log rings must provide clear, privacy-preserving auditability directly to the user.'
    ]
  },
  {
    slug: 'taming-androidx-media3-exoplayer',
    title: 'Taming AndroidX Media3: Gapless Playback, Ring Buffers and OEM Quirks',
    description: 'A deep dive into Android audio playback lifecycles: managing MediaSessionService foreground stability, custom ring buffers, and surviving aggressive OEM battery killers.',
    date: '2026-08-28',
    readingTime: '9 min read',
    tags: ['Android', 'Media3', 'ExoPlayer', 'Kotlin'],
    featured: true,
    content: [
      'Audio playback on Android appears simple until you encounter the reality of OEM background task killers, dynamic audio focus preemption, and high-resolution stream transitions.',
      'The migration to AndroidX Media3 consolidates player logic and foreground service lifecycle into a unified MediaSession architecture. However, achieving true gapless playback with dynamic bitrate streams requires custom tuning of ExoPlayer DefaultLoadControl.',
      'By implementing an adaptive ring buffer with calibrated minimum and maximum buffer durations, the player maintains steady audio decode pipelines even during intermittent cellular handoffs. AudioTrack underruns are mitigated by pre-fetching the next queued item before the current track completes its decoding cycle.',
      'Handling background lifecycles across diverse OEM distributions (such as Xiaomi MIUI/HyperOS, Samsung OneUI, and Google Pixel) requires rigorous adherence to ForegroundServiceType restrictions. Proper notification channels and lifecycle callbacks ensure the media service remains active without leaking wake locks or draining battery reserves.',
      'The end result is an audio engine that starts instantly, transitions between tracks without silence or pops, and continues playing uninterrupted regardless of device power states.'
    ]
  },
  {
    slug: 'reverse-engineering-media-extraction',
    title: 'Reverse Engineering Modern Media Extraction Engines',
    description: 'Inside the LevyraExtractor subsystem: parsing abstract syntax trees, dynamic token evaluation, and maintaining resilience against upstream API transformations.',
    date: '2026-08-10',
    readingTime: '8 min read',
    tags: ['Reverse Engineering', 'Parsing', 'Networking', 'AST'],
    featured: true,
    content: [
      'Extracting media streams from modern web platforms is an adversarial engineering challenge. Content providers continuously alter player JavaScript bundles, obfuscate variable names, and inject dynamic token challenges designed to thwart automated scrapers.',
      'The traditional approach of regular expressions is brittle and fails whenever minification schemes change. Inside the LevyraExtractor subsystem, media extraction relies on structured Abstract Syntax Tree (AST) analysis rather than naive regex pattern matching.',
      'When an upstream platform updates its player bundle, the extraction pipeline isolates the decryption algorithm by analyzing function signatures, control flow graphs, and mathematical transformations rather than static identifiers.',
      'Dynamic token transformations are evaluated within a sandboxed interpreter, producing authentic decryption keys in real time. This ensures that stream URLs, audio formats, and synced lyrics can be resolved accurately without relying on bloated embedded webviews.',
      'Maintaining extraction resilience requires continuous fuzz testing, comprehensive unit test suites covering edge-case payloads, and decoupling the network parser from the application UI.'
    ]
  },
  {
    slug: 'discipline-of-small-pull-requests',
    title: 'The Discipline of Small PRs and Verified Fixes',
    description: 'Why massive architectural rewrites often mask underlying bugs, and why disciplined, evidence-backed, minimal code changes produce superior software long-term.',
    date: '2026-07-22',
    readingTime: '6 min read',
    tags: ['Software Engineering', 'Code Review', 'Productivity'],
    featured: false,
    content: [
      'There is a persistent temptation in software development to answer every difficult bug with a complete rewrite. Rewrites feel productive because they replace unfamiliar, legacy code with code you personally wrote. Yet in almost every case, rewrites discard years of hard-won edge case handling.',
      'A disciplined engineering workflow starts with isolation. Before changing a single line of production code, reproduce the failure with an automated test or a deterministic script. If you cannot prove why a bug occurs, you cannot prove that your fix resolves it.',
      'Small, scoped pull requests are easier to review, easier to bisect when regressions occur, and significantly less likely to introduce subtle timing or concurrency faults.',
      'Engineering excellence is not measured by the number of lines added to a repository; it is measured by the clarity of the problem statement, the surgical precision of the diff, and the durability of the solution in production.'
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
