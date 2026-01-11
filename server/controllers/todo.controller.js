const Todo = require("../models/todo");
const Board = require("../models/board");

const getTodosByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findOne({
      _id: boardId,
      userId: req.user._id,
    });

    if (!board) {
      return res.status(404).json({ success: false, message: "Board not found"});
    }

    const todos = await Todo.find({ boardId })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({ success: true, data: todos});
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch todos" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).select("-__v");

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch todo" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, boardId, status, priority, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Todo title is required" });
    }

    if (!boardId) {
      return res.status(400).json({ success: false, message: "Board ID is required" });
    }

    const board = await Board.findOne({
      _id: boardId,
      userId: req.user._id,
    });

    if (!board) {
      return res.status(404).json({ success: false, message: "Board not found" });
    }

    const todo = await Todo.create({
      title,
      description,
      boardId,
      userId: req.user._id,
      status,
      priority,
      dueDate,
    });

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update todo"});
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete todo"});
  }
};

module.exports = {
  getTodosByBoard,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
