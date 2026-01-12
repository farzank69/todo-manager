import { Trash2, SquarePen } from "lucide-react";

const TodoCard = ({ todo, onDelete, onEdit, onStatusChange }) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-orange-100 text-orange-800',
    'high': 'bg-red-100 text-red-800'
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">{todo.title}</h3>
        <div className="flex space-x-2 ml-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <SquarePen className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {todo.description && (
        <p className="text-gray-600 text-sm mb-3">{todo.description}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo._id, e.target.value)}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[todo.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[todo.priority]}`}>
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
      </div>
      {todo.dueDate && (
        <div className="text-xs text-gray-500">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
