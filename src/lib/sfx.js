/**
 * گنتی کی آوازیں — tasbeeh feedback
 *
 * Deliberately separate from the speech controller: tapping the counter must
 * not interrupt a dua that is being read aloud, and stopping a dua must not
 * silence the ticks.
 *
 * Both clips ship with the app, so this works with no internet and on a phone
 * with no text-to-speech voices.
 */

const BASE = typeof import.meta.env !== 'undefined' ? import.meta.env.BASE_URL : '/'

let enabled = true
const cache = new Map()

function clip(name) {
  if (typeof Audio === 'undefined') return null
  if (!cache.has(name)) {
    const audio = new Audio(`${BASE}audio/${name}`)
    audio.preload = 'auto'
    cache.set(name, audio)
  }
  return cache.get(name)
}

function fire(name) {
  if (!enabled) return
  const audio = clip(name)
  if (!audio) return
  try {
    // Rewind so rapid taps each make a sound instead of being swallowed.
    audio.currentTime = 0
    const played = audio.play()
    if (played && typeof played.catch === 'function') played.catch(() => {})
  } catch {
    /* a phone that will not play the tick should never break the counter */
  }
}

/** ٹِک — one bead counted. */
export function tick() {
  fire('tick.mp3')
}

/** مکمل — the required count has just been reached. */
export function completed() {
  fire('done.mp3')
}

/** Lets the reader silence the counter without silencing the duas. */
export function setSfxEnabled(on) {
  enabled = on
}

export function isSfxEnabled() {
  return enabled
}

/** Warm the clips up so the very first tap is not silent. */
export function preloadSfx() {
  clip('tick.mp3')
  clip('done.mp3')
}
