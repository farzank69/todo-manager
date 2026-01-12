import { useState } from 'react';

const BoardCard = ({ board, onDelete, onEdit, onClick }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this board? All todos will be deleted.')) {
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
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
