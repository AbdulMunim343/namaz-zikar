import AudioButton from './AudioButton.jsx'

/**
 * ایک ذکر — متن اور بڑا گنتی کا بٹن
 *
 * The count circle is the whole interaction: tap it once per repetition, it
 * fills, then turns green when the required count is reached. No small controls.
 */
export default function ZikrCard({ zikr, count, onTap, onReset }) {
  const done = count >= zikr.times
  const remaining = Math.max(zikr.times - count, 0)

  return (
    <article className="zikr" data-done={done}>
      <div className="zikr__head">
        <h2 className="zikr__name">{zikr.name}</h2>
        {done ? (
          <span className="zikr__tick" role="img" aria-label="مکمل">
            ✅
          </span>
        ) : (
          <span className="picker__count">{zikr.times} بار</span>
        )}
      </div>

      <p className="arabic">{zikr.arabic}</p>
      <p className="translit">{zikr.translit}</p>
      <p className="meaning">{zikr.meaning}</p>
      {zikr.virtue ? <p className="note">{zikr.virtue}</p> : null}

      <AudioButton id={zikr.id} arabic={zikr.arabic} urdu={zikr.meaning} audio={zikr.audio} />

      <button
        type="button"
        className="counter"
        data-done={done}
        onClick={onTap}
        aria-label={
          done ? `${zikr.name} مکمل ہو گیا` : `${zikr.name} — ایک بار پڑھ لیا، دبائیں`
        }
      >
        <span className="counter__num">{count}</span>
        <span className="counter__of">
          {done ? 'مکمل' : `${remaining} باقی`}
        </span>
      </button>

      {count > 0 ? (
        <button type="button" className="zikr__reset" onClick={onReset}>
          گنتی دوبارہ شروع کریں
        </button>
      ) : null}
    </article>
  )
}
