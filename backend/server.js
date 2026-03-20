import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Parse CORS origins from environment variable
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const corsOrigins = corsOrigin.includes(',') 
  ? corsOrigin.split(',').map(origin => origin.trim())
  : corsOrigin;

console.log('CORS Origins:', corsOrigins);
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Connected' : 'Not set');

// Connect to MongoDB
connectDB();

// Middleware - CORS must be first
const corsOptions = {
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Task Manager API running on port ${PORT}`);
  console.log(`✓ CORS enabled for: ${Array.isArray(corsOrigins) ? corsOrigins.join(', ') : corsOrigins}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});
