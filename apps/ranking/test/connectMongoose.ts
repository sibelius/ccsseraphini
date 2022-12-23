import mongoose from 'mongoose';

declare global {
  interface Global {
    __MONGO_URI__: string;
    __MONGO_DB_NAME__: string;
  }

  // eslint-disable-next-line
  var __MONGO_URI__: string;
  // eslint-disable-next-line
  var __MONGO_DB_NAME__: string;
}

export async function connectMongoose() {
  jest.setTimeout(20000);
  mongoose.set('strictQuery', false);
  return mongoose.connect(global.__MONGO_URI__, {
    dbName: global.__MONGO_DB_NAME__,
    autoIndex: true,
    connectTimeoutMS: 30000,
    minPoolSize: 1,
    socketTimeoutMS: 30000,
    keepAlive: true,
    keepAliveInitialDelay: 1000,
  });
}
