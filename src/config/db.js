import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB connection
    // For server-side, use process.env instead of import.meta.env
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/i2lense';

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;