import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/transparentlogo.png';
import TaskList from './TaskList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [selectedTodos, setSelectedTodos] = useState([]);
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
        const fetchedTodos = await response.json();
        setTodos(sortTodoList(fetchedTodos));
      }
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  useEffect(() => {
    setTodos(currentTodos => sortTodoList(currentTodos));
  }, [sortBy, sortOrder]);

  const sortTodoList = (todoList) => {
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
        sortedTodos = todoList;
    }
    if (sortOrder === 'descending') {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = todoInput.trim();
    if (text !== '') {
      addTodo(text);
      setTodoInput('');
    }
  };

  const deleteSelectedTodos = async () => {
    try {
      await Promise.all(
        selectedTodos.map(async (todoId) => {
          const response = await fetch(`http://cse204.work/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
              'X-API-KEY': apiKey
            }
          });
          if (!response.ok) {
            throw new Error('Error deleting ToDo');
          }
        })
      );
      setSelectedTodos([]);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting selected ToDos:', error);
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
          <TaskList
            todos={todos}
            fetchTodos={fetchTodos}
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
            deleteSelectedTodos={deleteSelectedTodos}
          />
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
//test
export default App;