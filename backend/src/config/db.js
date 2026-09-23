import 'dotenv/config';
import dns from 'node:dns';
import mongoose from 'mongoose';

dns.setServers(['1.1.1.1', '8.8.8.8']);

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  const parsedUri = new URL(mongoUri);
  const configuredDbName = parsedUri.pathname.replace(/^\/+/, '');

  await mongoose.connect(mongoUri, configuredDbName ? {} : { dbName: 'chauhan_realtors' });

  console.log(`MongoDB Connected Successfully${configuredDbName ? ` to ${configuredDbName}` : ''}`);
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
