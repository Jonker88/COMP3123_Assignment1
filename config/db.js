import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/comp3123_assigment1';
  console.log('Connecting to Mongo...');
  await mongoose.connect(uri, { dbName: 'comp3123_assigment1' });
  console.log('MongoDB connected');
};

export default connectDB;