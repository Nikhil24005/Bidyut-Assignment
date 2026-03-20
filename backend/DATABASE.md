# MongoDB Integration Guide

Your Task Manager Backend is now integrated with **MongoDB** using **Mongoose**.

## 📊 Database Setup

### Option 1: Local MongoDB (Recommended for Development)

**Install MongoDB Community Edition:**

- **Windows:** https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- **macOS:** https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/
- **Linux:** https://docs.mongodb.com/manual/administration/install-on-linux/

**Start MongoDB:**

```bash
# Windows (using MongoDB Community Server)
mongod

# macOS (using Homebrew)
brew services start mongodb-community

# Linux (using systemctl)
sudo systemctl start mongod
```

**Verify Connection:**
```bash
mongosh
```

### Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create or update `.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/task-manager
```

### 3. Start Backend Server

```bash
npm start        # Production
npm run dev      # Development with auto-reload
```

### 4. Seed Sample Data (Optional)

```bash
npm run seed     # Populate database with sample tasks
```

## 📝 Database Schema

### Task Model

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  title: String (required),         // Task title
  description: String,              // Optional description
  status: String (pending/completed), // Task status
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

**Example Task:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete Project",
  "description": "Finish the task manager application",
  "status": "pending",
  "createdAt": "2024-01-20T10:30:00.000Z",
  "updatedAt": "2024-01-20T10:30:00.000Z"
}
```

## 🔄 API Endpoints (Same as Before)

All endpoints remain unchanged - they work seamlessly with MongoDB:

```
GET    /api/tasks              - Get all tasks
POST   /api/tasks              - Create task
GET    /api/tasks/:id          - Get one task
PUT    /api/tasks/:id          - Update task
PATCH  /api/tasks/:id/toggle   - Toggle status
DELETE /api/tasks/:id          - Delete task
```

## 🛠️ Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with auto-reload
npm run seed    # Populate database with sample data
```

## 🔐 Validation

Mongoose automatically validates:
- ✅ Title is required and non-empty
- ✅ Status must be "pending" or "completed"
- ✅ Timestamps auto-generated and updated
- ✅ Invalid IDs handled gracefully

## 📊 MongoDB Connection

The connection is established in `config/database.js`:

```javascript
await mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## 🐛 Troubleshooting

### "MongooseError: Cannot Connect"

- Verify MongoDB is running
- Check MongoDB URI in `.env`
- Ensure correct port (27017 for local)

### "ECONNREFUSED 127.0.0.1:27017"

- MongoDB server is not running
- Start MongoDB service
- Check if port 27017 is available

### Atlas Connection Issues

- Verify username/password in connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network access is enabled

## 📚 Resources

- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)

## 🎯 Next Steps

1. Start MongoDB service
2. Run `npm install` (if not done)
3. Run `npm run dev` to start backend
4. Run `npm run seed` to add sample data
5. Start frontend and create/manage tasks!

---

**Happy coding!** 🚀
