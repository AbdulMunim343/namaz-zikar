import { useLocalStorage } from '../hooks/useLocalStorage.js'

/**
 * اینڈرائیڈ ایپ ڈاؤن لوڈ کریں
 *
 * A slim bar above the header offering the Android app. It hides itself when
 * it would be pointless or in the way:
 *   - already running inside the APK (Capacitor),
 *   - already installed as a home-screen app (standalone display),
 *   - dismissed once by the reader.
 */
const APK_URL =
  'https://github.com/AbdulMunim343/namaz-zikar/releases/download/apk-latest/namaz-zikar.apk'

function isInsideApp() {
  if (typeof window === 'undefined') return false
  if (window.Capacitor?.isNativePlatform?.()) return true
  return window.matchMedia?.('(display-mode: standalone)')?.matches === true
}

export default function DownloadBanner() {
  const [dismissed, setDismissed] = useLocalStorage('namaz:apkDismissed', false)

  if (dismissed || isInsideApp()) return null

  return (
    <div className="apkbar">
      <a className="apkbar__link" href={APK_URL} download>
        <span className="apkbar__icon" aria-hidden="true">
          ⬇️
        </span>
        <span className="apkbar__text">
          اینڈرائیڈ ایپ ڈاؤن لوڈ کریں
          <span className="apkbar__hint">فون میں انسٹال کر لیں — انٹرنیٹ کے بغیر چلے گی</span>
        </span>
      </a>
      <button
        type="button"
        className="apkbar__close"
        onClick={() => setDismissed(true)}
        aria-label="یہ پٹی بند کریں"
      >
        ✕
      </button>
    </div>
  )
}
