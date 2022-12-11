import mongoose from 'mongoose';

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
}
