import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import ZikrList from '../components/ZikrList.jsx'
import { getAzkaar, defaultTimeOfDay } from '../data/azkaar.js'
import { getAfterNamazAzkaar } from '../data/afterNamazAzkaar.js'
import { useLang } from '../hooks/useLang.js'
import { localizeZikr, localizeZikrForTime } from '../lib/lang.js'
import Icon from '../components/Icon.jsx'

const TAB_IDS = ['morning', 'evening', 'after']
const TAB_ICONS = { morning: 'sun', evening: 'moon', after: 'mosque' }

export default function Azkaar() {
  const { t, lang } = useLang()
  const location = useLocation()
  const [tab, setTab] = useState(() => location.state?.tab || defaultTimeOfDay())

  const labels = { morning: t.segMorning, evening: t.segEvening, after: t.segAfter }
  const hints = { morning: t.counterHint, evening: t.counterHint, after: t.afterHint }

  const zikrs =
    tab === 'after'
      ? getAfterNamazAzkaar().map((z) => localizeZikr(z, lang))
      : getAzkaar(tab).map((z) => localizeZikrForTime(z, tab, lang))

  return (
    <>
      <TopBar title={t.azkaarTitle} />
      <main className="page">
        <div className="tabs tabs--three">
          {TAB_IDS.map((id) => (
            <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>
              <Icon name={TAB_ICONS[id]} />
              {labels[id]}
            </button>
          ))}
        </div>

        <ZikrList bucket={tab} zikrs={zikrs} hint={hints[tab]} />
      </main>
    </>
  )
}
