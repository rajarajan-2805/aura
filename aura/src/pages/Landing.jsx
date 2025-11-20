import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import MoodLogger from '../components/MoodLogger';

function Landing({ moodHistory, onLogMood, isOnline }) {
  const [openingMessage, setOpeningMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = openingMessage.trim();
    if (!trimmed) {
      setError('Share a thought or feeling to begin.');
      return;
    }

    setError('');
    navigate('/chat', { state: { initialMessage: trimmed } });
  };

  return (
    <div className="landing-layout">
      <section className="card landing-card">
        <h2>How are you feeling right now?</h2>
        <p className="subtext">
          {isOnline
            ? 'Think of this as a private check-in. Aura will pick up from whatever you share.'
            : 'You are offline. Log your mood here, and Aura will sync the conversation once you are back online.'}
        </p>
        {isOnline ? (
          <>
            <form className="landing-input" onSubmit={handleSubmit}>
              <input
                type="text"
                value={openingMessage}
                onChange={(e) => setOpeningMessage(e.target.value)}
                placeholder="Start with a sentence, e.g. “I’m feeling overwhelmed by exams.”"
              />
              <button type="submit">Talk to Aura</button>
            </form>
            {error && <p className="form-error">{error}</p>}
          </>
        ) : (
          <MoodLogger onLogMood={(mood, journal) => onLogMood(mood, journal)} />
        )}
      </section>

      <section className="card chart-card">
        <h2>Recent Mood Log</h2>
        <p className="subtext">Aura charts how your feelings change over time and ties each entry to its moment.</p>
        <Dashboard moodHistory={moodHistory} />
      </section>
    </div>
  );
}

export default Landing;
