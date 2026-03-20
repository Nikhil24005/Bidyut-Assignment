import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    onEdit(task._id, editTitle.trim(), editDescription.trim());
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(task._id);
    setShowDeleteConfirm(false);
  };

  const isCompleted = task.status === 'completed';
  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 fade-in border-l-4 border-blue-500">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={isLoading}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
          ></textarea>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <div className="bg-red-50 rounded-lg shadow-md p-4 mb-4 fade-in border-l-4 border-red-500">
        <p className="text-gray-800 mb-4 font-semibold">Are you sure you want to delete this task?</p>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            disabled={isLoading}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-4 fade-in transition-all border-l-4 ${
        isCompleted ? 'border-green-500 bg-green-50' : 'border-yellow-400'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task._id)}
            disabled={isLoading}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex-1">
            <h3
              className={`font-semibold text-gray-800 transition-all ${
                isCompleted ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${isCompleted ? 'text-gray-500' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  isCompleted
                    ? 'bg-green-200 text-green-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {isCompleted ? 'Completed' : 'Pending'}
              </span>
              <span className="text-xs text-gray-500">{createdDate}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            title="Edit task"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            title="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
