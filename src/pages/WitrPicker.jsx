import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar.jsx'
import { WITR_OPTIONS } from '../data/witr.js'

/**
 * وتر دو الگ نمازیں ہیں: پہلے ۲ رکعت پڑھ کر سلام، پھر الگ نیت سے ۱ رکعت۔
 */
export default function WitrPicker() {
  return (
    <>
      <TopBar title="وتر" />
      <main className="page">
        <p className="note">
          وتر دو حصوں میں پڑھے جاتے ہیں۔ پہلے ۲ رکعت پڑھ کر سلام پھیر لیں، پھر الگ نیت
          سے ۱ رکعت پڑھیں جس میں دعائے قنوت ہے۔
        </p>

        {WITR_OPTIONS.map((option) => (
          <Link key={option.id} className="bigbtn" to={`/witr/${option.id}`}>
            <span className="bigbtn__icon" aria-hidden="true">
              {option.id === 'one' ? '☝️' : '🌙'}
            </span>
            <span className="bigbtn__label">
              {option.name}
              <span className="bigbtn__hint">{option.hint}</span>
            </span>
          </Link>
        ))}
      </main>
    </>
  )
}
