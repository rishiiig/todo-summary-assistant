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

![Initial State](output-images/image.png)

---

### 🔹 Listed Todos

![Listed Tasks](output-images/image-1.png)

---

### 🔹 AI-Generated Summary

![AI Summary](output-images/image-2.png)

---

### 🔹 Slack Message

![Slack Output](output-images/image-3.png)

---

### 🔹 Supabase Database Table

![Supabase Table](output-images/image-4.png)

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
