import { Link, useNavigate } from 'react-router-dom'
import FontSizeControl from '../components/FontSizeControl.jsx'
import { readResume, clearResume } from '../components/StepPlayer.jsx'
import { PRAYERS } from '../data/namaz.js'

/**
 * مرکزی صفحہ — نماز والا صفحہ
 *
 * The five prayers sit directly here rather than behind a picker page, so
 * starting a prayer is one tap. وتر and اذکار are in the bottom tab bar.
 */
export default function Home() {
  const navigate = useNavigate()
  const resume = readResume()

  return (
    <>
      <header className="topbar">
        <span style={{ minWidth: 52 }} aria-hidden="true" />
        <h1 className="topbar__title">نماز و اذکار</h1>
        <FontSizeControl />
      </header>

      <main className="page">
        <div className="hero">
          <p className="hero__salam">السلام علیکم</p>
          <p className="hero__sub">جو پڑھنا ہے اُس پر اُنگلی رکھیں</p>
        </div>

        {resume ? (
          <button
            type="button"
            className="bigbtn bigbtn--resume"
            onClick={() => navigate(resume.path, { state: { startAt: resume.index } })}
          >
            <span className="bigbtn__icon" aria-hidden="true">
              ↻
            </span>
            <span className="bigbtn__label">
              جاری رکھیں
              <span className="bigbtn__hint">
                {resume.title} — قدم {resume.index + 1} از {resume.total}
              </span>
            </span>
          </button>
        ) : null}

        <h2 className="section">کون سی نماز؟</h2>
        <div className="picker">
          {PRAYERS.map((prayer) => (
            <Link key={prayer.id} className="picker__card" to={`/namaz/${prayer.id}`}>
              <span className="picker__name">{prayer.name}</span>
              <span className="picker__count">{prayer.fard} رکعت فرض</span>
            </Link>
          ))}
        </div>

        <p className="note">
          وتر، صبح و شام کے اذکار، اور سونے کے اذکار کے لیے نیچے والی پٹی استعمال کریں۔
        </p>

        <p className="note">
          یہاں صرف فرض رکعتیں سکھائی گئی ہیں۔ سنتیں بھی اسی طریقے سے پڑھی جاتی ہیں، بس
          نیت رکعتوں کی تعداد کی کریں۔
        </p>

        {resume ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              clearResume()
              navigate(0)
            }}
          >
            محفوظ شدہ جگہ بھول جائیں
          </button>
        ) : null}
      </main>
    </>
  )
}
