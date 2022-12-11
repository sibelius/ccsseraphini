import mongoose from 'mongoose';
import { config } from 'config';

export default async function connectDB(): Promise<typeof mongoose | void> {
  const { MONGO_URI } = config;

  if (!MONGO_URI) {
    console.warn('MONGO_URI is not set');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to database');
    return mongoose;
  }

  mongoose.set('strictQuery', false);

  console.log('Connecting to database');
  return await mongoose.connect(MONGO_URI);
}
