// In-memory task storage
let tasks = [];
let nextId = 1;

// Task Model - In-memory database
class TaskModel {
  // Get all tasks
  static getAll() {
    return tasks;
  }

  // Get task by ID
  static getById(id) {
    return tasks.find(task => task.id === parseInt(id));
  }

  // Create new task
  static create(title, description = '') {
    if (!title || title.trim() === '') {
      throw new Error('Title is required');
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
  }

  // Update task
  static update(id, updates) {
    const task = this.getById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    if (updates.title !== undefined) {
      if (!updates.title || updates.title.trim() === '') {
        throw new Error('Title cannot be empty');
      }
      task.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      task.description = updates.description.trim();
    }

    return task;
  }

  // Toggle task status
  static toggleStatus(id) {
    const task = this.getById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    return task;
  }

  // Delete task
  static delete(id) {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }

    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return deletedTask;
  }

  // Clear all tasks (for testing)
  static clearAll() {
    tasks = [];
    nextId = 1;
  }
}

export default TaskModel;
