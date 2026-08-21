import { Link, useNavigate } from 'react-router-dom'
import FontSizeControl from '../components/FontSizeControl.jsx'
import { readResume, clearResume } from '../components/StepPlayer.jsx'
import { PRAYERS } from '../data/namaz.js'
import LangSwitch from '../components/LangSwitch.jsx'
import { useLang } from '../hooks/useLang.js'
import { prayerName } from '../lib/lang.js'
import Icon from '../components/Icon.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

/**
 * مرکزی صفحہ — نماز والا صفحہ
 *
 * The five prayers sit directly here rather than behind a picker page, so
 * starting a prayer is one tap. وتر and اذکار are in the bottom tab bar.
 */
export default function Home() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const resume = readResume()

  return (
    <>
      <header className="topbar">
        <span style={{ minWidth: 52 }} aria-hidden="true" />
        <h1 className="topbar__title">{t.appName}</h1>
        <div className="topbar__tools">
          <ThemeToggle />
          <FontSizeControl />
        </div>
      </header>

      <main className="page">
        <div className="hero">
          <p className="hero__salam">{t.salam}</p>
          <p className="hero__sub">{t.tagline}</p>
        </div>

        {resume ? (
          <button
            type="button"
            className="bigbtn bigbtn--resume"
            onClick={() => navigate(resume.path, { state: { startAt: resume.index } })}
          >
            <span className="bigbtn__icon" aria-hidden="true">
              <Icon name="resume" />
            </span>
            <span className="bigbtn__label">
              {t.resume}
              <span className="bigbtn__hint">
                {resume.title} — {t.step} {resume.index + 1} {t.of} {resume.total}
              </span>
            </span>
          </button>
        ) : null}

        <h2 className="section">{t.whichPrayer}</h2>
        <div className="picker">
          {PRAYERS.map((prayer) => (
            <Link key={prayer.id} className="picker__card" to={`/namaz/${prayer.id}`}>
              <span className="picker__name">{prayerName(prayer, lang)}</span>
              <span className="picker__count">
                {prayer.fard} {t.rakahsFard}
              </span>
            </Link>
          ))}
        </div>

        <LangSwitch />

        <p className="note">{t.tabHint}</p>

        <p className="note">
          {t.fardNote}
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
            {t.forget}
          </button>
        ) : null}
      </main>
    </>
  )
}
