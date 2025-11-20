import React, { useState, useEffect, useRef } from 'react';
import { getNextResponse } from '../utils/conversationManager';
import { speak, stop } from '../utils/speech';
import { inferMoodFromText } from '../utils/moodAnalyzer';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
}

function Conversation({ onLogMood, initialMessage = '' }) {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const hasSentInitial = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Start with a fresh conversation when the component mounts
    startNewConversation();
  }, []);

  useEffect(scrollToBottom, [conversationHistory]);

  const startNewConversation = () => {
    setConversationHistory([
      { text: "Hello! I'm Aura. How are you feeling today?", sender: 'ai' },
    ]);
    setSessionEnded(false);
  };

  const handleListen = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
      // Automatically submit the transcribed text
      handleSendMessage();
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, []);

  const handleSendMessage = async (overrideMessage) => {
    const messageToSend = typeof overrideMessage === 'string' ? overrideMessage : userInput;
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage || isThinking) return;

    const newUserMessage = { text: trimmedMessage, sender: 'user' };
    const currentHistory = [...conversationHistory, newUserMessage];

    setConversationHistory(currentHistory);
    if (typeof overrideMessage !== 'string') {
      setUserInput('');
    }
    setIsThinking(true);

    if (onLogMood) {
      const inferredMood = inferMoodFromText(trimmedMessage);
      onLogMood(inferredMood, trimmedMessage);
    }

    // Get the response from the AI. It could be a regular message or a final summary.
    const aiResponse = await getNextResponse(trimmedMessage, currentHistory);
    setIsThinking(false);

    // Speak the response
    speak(aiResponse.text);
    const aiMessage = { text: aiResponse.text, sender: 'ai' };
    setConversationHistory(prev => [...prev, aiMessage]);

    if (aiResponse.isFinal) {
      setSessionEnded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const toggleListening = () => {
    handleListen();
  };

  useEffect(() => {
    if (!initialMessage || hasSentInitial.current || conversationHistory.length === 0) return;
    hasSentInitial.current = true;
    handleSendMessage(initialMessage);
  }, [initialMessage, conversationHistory]);

  return (
    <div className="conversation-container">
      <div className="messages-list">
        {conversationHistory.map((msg, index) => (
          <div key={index} className={`message-bubble-wrapper ${msg.sender === 'user' ? 'user' : 'ai'}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {isThinking && (
           <div className="message-bubble-wrapper ai">
            <div className="message-bubble typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Talk to Aura..."
          disabled={isThinking || isListening}
        />
        <button type="button" onClick={toggleListening} className={`mic-button ${isListening ? 'listening' : ''}`} disabled={isThinking}>
          🎤
        </button>
        <button type="submit" className="send-button" disabled={isThinking || !userInput.trim() || sessionEnded}>
          ➔
        </button>
      </form>

      {sessionEnded && (
        <div className="session-end-container">
          <button onClick={startNewConversation} className="new-session-button">
            Start New Conversation
          </button>
        </div>
      )}

      <div className="controls-container">
        <button onClick={stop} className="control-button">
          Stop ⏹️
        </button>
      </div>
    </div>
  );
}

export default Conversation;
