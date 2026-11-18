import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServerInstance = null;

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winngoo_carservice';

  try {
    console.log(`[DB] Attempting connection to MongoDB at: ${primaryUri}`);
    // Short timeout check so we don't hang if local mongod is absent
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('[DB] Connected successfully to primary MongoDB instance');
  } catch (err) {
    console.warn(`[DB] Could not connect to primary MongoDB (${err.message}). Starting MongoMemoryServer...`);
    try {
      mongoMemoryServerInstance = await MongoMemoryServer.create();
      const inMemoryUri = mongoMemoryServerInstance.getUri();
      console.log(`[DB] In-Memory MongoDB started at: ${inMemoryUri}`);
      await mongoose.connect(inMemoryUri);
      console.log('[DB] Connected successfully to In-Memory MongoDB');
    } catch (memErr) {
      console.error('[DB] Failed to initialize MongoMemoryServer:', memErr.message);
      throw memErr;
    }
  }

  mongoose.connection.on('error', (err) => {
    console.error('[DB] Mongoose connection error:', err);
  });
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryServerInstance) {
    await mongoMemoryServerInstance.stop();
  }
};
