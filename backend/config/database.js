import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI.replace(/:[^:]*@/, ':****@')); // Hide password

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✓ MongoDB connected successfully');
    console.log('✓ Database:', mongoose.connection.name);
    
    return mongoose.connection;
  } catch (error) {
    console.error('✗ MongoDB connection failed');
    console.error('Error:', error.message);
    console.error('Full error:', error);
    
    // Don't exit immediately - allow server to start, API will return connection error
    console.log('! Starting server anyway - will handle connection errors gracefully');
    return null;
  }
};

export default connectDB;
