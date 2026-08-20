
/** «قدم ۴ از ۱۳» — so he always knows where he is and how much is left. */
import { useLang } from '../hooks/useLang.js'

export default function ProgressBar({ current, total, rakah }) {
  const { t } = useLang()
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="progress__row">
        <span>
          {t.step} {current} {t.of} {total}
        </span>
        {rakah ? <span>{rakah} {t.rakah}</span> : null}
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
