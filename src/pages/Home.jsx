import { Link, useNavigate } from 'react-router-dom'
import FontSizeControl from '../components/FontSizeControl.jsx'
import { readResume, clearResume } from '../components/StepPlayer.jsx'
import { toUrduNumber } from '../lib/urduNumbers.js'

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
                {resume.title} — قدم {toUrduNumber(resume.index + 1)} از{' '}
                {toUrduNumber(resume.total)}
              </span>
            </span>
          </button>
        ) : null}

        <Link className="bigbtn" to="/namaz">
          <span className="bigbtn__icon" aria-hidden="true">
            🕌
          </span>
          <span className="bigbtn__label">
            نماز
            <span className="bigbtn__hint">پانچوں نمازیں — قدم بہ قدم</span>
          </span>
        </Link>

        <Link className="bigbtn" to="/witr">
          <span className="bigbtn__icon" aria-hidden="true">
            🌙
          </span>
          <span className="bigbtn__label">
            وتر
            <span className="bigbtn__hint">تین رکعت، دعائے قنوت کے ساتھ</span>
          </span>
        </Link>

        <Link className="bigbtn" to="/azkaar">
          <span className="bigbtn__icon" aria-hidden="true">
            📿
          </span>
          <span className="bigbtn__label">
            صبح و شام کے اذکار
            <span className="bigbtn__hint">چھوٹی اور آسان دعائیں</span>
          </span>
        </Link>

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
