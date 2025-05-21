import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const response = await axios.post("/todos", { task });
      setTodos([...todos, response.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  const summarizeTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/summarize");
      setSummary(response.data.summary);
    } catch (err) {
      console.error("Error summarizing todos:", err.message);
      setSummary("❌ Failed to summarize todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>📝 Todo Summary Assistant</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>➕ Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.task}</span>
            <button onClick={() => deleteTodo(t.id)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <button onClick={summarizeTodos} disabled={loading}>
          {loading ? "Summarizing..." : "🧠 Summarize & Send to Slack"}
        </button>

        {summary && (
          <div className="summary-text">
            <strong>Summary:</strong>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
