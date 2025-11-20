export const speak = (text) => {
  if ('speechSynthesis' in window) {
    // Stop any currently speaking utterance before starting a new one
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.25; // Increase the speed
    window.speechSynthesis.speak(utterance);
  } else {
    console.log('Text-to-speech not supported in this browser.');
  }
};

export const stop = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  } else {
    console.log('Text-to-speech not supported in this browser.');
  }
};
