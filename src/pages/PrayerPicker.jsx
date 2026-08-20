import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import { PRAYERS } from '../data/namaz.js'
import { toUrduNumber } from '../lib/urduNumbers.js'

export default function PrayerPicker() {
  return (
    <>
      <TopBar title="کون سی نماز؟" />
      <main className="page">
        <div className="picker">
          {PRAYERS.map((prayer) => (
            <Link key={prayer.id} className="picker__card" to={`/namaz/${prayer.id}`}>
              <span className="picker__name">{prayer.name}</span>
              <span className="picker__count">{toUrduNumber(prayer.fard)} رکعت فرض</span>
            </Link>
          ))}
        </div>

        <p className="note">
          یہاں صرف فرض رکعتیں سکھائی گئی ہیں۔ سنتیں بھی اسی طریقے سے پڑھی جاتی ہیں، بس
          نیت رکعتوں کی تعداد کی کریں۔
        </p>
      </main>
    </>
  )
}
