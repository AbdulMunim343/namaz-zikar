import { NavLink } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'

/**
 * نیچے والی پٹی — ایپ کی طرح
 *
 * A fixed bottom tab bar, the way a phone app works: the three sections are
 * always one thumb-tap away, so he never has to find his way "back" first.
 * Hidden while a prayer is in progress, so nothing competes with «اگلا قدم».
 */
const TABS = [
  { to: '/', icon: '🕌', key: 'namaz' },
  { to: '/witr', icon: '🌙', key: 'witr' },
  { to: '/azkaar', icon: '📿', key: 'azkaar' },
  { to: '/night', icon: '🛏️', key: 'night' },
]

export default function TabBar() {
  const { t } = useLang()

  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => (isActive ? 'tabbar__item is-active' : 'tabbar__item')}
        >
          <span className="tabbar__icon" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="tabbar__label">{t.tabs[tab.key]}</span>
        </NavLink>
      ))}
    </nav>
  )
}
