import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import TabBar from './components/TabBar.jsx'
import DownloadBanner from './components/DownloadBanner.jsx'
import { stop as stopSpeech } from './lib/speech.js'
import Home from './pages/Home.jsx'
import NamazFlow from './pages/NamazFlow.jsx'
import WitrPicker from './pages/WitrPicker.jsx'
import WitrFlow from './pages/WitrFlow.jsx'
import Azkaar from './pages/Azkaar.jsx'
import NightAzkaar from './pages/NightAzkaar.jsx'

/** نماز پڑھتے وقت نیچے والی پٹی چھپا دی جاتی ہے تاکہ توجہ نہ بٹے۔ */
function usesTabBar(pathname) {
  return !pathname.startsWith('/namaz/') && !pathname.startsWith('/witr/')
}

export default function App() {
  const { pathname } = useLocation()

  // دوسرے صفحے پر جاتے ہی آواز بند — audio never follows him to the next screen.
  useEffect(() => {
    stopSpeech()
  }, [pathname])

  const browsing = usesTabBar(pathname)

  return (
    <div className="app">
      <DownloadBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namaz" element={<Navigate to="/" replace />} />
        <Route path="/namaz/:prayerId" element={<NamazFlow />} />
        <Route path="/witr" element={<WitrPicker />} />
        <Route path="/witr/:variant" element={<WitrFlow />} />
        <Route path="/azkaar" element={<Azkaar />} />
        <Route path="/night" element={<NightAzkaar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {browsing ? <TabBar /> : null}
    </div>
  )
}
