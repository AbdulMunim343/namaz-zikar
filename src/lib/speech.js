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
 *
 * For (2) the engine depends on where we are running. Android's WebView — what
 * the APK uses — does not implement the Web Speech API at all, so
 * speechSynthesis is silently missing there and nothing is ever spoken. Inside
 * the app we therefore go through the native Android TTS engine via the
 * Capacitor plugin; in a browser we use speechSynthesis as before.
 */

import { hasRecording } from '../data/audioManifest.js'

// Vite inlines import.meta.env at build time; the guard keeps this module
// importable in plain Node (where it is undefined) so it can be unit-tested.
const BASE = typeof import.meta.env !== 'undefined' ? import.meta.env.BASE_URL : '/'

let currentId = null
let currentAudio = null
let lastError = null
const listeners = new Set()

/**
 * Why nothing was heard, when nothing was heard. Speech can fail for reasons
 * the reader can actually fix (no Arabic/Urdu voice installed), so the failure
 * has to reach the screen instead of being swallowed.
 *   'no-engine' — the device has no working text-to-speech at all
 *   'no-voice'  — an engine, but no voice for Arabic/Urdu
 */
export function getError() {
  return lastError
}

function setError(code) {
  if (lastError === code) return
  lastError = code
  emit()
}

function emit() {
  listeners.forEach((fn) => fn())
}

function synth() {
  return typeof window !== 'undefined' ? window.speechSynthesis : null
}

/** True inside the Android app, false in any browser. */
export function isNative() {
  return typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.() === true
}

/* ------------------------------------------------------------------ */
/* اینڈرائیڈ ایپ کی آواز — the native TTS engine                        */
/* ------------------------------------------------------------------ */

let nativeTts = null
let nativeTtsLoad = null

/**
 * Loaded lazily so the browser bundle never pulls the native plugin in.
 *
 * The plugin object is returned **wrapped**. A Capacitor plugin is a Proxy that
 * turns any property access into a native call, so resolving a promise with it
 * directly makes the runtime probe it for `.then` — which the proxy answers by
 * throwing "TextToSpeech.then() is not implemented". That rejection is what
 * silenced audio in the app: the engine never finished loading.
 */
function getNativeTts() {
  if (nativeTts) return Promise.resolve({ tts: nativeTts })
  if (!nativeTtsLoad) {
    nativeTtsLoad = import('@capacitor-community/text-to-speech').then((mod) => {
      // Do not clobber an engine already in place (the tests install one).
      if (!nativeTts) nativeTts = mod.TextToSpeech
      return { tts: nativeTts }
    })
  }
  return nativeTtsLoad
}

// Start loading as soon as the app opens rather than on the first tap, so a
// slow or failed load shows up before he is waiting on a dua to be read.
if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
  getNativeTts().catch(() => setError('no-engine'))
}

/** Test seam: lets the unit tests supply a fake plugin. */
export function __setNativeTts(impl) {
  nativeTts = impl
  nativeTtsLoad = impl ? Promise.resolve({ tts: impl }) : null
}

/** Pick a male voice index from the engine's own voice list, if it offers one. */
async function nativeVoiceIndex(tts, lang) {
  try {
    const { voices } = await tts.getSupportedVoices()
    if (!Array.isArray(voices)) return undefined
    const base = lang.split('-')[0]
    let best
    voices.forEach((v, i) => {
      if (!v.lang || !v.lang.toLowerCase().startsWith(base)) return
      let score = 0
      if (MALE_NAMES.test(v.name || '')) score += 10
      if (FEMALE_NAMES.test(v.name || '')) score -= 20
      if ((v.lang || '').toLowerCase() === lang.toLowerCase()) score += 3
      if (!best || score > best.score) best = { i, score }
    })
    return best ? best.i : undefined
  } catch {
    // Some engines do not implement getSupportedVoices — speak with the default.
    return undefined
  }
}

async function speakNative(id, parts) {
  let tts
  try {
    ;({ tts } = await getNativeTts())
  } catch {
    setError('no-engine')
    finished(id)
    return
  }
  if (!tts) {
    setError('no-engine')
    finished(id)
    return
  }

  let spokeSomething = false

  for (const part of parts) {
    if (currentId !== id) return // stopped, or another dua started

    const voice = await nativeVoiceIndex(tts, part.lang)
    // Most phones ship no Urdu voice and many no Arabic one, so try the exact
    // locale first and then the bare language (ar-SA → ar) before giving up.
    const langs = [part.lang, part.lang.split('-')[0]]

    for (const lang of langs) {
      if (currentId !== id) return
      try {
        await tts.speak({
          text: part.text,
          lang,
          rate: 0.85,
          pitch: 1.0,
          volume: 1.0,
          category: 'ambient',
          ...(voice === undefined ? {} : { voice }),
        })
        spokeSomething = true
        break
      } catch {
        // This locale has no voice data — try the next, then the next part.
      }
    }
  }

  // Every attempt failed: the phone has an engine but no Arabic/Urdu voice.
  // Tell him, rather than leaving him tapping a button that does nothing.
  if (spokeSomething) setError(null)
  else setError('no-voice')

  finished(id)
}

