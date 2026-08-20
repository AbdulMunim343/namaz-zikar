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
export default function AudioButton({ id, arabic, urdu, audio }) {
  const { playingId, isPlaying, play, stop } = useSpeech()

  if (!arabic && !urdu) return null

  const thisIsPlaying = playingId === id

  return (
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
  )
}
