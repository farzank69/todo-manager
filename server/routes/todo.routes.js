const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const {
  getTodosByBoard,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller');

router.use(authenticate);

router.get('/board/:boardId', getTodosByBoard);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
