import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { RegisterPage } from './Pages/RegisterPage/RegisterPage';
import { GamePage } from './Pages/GamePage/GamePage';
import { LeaderboardsPage } from './Pages/LeaderboardsPage/LeaderboardsPage';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("http://localhost:8080/user/1");
        setUser(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    getUser();
  }, []);

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/user/:id" element={<Dashboard user={user}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage user={user} />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
