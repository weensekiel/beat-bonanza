import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { RegisterPage } from './Pages/RegisterPage/RegisterPage';
import { GamePage } from './Pages/GamePage/GamePage';
import { ResultsPage } from './Pages/ResultsPage/ResultsPage';
import { LeaderboardsPage } from './Pages/LeaderboardsPage/LeaderboardsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
