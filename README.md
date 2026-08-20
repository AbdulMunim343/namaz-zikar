# نماز و اذکار

نماز، وتر اور صبح و شام کے اذکار — **قدم بہ قدم، بڑی تحریر میں، اردو میں۔**

یہ ویب سائٹ خاص طور پر ایسے شخص کے لیے بنائی گئی ہے جو بیماری کے بعد نماز کا
طریقہ بھول گیا ہو۔ اس لیے:

- ایک وقت میں **صرف ایک قدم** سکرین پر آتا ہے — کچھ یاد رکھنے کی ضرورت نہیں۔
- تحریر **بہت بڑی** ہے، اور اوپر «A+» سے اور بھی بڑی کی جا سکتی ہے۔
- ہر قدم پر لکھا ہوتا ہے کہ **جسم کے ساتھ کیا کرنا ہے** اور **کیا پڑھنا ہے**۔
- ہر دعا **عربی**، **اردو میں تلفظ** اور **اردو ترجمہ** — تینوں کے ساتھ۔
- «قدم ۴ از ۲۶» ہمیشہ نظر آتا ہے، تاکہ معلوم رہے کتنا باقی ہے۔
- درمیان میں موبائل بند ہو جائے تو اگلی بار **«جاری رکھیں»** کا بٹن آ جاتا ہے۔
- انٹرنیٹ کے بغیر بھی چلتی ہے۔

نماز کا طریقہ **اہلحدیث** مسلک کے مطابق ہے (رفع الیدین، آمین بلند آواز سے، ہاتھ
سینے پر، اور وتر میں دعائے قنوت رکوع سے پہلے)۔

---

## موبائل پر ایپ کی طرح لگانے کا طریقہ

1. موبائل کے براؤزر میں ویب سائٹ کھولیں۔
2. **اینڈرائیڈ (Chrome):** اوپر ⋮ دبائیں → «Add to Home screen».
   **آئی فون (Safari):** نیچے شیئر کا نشان دبائیں → «Add to Home Screen».
3. اب ہوم سکرین پر مسجد والا نشان آ جائے گا — اسے دبا کر ایپ کی طرح کھولیں۔

ایک بار کھولنے کے بعد یہ **انٹرنیٹ کے بغیر** بھی کام کرتی ہے۔

---

## Development

Plain frontend — React + Vite, no backend and no database.

```bash
npm install
npm run dev        # http://localhost:5173/namaz-zikar/
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

### Project layout

| Path | What's in it |
| --- | --- |
| `src/data/namaz.js` | Prayer definitions and the step builder |
| `src/data/witr.js` | Witr steps, including Dua-e-Qunoot |
| `src/data/azkaar.js` | The short morning/evening duas |
| `src/components/StepPlayer.jsx` | The one-step-per-screen player (namaz + witr) |
| `src/components/ZikrCard.jsx` | One dua plus its tap-to-count circle |
| `src/components/Posture.jsx` | The قیام / رکوع / سجدہ figures (inline SVG) |
| `src/styles.css` | All styling: RTL, large type, light/dark |
| `public/audio/` | Optional recordings — see the README in that folder |
| `public/fonts/` | Self-hosted Noto Nastaliq Urdu + Amiri Quran (SIL OFL 1.1) |

**Correcting a translation or adding a dua** means editing one entry in
`src/data/` — no component changes needed.

### Audio

Audio is entirely frontend. Each step carries an optional `audio` filename:

1. If that file exists in `public/audio/`, the 🔊 button plays the recording.
2. If not, the phone's own text-to-speech reads the Arabic and then the Urdu.

So the app speaks today, and real recordings can be added later at any time —
see [`public/audio/README.md`](public/audio/README.md).

### Deployment

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Enable it once under
**Settings → Pages → Source: GitHub Actions**.

The site is served from `/namaz-zikar/` (set as `base` in `vite.config.js`). To
host it at a domain root instead, build with `npm run build -- --base=/`.
