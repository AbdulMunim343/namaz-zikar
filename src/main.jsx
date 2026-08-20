import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { isNative } from './lib/speech.js'
import './styles.css'

// The service worker is what makes the *website* work offline. Inside the
// Android app every asset is already on the device, so it buys nothing there
// and only adds a layer that can intercept requests the native shell serves.
if (!isNative()) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => registerSW({ immediate: true }))
    .catch(() => {
      /* no service worker support — the app still works, just not offline */
    })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
