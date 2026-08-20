import { useMemo } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import StepPlayer from '../components/StepPlayer.jsx'
import { buildWitrSteps, getWitrOption } from '../data/witr.js'

export default function WitrFlow() {
  const { variant } = useParams()
  const location = useLocation()
  const option = getWitrOption(variant)

  const steps = useMemo(() => buildWitrSteps(variant), [variant])

  if (!option) return <Navigate to="/witr" replace />

  return (
    <StepPlayer
      key={variant}
      title={option.name}
      steps={steps}
      path={`/witr/${variant}`}
      startAt={location.state?.startAt ?? 0}
    />
  )
}
