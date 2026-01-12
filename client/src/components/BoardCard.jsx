import { useState } from "react";
import { Trash2, SquarePen } from "lucide-react";

const BoardCard = ({ board, onDelete, onEdit, onClick }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to delete this board? All todos will be deleted."
      )
    ) {
      setIsDeleting(true);
      await onDelete(board._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(board);
  };

  return (
    <div
      onClick={() => onClick(board._id)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
      style={{ borderLeft: `4px solid ${board.color}` }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{board.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <SquarePen className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {board.description && (
        <p className="text-gray-600 text-sm">{board.description}</p>
      )}
      <div className="mt-4 text-xs text-gray-500">
        Created: {new Date(board.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BoardCard;
