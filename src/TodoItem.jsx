// TodoItem.jsx
import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const toggleComplete = async () => {
    try {
      const response = await fetch(`http://cse204.work/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
        },
        body: JSON.stringify({ completed: !isCompleted })
      });
      if (response.ok) {
        setIsCompleted(!isCompleted);
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating ToDo status:', error);
    }
  };

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://cse204.work/todos/${todo.id}`, {
        method: 'DELETE',
        headers: {
          'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
        }
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  return (
    <li
      className={`step-item bg-white rounded-lg p-4 flex justify-between items-center ${
        isCompleted ? 'completed' : ''
      }`}
    >
      <span className="text-base flex-grow">{todo.text}</span>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={toggleComplete}
        className="mr-4"
      />
      <button onClick={deleteTodo} className="delete-btn text-red-500 font-semibold ml-4 focus:outline-none">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;