import mongoose from 'mongoose';
import 'dotenv/config';
import Task from './models/Task.js';
import connectDB from './config/database.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('✓ Cleared existing tasks');

    // Sample tasks
    const sampleTasks = [
      {
        title: 'Complete Project Setup',
        description: 'Set up project structure and dependencies',
        status: 'completed',
      },
      {
        title: 'Implement MongoDB Integration',
        description: 'Connect to MongoDB and create schemas',
        status: 'completed',
      },
      {
        title: 'Build Task API Endpoints',
        description: 'Create RESTful endpoints for task management',
        status: 'pending',
      },
      {
        title: 'Create React Components',
        description: 'Build TaskForm, TaskList, and TaskItem components',
        status: 'pending',
      },
      {
        title: 'Style with Tailwind CSS',
        description: 'Apply responsive styling to the application',
        status: 'pending',
      },
    ];

    // Insert sample tasks
    const createdTasks = await Task.insertMany(sampleTasks);
    console.log(`✓ Created ${createdTasks.length} sample tasks`);

    // Display created tasks
    console.log('\n📋 Seeded Tasks:');
    createdTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} (${task.status})`);
    });

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
