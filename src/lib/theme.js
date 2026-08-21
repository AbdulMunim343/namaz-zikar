/**
 * روشن / گہرا — light and dark
 *
 * Until the reader picks one, no attribute is set and the app simply follows
 * the phone's own setting. Choosing one stores it and overrides the device in
 * both directions.
 */
const KEY = 'namaz:theme'
const listeners = new Set()
let theme = null // null = follow the device

try {
  const saved = window.localStorage.getItem(KEY)
  if (saved === 'light' || saved === 'dark') theme = saved
} catch {
  /* storage blocked — follow the device */
}

function apply() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme) root.dataset.theme = theme
  else delete root.dataset.theme
}

apply()

export function getTheme() {
  return theme
}

/** What is actually on screen right now, device setting included. */
export function effectiveTheme() {
  if (theme) return theme
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(next) {
  theme = next === 'light' || next === 'dark' ? next : null
  try {
    if (theme) window.localStorage.setItem(KEY, theme)
    else window.localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  apply()
  listeners.forEach((fn) => fn())
}

export function subscribeTheme(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
