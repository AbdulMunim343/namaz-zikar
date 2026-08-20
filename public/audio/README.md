# آواز کی فائلیں (audio files)

یہ فولڈر خالی ہے۔ ابھی ایپ ہر دعا کو **موبائل کی اپنی آواز** (text-to-speech) سے
پڑھ کر سناتی ہے۔ اگر آپ اپنی یا کسی قاری کی آواز میں ریکارڈنگ رکھنا چاہیں تو
صرف فائلیں یہاں رکھ دیں — کوڈ میں کوئی تبدیلی کی ضرورت نہیں۔

---

## How to add real recordings

Each step and dua carries an optional `audio` filename. When a file with that
name exists in this folder, the 🔊 button plays **that recording**; otherwise it
falls back to the phone's built-in text-to-speech.

Drop in `.mp3` files named exactly as listed below.

### نماز (`src/data/namaz.js`)

| فائل | کیا پڑھنا ہے |
| --- | --- |
| `takbir.mp3` | اللہ اکبر |
| `istiftah.mp3` | دعائے استفتاح — سبحانک اللھم |
| `taawwuz.mp3` | اعوذ باللہ + بسم اللہ |
| `tasmiya.mp3` | بسم اللہ (دوسری رکعت سے) |
| `fatiha.mp3` | سورۃ الفاتحہ |
| `ameen.mp3` | آمین |
| `kafirun.mp3` | سورۃ الکافرون |
| `ikhlas.mp3` | سورۃ الاخلاص |
| `falaq.mp3` | سورۃ الفلق |
| `naas.mp3` | سورۃ الناس |
| `ruku.mp3` | سبحان ربی العظیم |
| `qawma.mp3` | سمع اللہ لمن حمدہ / ربنا ولک الحمد |
| `sajda.mp3` | سبحان ربی الاعلیٰ |
| `jalsa.mp3` | رب اغفر لی وارحمنی |
| `tashahhud.mp3` | التحیات |
| `durood.mp3` | درودِ ابراہیمی |
| `dua-salam.mp3` | سلام سے پہلے کی دعا |
| `salam.mp3` | السلام علیکم ورحمۃ اللہ |

### وتر (`src/data/witr.js`)

| فائل | کیا پڑھنا ہے |
| --- | --- |
| `qunoot-1.mp3` | دعائے قنوت — پہلا حصہ |
| `qunoot-2.mp3` | دعائے قنوت — دوسرا حصہ |

### اذکار (`src/data/azkaar.js`)

`zikr-ayat-ul-kursi.mp3`, `zikr-ikhlas.mp3`, `zikr-falaq.mp3`, `zikr-naas.mp3`,
`zikr-asbahna.mp3`, `zikr-sayyid-istighfar.mp3`, `zikr-la-yadurr.mp3`,
`zikr-radeetu.mp3`, `zikr-subhanallah.mp3`, `zikr-hasbiyallah.mp3`,
`zikr-tahleel.mp3`

### سونے کے اذکار (`src/data/nightAzkaar.js`)

`baqarah-285.mp3`, `baqarah-286.mp3` — سورۃ البقرہ کا آخری رکوع

### مشورے (tips)

- Keep each file short — one dua per file.
- MP3, mono, 64–96 kbps is plenty and keeps the app fast on mobile data.
- After adding files, run `npm run build` and deploy again.
- A partial set is fine: any dua without a file simply uses text-to-speech.
