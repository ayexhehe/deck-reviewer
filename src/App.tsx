import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Review from './pages/Review'
import MockSetup from './pages/MockSetup'
import MockTest from './pages/MockTest'
import Leaderboard from './pages/Leaderboard'
import LeaderboardTest from './pages/LeaderboardTest'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/review" element={<Review />} />
        <Route path="/mock-setup" element={<MockSetup />} />
        <Route path="/mock-test" element={<MockTest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/leaderboard-test" element={<LeaderboardTest />} />
      </Routes>
    </BrowserRouter>
  )
}
