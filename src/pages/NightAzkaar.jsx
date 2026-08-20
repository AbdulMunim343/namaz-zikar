import TopBar from '../components/TopBar.jsx'
import ZikrList from '../components/ZikrList.jsx'
import { getNightAzkaar } from '../data/nightAzkaar.js'
import { useLang } from '../hooks/useLang.js'
import { localizeZikr } from '../lib/lang.js'

export default function NightAzkaar() {
  const { t, lang } = useLang()

  return (
    <>
      <TopBar title={t.nightTitle} />
      <main className="page">
        <ZikrList
          bucket="night"
          zikrs={getNightAzkaar().map((z) => localizeZikr(z, lang))}
          hint={t.nightHint}
        />
      </main>
    </>
  )
}
