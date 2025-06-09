# 📝 EssayHelper

**EssayHelper** is an AI-powered chatbot web application designed to help users improve their essays, personal statements, or application drafts. Built using an Angular frontend and a Node.js + Express backend, it integrates with Google's Gemini API to provide smart, context-aware feedback on writing.

Whether you're applying to a university, a job, or a fellowship, EssayHelper offers personalized suggestions on what to include, what to avoid, and how to improve clarity and impact — all while maintaining a natural, human-like chat experience.

---

## 💡 Key Features

- 💬 Conversational AI to refine and strengthen essays  
- ✍️ Custom system prompt tailored for application writing guidance  
- 🔐 Secure backend handles Gemini API interactions (no API keys exposed to frontend)  
- 👤 Login system with encrypted Emails and Passwords in case of database breach (SHA256 for emails and bcrypt for passwprds)
- 💾 Mongoose-based schemas to structure user and history data  
- 🕓 Persistent chat history across sessions, tied to authenticated accounts  
- ⚙️ Modular architecture for clean full-stack development  
- 🌐 CORS-enabled for seamless frontend-backend communication during development  

---

## 📁 Project Structure

```
EssayHelper/
├── frontend/       # Angular app
├── backend/        # Node.js + Express server
├── README.md       # Project documentation
```

---

## 🚀 Getting Started

### 🔧 Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 🔧 Backend Setup
```bash
cd backend
npm install
npm start
```

---

## 📦 Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
GENAI_API_KEY=your_google_gemini_api_key
MongoDBUsername=your_mongodb_atlas_username
MongoDBPswd=your_mongodb_atlas_password
MongoDBClusterString=your_mongodb_cluster_string
SALT_WORK_FACTOR=the_salt_work_factor_for_bcrypt_password_hashing
EMAIL_HASH_SECRET=the_sha256_key_for_encrypting_emails
```

---

## 🧠 Tech Stack

- **Frontend**: Angular and Angular Material
- **Backend**: Node.js, Express
- **Authentication**: Custom Login Setup
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Google Gemini API (via Generative Language SDK)

---

## 🔐 Authentication & Persistence

- Users can log in securely using their email and password credentials.
- Chat histories are stored in MongoDB and associated with user accounts.
- When users return, they can continue from where they left off.

---

## 📌 Future Improvements

- Client Side Session Management
- Packaging application for release online  

---
