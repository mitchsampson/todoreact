import React from 'react';

const TaskList = ({ todos, fetchTodos }) => {
  const toggleComplete = async (todoId, completed) => {
    try {
      const response = await fetch(`http://cse204.work/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
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
          'X-API-KEY': 'f7e95a-24d4ce-e5fd7c-b60c75-f408f2'
        }
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  return (
    <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-[#174E75] mb-4 header-text">Your Tasks</h2>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`step-item bg-white rounded-lg p-4 flex justify-between items-center ${
              todo.completed ? 'completed' : ''
            }`}
            tabIndex={0}
          >
            <span className="text-base flex-grow">{todo.text}</span>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, !todo.completed)}
                className="mr-2"
              />
              <button
                className="delete-btn text-red-500 font-semibold focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();  // Prevents the onClick event of the li from firing when the button is clicked
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {todos.length === 0 && <p className="text-gray-600">No tasks currently added.</p>}
      </ul>
    </section>
  );
};

export default TaskList;