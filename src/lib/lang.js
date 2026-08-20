/**
 * زبان — Urdu by default, English on request.
 *
 * Urdu is the default and stays the default: this app was built for an Urdu
 * reader, and English is the alternative, not the other way round.
 *
 * The Arabic and the Urdu transliteration are the same in both languages —
 * only the interface, the instructions and the meanings change.
 */
import { UI, EN_STEPS, EN_ZIKR, EN_PRAYERS, EN_WITR, EN_PRAYER_SUFFIX } from '../data/en.js'

const KEY = 'namaz:lang'
const listeners = new Set()
let lang = 'ur'

try {
  const saved = window.localStorage.getItem(KEY)
  if (saved === 'en' || saved === 'ur') lang = saved
} catch {
  /* storage blocked — Urdu it is */
}

function apply() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.lang = lang
  root.dir = lang === 'en' ? 'ltr' : 'rtl'
  root.dataset.lang = lang
}

apply()

export function getLang() {
  return lang
}

export function setLang(next) {
  if (next !== 'ur' && next !== 'en') return
  lang = next
  try {
    window.localStorage.setItem(KEY, next)
  } catch {
    /* ignore */
  }
  apply()
  listeners.forEach((fn) => fn())
}

export function subscribeLang(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Interface wording for the current language. */
export function strings(current = lang) {
  return UI[current] || UI.ur
}

/**
 * Merge the English text over a step or dua when English is on.
 * Anything without a translation keeps its Urdu, so nothing can go blank.
 */
export function localizeStep(step, current = lang) {
  if (current !== 'en' || !step) return step
  const en = EN_STEPS[step.key]
  if (!en) return step

  const merged = { ...step }
  if (en.title) merged.title = en.title
  if (en.do) merged.do = en.do
  if (en.meaning) merged.meaning = en.meaning
  if (en.choose) merged.choose = en.choose
  if (step.options && en.options) {
    merged.options = step.options.map((o) => {
      const eo = en.options[o.id]
      return eo ? { ...o, name: eo.name || o.name, meaning: eo.meaning || o.meaning } : o
    })
  }
  return merged
}

export function localizeZikr(zikr, current = lang) {
  if (current !== 'en' || !zikr) return zikr
  const en = EN_ZIKR[zikr.id]
  if (!en) return zikr

  const merged = { ...zikr }
  if (en.name) merged.name = en.name
  if (en.virtue) merged.virtue = en.virtue
  if (en.instruction) merged.instruction = en.instruction
  if (en.meaning) merged.meaning = typeof en.meaning === 'string' ? en.meaning : merged.meaning
  return merged
}

/** Morning/evening duas whose wording differs by time of day. */
export function localizeZikrForTime(zikr, timeOfDay, current = lang) {
  const merged = localizeZikr(zikr, current)
  if (current !== 'en') return merged
  const en = EN_ZIKR[zikr.id]
  if (en && en.meaning && typeof en.meaning === 'object') {
    return { ...merged, meaning: en.meaning[timeOfDay] || merged.meaning }
  }
  return merged
}

export function prayerName(prayer, current = lang) {
  return current === 'en' ? EN_PRAYERS[prayer.id] || prayer.name : prayer.name
}

export function prayerTitle(prayer, current = lang) {
  return current === 'en'
    ? `${EN_PRAYERS[prayer.id] || prayer.name}${EN_PRAYER_SUFFIX}`
    : `${prayer.name} کی نماز`
}

export function witrOption(option, current = lang) {
  return current === 'en' ? { ...option, ...(EN_WITR[option.id] || {}) } : option
}
