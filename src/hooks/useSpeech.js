import { useSyncExternalStore } from 'react'
import { getPlayingId, play, stop, subscribe } from '../lib/speech.js'

/**
 * Read the shared speech state. Every 🔊 / ⏹ button in the app sees the same
 * value, so «روکیں» can stop whatever is currently playing.
 */
export function useSpeech() {
  const playingId = useSyncExternalStore(subscribe, getPlayingId, () => null)
  return { playingId, isPlaying: playingId !== null, play, stop }
}
