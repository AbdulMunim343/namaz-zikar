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

// Vite inlines import.meta.env at build time; the guard keeps this module
// importable in plain Node (where it is undefined) so it can be unit-tested.
const BASE = typeof import.meta.env !== 'undefined' ? import.meta.env.BASE_URL : '/'

let currentId = null
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

/*
 * The device's own default voice is used, deliberately. Choosing a voice here
 * was what broke the audio: a male-name preference pushed past the phone's good
 * Arabic voice, and any voice not matched as male was pitched down to 0.8 —
 * which turns a natural voice growly and slurred. The engine's own default for
 * the language is clearer than anything this code can pick.
 */

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

    // Most phones ship no Urdu voice and many no Arabic one, so try the exact
    // locale first and then the bare language (ar-SA → ar) before giving up.
    const langs = [part.lang, part.lang.split('-')[0]]

    for (const lang of langs) {
      if (currentId !== id) return
      try {
        await tts.speak({
          text: part.text,
          lang,
          rate: 0.85, // slower, so he can follow along and repeat
          pitch: 1.0, // natural — never altered
          volume: 1.0,
          category: 'ambient',
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
    // No speech engine in this browser at all — say so rather than go quiet.
    setError('no-engine')
    finished(id)
    return
  }

  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part.text)
    u.lang = part.lang
    // Slower than default so he can follow along and repeat. Nothing else is
    // set: no voice, no pitch — the engine's default for this language is the
    // clearest voice the phone has.
    u.rate = 0.85
    if (i === parts.length - 1) {
      u.onend = () => {
        setError(null)
        finished(id)
      }
      // A browser with no voice for this language errors here. Previously this
      // was swallowed, so the web failed silently with nothing on screen.
      u.onerror = () => {
        setError('no-voice')
        finished(id)
      }
    }
    s.speak(u)
  })
}

/**
 * سنیں — play one item. Starting a new one always stops the old one first.
 * @param {string} id    unique id of the step/zikr being read
 * @param {object} item  { arabic, urdu, audio }
 */
/**
 * Audio is the Android app only — AudioButton renders nothing on the web — so
 * this always goes to the phone's own voice, which is the clearest reader
 * available and needs no files shipped with the app.
 */
export function play(id, item) {
  stop()
  currentId = id
  emit()
  speak(id, item)
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
