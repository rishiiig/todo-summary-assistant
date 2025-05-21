import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await axios.post('/todos', { task });
      onAdd(res.data);
      setTask('');
    } catch (err) {
      console.error('Failed to add todo:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
