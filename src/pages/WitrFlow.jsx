import { useMemo } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import StepPlayer from '../components/StepPlayer.jsx'
import { buildWitrSteps, getWitrOption } from '../data/witr.js'
import { useLang } from '../hooks/useLang.js'
import { witrOption } from '../lib/lang.js'

export default function WitrFlow() {
  const { lang } = useLang()
  const { variant } = useParams()
  const location = useLocation()
  const option = getWitrOption(variant)

  const steps = useMemo(() => buildWitrSteps(variant), [variant])

  if (!option) return <Navigate to="/witr" replace />

  return (
    <StepPlayer
      key={variant}
      title={witrOption(option, lang).name}
      steps={steps}
      path={`/witr/${variant}`}
      startAt={location.state?.startAt ?? 0}
    />
  )
}