/* ------------------------------------------------------------------ */
/* مردانہ آواز کا انتخاب — pick a male reader                          */
/* ------------------------------------------------------------------ */

// Voice names vary by phone and browser, so match on the known male voices
// each platform ships for Arabic and Urdu, and rule out the female ones.
const MALE_NAMES = /maged|majed|tarik|hamed|hamdan|bassel|shakir|saleh|omar|asad|salman|faizan|male/i
const FEMALE_NAMES = /female|woman|zariyah|salma|laila|layla|uzma|amina|hala|noura|nora|sana|gul|maryam|fatima/i

function voicesFor(lang) {
  const s = synth()
  if (!s || typeof s.getVoices !== 'function') return []
  const base = lang.split('-')[0]
  return s.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith(base))
}

/**
 * Returns { voice, pitch } for a language.
 * If no male voice exists on the device, drop the pitch a little so whatever
 * voice is available at least reads lower.
 */
function pickVoice(lang) {
  const candidates = voicesFor(lang)
  if (candidates.length === 0) return { voice: null, pitch: 1 }

  const scored = candidates
    .map((v) => {
      let score = 0
      if (MALE_NAMES.test(v.name)) score += 10
      if (FEMALE_NAMES.test(v.name)) score -= 20
      // Prefer an exact regional match (ar-SA over ar-EG).
      if (v.lang.toLowerCase() === lang.toLowerCase()) score += 3
      if (v.localService) score += 1
      return { v, score }
    })
    .sort((a, b) => b.score - a.score)

  const best = scored[0]
  const isMale = MALE_NAMES.test(best.v.name)
  return { voice: best.v, pitch: isMale ? 1 : 0.8 }
}

// Voices load asynchronously on most browsers; this fires once they arrive.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  const s = window.speechSynthesis
  if (typeof s.getVoices === 'function') s.getVoices()
  if (typeof s.addEventListener === 'function') {
    s.addEventListener('voiceschanged', () => {
      if (typeof s.getVoices === 'function') s.getVoices()
    })
  }
}

/** روکیں — stops a recording and any queued text-to-speech. */
export function stop() {
  if (isNative() && nativeTts) {
    try {
      // Plugin calls reject asynchronously, so the promise needs its own catch;
      // try/catch alone would leave an unhandled rejection.
      Promise.resolve(nativeTts.stop()).catch(() => {})
    } catch {
      /* nothing was speaking */
    }
  }
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
  const parts = [
    { text: arabic, lang: 'ar-SA' },
    { text: urdu, lang: 'ur-PK' },
  ].filter((p) => p.text)

  if (parts.length === 0) {
    finished(id)
    return
  }

  // Android WebView has no speechSynthesis — use the native engine instead.
  if (isNative()) {
    speakNative(id, parts)
    return
  }

  const s = synth()
  if (!s) {
    finished(id)
    return
  }

  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part.text)
    u.lang = part.lang
    // Slower than default so he can follow along and repeat.
    u.rate = 0.85
    const { voice, pitch } = pickVoice(part.lang)
    if (voice) u.voice = voice
    u.pitch = pitch
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
/*
 * Whether a recording exists is decided at build time (src/data/audioManifest.js),
 * not by asking the server. Asking was unreliable inside the APK: Capacitor's
 * local server answers unknown paths with index.html — HTTP 200 — so a missing
 * file looked present, no error ever fired, and nothing was ever heard.
 */

/** How long to wait for a recording to actually start before giving up on it. */
const AUDIO_START_TIMEOUT_MS = 2500

function playRecording(id, item) {
  const audio = new Audio(`${BASE}audio/${item.audio}`)
  currentAudio = audio

  // A missing file rejects play() *and* fires onerror, so guard the fallback —
  // otherwise the dua gets spoken twice, on top of itself.
  let settled = false
  const fallback = () => {
    if (settled) return
    settled = true
    clearTimeout(watchdog)
    currentAudio = null
    if (currentId === id) speak(id, item)
  }

  // Last line of defence: if the file neither plays nor errors (a stalled or
  // undecodable response), fall back rather than leaving him with silence.
  const watchdog = setTimeout(fallback, AUDIO_START_TIMEOUT_MS)

  audio.onplaying = () => {
    settled = true
    clearTimeout(watchdog)
  }
  audio.onended = () => {
    clearTimeout(watchdog)
    finished(id)
  }
  audio.onerror = fallback
  audio.play().catch(fallback)
}

export function play(id, item) {
  stop()
  currentId = id
  emit()
  if (!isNative()) setError(null)

  if (!item.audio) {
    speak(id, item)
    return
  }

  if (hasRecording(item.audio)) playRecording(id, item)
  else speak(id, item) // no recording for this one — the phone reads it instead
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
