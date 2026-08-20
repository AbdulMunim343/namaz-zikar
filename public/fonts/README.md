# Fonts

Both faces are bundled with the app (rather than loaded from a CDN) so that the
Urdu Nastaliq script renders correctly on the first load, on a weak connection,
and fully offline.

| File | Family | License |
| --- | --- | --- |
| `noto-nastaliq-urdu-*.woff2` | Noto Nastaliq Urdu — the Urdu interface text | SIL OFL 1.1 — see `OFL-Noto-Nastaliq-Urdu.txt` |
| `amiri-quran-arabic.woff2` | Amiri Quran — the vowelled Arabic of the duas | SIL OFL 1.1 — see `OFL-Amiri-Quran.txt` |

The `@font-face` rules live at the top of `src/styles.css`.
