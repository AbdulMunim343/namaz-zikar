import { NavLink } from 'react-router-dom'

/**
 * نیچے والی پٹی — ایپ کی طرح
 *
 * A fixed bottom tab bar, the way a phone app works: the three sections are
 * always one thumb-tap away, so he never has to find his way "back" first.
 * Hidden while a prayer is in progress, so nothing competes with «اگلا قدم».
 */
const TABS = [
  { to: '/', icon: '🕌', label: 'نماز' },
  { to: '/witr', icon: '🌙', label: 'وتر' },
  { to: '/azkaar', icon: '📿', label: 'اذکار' },
  { to: '/night', icon: '🛏️', label: 'رات' },
]

export default function TabBar() {
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
          <span className="tabbar__label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
