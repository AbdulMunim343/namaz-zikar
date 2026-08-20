import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import TabBar from './components/TabBar.jsx'
import Home from './pages/Home.jsx'
import NamazFlow from './pages/NamazFlow.jsx'
import WitrFlow from './pages/WitrFlow.jsx'
import Azkaar from './pages/Azkaar.jsx'

/** نماز پڑھتے وقت نیچے والی پٹی چھپا دی جاتی ہے تاکہ توجہ نہ بٹے۔ */
function usesTabBar(pathname) {
  return !pathname.startsWith('/namaz/') && pathname !== '/witr'
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namaz" element={<Navigate to="/" replace />} />
        <Route path="/namaz/:prayerId" element={<NamazFlow />} />
        <Route path="/witr" element={<WitrFlow />} />
        <Route path="/azkaar" element={<Azkaar />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {usesTabBar(pathname) ? <TabBar /> : null}
    </div>
  )
}
