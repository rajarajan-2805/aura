import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Conversation from '../components/Conversation';

function Chat({ onLogMood, isOnline }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialMessage = location.state?.initialMessage || '';

  const handleBack = () => navigate('/');

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button onClick={handleBack} className="back-button">← Back</button>
        <p className="subtext">
          {isOnline
            ? 'Aura remembers what you shared and keeps logging moods automatically.'
            : 'You are offline. Conversations will resume once your connection is back.'}
        </p>
      </div>
      <div className="chat-shell card">
        {isOnline ? (
          <Conversation onLogMood={onLogMood} initialMessage={initialMessage} />
        ) : (
          <div className="offline-placeholder">
            <p>Your offline check-ins are saved locally. Go back to the home page to keep logging moods.</p>
            <button className="submit-btn" onClick={handleBack}>Return to Mood Log</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
