import { useCallback, useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL

/**
 * Frontend-only audio, in two tiers:
 *
 *   1. If a recording exists at `public/audio/<file>`, play that file.
 *   2. Otherwise fall back to the phone's built-in text-to-speech.
 *
 * That means the family can record the duas themselves later, drop the
 * mp3 files into `public/audio/`, and they start playing with no code change.
 */
export function useSpeech() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const mountedRef = useRef(true)

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    if (mountedRef.current) setPlaying(false)
  }, [])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      stop()
    }
  }, [stop])

  /** Speak `parts`: [{ text, lang }, ...] — spoken one after the other. */
  const speakParts = useCallback(
    (parts) => {
      const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
      const usable = parts.filter((p) => p && p.text)
      if (!synth || usable.length === 0) {
        setPlaying(false)
        return
      }

      usable.forEach((part, index) => {
        const utterance = new SpeechSynthesisUtterance(part.text)
        utterance.lang = part.lang
        // Slightly slower than default — easier to follow and repeat along with.
        utterance.rate = 0.85
        if (index === usable.length - 1) {
          utterance.onend = () => mountedRef.current && setPlaying(false)
          utterance.onerror = () => mountedRef.current && setPlaying(false)
        }
        synth.speak(utterance)
      })
    },
    [],
  )

  /**
   * @param {object} item              the step or zikr being read aloud
   * @param {string} [item.audio]      optional filename inside public/audio/
   * @param {string} [item.arabic]     Arabic text (spoken in ar-SA)
   * @param {string} [item.urdu]       Urdu text (spoken in ur-PK)
   */
  const play = useCallback(
    (item) => {
      if (playing) {
        stop()
        return
      }
      setPlaying(true)

      const fallback = () =>
        speakParts([
          { text: item.arabic, lang: 'ar-SA' },
          { text: item.urdu, lang: 'ur-PK' },
        ])

      if (!item.audio) {
        fallback()
        return
      }

      const audio = new Audio(`${BASE}audio/${item.audio}`)
      audioRef.current = audio
      audio.onended = () => mountedRef.current && setPlaying(false)
      audio.onerror = () => {
        // No recording present yet — read it with the phone's own voice instead.
        audioRef.current = null
        fallback()
      }
      audio.play().catch(() => {
        audioRef.current = null
        fallback()
      })
    },
    [playing, speakParts, stop],
  )

  return { play, stop, playing }
}
