import { useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import ZikrList from '../components/ZikrList.jsx'
import { getAzkaar, defaultTimeOfDay } from '../data/azkaar.js'

export default function Azkaar() {
  const [timeOfDay, setTimeOfDay] = useState(defaultTimeOfDay)

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

        <ZikrList
          bucket={timeOfDay}
          zikrs={getAzkaar(timeOfDay)}
          hint="ہر دعا کے نیچے بڑا گول بٹن ہے۔ ایک بار پڑھ کر بٹن دبائیں — گنتی خودبخود بڑھ جائے گی۔"
        />
      </main>
    </>
  )
}
