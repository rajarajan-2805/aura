# Aura - Mental Wellness Companion

> **Empowering mental wellness through AI-driven conversations and personalized emotional insights**

Aura is a privacy-first Progressive Web App (PWA) that helps users track and improve their mental well-being through empathetic AI conversations, multi-dimensional mood tracking, and intelligent behavioral insights—all while keeping data secure on the user's device.

---

##  Problem Statement

India faces a critical mental health crisis with:
- **10%+ of adults** affected by mental health issues
- **70%+ treatment gap** due to stigma, cost, and accessibility barriers
- **150M+ youth** lacking access to professional mental health support

Aura addresses this by providing an accessible, judgment-free space for emotional expression and self-discovery, leveraging open-source AI to democratize mental wellness tools.

---

##  Key Features

###  **Intelligent Conversational Companion**
- AI-powered empathetic responses using OpenRouter (Mistral-7B)
- Real-time typing indicators and auto-scrolling chat interface
- Speech-to-text input via Web Speech API for hands-free interaction
- Text-to-speech playback for accessibility
- Context-aware conversations that remember session history

###  **Advanced Mood Analytics**
- **Multi-dimensional tracking**: Emotion type, intensity (1-10), energy level (1-10)
- **Emotional baseline mapping** with line charts and radar visualizations
- **Behavioral signal detection**: Auto-infers moods including anger/frustration from conversation text
- **Trend insights panel** showing:
  - Weekly mood improvements (e.g., "Your mood improved 30% this week")
  - Day-of-week patterns (e.g., "You're more stressed on Mondays")
  - Time-of-day correlations (e.g., "You're happier after 8 PM")

###  **Privacy-First Architecture**
- **100% local data storage** using browser localStorage—no backend servers
- All conversations and mood logs remain on your device
- No user accounts, no data collection, no tracking
- Full user control with data export/clear options

### 📱 **Progressive Web App (PWA)**
- Install on mobile home screen for native app experience
- Optimized touch interactions and mobile-responsive design
- Offline-ready architecture (in progress)
- Fast, lightweight React + Vite stack

### 🎯 **Micro-Interventions** *(In Development)*
- Proactive suggestions based on detected mood patterns
- Personalized coping strategies and grounding techniques
- Crisis resource integration (NIMHANS, Vandrevala Foundation helplines)

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite (fast build tooling)
- Custom CSS styling with responsive design
- Recharts for data visualization (line + radar charts)

**AI Integration**
- OpenRouter API (`/chat/completions` endpoint)
- Model: `mistralai/mistral-7b-instruct:free`
- Custom system prompts for empathetic, wellness-focused responses

**Browser APIs**
- Web Speech API (speech recognition + synthesis)
- LocalStorage API (persistent data without backend)
- Fetch API for OpenRouter calls

**PWA Setup**
- `vite-plugin-pwa` for Progressive Web App capabilities
- Service worker integration (in progress)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository**
2. **Install dependencies**(command: npm install)
3. **Set up environment variables**(command: cp .env.example .env)
4. **Run the application**(command: npm run dev)

