import { getChatbotResponse } from './chatbotApi';

/**
 * This function is now a simple pass-through to the chatbot API.
 * All conversational logic, including mood analysis and farewells,
 * is handled by the AI model itself.
 */
export const getNextResponse = async (userInput, conversationHistory) => {
  // Directly call the AI and return its structured response { mood, text }.
  const aiResponse = await getChatbotResponse(userInput, conversationHistory);
  return aiResponse;
};
