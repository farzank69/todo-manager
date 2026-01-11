const Board = require("../models/board");
const Todo = require("../models/todo");

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({
      success: true,
      data: boards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch boards",
    });
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).select("-__v");

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.json({
      success: true,
      data: board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch board",
    });
  }
};

const createBoard = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Board title is required",
      });
    }

    const board = await Board.create({
      title,
      description,
      color,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create board",
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, color },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.json({
      success: true,
      data: board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update board",
    });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    await Todo.deleteMany({ boardId: req.params.id });

    res.json({
      success: true,
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete board",
    });
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
