import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import { WITR_OPTIONS } from '../data/witr.js'
import { useLang } from '../hooks/useLang.js'
import { witrOption } from '../lib/lang.js'
import Icon from '../components/Icon.jsx'

/**
 * وتر دو الگ نمازیں ہیں: پہلے ۲ رکعت پڑھ کر سلام، پھر الگ نیت سے ۱ رکعت۔
 */
export default function WitrPicker() {
  const { t, lang } = useLang()

  return (
    <>
      <TopBar title={t.witrTitle} />
      <main className="page">
        <p className="note">
          {t.witrNote}
        </p>

        {WITR_OPTIONS.map((raw) => {
          const option = witrOption(raw, lang)
          return (
          <Link key={option.id} className="bigbtn" to={`/witr/${option.id}`}>
            <span className="bigbtn__icon" aria-hidden="true">
              <Icon name={option.id === 'one' ? 'one' : 'two'} />
            </span>
            <span className="bigbtn__label">
              {option.name}
              <span className="bigbtn__hint">{option.hint}</span>
            </span>
            </Link>
          )
        })}
      </main>
    </>
  )
}
