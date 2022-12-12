import mongoose from 'mongoose';
import { config } from 'config';

export default async function connectDB(): Promise<typeof mongoose | void> {
  try {
    const { MONGO_URI } = config;

    if (!MONGO_URI) {
      console.warn('MONGO_URI is not set');
      return;
    }

    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to database');
      return mongoose;
    }

    console.log('Connecting to database');

    mongoose.set('strictQuery', false);
    return await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error('Error connecting to database:', error);
    return;
  }
}
