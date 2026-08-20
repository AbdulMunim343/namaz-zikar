import { useLang } from '../hooks/useLang.js'

/**
 * اردو | English
 *
 * Lives on the home screen only, so the prayer screens stay free of anything
 * that is not the prayer. Urdu is the default and the app returns to it for
 * anyone who has never touched this.
 */
export default function LangSwitch() {
  const { lang, setLang, t } = useLang()

  return (
    <div className="langswitch" role="group" aria-label={t.langLabel}>
      <button
        type="button"
        lang="ur"
        aria-pressed={lang === 'ur'}
        onClick={() => setLang('ur')}
      >
        اردو
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        English
      </button>
    </div>
  )
}
