import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Bella from './pages/Bella/Bella';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import AISettings from './pages/AISettings/AISettings';
import ChangeWallpaper from './pages/ChangeWallpaper/ChangeWallpaper';
import HowToUse from './pages/HowToUse/HowToUse';
import SupportProject from './pages/SupportProject/SupportProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/bella" element={<ProtectedRoute><Bella /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/ai-settings" element={<ProtectedRoute><AISettings /></ProtectedRoute>} />
        <Route path="/change-wallpaper" element={<ProtectedRoute><ChangeWallpaper /></ProtectedRoute>} />
        <Route path="/support-project" element={<ProtectedRoute><SupportProject /></ProtectedRoute>} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App
