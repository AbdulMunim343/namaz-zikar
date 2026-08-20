/**
 * اینڈرائیڈ ایپ ڈاؤن لوڈ کریں
 *
 * A permanent bar above the header offering the Android app. There is no
 * dismiss control — the link is meant to stay put and stay findable.
 *
 * The one case it does not appear is inside the Android app itself, where
 * offering the reader a download of the app he is already using would only
 * confuse him.
 */
const APK_URL =
  'https://github.com/AbdulMunim343/namaz-zikar/releases/download/apk-latest/namaz-zikar.apk'

function isInsideApp() {
  if (typeof window === 'undefined') return false
  return window.Capacitor?.isNativePlatform?.() === true
}

import { useLang } from '../hooks/useLang.js'
import Icon from './Icon.jsx'

export default function DownloadBanner() {
  const { t } = useLang()

  if (isInsideApp()) return null

  return (
    <div className="apkbar">
      <a className="apkbar__link" href={APK_URL} download>
        <Icon name="download" className="apkbar__icon" />
        <span className="apkbar__text">
          {t.apkTitle}
          <span className="apkbar__hint">{t.apkHint}</span>
        </span>
      </a>
    </div>
  )
}
