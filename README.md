# ✅ Todo Summary Assistant

A full-stack productivity application that allows users to manage their daily tasks, generate AI-based summaries of their to-do list using **Google Gemini**, and receive summaries directly in a **Slack channel**. All data is stored and synced using **Supabase (PostgreSQL)**.

---

## 🚀 Features

* 📝 Add, view, and delete todos.
* 🧠 AI-generated summaries using Google Gemini.
* 📤 Summary notifications sent to a Slack channel.
* 🌐 Full-stack integration with Supabase, React, and Express.
* 📂 Real-time data persistence with PostgreSQL (via Supabase).

---

## 🧰 Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Frontend  | React.js (Vite/CRA)   |
| Backend   | Node.js, Express      |
| Database  | Supabase (PostgreSQL) |
| AI Engine | Google Gemini API     |
| Messaging | Slack Webhooks        |

---

## 🛠️ Project Setup Guide

### 1. 📁 Clone the Repository

```bash
git clone https://github.com/rishiiig/todo-summary-assistant.git
cd todo-summary-assistant
```

---

### 2. 🔧 Backend Setup

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the **root directory** and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
GEMINI_API_KEY=your_google_gemini_api_key
```

> ✅ Make sure your Supabase project has a `todos` table with the following columns:
>
> * `id`: UUID (primary key)
> * `task`: text
> * `created_at`: timestamp (default: now())

---

### 3. 💻 Frontend Setup

```bash
cd frontend
npm install
```

#### Optional `.env` (Frontend)

Create `.env` inside the `frontend/` directory (if needed):

```env
PORT=3001
```

---

### 4. ▶️ Run the Application

```bash
# Start Backend (from root directory)
node index.js

# Start Frontend (from frontend directory)
npm start
```

---

## 🧪 Output Showcase

### 🔹 Initial State

![image](https://github.com/user-attachments/assets/2a62f761-c40f-4575-84e8-d3181128867e)

---

### 🔹 Listed Todos

![image](https://github.com/user-attachments/assets/c74636f3-382e-4d60-aea1-31222dcb35e3)

---

### 🔹 AI-Generated Summary

![image](https://github.com/user-attachments/assets/9fd4f5d4-2ba9-48df-97f8-935e0713b103)

---

### 🔹 Slack Message

![image](https://github.com/user-attachments/assets/32b3f9f4-5773-409a-ad1d-4d610e3b11bb)

---

### 🔹 Supabase Database Table

![image](https://github.com/user-attachments/assets/54890012-be60-4ab1-9323-8984b67166c7)

---

## 📌 Notes

* You must have access to the **Gemini API** from [Google AI Studio](https://aistudio.google.com/app).
* The Slack webhook must be created from your workspace via **Incoming Webhooks**.
* Supabase requires you to set appropriate **RLS policies** if deploying this securely.
* Make sure `todos` table is publicly readable/writable or configure service roles correctly if locking down access.

---

## 💡 Future Improvements

* Add user authentication (e.g., Supabase Auth).
* Schedule daily summaries automatically.
* Categorize todos by tags or priority.
* Store and analyze summary history.

---

## 👨‍💻 Author

Built by [@rishiiig](https://github.com/rishiiig)
