export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'levyra-enhanced-audio-dsp-and-320kbps-verification',
    title: 'Levyra Enhanced Audio: 2048-Point FFT Cutoff Detection and Band Replication',
    description: 'How Levyra detects brickwall codec cutoffs in lower-bitrate streams, restores missing high frequencies with an IIR Hilbert pair, and leaves true 320 kbps AAC and lossless files untouched.',
    date: '2026-09-28',
    readingTime: '6 min read',
    category: 'Media3 & Audio',
    tags: ['Kotlin', 'Media3', 'Audio DSP', 'FFT'],
    featured: true,
    content: [
      'Lossy encoders save bits at lower bitrates by applying a hard low-pass filter before quantization. A 128 kbps AAC fallback often drops everything above 16 or 17 kHz. When you switch between a full-band 320 kbps stream and a 128 kbps stream on decent headphones, that missing top octave is the first thing you notice.',
      'Before writing any DSP code, I verified what streaming endpoints actually deliver. JioSaavn _320.mp4 streams return a genuine 320 kbps AAC-LC file inside an MP4/M4A container at 44.1 kHz stereo, with spectral energy extending up to roughly 20 kHz confirmed via ffprobe and FFT spectrograms. Because those streams are already full-band, Levyra Enhanced Audio bypasses them automatically and passes samples through bit-identically. The same bypass applies to local FLAC, ALAC, and PCM sources based on the decoder input format.',
      'To avoid false positives on acoustic tracks or quiet intros, EnhancedAudioAnalyzer runs a 2048-point FFT on the mono mix about ten times per second and averages the spectrum over time. It scans between 11 kHz and 19.5 kHz and only flags a codec cutoff when three conditions hold at once: the level drops by at least 30 dB across the edge, the band above the edge sits at least 50 dB below the 1 to 6 kHz average, and real musical content is present just below the edge.',
      'When a cutoff is confirmed, DspRestorationEngine rebuilds the missing upper band using spectral band replication. It band-passes the octave just below the cutoff per channel to preserve the stereo image, shifts it upward via single-sideband modulation using an IIR Hilbert transform pair, high-passes the result at the cutoff frequency, and mixes it in along the measured spectral slope with a 3 dB safety margin and a soft-knee limiter at -0.5 dBFS.',
      'The engine allocates zero objects on the audio thread, adds no buffering latency, and takes 20 to 100 microseconds per 1024-frame block on the JVM. On 128 kbps AAC test masters, high-frequency log-spectral distance above 16 kHz drops from 24.90 dB to 13.22 dB on synthetic references and from 20.41 dB to 16.03 dB on real music masters, while source format labels in Technical Audio Info remain honest.'
    ]
  },
  {
    slug: 'native-compose-multiplatform-and-libvlc-on-windows',
    title: 'Running Levyra Natively on Windows with Compose Multiplatform and libVLC',
    description: 'Why the Windows build of Levyra skips Electron and WebView wrappers in favor of Compose Multiplatform on JVM 21, native libVLC C bindings, and hardware-accelerated Skia rendering.',
    date: '2026-09-20',
    readingTime: '5 min read',
    category: 'Android Internals',
    tags: ['Kotlin Multiplatform', 'Windows', 'libVLC', 'Jetpack Compose'],
    featured: true,
    content: [
      'Most cross-platform desktop music players ship a full Chromium browser inside Electron or wrap a web app in a system WebView. That approach is quick to ship, but it costs 400 to 800 MB of idle RAM just to keep a playback queue open in the background.',
      'When I brought Levyra to Windows 10 and 11, I wanted to share the Kotlin core from the Android app without turning the desktop player into a browser tab. Compose Multiplatform lets both platforms share the UI, state machines, synced lyrics canvas, and playlist database while rendering through Skia on DirectX and OpenGL.',
      'For audio output on Windows (x64), Levyra runs on a bundled JVM 21 runtime and talks directly to native libVLC binaries through vlcj C bindings. Because there is no Chromium V8 heap or DOM tree sitting behind the window, memory usage during idle and background playback stays roughly 60% to 75% lower than an Electron wrapper.',
      'Every non-trivial change across Android and Windows is checked with repository quality-gate scripts before release, paired with a PowerShell ADB qualification script that installs debug APKs on a real phone, inspects MediaSession state, and records memory diagnostics.'
    ]
  },
  {
    slug: 'zero-telemetry-architecture-android',
    title: 'Zero-Telemetry Architecture: Building Private Android Apps in 2026',
    description: 'How to build Android applications without third-party analytics SDKs, using local Room SQLite storage and direct TLS connections.',
    date: '2026-09-12',
    readingTime: '7 min read',
    category: 'Zero Telemetry',
    tags: ['Android', 'Architecture', 'Privacy', 'SQLite'],
    featured: true,
    content: [
      'Many mobile apps treat every tap, playback event, and session duration as data to be collected and sent to a remote server. While telemetry gives developers a quick dashboard, it adds startup overhead, wakes the network radio, and turns personal listening habits into a user profile.',
      'When I built Levyra, I started from the opposite rule: keep every piece of personal data on the device and ship zero telemetry SDKs.',
      'Everything starts at the database layer. Instead of syncing state to a cloud backend, Levyra stores playback history, playlists, search cache, and preferences in an on-device Room SQLite database. With proper indexes and IO coroutine dispatchers, local queries finish in under a millisecond and work offline.',
      'Network requests only happen when you search, stream audio, fetch lyrics, or check for updates, connecting directly over TLS 1.3 without analytics proxies or fingerprinting headers. Independent static APK analysis on Apptizo confirms 0 trackers, 0 ad SDKs, and only 5 standard Android permissions.',
      'Shipping without remote crash trackers forces you to write careful error handling and give users a clean local diagnostic log they can inspect and share on GitHub if something goes wrong.'
    ]
  },
  {
    slug: 'taming-androidx-media3-exoplayer',
    title: 'Taming AndroidX Media3: Gapless Playback, Ring Buffers and OEM Quirks',
    description: 'Managing MediaSessionService foreground stability, custom ring buffers, and OEM background task killers on Android.',
    date: '2026-08-28',
    readingTime: '9 min read',
    category: 'Media3 & Audio',
    tags: ['Android', 'Media3', 'ExoPlayer', 'Kotlin'],
    featured: true,
    content: [
      'Audio playback on Android looks straightforward until your app runs into OEM background task killers, audio focus changes, and mid-stream network handoffs.',
      'AndroidX Media3 brings the player and the foreground service lifecycle together under a single MediaSession contract. Getting reliable gapless playback on variable networks still requires tuning ExoPlayer DefaultLoadControl.',
      'By using an adaptive ring buffer with calibrated buffer windows, the player keeps decoding smoothly when mobile coverage drops for a few seconds. Pre-fetching the next track in the queue before the current one finishes avoids audio underruns and gaps between songs.',
      'Staying alive in the background across MIUI, HyperOS, OneUI, and Pixel ROMs also requires strict adherence to Android 14+ ForegroundServiceType rules. Clean notification channels and audio focus callbacks keep playback running with the screen off without leaking wake locks.',
      'The result is a player that starts right away, moves between tracks without silence or clicks, and stays stable in your pocket.'
    ]
  },
  {
    slug: 'reverse-engineering-media-extraction',
    title: 'Reverse Engineering Modern Media Extraction Engines',
    description: 'How stream resolvers handle obfuscated player bundles, signature changes, and token challenges without embedded webviews.',
    date: '2026-08-10',
    readingTime: '8 min read',
    category: 'Reverse Engineering',
    tags: ['Reverse Engineering', 'Parsing', 'Networking', 'AST'],
    featured: true,
    content: [
      'Resolving media streams from web platforms is a moving target. Providers regularly rotate player JavaScript bundles, rename variables, and change token parameters.',
      'Simple regular expressions break as soon as a minifier reorders a function. A more durable resolver inspects the structure of the transformation functions rather than relying on fragile variable names.',
      'When an upstream bundle changes, isolating the cipher steps by their operations and control flow makes it possible to evaluate token challenges in a lightweight sandbox without spinning up a full hidden WebView.',
      'Keeping stream resolution reliable over time comes down to automated tests against real payloads and keeping the network parser cleanly separated from the player UI.'
    ]
  },
  {
    slug: 'discipline-of-small-pull-requests',
    title: 'The Discipline of Small PRs and Verified Fixes',
    description: 'Why small, tested changes hold up better than sweeping rewrites when maintaining open-source software.',
    date: '2026-07-22',
    readingTime: '6 min read',
    category: 'Craftsmanship',
    tags: ['Software Engineering', 'Code Review', 'Productivity'],
    featured: false,
    content: [
      'Whenever a tough bug shows up, it is tempting to rewrite the whole module from scratch. Writing new code feels faster than reading old code, but sweeping rewrites usually throw away edge-case fixes that were learned the hard way.',
      'My workflow starts with reproducing the bug first, either with a unit test or on a physical phone. If you cannot show why a failure happens, you cannot be sure your change actually fixed it.',
      'Small, focused pull requests are much easier to review, test, and bisect if a regression slips through.',
      'Good maintenance is not about how many lines of code you add in a weekend. It is about finding the real root cause, changing only what needs to change, and verifying that existing behavior still works.'
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
