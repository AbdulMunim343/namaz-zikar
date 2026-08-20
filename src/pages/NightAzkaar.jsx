import TopBar from '../components/TopBar.jsx'
import ZikrList from '../components/ZikrList.jsx'
import { getNightAzkaar } from '../data/nightAzkaar.js'

export default function NightAzkaar() {
  return (
    <>
      <TopBar title="سونے کے اذکار" />
      <main className="page">
        <ZikrList
          bucket="night"
          zikrs={getNightAzkaar()}
          hint="یہ اذکار رات کو بستر پر لیٹنے سے پہلے پڑھے جاتے ہیں۔ آخری دعا صبح آنکھ کھلنے پر۔"
        />
      </main>
    </>
  )
}
