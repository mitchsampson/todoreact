import './Todo.css';

function Todo() {
  return (
    <li className="step-item bg-white rounded-lg p-4 flex justify-between items-center">
      <span className="text-base flex-grow">Task text goes here</span>
      <input type="checkbox" className="mr-4" />
      <button className="delete-btn text-red-500 font-semibold ml-4 focus:outline-none" data-index="0">Delete</button>
    </li>
  );
}

export default Todo;