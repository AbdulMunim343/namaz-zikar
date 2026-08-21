import Icon from './Icon.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useLang } from '../hooks/useLang.js'

/**
 * One button in the top bar: it shows what tapping it will give you — a sun
 * when the screen is dark, a moon when it is light.
 */
export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const { t } = useLang()

  return (
    <button
      type="button"
      className="topbar__btn"
      onClick={toggle}
      aria-label={isDark ? t.lightMode : t.darkMode}
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  )
}
