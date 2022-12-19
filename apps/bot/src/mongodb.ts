import mongoose from 'mongoose';
import { config } from './config';

export default async function connectDB(): Promise<typeof mongoose> {
  if (!config.MONGO_URI) {
    console.warn('MONGO_URI is not defined');
    return;
  }

  if (mongoose.connections[0].readyState) {
    return;
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(config.MONGO_URI);
  console.log('Connected to MongoDB');
}
