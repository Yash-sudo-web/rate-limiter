import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
