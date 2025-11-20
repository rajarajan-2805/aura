import React, { useState } from 'react';

const moods = ['Happy', 'Calm', 'Sad', 'Anxious', 'Excited', 'Tired', 'Angry'];

function MoodLogger({ onLogMood }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [journal, setJournal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      alert('Please select a mood.');
      return;
    }
    onLogMood(selectedMood, journal);
    setSelectedMood('');
    setJournal('');
  };

  return (
    <div className="card">
      <h2>Log your mood offline</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="What's on your mind? (Optional)"
        ></textarea>
        <button type="submit" className="submit-btn">Log Mood</button>
      </form>
    </div>
  );
}

export default MoodLogger;
