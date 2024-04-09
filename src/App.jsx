import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

function App() {
  return (
    <>
      <header className="bg-white bg-opacity-90 shadow-lg custom-header">
        <img src="transparentlogo.png" alt="STEP1 Logo" className="custom-logo" />
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="nav-link text-\[#174E75\] font-semibold">Home</a></li>
            <li><a href="#" className="nav-link text-\[#174E75\] font-semibold">Contact</a></li>
            <li><a href="#" className="nav-link text-\[#174E75\] font-semibold">FAQ</a></li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-\[#174E75\] mb-4 header-text">Add Task</h2>
          <NewTodo />
          <h2 className="text-2xl font-semibold text-\[#174E75\] mb-4 header-text">Your Tasks</h2>
          <ul id="todo-list" className="space-y-4">
            <Todo />
          </ul>
          <p id="no-tasks" className="text-gray-600">No tasks currently added.</p>
          <button id="delete-selected" className="step-button text-white px-6 py-2 text-base font-semibold mt-4">Delete Selected</button>
        </section>
      </main>
      <footer className="bg-\[#174E75\] text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 STEP1. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;