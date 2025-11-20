const responses = {
  Happy: [
    "It's wonderful to hear that you're feeling happy! What's bringing you joy today?",
    "That's fantastic! Hold on to that feeling. What's one small thing you can do to celebrate this moment?",
    "I'm so glad you're feeling happy. Your positivity is radiant."
  ],
  Calm: [
    "Finding a moment of calm is a beautiful thing. What's helping you feel at peace?",
    "It's great that you're feeling calm. Let this tranquility be your anchor for the rest of the day.",
    "A calm mind is a powerful mind. I'm glad you're in that space right now."
  ],
  Sad: [
    "I'm sorry to hear you're feeling sad. Remember that it's okay to not be okay. I'm here to listen.",
    "It takes courage to acknowledge sadness. Be gentle with yourself today. What's on your mind?",
    "Sending you warmth. Remember that this feeling is temporary, like a passing cloud."
  ],
  Anxious: [
    "I hear that you're feeling anxious. Take a slow, deep breath. Inhale for four, hold for four, exhale for six. You are safe.",
    "Anxiety can be overwhelming, but you are stronger than it. Focus on one thing you can see, hear, or touch right now.",
    "It's brave of you to share that you're feeling anxious. Let's work through this together. What does your body need right now?"
  ],
  Excited: [
    "How exciting! What are you looking forward to? Ride that wave of positive energy!",
    "That's amazing! Excitement is a wonderful feeling. Channel that energy into something creative.",
    "I'm excited for you! It's great to have things to look forward to."
  ],
  Tired: [
    "It sounds like you need to rest. It's important to listen to your body. Can you schedule some time for self-care?",
    "Feeling tired is a signal to slow down. Be kind to yourself and don't push too hard.",
    "Thank you for checking in, even when you're tired. Your well-being matters. Rest is productive."
  ],
  default: [
    "Thank you for sharing with me. Every check-in is a step forward on your journey."
  ]
};

export const generateResponse = (mood) => {
  const moodResponses = responses[mood] || responses.default;
  return moodResponses[Math.floor(Math.random() * moodResponses.length)];
};
