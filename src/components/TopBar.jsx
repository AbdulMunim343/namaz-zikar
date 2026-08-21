import { useNavigate } from 'react-router-dom'
import FontSizeControl from './FontSizeControl.jsx'
import { useLang } from '../hooks/useLang.js'
import Icon from './Icon.jsx'
import ThemeToggle from './ThemeToggle.jsx'

/**
 * اوپر کی پٹی — گھر کا بٹن، عنوان، اور تحریر کا سائز
 *
 * The left button is a home button, not a back arrow: an arrow only says
 * "somewhere previous", which is one more thing to work out. A house always
 * means the same place.
 */
export default function TopBar({ title, onHome }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const goHome = onHome || (() => navigate('/'))

  return (
    <header className="topbar">
      <button type="button" className="topbar__btn" onClick={goHome} aria-label={t.home}>
        <Icon name="home" />
      </button>
      <h1 className="topbar__title">{title}</h1>
      <div className="topbar__tools">
        <ThemeToggle />
        <FontSizeControl />
      </div>
    </header>
  )
}
