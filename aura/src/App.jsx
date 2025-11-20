import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Landing from './pages/Landing';
import Chat from './pages/Chat';

function App() {
  const [moodHistory, setMoodHistory] = useLocalStorage('moodHistory', []);
  const isOnline = useOnlineStatus();

  const handleLogMood = (mood, journal = '') => {
    if (!mood) return;
    const newLog = { mood, date: new Date().toISOString(), journal };
    setMoodHistory(prevHistory => [...prevHistory, newLog]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Aura</h1>
          <p>Your personal space for reflection and growth.</p>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  moodHistory={moodHistory}
                  onLogMood={handleLogMood}
                  isOnline={isOnline}
                />
              }
            />
            <Route
              path="/chat"
              element={<Chat onLogMood={handleLogMood} isOnline={isOnline} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
