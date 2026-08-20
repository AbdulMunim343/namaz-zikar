import { useCallback, useEffect, useState } from 'react'

/**
 * State that survives closing the browser — used for the resume point,
 * the font size, and today's tasbeeh counts. Falls back to plain state
 * if storage is unavailable (private mode on some phones).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : JSON.parse(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked — the app still works, it just won't remember */
    }
  }, [key, value])

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, clear]
}
