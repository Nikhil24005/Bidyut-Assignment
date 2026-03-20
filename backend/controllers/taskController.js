import TaskModel from '../models/taskModel.js';

// Get all tasks
export const getTasks = (req, res) => {
  try {
    const tasks = TaskModel.getAll();
    res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single task
export const getTaskById = (req, res) => {
  try {
    const task = TaskModel.getById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create task
export const createTask = (req, res) => {
  try {
    const { title, description = '' } = req.body;

    // Validation
    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a string',
      });
    }

    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title cannot be empty',
      });
    }

    const newTask = TaskModel.create(title, description);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update task
export const updateTask = (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title && description === undefined) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (title or description) is required',
      });
    }

    if (title && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Title must be a non-empty string',
      });
    }

    const updatedTask = TaskModel.update(req.params.id, {
      title,
      description,
    });

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully',
    });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Toggle task status
export const toggleTaskStatus = (req, res) => {
  try {
    const updatedTask = TaskModel.toggleStatus(req.params.id);

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: `Task marked as ${updatedTask.status}`,
    });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete task
export const deleteTask = (req, res) => {
  try {
    const deletedTask = TaskModel.delete(req.params.id);

    res.status(200).json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
