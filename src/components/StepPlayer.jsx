import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import ProgressBar from './ProgressBar.jsx'
import AudioButton from './AudioButton.jsx'

const RESUME_KEY = 'namaz:resume'

function saveResume(entry) {
  try {
    window.localStorage.setItem(RESUME_KEY, JSON.stringify(entry))
  } catch {
    /* storage blocked — the flow still works, it just won't offer to resume */
  }
}

export function clearResume() {
  try {
    window.localStorage.removeItem(RESUME_KEY)
  } catch {
    /* ignore */
  }
}

export function readResume() {
  try {
    const raw = window.localStorage.getItem(RESUME_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * ایک وقت میں ایک قدم — the shared step-by-step screen for both namaz and witr.
 *
 * @param {string} title      shown in the header, e.g. «فجر کی نماز»
 * @param {Array}  steps      the step list from src/data
 * @param {string} path       route to store as the resume point
 * @param {number} startAt    step index to open on (used by «جاری رکھیں»)
 */
export default function StepPlayer({ title, steps, path, startAt = 0 }) {
  const navigate = useNavigate()
  const [index, setIndex] = useState(() => Math.min(Math.max(startAt, 0), steps.length - 1))
  const [finished, setFinished] = useState(false)

  const step = steps[index]
  const pageRef = useRef(null)

  // Remember where he is, so closing the phone mid-prayer is not a fresh start.
  useEffect(() => {
    if (finished) clearResume()
    else saveResume({ path, title, index, total: steps.length })
  }, [finished, index, path, title, steps.length])

  // Each step is its own screen — always start reading from the top.
  // Only .page scrolls in the app shell, so reset that, not the window.
  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTop = 0
  }, [index, finished])

  const next = useCallback(() => {
    setIndex((i) => {
      if (i + 1 >= steps.length) {
        setFinished(true)
        return i
      }
      return i + 1
    })
  }, [steps.length])

  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  const restart = useCallback(() => {
    setFinished(false)
    setIndex(0)
  }, [])

  if (finished) {
    return (
      <>
        <TopBar title={title} />
        <main className="page" ref={pageRef}>
          <div className="done">
            <div className="done__mark" aria-hidden="true">
              ✅
            </div>
            <h2 className="done__title">ماشاءاللہ! {title} مکمل ہو گئی</h2>
            <p className="done__text">اللہ آپ کی نماز قبول فرمائے۔</p>
          </div>
        </main>
        <div className="actionbar">
          <button type="button" className="btn-primary" onClick={restart}>
            دوبارہ پڑھیں
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            مرکزی صفحہ
          </button>
        </div>
      </>
    )
  }

  const isLast = index === steps.length - 1

  return (
    <>
      <TopBar title={title} />
      <main className="page" ref={pageRef}>
        <ProgressBar current={index + 1} total={steps.length} rakah={step.rakah} />

        <section className="step" key={step.id}>
          <h2 className="step__title">{step.title}</h2>
          <p className="step__do">{step.do}</p>

          {step.times ? <span className="step__count">{step.times} بار</span> : null}

          {step.arabic ? <p className="arabic">{step.arabic}</p> : null}
          {step.translit ? <p className="translit">{step.translit}</p> : null}
          {step.meaning ? <p className="meaning">{step.meaning}</p> : null}

          <AudioButton arabic={step.arabic} urdu={step.meaning} audio={step.audio} />
        </section>
      </main>

      <div className="actionbar">
        <button type="button" className="btn-primary" onClick={next}>
          {isLast ? 'مکمل کریں' : 'اگلا قدم ←'}
        </button>
        <button type="button" className="btn-secondary" onClick={back} disabled={index === 0}>
          → پیچھے
        </button>
      </div>
    </>
  )
}
