import Task from '../models/Task.js';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    
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
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
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
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid task ID',
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create task
export const createTask = async (req, res) => {
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

    const newTask = new Task({
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
    });

    await newTask.save();

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
export const updateTask = async (req, res) => {
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

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid task ID',
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Toggle task status
export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
      message: `Task marked as ${task.status}`,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid task ID',
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid task ID',
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
