import { useCallback, useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import ZikrCard from '../components/ZikrCard.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { getAzkaar, defaultTimeOfDay } from '../data/azkaar.js'
import { toUrduNumber } from '../lib/urduNumbers.js'

const todayKey = () => new Date().toISOString().slice(0, 10)

export default function Azkaar() {
  const [timeOfDay, setTimeOfDay] = useState(defaultTimeOfDay)
  const [progress, setProgress] = useLocalStorage('namaz:azkaar', {
    date: todayKey(),
    morning: {},
    evening: {},
  })

  // گنتی روزانہ صفر سے شروع ہوتی ہے
  useEffect(() => {
    if (progress.date !== todayKey()) {
      setProgress({ date: todayKey(), morning: {}, evening: {} })
    }
  }, [progress.date, setProgress])

  const counts = progress[timeOfDay] || {}
  const zikrs = getAzkaar(timeOfDay)
  const completed = zikrs.filter((z) => (counts[z.id] || 0) >= z.times).length

  const bump = useCallback(
    (id, max) =>
      setProgress((prev) => {
        const bucket = prev[timeOfDay] || {}
        const current = bucket[id] || 0
        // Tapping a finished zikr starts it over, so a miscount is easy to fix.
        const nextCount = current >= max ? 0 : current + 1
        return { ...prev, date: todayKey(), [timeOfDay]: { ...bucket, [id]: nextCount } }
      }),
    [setProgress, timeOfDay],
  )

  const reset = useCallback(
    (id) =>
      setProgress((prev) => ({
        ...prev,
        [timeOfDay]: { ...(prev[timeOfDay] || {}), [id]: 0 },
      })),
    [setProgress, timeOfDay],
  )

  return (
    <>
      <TopBar title="صبح و شام کے اذکار" />
      <main className="page">
        <div className="tabs">
          <button
            type="button"
            aria-pressed={timeOfDay === 'morning'}
            onClick={() => setTimeOfDay('morning')}
          >
            ☀️ صبح
          </button>
          <button
            type="button"
            aria-pressed={timeOfDay === 'evening'}
            onClick={() => setTimeOfDay('evening')}
          >
            🌙 شام
          </button>
        </div>

        <p className="summary">
          {completed === zikrs.length
            ? '✅ آج کے تمام اذکار مکمل ہو گئے — ماشاءاللہ'
            : `${toUrduNumber(completed)} از ${toUrduNumber(zikrs.length)} مکمل`}
        </p>

        <p className="note">
          ہر دعا کے نیچے بڑا گول بٹن ہے۔ ایک بار پڑھ کر بٹن دبائیں — گنتی خودبخود بڑھ
          جائے گی۔
        </p>

        {zikrs.map((zikr) => (
          <ZikrCard
            key={zikr.id}
            zikr={zikr}
            count={counts[zikr.id] || 0}
            onTap={() => bump(zikr.id, zikr.times)}
            onReset={() => reset(zikr.id)}
          />
        ))}
      </main>
    </>
  )
}
