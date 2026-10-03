export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "levyra-enhanced-audio-dsp-and-320kbps-verification",
    title: "Levyra Enhanced Audio: 2048-point FFT cutoff detection and band replication",
    excerpt: "How Levyra detects hard low-pass codec cutoffs in lossy streams, rebuilds missing high frequencies with an IIR Hilbert pair, and leaves true 320 kbps AAC and lossless files untouched.",
    date: "2026-09-28",
    readTime: "6 min read",
    category: "Audio DSP",
    tags: ["Kotlin", "Audio DSP", "FFT", "Media3", "Levyra"],
    featured: true,
    content: `
      <p>Lossy encoders save bits at lower bitrates by applying a hard low-pass filter before quantization. A 128 kbps AAC stream often drops everything above 16 or 17 kHz. When you switch between a full-band 320 kbps stream and a 128 kbps fallback on decent headphones, that missing top octave is the first thing you notice.</p>

      <p>I built <strong>Levyra Enhanced Audio</strong> to restore high-frequency air when a stream actually has a measurable brickwall cutoff, while staying completely out of the way when the source is already full-band or lossless.</p>

      <h2>Verifying real 320 kbps streams first</h2>
      <p>Before touching DSP, we verified what the streaming providers actually deliver. JioSaavn's <code>_320.mp4</code> endpoint returns a true 320 kbps AAC-LC stream inside an MP4/M4A container at 44.1 kHz stereo. Inspecting the decoded audio with <code>ffprobe</code> and an FFT spectrogram confirms energy extending up to roughly 20 kHz:</p>
      <ul>
        <li>Codec: <code>aac (LC)</code> (<code>mp4a / 0x6134706D</code>)</li>
        <li>Sample rate: <code>44100 Hz</code>, stereo</li>
        <li>Measured stream bitrate: ~320 to 326 kbps (about 8.2 MB for a 3.5-minute track)</li>
      </ul>
      <p>Because JioSaavn 320 kbps AAC already carries full-band content up to 20 kHz, Enhanced Audio bypasses it automatically and passes the samples through bit-identical. The same happens for local FLAC, ALAC, and PCM files, which are bypassed based on the decoder input format rather than provider labels.</p>

      <h2>Detecting a codec cutoff without false positives</h2>
      <p><code>EnhancedAudioAnalyzer</code> runs a 2048-point FFT on the mono mix roughly ten times per second and averages the spectrum over time. It scans between 11 kHz and 19.5 kHz for a brickwall edge and only triggers when three conditions hold at the same time:</p>
      <ul>
        <li>The spectral level drops by at least 30 dB across the candidate cutoff frequency.</li>
        <li>The band above the edge is effectively empty (at least 50 dB below the 1 to 6 kHz average level).</li>
        <li>There is real musical signal just below the edge rather than silence or a dark acoustic fade.</li>
      </ul>
      <p>A natural acoustic roll-off on a warm piano recording or a quiet intro does not meet those thresholds, so nothing gets synthesized when it should not.</p>

      <h2>Rebuilding the upper band on the audio thread</h2>
      <p>When a cutoff is confirmed, <code>DspRestorationEngine</code> reconstructs the missing band using spectral band replication, similar in principle to SBR codecs:</p>
      <ol>
        <li>It band-passes the octave just below the detected cutoff independently on the left and right channels to keep the stereo image intact.</li>
        <li>It shifts that band upward via single-sideband modulation using an IIR Hilbert transform pair so the harmonics land directly above the cutoff.</li>
        <li>It high-passes the shifted signal at the cutoff frequency and mixes it in at a level extrapolated from the track's measured spectral slope, minus a 3 dB safety margin, scaled by the analyzer's confidence.</li>
        <li>Gain changes are ramped per block to avoid zipper noise, and a soft-knee limiter catches any peaks above -0.5 dBFS.</li>
      </ol>
      <p>The entire engine allocates zero objects on the audio thread, adds no buffering latency, and takes roughly 20 to 100 microseconds per 1024-frame block on the JVM.</p>

      <h2>Measured results against lossless references</h2>
      <p>We tested the shipped Kotlin engine against lossless masters re-encoded at different AAC bitrates, measuring Log-Spectral Distance (LSD) and high-frequency LSD above 16 kHz (lower dB is closer to the original master):</p>
      <ul>
        <li><strong>AAC 320 kbps:</strong> bypassed (LSD stays at 2.32 dB, 0 clipped samples).</li>
        <li><strong>AAC 128 kbps (synthetic reference):</strong> overall LSD drops from 14.13 dB to 8.15 dB, and HF-LSD above 16 kHz drops from 24.90 dB to 13.22 dB.</li>
        <li><strong>AAC 128 kbps (real music master):</strong> overall LSD improves from 11.80 dB to 9.67 dB, and HF-LSD drops from 20.41 dB to 16.03 dB.</li>
      </ul>
      <p>Enhanced Audio never fakes source badges in the UI. An AAC stream is still labeled <code>AAC (Lossless: No)</code>, and the Technical Audio Info sheet shows whether the DSP stage is <code>Active</code> or <code>Bypassed</code> along with the exact reason.</p>
    `
  },
  {
    slug: "native-compose-multiplatform-and-libvlc-on-windows",
    title: "Running Levyra natively on Windows with Compose Multiplatform and libVLC",
    excerpt: "Why the Windows build of Levyra skips Electron and WebView wrappers in favor of Compose Multiplatform on JVM 21, native libVLC C bindings, and hardware-accelerated Skia rendering.",
    date: "2026-09-18",
    readTime: "5 min read",
    category: "Desktop & KMP",
    tags: ["Kotlin Multiplatform", "Windows", "libVLC", "Compose", "Architecture"],
    featured: true,
    content: `
      <p>Most cross-platform music players on desktop take the easy route: ship a Chromium instance inside Electron or wrap a web app in a system WebView. That works, but you end up paying 400 to 800 MB of idle RAM just to keep a playback queue open in the background.</p>

      <p>When I brought Levyra to Windows 10 and 11, I wanted it to share the Kotlin core from the Android app without turning the desktop build into a browser tab.</p>

      <h2>Sharing the core, swapping the media engine</h2>
      <p>Levyra uses Kotlin Multiplatform so the domain logic, playlist database, synced lyrics parser, provider resolvers, and UI components live in shared modules. Where the platforms diverge is the low-level audio output:</p>
      <ul>
        <li>On <strong>Android</strong>, playback runs through Jetpack Media3 and ExoPlayer with custom <code>AudioProcessor</code> stages attached directly to the PCM pipeline.</li>
        <li>On <strong>Windows (x64)</strong>, the UI renders through Compose Multiplatform (Skia on DirectX/OpenGL) running on a bundled JVM 21 runtime, while audio decoding and output are handled natively by <strong>libVLC</strong> through <code>vlcj</code> C bindings.</li>
      </ul>

      <h2>Why native JVM + libVLC beats a web wrapper</h2>
      <p>Running directly on JVM 21 with native <code>libVLC</code> binaries gives a very different runtime profile compared to an Electron build:</p>
      <ul>
        <li><strong>Memory footprint:</strong> Because there is no Chromium V8 heap or DOM tree sitting behind the window, idle and background playback memory stays roughly 60% to 75% lower than an equivalent Electron player.</li>
        <li><strong>Direct codec support:</strong> <code>libVLC</code> decodes AAC, Opus, FLAC, ALAC, Vorbis, and WAV in native C/C++ threads and talks directly to the Windows audio session APIs without browser sandbox limits.</li>
        <li><strong>Shared DSP and lyrics sync:</strong> Frame timestamps from the native player feed the exact same 60fps Compose lyrics canvas and equalizer presets used on Android.</li>
      </ul>

      <h2>Qualifying builds before release</h2>
      <p>Shipping across both Android and Windows means catching platform quirks before tagging a release. In the repository, every non-trivial change goes through <code>scripts/ai_quality_gate.py --profile full</code> for static and build verification, paired with <code>scripts/levyra-device-qualification.ps1</code> to install debug APKs on a physical phone, verify <code>MediaSession</code> state, and record memory profiles over ADB.</p>
    `
  },
  {
    slug: "building-levyra-media3-audio-pipeline",
    title: "Designing Levyra's audio pipeline with Jetpack Media3",
    excerpt: "How Levyra handles gapless transitions, local caching, and frame-accurate synced lyrics on Android using Jetpack Media3 and Kotlin Coroutines.",
    date: "2026-03-28",
    readTime: "6 min read",
    category: "Android Audio",
    tags: ["Kotlin", "Media3", "Android", "Audio Engineering", "Levyra"],
    featured: true,
    content: `
      <p>When I started working on <strong>Levyra</strong>, I wanted an Android music player that felt immediate and stayed out of the user's way. Many players either wrap a slow web view or bundle analytics and ad SDKs that wake the radio every few seconds. I wanted a native player built on a clean audio pipeline.</p>
      
      <h2>Why Jetpack Media3</h2>
      <p>Android audio APIs have changed several times over the years, moving from legacy <code>MediaPlayer</code> to standalone <code>ExoPlayer</code> and now <strong>Jetpack Media3</strong>. Media3 unifies playback, media session state, and background service lifecycles under a single contract.</p>
      <p>In Levyra, the playback engine runs inside an isolated <code>MediaSessionService</code>. That gives us three practical benefits:</p>
      <ul>
        <li>Background playback continues cleanly when the UI activity is destroyed or when Android puts the app in the background.</li>
        <li>System media controls, lock-screen seekbars, Bluetooth AVRCP metadata, and hardware volume buttons stay in sync with the internal player state.</li>
        <li>Custom <code>DataSource.Factory</code> chains let the player switch between local files, cached chunks, and remote streams without interrupting the queue.</li>
      </ul>

      <h2>Zero-gap transitions and offline vault</h2>
      <p>One of the most noticeable flaws in casual music players is the gap between tracks or a stutter when network strength drops. Levyra pairs a read-ahead ring buffer with a local <strong>Offline Vault</strong> so the next track in the queue is pre-buffered and pre-decoded before the current track reaches its final frames.</p>
      <p>When a track is saved for offline listening, Levyra stores the audio stream alongside its cover art and time-synced LRC/TTML lyrics in local storage so playback works the same way on an airplane as it does on Wi-Fi.</p>

      <h2>Synchronizing lyrics at 60fps</h2>
      <p>Rendering time-synced lyrics smoothly requires polling the player position without flooding the main UI thread with recompositions. Instead of running a coarse 500ms timer, Levyra binds a coroutine flow to the active playback state and interpolates line progress on the Compose canvas. The active line scrolls and highlights smoothly without dropping frames.</p>
    `
  },
  {
    slug: "why-zero-telemetry-matters-in-2026",
    title: "Why I ship software with zero telemetry",
    excerpt: "You do not need crash trackers, behavioral analytics, or mandatory user accounts to build and maintain reliable software.",
    date: "2026-03-15",
    readTime: "4 min read",
    category: "Privacy & Design",
    tags: ["Privacy", "Open Source", "Architecture", "Zero Telemetry"],
    featured: false,
    content: `
      <p>Open almost any popular mobile or desktop app inside a network proxy or static APK analyzer and you will see the same pattern: before the first screen finishes drawing, the app has already contacted three or four analytics endpoints, a remote config server, and a crash reporter.</p>

      <h2>The hidden cost of telemetry SDKs</h2>
      <p>Developers often justify analytics with the claim that they need telemetry to find bugs. In practice, third-party analytics SDKs add megabytes of transitive dependencies, run background threads on startup, wake the network radio, and turn personal listening habits into a remote profile.</p>
      <p>For a music player or a command-line utility, none of that is necessary. What you listen to at 2 AM is your business, not a dataset for an engagement dashboard.</p>

      <h2>How Levyra stays verifiable</h2>
      <p>Every tool I publish under <strong>LUC4N3X</strong> follows a simple rule: <strong>no telemetry, no ads, and no accounts</strong>.</p>
      <ul>
        <li>Play history, favorites, playlists, and equalizer presets live in local storage on your device, with encrypted local backup export when you want to move to a new phone.</li>
        <li>Network requests only happen when you search, stream a track, fetch lyrics, or check for an app update.</li>
        <li>Every release is built from public source code and checked by independent scanners like Apptizo and F-Droid, confirming 0 trackers and only the 5 Android permissions needed to play audio.</li>
      </ul>

      <h2>Debugging without spying on users</h2>
      <p>When a bug happens, users can export a local diagnostic log or open a GitHub issue with reproduction steps. Local logs and reproducible builds give me everything I need to fix crashes without collecting data from people who just want to listen to music.</p>
    `
  },
  {
    slug: "arch-linux-minimalist-developer-workflow",
    title: "My Arch Linux setup for Android and systems work",
    excerpt: "How I keep my Arch Linux workstation and shell scripts organized inside Thalarch Layer so a fresh install takes minutes instead of days.",
    date: "2026-02-20",
    readTime: "5 min read",
    category: "Linux & Workflow",
    tags: ["Arch Linux", "CLI", "Workflow", "Dotfiles", "Productivity"],
    featured: false,
    content: `
      <p>Compiling Kotlin Multiplatform builds, running Android emulators, and inspecting network captures all day quickly exposes any bloat in your operating system. If the desktop environment is eating 4 GB of RAM before Gradle even starts, builds slow down fast.</p>

      <h2>Why I keep everything in Thalarch Layer</h2>
      <p>I maintain my system configuration in <a href="https://github.com/LUC4N3X/thalarch-layer" target="_blank" rel="noopener noreferrer">Thalarch Layer</a> so my workstation is defined in version-controlled scripts rather than manual tweaks I might forget six months later.</p>
      <ul>
        <li>Only the services I actually use run at boot, leaving the rest of the CPU and RAM for the JVM compiler daemon, ADB, and native builds.</li>
        <li>Window management, terminal multiplexers, and ADB device qualification scripts are bound to direct keyboard shortcuts.</li>
        <li>Every dotfile and package list is tracked in Git, so setting up a second machine or recovering from a disk swap is a single script away.</li>
      </ul>

      <h2>Small CLI scripts over heavy GUIs</h2>
      <p>Whenever a task repeats more than a few times, whether it is pulling memory dumps from a test phone over wireless ADB or comparing JSON snapshots in <strong>Instara-Crew</strong>, I write a small Python or Bash script for it. Command-line tools compose cleanly, run in milliseconds, and never break because a GUI framework changed its theme engine.</p>
    `
  }
];
