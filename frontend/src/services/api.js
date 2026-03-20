import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  // Get single task
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  createTask: async (title, description = '') => {
    const response = await apiClient.post('/tasks', {
      title,
      description,
    });
    return response.data;
  },

  // Update task
  updateTask: async (id, title, description) => {
    const response = await apiClient.put(`/tasks/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  // Toggle task status
  toggleTaskStatus: async (id) => {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default apiClient;
