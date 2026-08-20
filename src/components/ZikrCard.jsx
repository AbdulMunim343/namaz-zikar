import AudioButton from './AudioButton.jsx'
import { useLang } from '../hooks/useLang.js'

/**
 * ایک ذکر — متن اور بڑا گنتی کا بٹن
 *
 * The count circle is the whole interaction: tap it once per repetition, it
 * fills, then turns green when the required count is reached. No small controls.
 */
export default function ZikrCard({ zikr, count, onTap, onReset }) {
  const { t } = useLang()
  const done = count >= zikr.times
  const remaining = Math.max(zikr.times - count, 0)

  return (
    <article className="zikr" data-done={done}>
      <div className="zikr__head">
        <h2 className="zikr__name">{zikr.name}</h2>
        {done ? (
          <span className="zikr__tick" role="img" aria-label={t.complete}>
            ✅
          </span>
        ) : (
          <span className="picker__count">{zikr.times} {t.times}</span>
        )}
      </div>

      {zikr.instruction ? <p className="step__do">{zikr.instruction}</p> : null}
      {zikr.arabic ? <p className="arabic">{zikr.arabic}</p> : null}
      {zikr.translit ? <p className="translit" dir="rtl" lang="ur">{zikr.translit}</p> : null}
      {zikr.meaning ? <p className="meaning">{zikr.meaning}</p> : null}
      {zikr.virtue ? <p className="note">{zikr.virtue}</p> : null}

      <AudioButton id={zikr.id} arabic={zikr.arabic} urdu={zikr.meaning} audio={zikr.audio} />

      <button
        type="button"
        className="counter"
        data-done={done}
        onClick={onTap}
        aria-label={
          done ? `${zikr.name} — ${t.complete}` : zikr.name
        }
      >
        <span className="counter__num">{count}</span>
        <span className="counter__of">
          {done ? t.complete : `${remaining} ${t.remaining}`}
        </span>
      </button>

      {count > 0 ? (
        <button type="button" className="zikr__reset" onClick={onReset}>
          {t.resetCount}
        </button>
      ) : null}
    </article>
  )
}
