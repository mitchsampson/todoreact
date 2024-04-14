import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://cse204.work/todos', {
        headers: {
          'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  const deleteSelectedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.selected);
    setTodos(updatedTodos);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Your Tasks</h2>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
        ))}
      </ul>
      {todos.length === 0 && <p className="text-gray-600">No tasks currently added.</p>}
      <button
        onClick={deleteSelectedTodos}
        className="step-button text-white px-6 py-2 text-base font-semibold mt-4"
      >
        Delete Selected
      </button>
    </>
  );
};

export default TodoList;