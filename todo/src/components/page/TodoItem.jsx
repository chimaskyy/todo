/* eslint-disable react/prop-types */
import {
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";

function TodoItem({ todo, onComplete, onDelete }) {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow ${
        todo.completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`font-semibold ${todo.completed ? "line-through" : ""}`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-gray-600">{todo.description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            <span>Due: {new Date(todo.dueDate).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {!todo.completed && (
            <button
              className="p-1 text-green-600 hover:text-green-800"
              onClick={onComplete}
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
          <button
            className="p-1 text-red-600 hover:text-red-800"
            onClick={onDelete}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
