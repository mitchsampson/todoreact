import './NewTodo.css';

function NewTodo() {
  return (
    <form id="todo-form" className="flex mb-8">
      <input type="text" id="todo-input" className="flex-grow step-input rounded-l px-4 py-2 text-base focus:outline-none" placeholder="Start typing..." />
      <button type="submit" className="step-button text-white rounded-r px-6 py-2 text-base font-semibold">Add</button>
    </form>
  );
}

export default NewTodo;