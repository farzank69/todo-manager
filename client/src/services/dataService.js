import api from './api';

export const boardService = {
  getAll: async () => {
    const response = await api.get('/boards');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/boards/${id}`);
    return response.data;
  },

  create: async (boardData) => {
    const response = await api.post('/boards', boardData);
    return response.data;
  },

  update: async (id, boardData) => {
    const response = await api.put(`/boards/${id}`, boardData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/boards/${id}`);
    return response.data;
  }
};

export const todoService = {
  getByBoard: async (boardId) => {
    const response = await api.get(`/todos/board/${boardId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  create: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  update: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};
