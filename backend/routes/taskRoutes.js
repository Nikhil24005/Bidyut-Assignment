import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Task Routes
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id/toggle', toggleTaskStatus);
router.delete('/tasks/:id', deleteTask);

export default router;
