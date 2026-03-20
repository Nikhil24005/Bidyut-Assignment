# Task Manager - Complete Project

A modern, production-ready Task Manager application built with React, Vite, Tailwind CSS, Node.js, Express, and REST API.

## 🚀 Features

- ✅ Create, read, update, and delete tasks
- ✅ Toggle task status (Pending/Completed)
- ✅ Edit task title and description
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Real-time task status badges
- ✅ Loading states
- ✅ Toast notifications
- ✅ Delete confirmation dialog
- ✅ Beautiful UI with Tailwind CSS
- ✅ RESTful API backend
- ✅ In-memory data storage (simple) with support for MongoDB

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **PostCSS & Autoprefixer** - CSS processing

## 📂 Project Structure

```
task-manager/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   ├── routes/
│   │   └── taskRoutes.js      # API route definitions
│   ├── controllers/
│   │   └── taskController.js  # Business logic
│   └── models/
│       └── taskModel.js       # Data model & in-memory storage
│
├── frontend/
│   ├── index.html             # HTML entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── public/                # Static assets
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── App.jsx            # Root component
│       ├── index.css          # Global styles
│       ├── pages/
│       │   └── Home.jsx       # Main page component
│       ├── components/
│       │   ├── TaskForm.jsx   # Task creation form
│       │   ├── TaskList.jsx   # Task list container
│       │   └── TaskItem.jsx   # Individual task component
│       └── services/
│           └── api.js         # API client with Axios
│
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. **Setup MongoDB:**
   - Install MongoDB locally OR
   - Use MongoDB Atlas (cloud) - [Get free account](https://www.mongodb.com/cloud/atlas)

4. Configure `.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/task-manager
```

5. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

6. (Optional) Seed sample data:
```bash
npm run seed
```

The backend will run on `http://localhost:5000`

**For detailed MongoDB setup, see [DATABASE.md](backend/DATABASE.md)**

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

4. For production build:
```bash
npm run build
```

## 📡 API Endpoints

All endpoints are prefixed with `/api`

### Get All Tasks
```http
GET /api/tasks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Task",
      "description": "Task description",
      "status": "pending",
      "created_at": "2024-01-20T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### Get Single Task
```http
GET /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "status": "pending",
    "created_at": "2024-01-20T10:30:00.000Z"
  }
}
```

### Create Task
```http
POST /api/tasks

Content-Type: application/json

{
  "title": "New Task",
  "description": "Optional description"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "Optional description",
    "status": "pending",
    "created_at": "2024-01-20T10:30:00.000Z"
  },
  "message": "Task created successfully"
}
```

### Update Task
```http
PUT /api/tasks/:id

Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    "status": "pending",
    "created_at": "2024-01-20T10:30:00.000Z"
  },
  "message": "Task updated successfully"
}
```

### Toggle Task Status
```http
PATCH /api/tasks/:id/toggle
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Task",
    "description": "Description",
    "status": "completed",
    "created_at": "2024-01-20T10:30:00.000Z"
  },
  "message": "Task marked as completed"
}
```

### Delete Task
```http
DELETE /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Deleted Task",
    "description": "Description",
    "status": "pending",
    "created_at": "2024-01-20T10:30:00.000Z"
  },
  "message": "Task deleted successfully"
}
```

## 🎨 UI Components

### TaskForm Component
- Input field for task title
- Textarea for task description
- Add Task button with loading state
- Form validation

### TaskList Component
- Separates pending and completed tasks
- Shows task counts
- Loading skeleton
- Empty state UI

### TaskItem Component
- Checkbox to toggle task status
- Edit and Delete buttons
- Status badge (Pending/Completed)
- Task creation date
- Edit mode inline
- Delete confirmation dialog
- Visual distinction for completed tasks (line-through text)

## 🎯 Key Features Implemented

### Frontend Features
- ✅ Real-time task list updates
- ✅ Form validation
- ✅ Loading states on buttons
- ✅ Toast notifications (success/error)
- ✅ Delete confirmation dialog
- ✅ Edit task inline with save/cancel
- ✅ Responsive grid layout
- ✅ Status badges with color coding
- ✅ Empty state display
- ✅ Task date formatting
- ✅ Animations (fade-in, slide-in)

### Backend Features
- ✅ RESTful endpoint design
- ✅ Proper HTTP status codes
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ In-memory data persistence
- ✅ Task ID auto-increment
- ✅ Timestamp auto-generation
- ✅ Clean controller pattern
- ✅ Modular file structure

## 🔌 Environment Variables

### Frontend (`frontend/.env`)
Optional - for custom API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend
No environment variables required for basic setup. Default port is 5000.

To change backend port:
```bash
PORT=3000 npm start
```

## 📱 Responsive Design

- **Mobile (< 640px)** - Single column layout, touch-friendly buttons
- **Tablet (640px - 1024px)** - Extended layout, larger touch targets
- **Desktop (> 1024px)** - Full multi-column layout

## 🚀 Quick Start Command Sequence

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📝 Example API Requests with CURL

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn React","description":"Complete React fundamentals"}'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Update a Task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description"}'
```

### Toggle Task Status
```bash
curl -X PATCH http://localhost:5000/api/tasks/1/toggle
```

### Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## 🔐 Security Considerations

- ✅ CORS properly configured
- ✅ Input validation on all endpoints
- ✅ Proper error handling
- ✅ Content-Type validation
- ✅ Safe string trimming

## 🐛 Troubleshooting

### CORS Error
- Ensure backend is running on port 5000
- Check that CORS is enabled in server.js
- Verify frontend API URL

### Tasks not loading
- Check browser console for errors
- Verify backend is running
- Check network tab in dev tools
- Ensure API port is correct

### Port already in use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux

# Or use different port
PORT=5001 npm start  # Backend
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Express.js Documentation](https://expressjs.com)
- [Axios Documentation](https://axios-http.com)

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a production-ready Task Manager assignment.

---

**Happy Coding! 🎉**
