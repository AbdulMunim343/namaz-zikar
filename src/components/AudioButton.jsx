import { useSpeech } from '../hooks/useSpeech.js'
import { useLang } from '../hooks/useLang.js'
import { isNative } from '../lib/speech.js'
import Icon from './Icon.jsx'

/**
 * سنیں / روکیں — دو الگ بٹن
 *
 * Two separate buttons rather than one that changes meaning: «سنیں» always
 * starts, «روکیں» always stops. Nothing to work out mid-prayer.
 *
 * «روکیں» is enabled whenever *anything* in the app is playing, so whatever is
 * making noise can be stopped from the card in front of him.
 */
const ERROR_TEXT = {
  ur: {
    'no-engine':
      'اس فون میں آواز پڑھنے والا سافٹ ویئر نہیں ملا۔ Play Store سے «Speech Recognition & Synthesis» (Google) انسٹال کریں۔',
    'no-voice':
      'اس فون میں عربی/اردو آواز نصب نہیں ہے۔ سیٹنگز → زبان اور اِن پُٹ → Text-to-speech → زبانیں انسٹال کریں، پھر دوبارہ کوشش کریں۔',
  },
  en: {
    'no-engine':
      'No text-to-speech software was found on this phone. Install “Speech Recognition & Synthesis” (Google) from the Play Store.',
    'no-voice':
      'No Arabic/Urdu voice is installed on this phone. Go to Settings → Language & input → Text-to-speech and install the voices, then try again.',
  },
}

export default function AudioButton({ id, arabic, urdu, audio }) {
  const { playingId, isPlaying, error, play, stop } = useSpeech()
  const { t, lang } = useLang()

  // Audio is the Android app only. On the web there is no voice worth using —
  // most browsers have no Arabic voice, and a synthesised one is not worth
  // putting in front of a reader.
  if (!isNative()) return null
  if (!arabic && !urdu) return null

  const thisIsPlaying = playingId === id

  return (
    <>
    <div className="audiorow">
      <button
        type="button"
        className="audiobtn"
        data-playing={thisIsPlaying}
        onClick={() => play(id, { arabic, urdu, audio })}
      >
        <Icon name="speaker" />
        {thisIsPlaying ? t.playing : t.listen}
      </button>

      <button
        type="button"
        className="audiobtn audiobtn--stop"
        onClick={stop}
        disabled={!isPlaying}
      >
        <Icon name="stop" />
        {t.stop}
      </button>
    </div>
    {error ? <p className="audioerr">{ERROR_TEXT[lang]?.[error] || ERROR_TEXT.ur[error]}</p> : null}
    </>
  )
}
