# Task Manager Backend

Express.js REST API with MongoDB for the Task Manager application.

## Quick Start

```bash
npm install

# Configure .env with MongoDB URI
# Then start server:
npm start
```

Server runs on `http://localhost:5000`

## Development

For auto-reload during development:
```bash
npm run dev
```

## Database Setup

See [DATABASE.md](DATABASE.md) for complete MongoDB setup instructions.

### Quick Setup:
1. Install MongoDB locally or use MongoDB Atlas
2. Set `MONGODB_URI` in `.env`
3. Run `npm start`

## Sample Data

Populate database with sample tasks:
```bash
npm run seed
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete task
- `GET /health` - Health check

## Architecture

- **Models** - Mongoose Task schema with validation
- **Controllers** - Business logic and validation
- **Routes** - API endpoint definitions
- **Config** - Database connection setup
- **Server** - Express app setup and middleware

## Technologies

- Express.js
- MongoDB + Mongoose
- CORS
- Dotenv for configuration
- ES Modules

