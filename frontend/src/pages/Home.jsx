import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskAPI } from '../services/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data || []);
    } catch (error) {
      showNotification('Failed to load tasks', 'error');
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleAddTask = async (taskData) => {
    try {
      setIsLoading(true);
      const response = await taskAPI.createTask(taskData.title, taskData.description);

      if (response.success) {
        setTasks([...tasks, response.data]);
        showNotification('Task added successfully!', 'success');
      } else {
        showNotification('Failed to add task', 'error');
      }
    } catch (error) {
      showNotification(error.response?.data?.error || 'Failed to add task', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      setIsLoading(true);
      const response = await taskAPI.toggleTaskStatus(id);

      if (response.success) {
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        showNotification(
          `Task marked as ${response.data.status}!`,
          'success'
        );
      }
    } catch (error) {
      showNotification('Failed to update task', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true);
      const response = await taskAPI.deleteTask(id);

      if (response.success) {
        setTasks(tasks.filter((task) => task._id !== id));
        showNotification('Task deleted successfully!', 'success');
      }
    } catch (error) {
      showNotification('Failed to delete task', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = async (id, title, description) => {
    try {
      setIsLoading(true);
      const response = await taskAPI.updateTask(id, title, description);

      if (response.success) {
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        showNotification('Task updated successfully!', 'success');
      }
    } catch (error) {
      showNotification(error.response?.data?.error || 'Failed to update task', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 Task Manager</h1>
          <p className="text-gray-600">Organize and manage your daily tasks efficiently</p>
        </div>

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isLoading={isLoading}
          isLoaded={isLoaded}
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className={`toast-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Home;
