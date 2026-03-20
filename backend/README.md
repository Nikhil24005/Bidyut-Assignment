# Task Manager Backend

Express.js REST API for the Task Manager application.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

## Development

For auto-reload during development:
```bash
npm run dev
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete task
- `GET /health` - Health check

## Architecture

- **Models** - In-memory task storage
- **Controllers** - Business logic and validation
- **Routes** - API endpoint definitions
- **Server** - Express app setup and middleware
