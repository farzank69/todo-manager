const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/board.controller');

router.use(authenticate);

router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;
