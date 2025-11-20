// Using OpenRouter to access high-quality, free models with a reliable API.
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// A system prompt helps guide the AI's personality and behavior.
const systemPrompt = `
You are Aura, a world-class empathetic listener. Your primary goal is to provide a safe, supportive space for the user to express their thoughts and feelings. Never act like a generic assistant. Focus on the user's emotions and experiences.

Conversation history is provided in full. Follow these rules:
1. Engage naturally, but let the user speak first. You only respond after the user shares something.
2. **Anchor every reply in what the user has already said.** If they mention a feeling (e.g., "I'm bored"), remember it and reference it accurately later—never guess a new emotion if they already told you.
3. Keep responses very short (one or two lines, maximum three) while remaining warm and validating.
4. Detect when the user is ending the chat ("bye", "that's all", etc.). Only then return a final JSON object with keys "mood" and "response" summarizing the entire session.
5. For all other turns, respond with plain conversational text (no JSON).

Example of a final response:
{"mood": "reflective", "response": "It sounds like you've done some important thinking today. Take care, and I'm here when you need me."}
`;

export const getChatbotResponse = async (userInput, conversationHistory) => {
  if (!API_KEY || API_KEY === 'your-openrouter-api-key-here') {
    console.error("OpenRouter API key not found. Please add it to your .env file.");
    return { text: "My AI brain isn't connected. Please check the API key in the .env file.", isFinal: false };
  }

  // The OpenRouter API uses the standard OpenAI message format.
  const mappedHistory = conversationHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  const lastEntry = conversationHistory[conversationHistory.length - 1];
  const includesLatestUser = lastEntry?.sender === 'user' && lastEntry?.text === userInput;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...mappedHistory
  ];

  if (!includesLatestUser && userInput) {
    messages.push({ role: 'user', content: userInput });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173', // Required by OpenRouter
        'X-Title': 'Aura Mental Wellness App' // Required by OpenRouter
      },
      body: JSON.stringify({
        // We use a high-quality free model. We are NOT forcing JSON mode anymore,
        // as the AI will decide when to respond with JSON.
        model: 'mistralai/mistral-7b-instruct:free',
        messages: messages
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error:", response.status, errorBody);
      return { text: `I'm having a little trouble thinking. (Error: ${response.status})`, isFinal: false };
    }

    const data = await response.json();
    const aiResponseContent = data.choices[0].message.content;

    // The AI will respond with a JSON string only at the end of the conversation.
    // We try to parse it. If it fails, we know it's a regular conversational message.
    try {
      const finalResponse = JSON.parse(aiResponseContent);
      // It's the final JSON response. Return the structured object.
      return {
        isFinal: true,
        mood: finalResponse.mood,
        text: finalResponse.response
      };
    } catch (e) {
      // It's a regular message. Return it as a simple string.
      return { isFinal: false, text: aiResponseContent };
    }

  } catch (error) {
    console.error('Failed to fetch from OpenRouter API:', error);
    return { text: "I'm sorry, I couldn't connect to my AI brain. Please check the network connection.", isFinal: false };
  }
};
