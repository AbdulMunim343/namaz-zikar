import { NavLink } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import Icon from './Icon.jsx'

/**
 * نیچے والی پٹی — ایپ کی طرح
 *
 * A fixed bottom tab bar, the way a phone app works: the three sections are
 * always one thumb-tap away, so he never has to find his way "back" first.
 * Hidden while a prayer is in progress, so nothing competes with «اگلا قدم».
 */
const TABS = [
  { to: '/', icon: 'mosque', key: 'namaz' },
  { to: '/witr', icon: 'moon', key: 'witr' },
  { to: '/azkaar', icon: 'beads', key: 'azkaar' },
  { to: '/night', icon: 'bed', key: 'night' },
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
          <Icon name={tab.icon} className="tabbar__icon" />
          <span className="tabbar__label">{t.tabs[tab.key]}</span>
        </NavLink>
      ))}
    </nav>
  )
}
