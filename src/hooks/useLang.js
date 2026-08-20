import { useSyncExternalStore } from 'react'
import { getLang, setLang, subscribeLang, strings } from '../lib/lang.js'

/** Re-renders every screen when the language changes. */
export function useLang() {
  const lang = useSyncExternalStore(subscribeLang, getLang, () => 'ur')
  return { lang, setLang, t: strings(lang), isEn: lang === 'en' }
}
