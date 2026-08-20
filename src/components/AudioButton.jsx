import { useSpeech } from '../hooks/useSpeech.js'

/**
 * 🔊 «سنیں» — plays the recording if one exists in public/audio/,
 * otherwise the phone reads the text aloud itself.
 */
export default function AudioButton({ arabic, urdu, audio }) {
  const { play, playing } = useSpeech()

  if (!arabic && !urdu) return null

  return (
    <button
      type="button"
      className="audiobtn"
      data-playing={playing}
      onClick={() => play({ arabic, urdu, audio })}
    >
      <span aria-hidden="true">{playing ? '⏹' : '🔊'}</span>
      {playing ? 'روکیں' : 'سنیں'}
    </button>
  )
}
