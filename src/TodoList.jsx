// TodoList.jsx

import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('created');

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
        sortTodos(data);
      }
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  const sortTodos = (todos) => {
    let sortedTodos = [];
    switch (sortBy) {
      case 'alphabetical':
        sortedTodos = todos.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'created':
        sortedTodos = todos.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case 'completed':
        sortedTodos = todos.sort((a, b) => a.completed - b.completed);
        break;
      default:
        sortedTodos = todos;
    }
    setTodos(sortedTodos);
  };

  const deleteSelectedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.selected);
    setTodos(updatedTodos);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Your Tasks</h2>
      <div>
        <label>
          <input
            type="radio"
            value="alphabetical"
            checked={sortBy === 'alphabetical'}
            onChange={() => {
              setSortBy('alphabetical');
              sortTodos(todos);
            }}
          />
          Alphabetical
        </label>
        <label>
          <input
            type="radio"
            value="created"
            checked={sortBy === 'created'}
            onChange={() => {
              setSortBy('created');
              sortTodos(todos);
            }}
          />
          Created Date
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={sortBy === 'completed'}
            onChange={() => {
              setSortBy('completed');
              sortTodos(todos);
            }}
          />
          Completed Status
        </label>
      </div>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
        ))}
      </ul>
      {todos.length === 0 && <p className="text-gray-600">No tasks currently added.</p>}
      <button onClick={deleteSelectedTodos} className="step-button text-white px-6 py-2 text-base font-semibold mt-4">
        Delete Selected
      </button>
      <TodoForm fetchTodos={fetchTodos} />
    </>
  );
};

export default TodoList;