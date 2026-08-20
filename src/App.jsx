import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PrayerPicker from './pages/PrayerPicker.jsx'
import NamazFlow from './pages/NamazFlow.jsx'
import WitrFlow from './pages/WitrFlow.jsx'
import Azkaar from './pages/Azkaar.jsx'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namaz" element={<PrayerPicker />} />
        <Route path="/namaz/:prayerId" element={<NamazFlow />} />
        <Route path="/witr" element={<WitrFlow />} />
        <Route path="/azkaar" element={<Azkaar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
