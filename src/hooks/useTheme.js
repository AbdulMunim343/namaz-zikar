import { useSyncExternalStore } from 'react'
import { effectiveTheme, setTheme, subscribeTheme } from '../lib/theme.js'

/** Re-renders the toggle when the theme changes. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, effectiveTheme, () => 'light')
  return {
    theme,
    isDark: theme === 'dark',
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}
