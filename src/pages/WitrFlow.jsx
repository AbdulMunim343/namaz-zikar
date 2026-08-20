import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import StepPlayer from '../components/StepPlayer.jsx'
import { buildWitrSteps } from '../data/witr.js'

export default function WitrFlow() {
  const location = useLocation()
  const steps = useMemo(() => buildWitrSteps(), [])

  return (
    <StepPlayer
      title="وتر"
      steps={steps}
      path="/witr"
      startAt={location.state?.startAt ?? 0}
    />
  )
}
