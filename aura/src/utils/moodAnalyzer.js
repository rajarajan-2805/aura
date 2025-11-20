const moodKeywords = {
  Happy: ['happy', 'grateful', 'content', 'good', 'great', 'awesome', 'glad'],
  Excited: ['excited', 'eager', 'thrilled', "can't wait", 'pumped'],
  Calm: ['calm', 'peaceful', 'relaxed', 'okay', 'fine'],
  Tired: ['tired', 'exhausted', 'drained', 'sleepy', 'fatigued'],
  Sad: ['sad', 'down', 'depressed', 'upset', 'blue', 'cry'],
  Anxious: ['anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'panic'],
  Angry: ['angry', 'mad', 'furious', 'frustrated', 'irritated', 'annoyed', 'rage']
};

const moodFallbackOrder = ['Angry', 'Sad', 'Anxious', 'Tired', 'Calm'];

const weightMap = {
  '!': 0.3,
  'very ': 0.2,
  'really ': 0.2,
  'extremely ': 0.25,
  'so ': 0.15
};

const estimateIntensity = (text) => {
  let score = 0;
  Object.entries(weightMap).forEach(([marker, weight]) => {
    const occurrences = text.split(marker).length - 1;
    if (occurrences > 0) {
      score += occurrences * weight;
    }
  });
  return score;
};

export const inferMoodFromText = (text = '') => {
  const normalized = text.toLowerCase();
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return mood;
    }
  }

  const intensity = estimateIntensity(normalized);
  if (intensity >= 0.5) {
    return 'Angry';
  }

  return moodFallbackOrder.find(mood => mood !== 'Calm') || 'Calm';
};
