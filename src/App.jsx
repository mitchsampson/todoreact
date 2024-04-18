import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/transparentlogo.png';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('ascending');
  const apiKey = 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://cse204.work/todos', {
        headers: {
          'X-API-KEY': apiKey
        }
      });
      if (response.ok) {
        const todos = await response.json();
        setTodos(sortTodoList(todos, sortBy, sortOrder));
      }
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  useEffect(() => {
    setTodos((currentTodos) => sortTodoList(currentTodos, sortBy, sortOrder));
  }, [sortBy, sortOrder]);

  const sortTodoList = (todoList, sortBy, order) => {
    let sortedTodos = [...todoList];
    switch (sortBy) {
      case 'alphabetical':
        sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'created':
        sortedTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'completed':
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      default:
        return todoList;
    }

    if (order === 'descending') {
      sortedTodos.reverse();
    }

    return sortedTodos;
  };

  const addTodo = async (text) => {
    try {
      const response = await fetch('http://cse204.work/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey
        },
        body: JSON.stringify({ text })
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding ToDo:', error);
    }
  };

  const toggleComplete = async (todoId, completed) => {
    try {
      const response = await fetch(`http://cse204.work/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey
        },
        body: JSON.stringify({ completed })
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating ToDo status:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://cse204.work/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'X-API-KEY': apiKey
        }
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = todoInput.trim();
    if (text !== '') {
      addTodo(text);
      setTodoInput('');
    }
  };

  return (
    <div className="App">
      <header className="bg-white bg-opacity-90 shadow-lg custom-header">
        <img src={logo} alt="STEP1 Logo" className="custom-logo" />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="nav-link text-[#174E75] font-semibold">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-[#174E75] font-semibold">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-[#174E75] font-semibold">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Add Task</h2>
          <form onSubmit={handleSubmit} className="flex mb-8">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="flex-grow step-input rounded-l px-4 py-2 text-base focus:outline-none"
              placeholder="Start typing..."
            />
            <button type="submit" className="step-button text-white rounded-r px-6 py-2 text-base font-semibold">
              Add
            </button>
          </form>
          <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Your Tasks</h2>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`step-item bg-white rounded-lg p-4 flex justify-between items-center ${
                  todo.completed ? 'completed' : ''
                }`}
                tabIndex={0}
                onClick={() => toggleComplete(todo.id, !todo.completed)}
              >
                <span className="text-base flex-grow">{todo.text}</span>
                <button
                  className="delete-btn text-red-500 font-semibold ml-4 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && <p className="text-gray-600">No tasks currently added.</p>}
        </section>
        <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Sort Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="sort-select" className="font-semibold">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full step-input rounded px-4 py-2 text-base focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="created">Created Date</option>
                <option value="completed">Completed Status</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="sort-order" className="font-semibold">
                Order:
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full step-input rounded px-4 py-2 text-base focus:outline-none"
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#174E75] text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 STEP1. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;