# 📝 EssayHelper

**EssayHelper** is an AI-powered chatbot web application designed to help users improve their essays, personal statements, or application drafts. Built using an Angular frontend and a Node.js + Express backend, it integrates with Google's Gemini API to provide smart, context-aware feedback on writing.

Whether you're applying to a university, a job, or a fellowship, EssayHelper offers personalized suggestions on what to include, what to avoid, and how to improve clarity and impact — all while maintaining a natural, human-like chat experience.

---

## 💡 Key Features

- 💬 Conversational AI to refine and strengthen essays  
- ✍️ Custom system prompt tailored for application writing guidance  
- 🔐 Backend securely handles API interactions (no keys exposed to frontend)  
- ⚙️ Easy-to-run, full-stack project with modular architecture  
- 🌐 CORS-enabled for smooth frontend-backend communication during development  

---

## 📁 Structure

- `frontend/` – Angular (user interface)
- `backend/` – Node.js + Express (API server)

---

## 🚀 Run Locally

### 🔧 Frontend
```bash
cd frontend
npm install
npm start
```

### 🔧 Backend
```bash
cd backend
npm install
npm start
```

### 📦 Environment Variables

To run the backend securely, create a `.env` file inside the `backend/` directory with the following content:

```env
GENAI_API_KEY=your_google_gemini_api_key
```

