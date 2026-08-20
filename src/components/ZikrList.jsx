import { useCallback, useEffect } from 'react'
import ZikrCard from './ZikrCard.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { tick, completed as playCompletedSound, preloadSfx } from '../lib/sfx.js'
import { useLang } from '../hooks/useLang.js'

const todayKey = () => new Date().toISOString().slice(0, 10)
const EMPTY = { date: todayKey(), morning: {}, evening: {}, night: {}, after: {} }

/**
 * اذکار کی فہرست اور گنتی
 *
 * Shared by the صبح/شام page and the رات page. Counts are kept per bucket in
 * one localStorage entry and reset on a new day.
 */
export default function ZikrList({ bucket, zikrs, hint }) {
  const { t } = useLang()
  const [progress, setProgress] = useLocalStorage('namaz:azkaar', EMPTY)

  useEffect(() => {
    preloadSfx()
  }, [])

  // گنتی روزانہ صفر سے شروع ہوتی ہے
  useEffect(() => {
    if (progress.date !== todayKey()) setProgress({ ...EMPTY, date: todayKey() })
  }, [progress.date, setProgress])

  const counts = progress[bucket] || {}
  const completed = zikrs.filter((z) => (counts[z.id] || 0) >= z.times).length

  const bump = useCallback(
    (id, max) =>
      setProgress((prev) => {
        const current = (prev[bucket] || {})[id] || 0
        // Tapping a finished zikr starts it over, so a miscount is easy to fix.
        const next = current >= max ? 0 : current + 1
        // A tick for each bead, a different sound when the count is complete —
        // so he can keep his eyes closed and still know where he is.
        if (next === max) playCompletedSound()
        else if (next > 0) tick()
        return { ...prev, date: todayKey(), [bucket]: { ...(prev[bucket] || {}), [id]: next } }
      }),
    [bucket, setProgress],
  )

  const reset = useCallback(
    (id) =>
      setProgress((prev) => ({ ...prev, [bucket]: { ...(prev[bucket] || {}), [id]: 0 } })),
    [bucket, setProgress],
  )

  return (
    <>
      <p className="summary">
        {completed === zikrs.length
          ? t.allDone
          : `${completed} ${t.of} ${zikrs.length} ${t.complete}`}
      </p>

      {hint ? <p className="note">{hint}</p> : null}

      {zikrs.map((zikr) => (
        <ZikrCard
          key={zikr.id}
          zikr={zikr}
          count={counts[zikr.id] || 0}
          onTap={() => bump(zikr.id, zikr.times)}
          onReset={() => reset(zikr.id)}
        />
      ))}
    </>
  )
}
