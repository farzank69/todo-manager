import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilLine, ClipboardCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import BoardCard from '../components/BoardCard';
import BoardModal from '../components/BoardModal';
import { boardService } from '../services/dataService';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await boardService.getAll();
      setBoards(response.data);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (boardData) => {
    try {
      await boardService.create(boardData);
      fetchBoards();
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleUpdateBoard = async (boardData) => {
    try {
      await boardService.update(editingBoard._id, boardData);
      fetchBoards();
      setEditingBoard(null);
    } catch (error) {
      console.error('Failed to update board:', error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await boardService.delete(boardId);
      fetchBoards();
    } catch (error) {
      console.error('Failed to delete board:', error);
    }
  };

  const handleEditBoard = (board) => {
    setEditingBoard(board);
    setIsModalOpen(true);
  };

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBoard(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Boards</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center"
          >
            <PencilLine className='w-5 h-5 mr-2'/>
            Create Board
          </button>
        </div>

        {boards.length === 0 ? (
          <div className="text-center py-16">
            <ClipboardCheck className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-600 mb-2">No boards yet</h3>
            <p className="text-gray-500">Create your first board to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                onDelete={handleDeleteBoard}
                onEdit={handleEditBoard}
                onClick={handleBoardClick}
              />
            ))}
          </div>
        )}
      </div>

      <BoardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingBoard ? handleUpdateBoard : handleCreateBoard}
        initialData={editingBoard}
      />
    </div>
  );
};

export default Dashboard;
