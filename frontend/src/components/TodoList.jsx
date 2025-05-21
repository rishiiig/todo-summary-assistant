import React from 'react';
import axios from 'axios';

const TodoList = ({ todos, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      onDelete(id);
    } catch (err) {
      console.error('Failed to delete todo:', err.message);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.task}
          <button onClick={() => handleDelete(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
