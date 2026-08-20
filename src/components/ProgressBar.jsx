import { toUrduNumber } from '../lib/urduNumbers.js'

/** «قدم ۴ از ۱۳» — so he always knows where he is and how much is left. */
export default function ProgressBar({ current, total, rakah }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="progress__row">
        <span>
          قدم {toUrduNumber(current)} از {toUrduNumber(total)}
        </span>
        {rakah ? <span>{toUrduNumber(rakah)} رکعت</span> : null}
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
