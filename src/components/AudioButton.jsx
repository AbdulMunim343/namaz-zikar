import { useSpeech } from '../hooks/useSpeech.js'

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
  'no-engine':
    'اس فون میں آواز پڑھنے والا سافٹ ویئر نہیں ملا۔ Play Store سے «Speech Recognition & Synthesis» (Google) انسٹال کریں۔',
  'no-voice':
    'اس فون میں عربی/اردو آواز نصب نہیں ہے۔ سیٹنگز → زبان اور اِن پُٹ → Text-to-speech → زبانیں انسٹال کریں، پھر دوبارہ کوشش کریں۔',
}

export default function AudioButton({ id, arabic, urdu, audio }) {
  const { playingId, isPlaying, error, play, stop } = useSpeech()

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
        <span aria-hidden="true">🔊</span>
        {thisIsPlaying ? 'چل رہا ہے…' : 'سنیں'}
      </button>

      <button
        type="button"
        className="audiobtn audiobtn--stop"
        onClick={stop}
        disabled={!isPlaying}
      >
        <span aria-hidden="true">⏹</span>
        روکیں
      </button>
    </div>
    {error ? <p className="audioerr">{ERROR_TEXT[error]}</p> : null}
    </>
  )
}
