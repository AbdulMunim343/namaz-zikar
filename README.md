# نماز و اذکار

نماز، وتر اور صبح و شام کے اذکار — **قدم بہ قدم، بڑی تحریر میں، اردو میں۔**

یہ ویب سائٹ خاص طور پر ایسے شخص کے لیے بنائی گئی ہے جو بیماری کے بعد نماز کا
طریقہ بھول گیا ہو۔ اس لیے:

- **موبائل ایپ جیسی ساخت** — اوپر کی پٹی اور نیچے کے بٹن اپنی جگہ جمے رہتے ہیں،
  صرف درمیان کا حصہ اوپر نیچے ہوتا ہے۔
- نیچے چار خانوں والی پٹی: **نماز | وتر | اذکار | رات** — ہر وقت ایک ہی دبانے کی دوری پر۔
- اذکار میں تین حصے: **صبح | شام | نماز کے بعد**۔ نماز مکمل ہوتے ہی «نماز کے بعد کے
  اذکار» کا بٹن سامنے آ جاتا ہے۔
- تسبیح گنتے وقت ہر دبانے پر ہلکی سی «ٹِک» اور گنتی پوری ہونے پر الگ آواز۔
- **«اگلا قدم» ہمیشہ نیچے** انگوٹھے کے نیچے رہتا ہے، دعا کتنی ہی لمبی ہو۔
- پانچوں نمازیں **مرکزی صفحے پر ہی** ہیں — ایک ہی دبانے سے نماز شروع۔
- ایک وقت میں **صرف ایک قدم** سکرین پر آتا ہے — کچھ یاد رکھنے کی ضرورت نہیں۔
- تحریر **بہت بڑی** ہے، اور اوپر «A+» سے اور بھی بڑی کی جا سکتی ہے۔
- ہر قدم پر لکھا ہوتا ہے کہ **جسم کے ساتھ کیا کرنا ہے** اور **کیا پڑھنا ہے**۔
- ہر دعا **عربی**، **اردو میں تلفظ** اور **اردو ترجمہ** — تینوں کے ساتھ۔
- «قدم 4 از 26» ہمیشہ نظر آتا ہے، تاکہ معلوم رہے کتنا باقی ہے۔
- درمیان میں موبائل بند ہو جائے تو اگلی بار **«جاری رکھیں»** کا بٹن آ جاتا ہے۔
- انٹرنیٹ کے بغیر بھی چلتی ہے۔
- **اینڈرائیڈ ایپ** بھی موجود ہے — اوپر والی پٹی سے ڈاؤن لوڈ کر لیں۔

نماز کا طریقہ **اہلحدیث** مسلک کے مطابق ہے (رفع الیدین، آمین بلند آواز سے، ہاتھ
سینے پر)۔ وتر دو الگ نمازیں ہیں: پہلے ۲ رکعت پڑھ کر سلام، پھر الگ نیت سے ۱ رکعت
جس میں دعائے قنوت رکوع سے پہلے پڑھی جاتی ہے۔

---

## موبائل پر ایپ کی طرح لگانے کا طریقہ

1. موبائل کے براؤزر میں ویب سائٹ کھولیں۔
2. **اینڈرائیڈ (Chrome):** اوپر ⋮ دبائیں → «Add to Home screen».
   **آئی فون (Safari):** نیچے شیئر کا نشان دبائیں → «Add to Home Screen».
3. اب ہوم سکرین پر مسجد والا نشان آ جائے گا — اسے دبا کر ایپ کی طرح کھولیں۔

ایک بار کھولنے کے بعد یہ **انٹرنیٹ کے بغیر** بھی کام کرتی ہے۔

---

## اینڈرائیڈ ایپ (APK)

ویب سائٹ کے اوپر «اینڈرائیڈ ایپ ڈاؤن لوڈ کریں» کی پٹی سے APK ڈاؤن لوڈ کریں۔

فون پر انسٹال کرنے کا طریقہ:

1. لنک دبا کر فائل ڈاؤن لوڈ کریں۔
2. فون پوچھے گا — براؤزر کو **«نامعلوم ایپس انسٹال کرنے کی اجازت»** دے دیں
   (Settings → Apps → Chrome → Install unknown apps)۔
3. ڈاؤن لوڈ شدہ فائل کھولیں اور Install دبائیں۔

ایپ بالکل ویب سائٹ جیسی ہے، اور انٹرنیٹ کے بغیر بھی چلتی ہے۔

---

## Android build

