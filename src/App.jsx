import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const todo = {
      text,
      completed: false,
      selected: false,
      createdAt: new Date(),
    };
    setTodos([...todos, todo]);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);

    if (updatedTodos[index].completed) {
      setTimeout(() => {
        setTodos(todos.filter((_, i) => i !== index));
      }, 1000);
    }
  };

  const deleteTodo = (index, strikethrough = false) => {
    if (strikethrough) {
      const updatedTodos = [...todos];
      updatedTodos[index].completed = true;
      setTodos(updatedTodos);
      setTimeout(() => {
        setTodos(todos.filter((_, i) => i !== index));
      }, 1000);
    } else {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  const deleteSelectedTodos = () => {
    setTodos(todos.filter((todo) => !todo.selected));
  };

  const sortTodos = () => {
    const sortedTodos = [...todos];
    switch (sortBy) {
      case 'alphabetical':
        sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'created':
        sortedTodos.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'completed':
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      default:
        break;
    }

    if (sortOrder === 'descending') {
      sortedTodos.reverse();
    }

    setTodos(sortedTodos);
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
        <img src="transparentlogo.png" alt="STEP1 Logo" className="custom-logo" />
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
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`step-item bg-white rounded-lg p-4 flex justify-between items-center ${
                  todo.completed ? 'completed' : ''
                }`}
                tabIndex={0}
                onClick={(event) => {
                  if (!event.target.classList.contains('delete-btn') && !event.target.type === 'checkbox') {
                    toggleComplete(index);
                  }
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && !event.target.classList.contains('delete-btn') && !event.target.type === 'checkbox') {
                    toggleComplete(index);
                  }
                }}
              >
                <span className="text-base flex-grow">{todo.text}</span>
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={todo.selected}
                  onChange={() => {
                    const updatedTodos = [...todos];
                    updatedTodos[index].selected = !updatedTodos[index].selected;
                    setTodos(updatedTodos);
                  }}
                />
                <button
                  className="delete-btn text-red-500 font-semibold ml-4 focus:outline-none"
                  onClick={() => deleteTodo(index, true)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && <p className="text-gray-600">No tasks currently added.</p>}
          <button
            className="step-button text-white px-6 py-2 text-base font-semibold mt-4"
            onClick={deleteSelectedTodos}
          >
            Delete Selected
          </button>
        </section>
        <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Sort Tasks</h2>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="font-semibold">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="step-input rounded px-4 py-2 text-base focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="created">Created Date</option>
                <option value="completed">Completed Status</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-order" className="font-semibold">
                Order:
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="step-input rounded px-4 py-2 text-base focus:outline-none"
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