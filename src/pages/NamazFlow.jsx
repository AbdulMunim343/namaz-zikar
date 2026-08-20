import { useMemo } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import StepPlayer from '../components/StepPlayer.jsx'
import { buildNamazSteps, getPrayer } from '../data/namaz.js'
import { useLang } from '../hooks/useLang.js'
import { prayerTitle } from '../lib/lang.js'

export default function NamazFlow() {
  const { lang } = useLang()
  const { prayerId } = useParams()
  const location = useLocation()
  const prayer = getPrayer(prayerId)

  const steps = useMemo(() => buildNamazSteps(prayerId), [prayerId])

  if (!prayer) return <Navigate to="/namaz" replace />

  return (
    <StepPlayer
      key={prayerId}
      title={prayerTitle(prayer, lang)}
      steps={steps}
      path={`/namaz/${prayerId}`}
      startAt={location.state?.startAt ?? 0}
    />
  )
}
