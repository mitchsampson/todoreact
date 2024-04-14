import React, { useState } from 'react';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoText.trim() !== '') {
      try {
        const response = await fetch('http://cse204.work/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
          },
          body: JSON.stringify({ text: todoText })
        });
        if (response.ok) {
          setTodoText('');
          // Fetch updated todos after adding a new one
        }
      } catch (error) {
        console.error('Error adding ToDo:', error);
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Add Task</h2>
      <form onSubmit={handleSubmit} className="flex mb-8">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="flex-grow step-input rounded-l px-4 py-2 text-base focus:outline-none"
          placeholder="Start typing..."
        />
        <button type="submit" className="step-button text-white rounded-r px-6 py-2 text-base font-semibold">
          Add
        </button>
      </form>
    </>
  );
};

export default TodoForm;