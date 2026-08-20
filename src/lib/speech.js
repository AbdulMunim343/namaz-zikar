/**
 * ایک ہی آواز، پورے ایپ میں
 *
 * A single shared speech controller. Every 🔊 button talks to this one object,
 * which means:
 *   - only one dua can ever play at a time (starting one stops the previous),
 *   - the ⏹ «روکیں» button can stop whatever is playing, from any card.
 *
 * Playback is two-tier and entirely frontend:
 *   1. a recording from public/audio/ when the file exists,
 *   2. otherwise the phone's own text-to-speech.
 */

// Vite inlines import.meta.env at build time; the guard keeps this module
// importable in plain Node (where it is undefined) so it can be unit-tested.
const BASE = typeof import.meta.env !== 'undefined' ? import.meta.env.BASE_URL : '/'

let currentId = null
let currentAudio = null
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn())
}

function synth() {
  return typeof window !== 'undefined' ? window.speechSynthesis : null
}

/** روکیں — stops a recording and any queued text-to-speech. */
export function stop() {
  if (currentAudio) {
    currentAudio.onended = null
    currentAudio.onerror = null
    currentAudio.pause()
    currentAudio = null
  }
  const s = synth()
  if (s) s.cancel()
  if (currentId !== null) {
    currentId = null
    emit()
  }
}

function finished(id) {
  if (currentId === id) {
    currentId = null
    currentAudio = null
    emit()
  }
}

function speak(id, { arabic, urdu }) {
  const s = synth()
  const parts = [
    { text: arabic, lang: 'ar-SA' },
    { text: urdu, lang: 'ur-PK' },
  ].filter((p) => p.text)

  if (!s || parts.length === 0) {
    finished(id)
    return
  }

  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part.text)
    u.lang = part.lang
    // Slower than default so he can follow along and repeat.
    u.rate = 0.85
    if (i === parts.length - 1) {
      u.onend = () => finished(id)
      u.onerror = () => finished(id)
    }
    s.speak(u)
  })
}

/**
 * سنیں — play one item. Starting a new one always stops the old one first.
 * @param {string} id    unique id of the step/zikr being read
 * @param {object} item  { arabic, urdu, audio }
 */
export function play(id, item) {
  stop()
  currentId = id
  emit()

  if (!item.audio) {
    speak(id, item)
    return
  }

  const audio = new Audio(`${BASE}audio/${item.audio}`)
  currentAudio = audio

  // A missing file rejects play() *and* fires onerror, so guard the fallback —
  // otherwise the dua gets spoken twice, on top of itself.
  let usedFallback = false
  const fallback = () => {
    if (usedFallback) return
    usedFallback = true
    currentAudio = null
    // No recording added yet — use the phone's own voice instead.
    if (currentId === id) speak(id, item)
  }

  audio.onended = () => finished(id)
  audio.onerror = fallback
  audio.play().catch(fallback)
}

/* ---- subscription, for useSyncExternalStore ---- */

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** null when nothing is playing, otherwise the id of what is. */
export function getPlayingId() {
  return currentId
}
