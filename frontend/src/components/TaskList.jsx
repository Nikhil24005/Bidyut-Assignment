import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onEdit, isLoading, isLoaded }) => {
  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center fade-in">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Pending Tasks</h2>
            <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          <div>
            {pendingTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Completed Tasks</h2>
            <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          <div>
            {completedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
