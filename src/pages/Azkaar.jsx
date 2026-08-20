import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import ZikrList from '../components/ZikrList.jsx'
import { getAzkaar, defaultTimeOfDay } from '../data/azkaar.js'
import { getAfterNamazAzkaar } from '../data/afterNamazAzkaar.js'

const TABS = [
  { id: 'morning', label: '☀️ صبح' },
  { id: 'evening', label: '🌙 شام' },
  { id: 'after', label: '🕌 نماز کے بعد' },
]

const HINTS = {
  morning: 'ہر دعا کے نیچے بڑا گول بٹن ہے۔ ایک بار پڑھ کر بٹن دبائیں — گنتی خودبخود بڑھ جائے گی۔',
  evening: 'ہر دعا کے نیچے بڑا گول بٹن ہے۔ ایک بار پڑھ کر بٹن دبائیں — گنتی خودبخود بڑھ جائے گی۔',
  after: 'یہ اذکار ہر فرض نماز کے فوراً بعد، سلام پھیرتے ہی پڑھے جاتے ہیں۔',
}

export default function Azkaar() {
  const location = useLocation()
  const [tab, setTab] = useState(() => location.state?.tab || defaultTimeOfDay())

  const zikrs = tab === 'after' ? getAfterNamazAzkaar() : getAzkaar(tab)

  return (
    <>
      <TopBar title="اذکار" />
      <main className="page">
        <div className="tabs tabs--three">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <ZikrList bucket={tab} zikrs={zikrs} hint={HINTS[tab]} />
      </main>
    </>
  )
}
