import { useSyncExternalStore } from 'react'
import { getError, getPlayingId, play, stop, subscribe } from '../lib/speech.js'

/**
 * Read the shared speech state. Every 🔊 / ⏹ button in the app sees the same
 * value, so «روکیں» can stop whatever is playing — and if the phone cannot
 * speak at all, every button can say so.
 */
export function useSpeech() {
  const state = useSyncExternalStore(
    subscribe,
    () => `${getPlayingId() ?? ''}|${getError() ?? ''}`,
    () => '|',
  )
  const [playingId, error] = state.split('|')
  return {
    playingId: playingId || null,
    error: error || null,
    isPlaying: Boolean(playingId),
    play,
    stop,
  }
}
