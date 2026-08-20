import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useLang } from '../hooks/useLang.js'

const STEPS = [0.85, 1, 1.15, 1.3, 1.5]
const DEFAULT_INDEX = 1

/** A− / A+ — the whole app scales from one CSS variable. */
export default function FontSizeControl() {
  const { t } = useLang()
  const [index, setIndex] = useLocalStorage('namaz:fontSize', DEFAULT_INDEX)
  const safeIndex = Math.min(Math.max(index, 0), STEPS.length - 1)

  useEffect(() => {
    document.documentElement.style.setProperty('--scale', String(STEPS[safeIndex]))
  }, [safeIndex])

  return (
    <div className="fontsize">
      <button
        type="button"
        dir="ltr"
        onClick={() => setIndex(safeIndex + 1)}
        disabled={safeIndex === STEPS.length - 1}
        aria-label={t.biggerText}
      >
        A+
      </button>
      <button
        type="button"
        dir="ltr"
        onClick={() => setIndex(safeIndex - 1)}
        disabled={safeIndex === 0}
        aria-label={t.smallerText}
      >
        A−
      </button>
    </div>
  )
}
