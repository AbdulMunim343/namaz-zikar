import { useNavigate } from 'react-router-dom'
import FontSizeControl from './FontSizeControl.jsx'

/** Green header: back button on the right (RTL), title, font size on the left. */
export default function TopBar({ title, onBack }) {
  const navigate = useNavigate()
  const goBack = onBack || (() => navigate('/'))

  return (
    <header className="topbar">
      <button type="button" className="topbar__btn" onClick={goBack} aria-label="واپس">
        <span aria-hidden="true">→</span>
      </button>
      <h1 className="topbar__title">{title}</h1>
      <FontSizeControl />
    </header>
  )
}