The APK is the same app: [Capacitor](https://capacitorjs.com) wraps the very
same `dist/` build in an Android shell, so there is one codebase and the phone
app can never drift from the website.

`.github/workflows/android.yml` builds it on every push (GitHub's runners have
the Android SDK preinstalled) and publishes it to a fixed `apk-latest` release,
which is exactly the URL the in-app download bar points at — so the link keeps
working as new versions ship.

To build it yourself you need the Android SDK and JDK 21 locally:

```bash
npm run android:apk      # → android/app/build/outputs/apk/debug/app-debug.apk
```

`npm run android:sync` alone just copies a fresh web build into the Android
project. The APK is **debug-signed**, which is fine for installing directly on
a phone but not for the Play Store; that would need a release keystore.

---

## Development

Plain frontend — React + Vite, no backend and no database.

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

### Project layout

| Path | What's in it |
| --- | --- |
| `src/data/namaz.js` | Prayer definitions and the step builder |
| `src/data/witr.js` | Both witr prayers — ۲ رکعت, and ۱ رکعت with Dua-e-Qunoot |
| `src/data/nightAzkaar.js` | سونے کے اذکار — the bedtime duas |
| `src/data/afterNamazAzkaar.js` | نماز کے بعد کے اذکار — the post-prayer duas |
| `src/lib/sfx.js` | Counter tick and completion chime |
| `src/data/azkaar.js` | The short morning/evening duas |
| `src/App.jsx` | App shell — routes plus the bottom tab bar |
| `src/components/TabBar.jsx` | Bottom tab bar (hidden during a prayer) |
| `src/components/StepPlayer.jsx` | The one-step-per-screen player (namaz + witr) |
| `src/pages/Home.jsx` | Home screen — the five prayers, وتر and اذکار |
| `src/components/ZikrCard.jsx` | One dua plus its tap-to-count circle |
| `src/components/ZikrList.jsx` | Shared list + daily counters (صبح/شام and رات) |
| `src/styles.css` | All styling: RTL, large type, light/dark |
| `public/audio/` | Optional recordings — see the README in that folder |
| `public/fonts/` | Self-hosted Noto Nastaliq Urdu + Amiri Quran (SIL OFL 1.1) |

### Layout

The app is a fixed shell, not a scrolling document: `.app` is exactly one
viewport tall and never scrolls. The header and the bottom bar are flex children
that hold their position, and only `.page` between them scrolls. During a prayer
the tab bar is swapped for a pinned `.actionbar`, so «اگلا قدم» stays under the
thumb no matter how long the dua on screen is.

**Correcting a translation or adding a dua** means editing one entry in
`src/data/` — no component changes needed.

### Audio

**The recordings ship with the app.** 38 clips live in `public/audio/`, one per
dua, and `src/data/audioManifest.js` (generated at build time) lists them. The
🔊 «سنیں» button plays the bundled file; nothing depends on the phone.

That last point is the whole reason they exist. Speech previously came from the
device's text-to-speech, and Android phones very often ship **no Urdu voice at
all and frequently no Arabic one**, so «سنیں» was silent on the very phone this
was built for. Text-to-speech remains only as a fallback for a dua with no
recording, which is currently none of them.

The reader is a **male voice** (espeak-ng's `ar+m3` variant at a low pitch).

The clips are **synthesised with espeak-ng, not recited** — clear enough to
follow the words, but robotic, and no substitute for a qari. Replacing any file
in `public/audio/` with a real recording of the same name takes effect
immediately, with no code change:

```bash
pip install espeakng-loader imageio-ffmpeg
npm run audio:texts          # dump the Arabic of every dua
python3 scripts/generate.py  # synthesise + encode into public/audio/
npm run audio:manifest       # refresh the list (also runs on every build)
```

Whether a recording exists is decided from that build-time list rather than by
asking the server. Asking was unreliable inside the APK: Capacitor's local
server answers unknown paths with `index.html` — HTTP 200 — so a missing file
looked present, no error fired, and nothing was ever heard.

### Deployment

The build's base path comes from the `VITE_BASE` environment variable and
defaults to `/`, the domain root.

**Vercel** (or any host serving from a domain root, or a custom domain) needs no
configuration — the defaults are already correct. Vercel auto-detects Vite:
build command `npm run build`, output directory `dist`. Routing is hash-based
(`/#/namaz`), so no rewrite rules are needed either.

**GitHub Pages** serves the repo from the `/namaz-zikar/` sub-path instead, so
`.github/workflows/deploy.yml` sets `VITE_BASE=/namaz-zikar/` for that build.
Pushing to `main` publishes automatically; enable it once under
**Settings → Pages → Source: GitHub Actions**.

If you ever host under a different sub-path, build with
`VITE_BASE=/your-path/ npm run build`.
