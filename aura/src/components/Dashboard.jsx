import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const moodValues = {
  Happy: 5,
  Excited: 4,
  Calm: 3,
  Tired: 2,
  Sad: 1,
  Anxious: 0,
};

function Dashboard({ moodHistory }) {
  const chartData = moodHistory.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    mood: moodValues[entry.mood],
    journal: entry.journal
  }));

  return (
    <div className="card">
      <h2>Your Mood Journey</h2>
      {moodHistory.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} ticks={[...Array(6).keys()]} tickFormatter={(value) => Object.keys(moodValues).find(key => moodValues[key] === value)} />
            <Tooltip formatter={(value) => Object.keys(moodValues).find(key => moodValues[key] === value)} />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Log your mood to see your journey begin.</p>
      )}
    </div>
  );
}

export default Dashboard;
