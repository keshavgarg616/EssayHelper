# 📝 EssayHelper

**EssayHelper** is an AI-powered chatbot web application designed to help users improve their essays, personal statements, or application drafts. Built using an Angular frontend and a Node.js + Express backend, it integrates with Google's Gemini API to provide smart, context-aware feedback on writing.

Whether you're applying to a university, a job, or a fellowship, EssayHelper offers personalized suggestions on what to include, what to avoid, and how to improve clarity and impact — all while maintaining a natural, human-like chat experience.

---

## 💡 Key Features

-   💬 Conversational AI to refine and strengthen essays
-   ✍️ Custom system prompt tailored for application writing guidance
-   🔐 Secure backend handles Gemini API interactions (no API keys exposed to frontend)
-   👤 Login system with encrypted Emails and Passwords (SHA256 + bcrypt)
-   💾 Mongoose-based schemas to structure user and history data
-   🕓 Persistent chat history across sessions, tied to authenticated accounts
-   🌐 CORS-enabled for seamless frontend-backend communication
-   🛡️ Session persistence even after refresh/redeployment using local storage
-   ⚙️ Modular architecture for clean full-stack development

---

## 🔧 Architectural Highlights

-   🧱 **Modular Backend Structure**

    -   Separated concerns using **controllers**, **routes**, and **services**
    -   Reusable utility functions and middleware for clean organization

-   🛡 **Route Guards and JWT Integration**

    -   Stateless authentication with **JWT**
    -   Protected API endpoints using middleware validators
    -   Angular route guards ensure only logged-in users access the chat

-   🔁 **Multiple Angular Routes**

    -   Separate pages for **login**, **signup**, and **chat**
    -   Clean navigation flow using Angular Router

-   📋 **Form Validations**
    -   Strong frontend validation for user inputs using reactive forms
    -   Custom validators for password strength and confirmation

---

## 📁 Project Structure

```
EssayHelper/
├── frontend/            # Angular app
├── backend/             # Node.js + Express server
├── README.md            # Project documentation
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
SALT_WORK_FACTOR=10
EMAIL_HASH_SECRET=your_sha256_secret_key
JWT_SECRET=your_jwt_encryption_key
```

---

## 🧠 Tech Stack

-   **Frontend**: Angular + Angular Material
-   **Backend**: Node.js + Express
-   **Authentication**: Custom login with JWT
-   **Database**: MongoDB (via Mongoose)
-   **AI**: Google Gemini API (Generative Language SDK)

---

## 🔐 Authentication & Persistence

-   User credentials are encrypted using SHA256 + bcrypt
-   JWT tokens manage user sessions
-   Frontend stores auth state in browser local storage
-   Authenticated users have access to persistent chat history

---

## 📌 Future Improvements

-   🌍 **Production Deployment**: Host the application online with a custom domain.

---

## 🧠 Contributors

Built with ❤️ by Keshav Garg
