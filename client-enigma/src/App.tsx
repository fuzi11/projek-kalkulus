import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Challenges from './pages/Challenges';
import Panduan from './pages/Panduan';
import Leaderboard from './pages/Leaderboard';
import Laboratorium from './pages/Laboratorium';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/panduan" element={<Panduan />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/laboratorium" element={<Laboratorium />} />
      </Routes>
    </Router>
  );
}