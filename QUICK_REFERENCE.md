# 🎯 QUICK REFERENCE

## ⚡ START IN 2 STEPS

### Step 1: Backend (Terminal 1)
```bash
cd backend && npm install && npm start
```
✅ Server ready at `http://localhost:5000`

### Step 2: Frontend (Terminal 2)
```bash
cd frontend && npm install && npm run dev
```
✅ App ready at `http://localhost:5173`

---

## 📊 API ENDPOINTS (Quick Lookup)

```
GET    /api/tasks              → Get all tasks
POST   /api/tasks              → Create task
GET    /api/tasks/:id          → Get one task
PUT    /api/tasks/:id          → Update task
PATCH  /api/tasks/:id/toggle   → Toggle status
DELETE /api/tasks/:id          → Delete task
```

---

## 🎨 COMPONENT TREE

```
App
 └─ Home
     ├─ TaskForm
     │   └─ [Input, Textarea, Button]
     └─ TaskList
         ├─ TaskItem (Pending)
         │   ├─ [Checkbox, Title, Description]
         │   ├─ [Edit Button]
         │   └─ [Delete Button]
         └─ TaskItem (Completed)
             └─ [Same as above]
```

---

## 🗂️ FILE TYPES

| Type | Location | Count |
|------|----------|-------|
| React Components | `frontend/src/components/` | 3 |
| React Pages | `frontend/src/pages/` | 1 |
| API Services | `frontend/src/services/` | 1 |
| Express Routes | `backend/routes/` | 1 |
| Controllers | `backend/controllers/` | 1 |
| Models | `backend/models/` | 1 |
| Config Files | Root/Config | 7 |
| Docs | Root | 3 |

---

## 🔧 USEFUL COMMANDS

```bash
# Backend
cd backend
npm install              # First time setup
npm start               # Production mode
npm run dev             # Development mode (auto-reload)

# Frontend
cd frontend
npm install             # First time setup
npm run dev             # Development server
npm run build           # Production build
npm run preview         # Preview production build
```

---

## 📋 TASK OBJECT STRUCTURE

```json
{
  "id": 1,
  "title": "Task name",
  "description": "Optional description",
  "status": "pending",  // or "completed"
  "created_at": "2024-01-20T10:30:00.000Z"
}
```

---

## 🎯 COMPONENT RESPONSIBILITIES

### TaskForm.jsx
- Task creation form
- Input validation
- Submit button with loading state

### TaskList.jsx
- Groups tasks by status (Pending/Completed)
- Display counts
- Loading skeleton
- Empty state

### TaskItem.jsx
- Display single task
- Checkbox to toggle
- Edit & Delete buttons
- In-line editing mode
- Delete confirmation

### Home.jsx
- Main page logic
- API calls
- State management
- Toast notifications

---

## 🌐 DEFAULT PORTS

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend Dev | 5173 | http://localhost:5173 |
| Frontend Build Preview | 4173 | http://localhost:4173 |

---

## 🔐 VALIDATION RULES

| Field | Rule |
|-------|------|
| Title | Required, non-empty string, max length |
| Description | Optional, string |
| Status | Only "pending" or "completed" |
| ID | Auto-generated, unique |

---

## 📦 KEY DEPENDENCIES

**Backend:**
- `express` - Web framework
- `cors` - Cross-origin requests

**Frontend:**
- `react` - UI library
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `vite` - Build tool

---

## ✅ TESTING CHECKLIST

- [ ] Backend runs without errors
- [ ] Frontend loads in browser
- [ ] Can add a task
- [ ] Can see task in list
- [ ] Can mark task as complete
- [ ] Completed task shows different style
- [ ] Can edit task
- [ ] Can delete task (with confirmation)
- [ ] Toast notifications appear
- [ ] Empty state shows when no tasks
- [ ] Mobile view is responsive
- [ ] API returns correct status codes

---

## 🆘 COMMON ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| CORS Error | Check backend is running on 5000 |
| Port 5000 in use | `PORT=5001 npm start` |
| API returns 404 | Verify endpoint path |
| React not rendering | Check browser console |
| Styles not loading | Clear cache: `npm cache clean --force` |

---

## 📱 RESPONSIVE BREAKPOINTS

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

**Created:** January 2024
**Status:** Production-Ready ✅
